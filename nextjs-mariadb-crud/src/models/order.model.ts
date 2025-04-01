import { ShippingMethod, SuitStyle, SuitType } from "./enum";
import { ShirtMeasurementType, TrouserMeasurementType } from "./product.model";

export interface OrderCustomer {
    FirstName: string;
    LastName: string;
    Email: string;
    CompanyName?: string;
}

export interface OrderDetails {
    Id: number;
    OrderId: number;
    ProductId: number;
    Price: number;
    Quantity: number;
    SuitType: SuitType;
    TrouserId?: number;
    TailoredFit?: SuitStyle;
    FabricId?: number;
    LiningId?: number;
    ButtonId?: number;
}

type S3ImageModel = {
    Name: string;
    S3Url: string;
};

export interface OrderMeasurements {
    MeasurementType: string;
    Unit: string;
    ShirtMeasurements: ShirtMeasurementType;
    TrouserMeasurements: TrouserMeasurementType;
    // Each measurement image should have a name and a S3 Url.
    MeasurementImages: Array<S3ImageModel>;
}

export interface OrderShipping {
    Country: string;
    City: string;
    state: string;
    zipCode: string;
    phone: string;
    shippingMethod: ShippingMethod;
    differentAddress: boolean;
}

export interface OrderPayment {
    currencyCode: string;
}
