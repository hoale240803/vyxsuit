import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { withErrorHandler } from "@/utils/withErrorHandler";
import { GroupedProduct, Product } from "@/models/product.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { keyword } = req.query;

    const condition = keyword ? { Name: { contains: keyword } } : {};
    
    const products = await prisma.product.findMany({
      where: {
        AND: [
          { ProductType: "DesignOfSuit" }, // Điều kiện cố định
          {...condition}
        ],
      },
    }) as Product[];

    const groupedProducts = products.reduce((acc: GroupedProduct[], product: Product) => {
      const existingGroup = acc.find(
          (group) =>
              group.Name === product.Name &&
              group.Description === product.Description
              // && group.Price === product.Price
      );
  
      if (existingGroup) {
          existingGroup.Images.push({ S3Url: product.S3Url, Code: product.Code });
      } else {
          acc.push({
              Name: product.Name,
              Description: product.Description,
              Price: 0,// product.Price,
              Main: product,
              Images: [{ S3Url: product.S3Url, Code: product.Code }]
          });
      }
  
      return acc;
  }, []);

    res.status(200).json(groupedProducts);
  } else if (req.method === "POST") {
  
    res.status(201).json({});
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withErrorHandler(handler);
