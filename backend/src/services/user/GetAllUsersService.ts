import prisma from '../../prisma';
import { Request } from 'express';

export class GetAllUsersService {
  async execute(req?: Request) {
    let search = null;
    let page = 1;
    let limit = 10; 
    let role = null;
    
    if (req) {
      search = req.query.search as string;
      role = req.query.role as string;
      const pageParam = req.query.page as string;
      const limitParam = req.query.limit as string;
      
      if (pageParam) {
        page = parseInt(pageParam, 10) || 1;
      }
      if (limitParam) {
        limit = parseInt(limitParam, 10) || 3;
      }
    }
    
    // Construir whereClause com filtros combinados
    const whereClause: any = {};
    
    // Adicionar filtro de busca se existir
    if (search) {
      whereClause.OR = [
        { email: { contains: search, mode: 'insensitive' as const } },
        { name: { contains: search, mode: 'insensitive' as const } },
      ];
    }
    
    // Adicionar filtro de role se existir
    if (role) {
      whereClause.role = role;
    }

    // Calcular offset para paginação
    const skip = (page - 1) * limit;

    // Buscar usuários com paginação
    const users = await prisma.user.findMany({
      where: whereClause,
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Contar total de usuários para paginação
    const totalUsers = await prisma.user.count({
      where: whereClause,
    });

    // Buscar estatísticas gerais (sem filtro de search para estatísticas reais)
    const totalAllUsers = await prisma.user.count();
    const totalActiveUsers = await prisma.user.count({
      where: {
        status: true
      }
    });
    const totalAdmins = await prisma.user.count({
      where: {
        isAdmin: true
      }
    });

    const totalPages = Math.ceil(totalUsers / limit);

    const usersWithoutPassword = users.map(({ password, ...user }) => user);

    return {
      users: usersWithoutPassword,
      pagination: {
        currentPage: page,
        totalPages,
        totalUsers,
        limit,
        hasNext: page < totalPages,
        hasPrevious: page > 1
      },
      stats: {
        totalUsers: totalAllUsers,
        activeUsers: totalActiveUsers,
        adminUsers: totalAdmins
      }
    };
  }
}
