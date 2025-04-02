import type { NextApiRequest, NextApiResponse } from "next";
import { createOrderRepository } from "@/shared/di/container";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res
            .status(405)
            .json({ error: `Method ${req.method} not allowed` });
    }

    try {
        const orderRepo = createOrderRepository();
        const nextSequence = (await orderRepo.getSequenceAsync()) + 1;
        debugger
        // Get current date
        const now = new Date();
        const year = now.getFullYear().toString().slice(-2); // Get last 2 digits of year
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Get month with leading zero
        
        // Format sequence number with leading zeros
        const sequenceStr = nextSequence.toString().padStart(5, '0');
        
        // Generate order number in format: VYX-year_month_00001
        const orderNumber = `VYX-${year}${month}${sequenceStr}`;

        return res.status(200).json({ 
            success: true, 
            orderNumber,
            sequence: nextSequence 
        });
    } catch (error: any) {
        console.error("Order number generation failed:", error);
        return res
            .status(500)
            .json({ error: error.message || "Internal Server Error" });
    }
} 