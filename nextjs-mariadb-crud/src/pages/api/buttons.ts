// src/pages/api/test-recaptcha.ts
import type { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "@/lib/prisma";
import { Product } from "@/models/product.model";
import { buildGroup } from "@/utils/productGroup";
import { withErrorHandler } from "@/utils/withErrorHandler";
import mariadbHelper from "@/lib/mariadb.ado";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  // const products = (await prisma.product.findMany({
  //   where: {
  //     AND: [
  //       { ProductType: "Lining" },
  //     ],
  //   },
  // })) as unknown as Product[];

  const products = await mariadbHelper.executeQuery(`select * from Product where ProductType = 'Button'`) as Product[];


  const groupedProducts = buildGroup(products);

  res.status(200).json(groupedProducts);
}

export default withErrorHandler(handler);
