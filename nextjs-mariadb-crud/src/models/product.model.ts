import { ProductType } from "./enum";

export type Product = {
    Id: number;
    Name: string;
    Description: string;
    S3Url: string;
    ProductType: string;
    Code: string;
    Price: number;
    IsPrimary: boolean;
};

export type GroupedProduct = {
    Id: number;
    Name: string;
    Description: string;
    Price: number;
    Main: Product;
    Images: { Id: number; S3Url: string; Code: string }[];
};

export type SuitType = "" | "2Piece" | "3Piece";
export type TrouserType =
    | ""
    | "SideLoopStyleWith2Plates"
    | "DoubleButtonDoublePlated"
    | "DoubleButtonPlateLessDisconnectedSideLoop"
    | "PlateLessStandardSingleButton";
export type SuitStyle = "" | "ConfortFit" | "SlimFit";
export type Fabric = "" | string;
export type LiningType = "" | string;
export type Buttontype = "" | string;
export type ShirtMeasurementType = {
    Chest: number;
    Shoulder: number;
    ArmLength: number;
    ArmShoulderJoint: number;
    ArmBicepWidth: number;
    JacketLength: number;
    Abdomen: number;
    Belly: number;
    Hips: number;
    Neck: number;
};
export type TrouserMeasurementType = {
    Waist: number;
    UpperHips: number;
    Hips: number;
    Crotch: number;
    Outswam: number;
    Thigh: number;
    Calf: number;
};
export type ImageMeasurementType = "" | string;
export type UnitMeasurementType = "cm" | "inch";
export type MeasurementType = {
    Shirt: ShirtMeasurementType;
    Trouser: TrouserMeasurementType;
    Images: ImageMeasurementType[];
    Unit: UnitMeasurementType;
};
export interface ProductInfo {
    id: number;
    name: string;
    productType: ProductType;
    price: number;
    code: string;
    s3url: string;
}
