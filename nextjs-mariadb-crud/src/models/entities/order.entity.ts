import { PaymentStatus, ShippingMethod } from "../enum";

export class OrderEntity {
    ProductId: number;
    MeasurementId: number;
    SalesOrderNumber: string;
    SequenceNumber: number;
    CreatedAt: Date;
    Note: string;
    TotalAmout: number;

    // Shipping information
    Country: string;
    City: string;
    State: string;
    ZipCode: string;
    Phone: string;
    ShippingMethod: ShippingMethod;
    DifferentAddress: boolean;

    // Payment information
    PaymentStatus: PaymentStatus;
    StripeId: string;

    // Language and currency information
    Lang: string;
    CurrencyCode: string;
    CurrencyRate: number;

    constructor(
        productId: number,
        measurementId: number,
        salesOrderNumber: string,
        sequenceNumber: number,
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
        this.ProductId = productId;
        this.MeasurementId = measurementId;
        this.SalesOrderNumber = salesOrderNumber;
        this.SequenceNumber = sequenceNumber;
        this.CreatedAt = createdAt;
        this.Note = note;
        this.TotalAmout = totalAmount;
        this.Country = country;
        this.City = city;
        this.State = state;
        this.ZipCode = zipCode;
        this.Phone = phone;
        this.ShippingMethod = shippingMethod;
        this.DifferentAddress = differentAddress;
        this.PaymentStatus = paymentStatus;
        this.StripeId = stripeId;
        this.Lang = lang;
        this.CurrencyCode = currencyCode;
        this.CurrencyRate = currencyRate;
    }
}
