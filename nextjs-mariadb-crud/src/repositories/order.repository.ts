import mariadbHelper from "@/lib/mariadb.ado";
import { OrderEntity } from "@/models/entities/order.entity";
import { OrderDetailsEntity } from "@/models/entities/order-details.entity";

export class OrderRepository implements IOrderRepository {
    /**
     * Creates an order record.
     * Expects the OrderPayload extended with customerId and measurementId.
     */
    async createOrder(entity: OrderEntity): Promise<number> {
        const params = [
            entity.customerId,
            entity.measurementId,
            entity.salesOrderNumber,
            entity.sequence,
            entity.createdAt,
            entity.note,
            entity.totalAmout,

            entity.country,
            entity.city,
            entity.state,
            entity.zipCode,
            entity.phone,
            entity.shippingMethod,
            entity.differentAddress,
            entity.paymentStatus,
            entity.stripeId,
            entity.lang,
            entity.currencyCode,
            entity.currencyRate,
        ];

        const c: any = await mariadbHelper.insert("order", params);

        return c.insertId;
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
        const result: any = await mariadbHelper.executeQueryWithAny(
            sql,
            params
        );
        return result[0]?.total || 0;
    }
}

export class OrderDetailsRepository implements IOrderDetailsRepository {
    async createOrderDetailsAsync(entity: OrderDetailsEntity): Promise<void> {
        // Define the parameters in the order matching your table schema.
        const params = [
            entity.orderId,
            entity.productId,
            entity.price,
            entity.quantity,
            entity.suitType,
            entity.tailoredFit,
        ];

        // Use the existing insert helper.
        const result: any = await mariadbHelper.insert("orderdetail", params);
        return result.insertId;
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
}

export interface IOrderDetailsRepository {
    /**
     * Creates an order detail record.
     */

    createOrderDetailsAsync(detailData: OrderDetailsEntity): Promise<void>;
}
