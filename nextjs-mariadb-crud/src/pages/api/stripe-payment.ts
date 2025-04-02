import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/config/stripe";
import { verifyCaptcha } from "@/utils/captcha";
import { createProductRepository } from "@/shared/di/container";

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
        const { productId, suitType, fabricId, captchaToken } = req.body;

        debugger;
        // Verify CAPTCHA
        if (!captchaToken) {
            return res.status(400).json({ error: "Captcha token is missing" });
        }
        const captchaValid = await verifyCaptcha(captchaToken);
        if (!captchaValid) {
            return res.status(400).json({ error: "Invalid captcha" });
        }

        // Get product information
        const productRepo = createProductRepository();
        const productIds = [productId, fabricId];
        const products = await productRepo.getProductInfoAsync(productIds);

        if (!products || products.length === 0) {
            return res.status(400).json({ error: "Products not found" });
        }

        // Calculate total amount
        const totalAmount = products.reduce(
            (total, product) => total + (Number(product.price) || 0),
            0
        );

        // Create Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(totalAmount * 100), // Convert to cents
            currency: "usd",
            metadata: {
                productId,
                suitType,
                fabricId,
            },
        });

        return res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error: any) {
        console.error("Payment initialization failed:", error);
        return res
            .status(500)
            .json({ error: error.message || "Internal Server Error" });
    }
}
