import prisma from '../prisma';

export class TokenCleanupService {
  async cleanupExpiredTokens() {
    try {
      const now = new Date();
      
      // Deletar tokens que já expiraram
      const result = await prisma.blacklistedToken.deleteMany({
        where: {
          expiresAt: {
            lt: now
          }
        }
      });

      console.log(`Token cleanup: ${result.count} tokens expirados removidos da blacklist`);
      return result;
    } catch (error) {
      console.error('Erro na limpeza de tokens:', error);
      throw error;
    }
  }

  // Executar limpeza a cada 1 hora
  startCleanupJob() {
    const CLEANUP_INTERVAL = 60 * 60 * 1000; // 1 hora em millisegundos

    setInterval(async () => {
      await this.cleanupExpiredTokens();
    }, CLEANUP_INTERVAL);

    // Executar uma vez na inicialização
    this.cleanupExpiredTokens();
    
    console.log('Job de limpeza de tokens iniciado (executa a cada 1 hora)');
  }
}