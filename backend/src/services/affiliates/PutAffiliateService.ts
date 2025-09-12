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
    
    // Se há nova imagem, buscar a imagem antiga para removê-la
    let oldImage: string | null = null;
    if (rest.imageUrl && rest.imageUrl !== 'undefined') {
      const existingAffiliate = await prisma.affiliate.findUnique({
        where: { id },
        select: { imageUrl: true }
      });
      oldImage = existingAffiliate?.imageUrl || null;
    }
    
    // Mapear url para link (nome do campo no banco)
    const mappedData = {
      ...rest,
      ...(url && { link: url })
    };
    
    const filteredData = Object.fromEntries(
      Object.entries(mappedData).filter(([_, value]) => value !== undefined && value !== 'undefined')
    );

    const findAffiliate = await prisma.affiliate.findFirst({
      where: { id }
    });

    if (!findAffiliate) {
      throw new Error("Affiliate not Found");
    }

    await prisma.affiliate.update({
      where: { id },
      data: filteredData
    });

    // Remover imagem antiga se uma nova foi enviada
    if (oldImage && filteredData.imageUrl && oldImage !== filteredData.imageUrl) {
      const oldImagePath = path.join('./tmp/affiliates', oldImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log(`Imagem antiga do afiliado removida: ${oldImagePath}`);
      }
    }

    return { message: "Affiliate successfully updated" };
  }
}
