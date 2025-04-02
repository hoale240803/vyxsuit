import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/config/stripe";
import { createOrderRepository } from "@/shared/di/container";
import { buffer } from "micro";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Disable body parsing, we need the raw body for Stripe
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res
            .status(405)
            .json({ error: `Method ${req.method} not allowed` });
    }

    const sig = req.headers["stripe-signature"];

    if (!sig || !endpointSecret) {
        return res
            .status(400)
            .json({ error: "Missing stripe signature or webhook secret" });
    }

    let event;
    let buf;

    try {
        // Get the raw body as a buffer
        buf = await buffer(req);
        event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
    } catch (err: any) {
        console.error("Webhook signature verification failed:", err.message);
        return res.status(400).json({ error: `Webhook Error: ${err.message}` });
    }

    debugger;
    // Handle the event
    switch (event.type) {
        case "payment_intent.succeeded":
        case "payment_intent.created":
            const paymentIntent = event.data.object;
            const orderRepo = createOrderRepository();

            debugger;
            try {
                // Update order status in your database
                await orderRepo.updateOrderStatusAsync(
                    parseInt(paymentIntent.metadata.productId), // todo: change orderId
                    "success"
                );

                return res.status(200).json({ received: true });
            } catch (error) {
                console.error("Error updating order status:", error);
                return res
                    .status(500)
                    .json({ error: "Failed to update order status" });
            }

        case "payment_intent.payment_failed":
            const failedPayment = event.data.object;
            const failedOrderRepo = createOrderRepository();

            try {
                await failedOrderRepo.updateOrderStatusAsync(
                    parseInt(failedPayment.metadata.orderId),
                    "failed"
                );

                return res.status(200).json({ received: true });
            } catch (error) {
                console.error("Error updating failed order status:", error);
                return res
                    .status(500)
                    .json({ error: "Failed to update order status" });
            }

        case "payment_intent.processing":
            // Payment is being processed
            return res.status(200).json({ received: true });

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    return res.status(200).json({ received: true });
}
