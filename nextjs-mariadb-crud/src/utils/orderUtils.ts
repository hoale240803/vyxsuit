import { createOrderRepository } from "@/shared/di/container";

export async function generateSalesOrderNumber(): Promise<string> {
    const orderRepo = createOrderRepository();
    const nextSequence = (await orderRepo.getSequenceAsync()) + 1;
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const sequenceStr = nextSequence.toString().padStart(5, "0");
    return `VYX-${year}${month}${sequenceStr}`;
} 