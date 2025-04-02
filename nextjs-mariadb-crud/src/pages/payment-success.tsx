import { useRouter } from "next/router";
import { Button } from "react-bootstrap";

export default function PaymentSuccess() {
    const router = useRouter();

    return (
        <div className="container mt-5 text-center">
            <h1 className="mb-4">Payment Successful!</h1>
            <p className="mb-4">Thank you for your order. We will process it shortly.</p>
            <Button
                variant="primary"
                onClick={() => router.push("/")}
            >
                Return to Home
            </Button>
        </div>
    );
} 