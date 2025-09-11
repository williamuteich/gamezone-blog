import prisma from "../../prisma";

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

    const { id, ...rest } = data;
    const filteredData = Object.fromEntries(
      Object.entries(rest).filter(([_, value]) => value !== undefined)
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

    return { message: "Affiliate successfully updated" };
  }
}
