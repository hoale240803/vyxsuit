import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { withErrorHandler } from "@/utils/withErrorHandler";
import { Product } from "@/models/product.model";
import { Group } from "@/utils/productGroup";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { keyword } = req.query;

    const products = await prisma.product.findMany({
      where: {
        AND: [
          { ProductType: "DesignOfSuit" },
          { Name: { contains: typeof keyword === 'string' ? keyword : '' } }
        ],
      },
    }) as unknown as Product[];

    const groupedProducts = Group(products);

    res.status(200).json(groupedProducts);
  } else if (req.method === "POST") {

    res.status(201).json({});
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withErrorHandler(handler);
