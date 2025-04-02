import { PaymentStatus, ShippingMethod } from "../enum";

export class OrderEntity {
    id!: number;
    customerId: number;
    measurementId: number;
    salesOrderNumber: string;
    sequence: number;
    createdAt: Date;
    note: string;
    totalAmount: number;

    // Shipping information
    country: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    shippingMethod: ShippingMethod;
    differentAddress: boolean;

    // Payment information
    paymentStatus: PaymentStatus;
    stripeId: string;

    // Language and currency information
    lang: string;
    currencyCode: string;
    currencyRate: number;

    constructor(
        customerId: number,
        productId: number,
        measurementId: number,
        salesOrderNumber: string,
        sequence: number,
        createdAt: Date,
        note: string,
        totalAmount: number,
        country: string,
        city: string,
        state: string,
        zipCode: string,
        phone: string,
        shippingMethod: ShippingMethod,
        differentAddress: boolean,
        paymentStatus: PaymentStatus,
        stripeId: string,
        lang: string,
        currencyCode: string,
        currencyRate: number
    ) {
        this.customerId = customerId;
        this.measurementId = measurementId;
        this.salesOrderNumber = salesOrderNumber;
        this.sequence = sequence;
        this.createdAt = createdAt;
        this.note = note;
        this.totalAmount = totalAmount;
        this.country = country;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.phone = phone;
        this.shippingMethod = shippingMethod;
        this.differentAddress = differentAddress;
        this.paymentStatus = paymentStatus;
        this.stripeId = stripeId;
        this.lang = lang;
        this.currencyCode = currencyCode;
        this.currencyRate = currencyRate;
    }
}
