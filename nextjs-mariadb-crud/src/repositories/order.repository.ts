import mariadbHelper from "@/lib/mariadb.ado";
import { OrderEntity as OrderEntity } from "@/models/entities/order.entity";
import { OrderDetailsEntity as OrderDetailEntity } from "@/models/entities/order-details.entity";
import { PaymentStatus } from "@/models/enum";

export class OrderRepository implements IOrderRepository {
    /**
     * Creates an order record.
     * Expects the OrderPayload extended with customerId and measurementId.
     */
    async createOrder(entity: OrderEntity): Promise<number> {
        return await mariadbHelper.insert("orders", entity);
    }

    async getSequenceAsync(): Promise<number> {
        const sql = `
            SELECT Sequence 
            FROM Orders 
            ORDER BY Sequence DESC
            LIMIT 1`;
        const result: any = await mariadbHelper.executeQuery(sql);
        return result[0]?.Sequence || 0;
    }

    /**
     * Calculate total amount for the order.
     * todo: select from product table, SuitType, FabricId
     */
    async calculateTotalAmount(
        productId: number,
        fabricId: number,
        suitTypeId: number
    ): Promise<number> {
        const sql = `
            SELECT SUM(p.Price) as total
            FROM Product p
            WHERE p.Id IN (?, ?, ?)
        `;
        const params = [productId, fabricId, suitTypeId];
        const result: any = await mariadbHelper.executeQuery(sql, params);
        return result[0]?.total || 0;
    }

    async updateOrderStatusAsync(orderId: number, paymentStatus: PaymentStatus): Promise<void> {
        const sql = `
            UPDATE Orders 
            SET PaymentStatus = ? 
            WHERE OrderId = ?
        `;
        await mariadbHelper.executeQuery(sql, [paymentStatus, orderId]);
    }
}

export class OrderDetailRepository implements IOrderDetailRepository {
    async createOrderDetailsAsync(entity: OrderDetailEntity): Promise<void> {
        await mariadbHelper.insert("orderdetail", entity);
    }
}

export interface IOrderRepository {
    /**
     * Creates an order record.
     * Expects the OrderPayload extended with customerId and measurementId.
     */
    createOrder(orderData: OrderEntity): Promise<number>;

    /**
     * Retrieves the current maximum sequence number for orders.
     */
    getSequenceAsync(): Promise<number>;

    updateOrderStatusAsync(orderId: number, paymentStatus: PaymentStatus): Promise<void>;
}

export interface IOrderDetailRepository {
    /**
     * Creates an order detail record.
     */

    createOrderDetailsAsync(detailData: OrderDetailEntity): Promise<void>;
}
