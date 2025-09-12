import prisma from '../../prisma';
import { Request } from 'express';

export class GetAllTeamService {
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
        limit = parseInt(limitParam, 10) || 10;
      }
    }
    
    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (role) {
      whereClause.role = role;
    }

    const skip = (page - 1) * limit;

    const teams = await prisma.team.findMany({
      where: whereClause,
      take: limit,
      skip: skip,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        avatar: true,
        createdAt: true,
        updatedAt: true
      }
    });

    const totalTeams = await prisma.team.count({
      where: whereClause,
    });

    const currentPage = page;
    const totalPages = Math.ceil(totalTeams / limit);
    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    return {
      team: teams,
      pagination: {
        currentPage,
        totalPages,
        totalCount: totalTeams,
        hasNext,
        hasPrev: hasPrevious,
      },
    };
  }
}
