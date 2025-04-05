import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import logger from "@/utils/logger";

// Initialize Stripe
const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type CheckoutProps = {
    clientSecret?: string;
    amount: number;
}


// Payment form component
function PaymentForm({ amount }: CheckoutProps) {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/payment-success`,
            },
        });

        if (error) {
            logger.error("Payment failed:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button type="submit" className="p-3 w-100 bg-primary-color border-0 accent-color fs-5" disabled={!stripe}>
                Pay ${amount}
            </button>
        </form>
    );
}

// Main component
export default function Checkout( { clientSecret, amount } : CheckoutProps ) {

    if (!clientSecret) {
        return <div>Error: Could not initialize payment</div>;
    }

    return (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm amount={amount} />
        </Elements>
    );
} 