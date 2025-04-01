import {
    MeasurementUnit,
    MeasurementType,
    ShippingMethod,
    PaymentStatus,
} from "./enum";

export interface Measurement {
    Id: number;
    MeasurementType: MeasurementType;
    Unit: MeasurementUnit;
}

export interface ShirtMeasurement {
    Id: number;
    MeasurementId: number;
    Chest?: number;
    Shoulder?: number;
    ArmLength?: number;
    ArmShoulderJoint?: number;
    ArmBicepWidth?: number;
    JacketWidth?: number;
    Abdomen?: number;
    BellyTummy?: number;
    Hips?: number;
    Neck?: number;
}

export interface TrouserMeasurement {
    Id: number;
    MeasurementId: number;
    Waist?: number;
    UpperHips?: number;
    HipsCrotch?: number;
    Outswarm?: number;
    Thigh?: number;
    Calf?: number;
}

export interface MeasurementImage {
    Id: number;
    Name: string;
    S3Url: string;
    MeasurementId: number;
}

export interface Order {
    OrderId: number;
    CustomerId: number;
    MeasurementId: number;
    SalesOrderNumber: string;
    Sequence?: number;
    CreatedAt: Date;
    Note?: string;
    TotalAmount: number;

    // Shipping Information
    Country?: string;
    City?: string;
    State?: string;
    ZipCode?: string;
    Phone?: string;
    ShippingMethod: ShippingMethod;
    DifferentAddress?: boolean;

    // Payment Information
    PaymentStatus: PaymentStatus;
    StripeId?: string;

    // Localization
    Lang?: string;
    CurrencyCode?: string;
    CurrencyRate?: number;
}
