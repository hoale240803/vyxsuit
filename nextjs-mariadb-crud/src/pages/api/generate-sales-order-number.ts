import type { NextApiRequest, NextApiResponse } from "next";
import mariadbHelper from "@/lib/mariadb.ado";
import logger from "@/utils/logger";
import { generateSalesOrderNumber } from "@/utils/orderUtils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }

    try {
        const { productId, suitTypeId, fabricId } = req.body;

        if (!productId || !suitTypeId || !fabricId) {
            return res.status(400).json({ 
                error: "Missing required fields: productId, suitTypeId, fabricId" 
            });
        }

        // Calculate total amount in a single query
        const sql = `
            SELECT SUM(Price) as totalAmount
            FROM Product
            WHERE Id IN (?, ?, ?)
        `;
        debugger;
        const result = await mariadbHelper.executeQuery(sql, [productId, suitTypeId, fabricId]);
        const totalAmount = result[0]?.totalAmount || 0;

        // Generate order number using utility function
        const orderNumber = await generateSalesOrderNumber();

        return res.status(200).json({
            orderNumber,
            totalAmount
        });
    } catch (error: any) {
        logger.error("Order number generation failed:", error);
        return res.status(500).json({ 
            error: error.message || "Internal Server Error" 
        });
    }
}
