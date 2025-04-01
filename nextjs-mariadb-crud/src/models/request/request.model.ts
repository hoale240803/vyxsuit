import { CustomerEntity } from "../entities/customer.entity";

export type MeasurementRequest = {
    measurementType: string;
    unit: string;
    shirtMeasurements: { [key: string]: number };
    trouserMeasurements: { [key: string]: number };
    measurementImages: MeasurementImageRequest;
};

export interface MeasurementImageRequest {
    name: string;
    imageFile: string; // Base64 encoded image in the request
}

export type OrderDetailsRequest = {
    suitId: number;
    suitTypeId: number;
    trouserId: number;
    tailoredFit: string;
    jacketId: number;
    fabricId: number;
    liningId: number;
    buttonId: number;
    orderedDate: string;
};

export type ShippingInfoRequest = {
    country: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    shippingMethod: string;
    differentAddress: boolean;
};

export type OrderRequest = {
    captchaToken: string;
    salesOrderNumber: string;
    customer: CustomerEntity;
    orderDetails: OrderDetailsRequest;
    measurements: MeasurementRequest;
    shippingInfo: ShippingInfoRequest;
    payment: {
        currencyCode: string;
        currencyRate: string;
    };
    lang: string;
};
