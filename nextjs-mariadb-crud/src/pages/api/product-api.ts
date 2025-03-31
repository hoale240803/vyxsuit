import type { NextApiRequest, NextApiResponse } from "next";
// import { prisma } from "@/lib/prisma";
import { withErrorHandler } from "@/utils/withErrorHandler";
import { Product } from "@/models/product.model";
import mariadbHelper from "@/lib/mariadb.ado";
import { buildGroup } from "@/utils/productGroup";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { keyword } = req.query;

    // const products = await prisma.product.findMany({
    //   where: {
    //     AND: [
    //       { ProductType: "FullSuit" },
    //       { name: { contains: typeof keyword === 'string' ? keyword : '' } }
    //     ],
    //   },
    // }) as unknown as Product[];


    const products = await mariadbHelper.executeQuery(`
      select * from Product where ProductType = 'DesignOfSuit' and PriceType = 'FullSuit' 
      ${keyword ? ' and name like ? ' : ''}  
    `) as Product[];
    const groupedProducts = buildGroup(products);

    res.status(200).json(groupedProducts);
  } else if (req.method === "POST") {

    res.status(201).json({});
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default withErrorHandler(handler);
