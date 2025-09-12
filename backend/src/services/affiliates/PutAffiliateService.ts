import prisma from "../../prisma";
import fs from 'fs';
import path from 'path';

interface AffiliateData {
  id: string;
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  buttonName?: string;
  status?: boolean;
}

export class PutAffiliateService {
  async execute({ data }: { data: AffiliateData }) {
    if (!data.id) {
      throw new Error("ID is required");
    }

    const { id, url, ...rest } = data;
    
    // Buscar o afiliado existente para verificar imagem antiga
    const existingAffiliate = await prisma.affiliate.findUnique({
      where: { id },
      select: { imageUrl: true }
    });

    if (!existingAffiliate) {
      throw new Error("Affiliate not found");
    }
    
    // Mapear url para link (nome do campo no banco)
    const mappedData = {
      ...rest,
      ...(url && { link: url })
    };
    
    const filteredData = Object.fromEntries(
      Object.entries(mappedData).filter(([_, value]) => value !== undefined && value !== 'undefined')
    );

    // Gerenciar imagem - se uma nova imagem foi enviada, deletar a antiga
    if (filteredData.imageUrl && existingAffiliate.imageUrl && filteredData.imageUrl !== existingAffiliate.imageUrl) {
      const oldImagePath = path.join('./tmp/affiliates', existingAffiliate.imageUrl);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    await prisma.affiliate.update({
      where: { id },
      data: filteredData
    });

    return { message: "Affiliate successfully updated" };
  }
}
