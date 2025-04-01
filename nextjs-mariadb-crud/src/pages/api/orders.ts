import { verifyCaptcha } from "@/utils/captcha";
import type { NextApiRequest, NextApiResponse } from "next";
import { createOrderService } from "@/shared/di/container";
import { OrderRequest } from "@/models/request/request.model";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res
            .status(405)
            .json({ error: `Method ${req.method} not allowed` });
    }

    try {
        const payload = req.body as OrderRequest;

        // Verify CAPTCHA.
        // if (!payload.CaptchaToken) {
        //     return res.status(400).json({ error: "Captcha token is missing" });
        // }
        // const captchaValid = await verifyCaptcha(payload.CaptchaToken);
        // if (!captchaValid) {
        //     return res.status(400).json({ error: "Invalid captcha" });
        // }

        // Delegate order service
        debugger;
        const orderService = createOrderService();
        const { orderId } = await orderService.createOrder(payload);

        return res.status(200).json({ success: true, orderId });
    } catch (error: any) {
        console.error("Order creation failed:", error);
        return res
            .status(500)
            .json({ error: error.message || "Internal Server Error" });
    }
}
