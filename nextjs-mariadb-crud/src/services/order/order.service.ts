import { GmailProvider } from "@/services/notifications/GmailProvider";
import { OrderRequest } from "@/models/request/request.model";
import { EmailTemplateHelper } from "@/utils/email-template-helper";
import { OrderRepository } from "@/repositories/order.repository";

export class OrderService {
    constructor(private orderRepo: OrderRepository) {}
    async createOrder(
        payload: OrderRequest
    ): Promise<{ orderId: string; orderHtml: string }> {
        // const totalAmount = await this.orderRepo.calculateTotalAmount(
        //     payload.OrderDetails.SuitId,
        //     payload.OrderDetails.FabricId,
        //     payload.OrderDetails.SuitTypeId
        // );

        // Save the order to the database (this is a placeholder, replace with actual DB logic).
        await this.orderRepo.createOrder(payload);

        // // Generate email HTML using the template service.
        // const orderHtml: string =
        //     EmailTemplateHelper.generateOrderConfirmationTemplate(payload);
        // // Send a notification email to the tailor.
        // const gmail = new GmailProvider();
        // await gmail.sendEmail({
        //     to: process.env.TAILOR_EMAIL || "tailor@yopmail.com",
        //     subject: `New Order Received - Order #${payload.SalesOrderNumber}`,
        //     html: orderHtml,
        // });

        return {
            orderId: payload.salesOrderNumber.toString(),
            orderHtml: "orderHtml",
        };
    }
}
