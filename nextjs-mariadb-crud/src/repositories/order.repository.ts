import { execute } from "@/lib/mariadb.ado";
import { OrderRequest } from "@/models/request/request.model";
import { createCustomerRepository } from "@/shared/di/container";

export class OrderRepository implements IOrderRepository {
    /**
     * Creates an order record.
     * Expects the OrderPayload extended with customerId and measurementId.
     */
    async createOrder(
        orderData: OrderRequest
    ): Promise<{ orderId: number; salesOrderNumber: string }> {
        // const seq = await this.getSequenceAsync();
        // const salesOrderNumber = seq.toString();

        // todo: save customer return customerId

        // todo: save measurement return measurementId

        // todo: save shirtMeasurement and return shirtMeasurmentId

        // todo: save trouserMeasuremetn and return trouserMeasurementId

        // todo: save order return orderId
        debugger;
        var customerRepo = createCustomerRepository();
        const customerId = await customerRepo.createCustomerAsync(
            orderData.customer
        );
        // const measurementId = await this.measurementRepo.createMeasurement(
        //     orderData.Measurements,
        //     customerId
        // );

        const insertSql = `
            INSERT INTO Orders
                (CustomerId, MeasurementId, SalesOrderNumber, Note, TotalAmount, Country, City, State, ZipCode, Phone, ShippingMethod, DifferentAddress, PaymentStatus, StripeId, Lang, CurrencyCode, CurrencyRate)
            VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
        // Use object destructuring (this is the only mapping; contained entirely in the repository)
        // const { customerId, measurementId } = orderData;
        // const params = [customerId, measurementId] as (string | number)[];
        // const result: any = await execute(insertSql, params);

        return { orderId: 1, salesOrderNumber: "1" };
    }

    async getSequenceAsync(): Promise<number> {
        const sql = `
            SELECT Sequence 
            FROM Orders 
            ORDER BY Sequence DESC
            LIMIT 1`;
        const result: any = await execute(sql);
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
        const result: any = await execute(sql, params);
        return result[0]?.total || 0;
    }
}

export class OrderDetailRepository implements IOrderDetailRepository {
    /**
     * Creates an order detail record.
     */
    async createOrderDetail(detailData: {
        orderId: number;
        productId: number;
        price: number;
        quantity: number;
        suitType: "TwoPieceSuit" | "ThreePieceSuit";
        trouserId: number;
        tailoredFit: "SlimFit" | "ComfortFit";
        fabricId: number;
        liningId: number;
        buttonId: number;
    }): Promise<number> {
        const insertSql = `
      INSERT INTO OrderDetail
        (OrderId, ProductId, Price, Quantity, SuitType, TrouserId, TailoredFit, FabricId, LiningId, ButtonId)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
        const {
            orderId,
            productId,
            price,
            quantity,
            suitType,
            trouserId,
            tailoredFit,
            fabricId,
            liningId,
            buttonId,
        } = detailData;
        const params = [
            orderId,
            productId,
            price,
            quantity,
            suitType,
            trouserId,
            tailoredFit,
            fabricId,
            liningId,
            buttonId,
        ] as (string | number)[];
        const result: any = await execute(insertSql, params);
        return result.insertId;
    }
}

export interface IOrderRepository {
    /**
     * Creates an order record.
     * Expects the OrderPayload extended with customerId and measurementId.
     */
    createOrder(
        orderData: OrderRequest & { customerId: number; measurementId: number }
    ): Promise<{ orderId: number; salesOrderNumber: string }>;

    /**
     * Retrieves the current maximum sequence number for orders.
     */
    getSequenceAsync(): Promise<number>;
}

export interface IOrderDetailRepository {
    /**
     * Creates an order detail record.
     */
    /// {
    //     orderId: number;
    //     productId: number;
    //     price: number;
    //     quantity: number;
    //     suitType: "TwoPieceSuit" | "ThreePieceSuit";
    //     trouserId: number;
    //     tailoredFit: "SlimFit" | "ComfortFit";
    //     fabricId: number;
    //     liningId: number;
    //     buttonId: number;
    // }
    // createOrderDetail(detailData: OrderEnttiy): Promise<number>;
}
