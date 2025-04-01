import { OrderRepository } from "@/repositories/order.repository";

export async function getNextOrderCode(
    orderRepo: OrderRepository
): Promise<string> {
    // Get current year and month in last two-digit of year and two-digit month format.
    const now = new Date();
    const year = now.getFullYear().toString().slice(-2);
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const prefix = `Vyx-${year}${month}`;

    const maxSequence = await orderRepo.getSequenceAsync();

    const newSeq = maxSequence + 1;
    const paddedSeq = newSeq.toString().padStart(5, "0");

    return `${prefix}${paddedSeq}`;
}
