import type { NextApiRequest, NextApiResponse } from "next";
import {
    createCustomerRepository,
    createMeasurementRepository,
    createOrderDetailsRepository,
    createOrderRepository,
    createProductRepository,
} from "@/shared/di/container";
import { OrderRequest } from "@/models/request/request.model";
import {
    CustomerMapper,
    MeasurementMapper,
    OrderMapper,
    ShirtMeasurementMapper,
    TrouserMeasurementMapper,
} from "@/models/mapper/mapper";
import { OrderDetailsEntity } from "@/models/entities/order-details.entity";
import { SuitTypeEnum } from "@/models/enum";
import { ProductInfo } from "@/models/product.model";
import { EmailTemplateHelper } from "@/utils/email-template-helper";
import { GmailProvider } from "@/services/notifications/GmailProvider";
import { verifyCaptcha } from "@/utils/captcha";

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
        const payload = req.body as OrderRequest;

        // Verify CAPTCHA.
        if (!payload.captchaToken) {
            return res.status(400).json({ error: "Captcha token is missing" });
        }
        const captchaValid = await verifyCaptcha(payload.captchaToken);
        if (!captchaValid) {
            return res.status(400).json({ error: "Invalid captcha" });
        }

        // todo: 1. query product table, get list product(id, name, price) by suitId, suiTypeId, trouserId, jacketId, fabridId, liningId, buttonId to
        // todo: 2. save customer
        // todo: 3. save measurement and return measurementId
        // todo: 3.1 attach measurementId and save shirtMeasurement
        // todo: 3.2 attach measurementId and save trouserMeasurement
        // todo: 3.3 attach measurementId and save list measurementImage
        // todo: 4. save order and return orderId
        // todo: 5. save order details for each product (suitId, suiTypeId, trouserId, jacketId, fabridId, liningId, buttonId)
        debugger;
        const productRepo = createProductRepository();
        var productIds = [
            payload.orderDetails.suitId,
            payload.orderDetails.suitTypeId,
            payload.orderDetails.trouserId,
            payload.orderDetails.jacketId,
            payload.orderDetails.fabricId,
            payload.orderDetails.liningId,
            payload.orderDetails.buttonId,
        ];
        // 2. Save Customer & get customerId.
        const customerRepo = createCustomerRepository();
        const customerMapper = new CustomerMapper();
        const customerId = await customerRepo.createCustomerAsync(
            customerMapper.toEntity(payload.customer)
        );
        // 3. Save Measurement & get measurementId.
        const measurementRepo = createMeasurementRepository();
        const measurementMapper = new MeasurementMapper();
        const measurementEntity = measurementMapper.toEntity(
            payload.measurements
        );
        const measurementId = await measurementRepo.createMeasurementAsync(
            measurementEntity
        );

        // 3.1 Save Shirt Measurement (attach measurementId)
        const shirtMeasurementMapper = new ShirtMeasurementMapper();
        const shirtMeasurementEntity = shirtMeasurementMapper.toEntity(
            payload.measurements.shirtMeasurements
        );
        shirtMeasurementEntity.measurementId = measurementId;
        await measurementRepo.createShirtMeasurementAsync(
            shirtMeasurementEntity
        );

        // 3.2 Save Trouser Measurement (attach measurementId)
        const trouserMeasurementMapper = new TrouserMeasurementMapper();
        const trouserMeasurementEntity = trouserMeasurementMapper.toEntity(
            payload.measurements.trouserMeasurements
        );
        trouserMeasurementEntity.measurementId = measurementId;
        await measurementRepo.createTrouserMeasurementAsync(
            trouserMeasurementEntity
        );

        // 3.3 Save List of Measurement Images (attach measurementId)
        // (Assumes payload.measurements.measurementImages is an array)
        if (Array.isArray(payload.measurements.measurementImages)) {
            const images = payload.measurements.measurementImages.map(
                (img) => ({
                    name: img.name,
                    s3Url: img.imageFile, // In production, upload image and get S3 URL.
                    measurementId,
                })
            );
            await measurementRepo.createMeasurementImageAsync(images);
        }

        // 4. Save Order & get orderId.
        const orderRepo = createOrderRepository();
        const orderMapper = new OrderMapper();
        const orderEntity = orderMapper.toEntity(payload);
        orderEntity.customerId = customerId;
        orderEntity.measurementId = measurementId;
        // (You can use the productInfo to calculate pricing, update order.totalAmount, etc.)
        const products = await productRepo.getProductInfoAsync(productIds);
        debugger;
        const totalAmount = calculateTotal(products);
        const nextSequence = (await orderRepo.getSequenceAsync()) + 1;
        orderEntity.totalAmount = totalAmount;
        orderEntity.sequence = nextSequence;
        debugger;
        const orderId = await orderRepo.createOrder(orderEntity);

        // 5. Save Order Details for each product.
        const orderDetailsRepo = createOrderDetailsRepository();
        const orderDetailsList: OrderDetailsEntity[] = products.map(
            (product) =>
                ({
                    productId: product.id,
                    price: product.price,
                    quantity: 1,
                    orderId: orderId, // Attach the orderId for each order detail.
                    suitType: mapSuitTypeFromProductName(product.name),
                    tailoredFit: payload.orderDetails.tailoredFit,
                } as OrderDetailsEntity)
        );

        debugger;
        // TODO: n+1 problem
        for (const orderDetails of orderDetailsList) {
            await orderDetailsRepo.createOrderDetailsAsync(orderDetails);
        }

        // Generate email HTML using the template service.
        const orderHtml: string =
            EmailTemplateHelper.generateOrderConfirmationTemplate(
                payload,
                totalAmount,
                products
            );
        debugger;
        // Send a notification email to the tailor.
        const gmail = new GmailProvider();
        await gmail.sendEmail({
            to: process.env.ORDER_EMAIL || "hoa@yopmail.com",
            subject: `New Order Received - Order #${payload.salesOrderNumber}`,
            html: orderHtml,
        });

        return res.status(200).json({ success: true, orderId });
    } catch (error: any) {
        console.error("Order creation failed:", error);
        return res
            .status(500)
            .json({ error: error.message || "Internal Server Error" });
    }
}

export function mapSuitTypeFromProductName(productName?: string) {
    if (productName) {
        const lower = productName.toLowerCase();
        if (lower.includes("three") || lower.includes("3")) {
            return SuitTypeEnum.ThreePieceSuit;
        }
    }
    debugger;
    return SuitTypeEnum.TwoPieceSuit;
}

function calculateTotal(products: ProductInfo[]): number {
    if (!products || products.length === 0) {
        return 0;
    }
    const total = products.reduce(
        (total, product) => total + (Number(product.price) || 0),
        0
    );
    debugger;
    return total;
}
