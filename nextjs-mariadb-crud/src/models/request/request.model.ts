import { MeasurementType, MeasurementUnit, SuitStyleEnum } from "../enum";

export type MeasurementRequest = {
    id: number;
    measurementType: MeasurementType;
    unit: MeasurementUnit;
    shirtMeasurements: ShirtMeasurementRequest;
    trouserMeasurements: TrouserMeasurementRequest;
    measurementImages: MeasurementImageRequest[];
};

export interface MeasurementImageRequest {
    name: string;
    imageFile: string; // Base64 encoded image in the request
}

export interface OrderDetailsRequest {
    createdAt: Date;
    suitId: number;
    suitTypeId: number;
    trouserId: number;
    tailoredFit: SuitStyleEnum;
    jacketId: number;
    fabricId: number;
    liningId: number;
    buttonId: number;
    orderedDate: string;
}

export interface ShippingInfoRequest {
    note: string;
    country: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    shippingMethod: string;
    differentAddress: boolean;
}

export interface OrderRequest {
    captchaToken: string;
    salesOrderNumber: string;
    customer: CustomerRequest;
    orderDetails: OrderDetailsRequest;
    measurements: MeasurementRequest;
    shippingInfo: ShippingInfoRequest;
    payment: {
        currencyCode: string;
        currencyRate: number;
    };
    lang: string;
}

export interface CustomerRequest {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
}

export interface ShirtMeasurementRequest {
    id: number;
    measurementId: number;
    chest: number;
    shoulder: number;
    armLength: number;
    armShoulderJoint: number;
    armBicepWidth: number;
    jacketWidth: number;
    abdomen: number;
    bellyTummy: number;
    hips: number;
    neck: number;
    measurementType: MeasurementType;
}

export interface TrouserMeasurementRequest {
    id: number;
    measurementId: number;
    waist: number;
    upperHips: number;
    hips: number;
    hipsCrotch: number;
    outswarm: number;
    thigh: number;
    calf: number;
    measurementType: MeasurementType;
}

export interface MeasurementImageRequest {
    id: number;
    name: string;
    s3Url: string;
    measurementId: number;
}

// export interface OrderRequest {
//     orderId: number;
//     customerId: number;
//     measurementId: number;
//     salesOrderNumber: string;
//     sequence: number;
//     createdAt: Date;
//     note: string;
//     totalAmount: number;

//     // Shipping Information
//     country: string;
//     city: string;
//     state: string;
//     zipCode: string;
//     phone: string;
//     shippingMethod: ShippingMethod;
//     differentAddress: boolean;

//     // Payment Information
//     paymentStatus: PaymentStatus;
//     stripeId: string;

//     // Localization
//     lang: string;
//     currencyCode: string;
//     currencyRate: number;
// }
