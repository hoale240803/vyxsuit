export type Product = {
    Id: number;
    Name: string;
    Description: string;
    S3Url: string;
    ProductType: string;
    Code: string;
    Price: number;
    IsPrimary?: boolean;
};

export type GroupedProduct = {
    Name: string;
    Description: string;
    Price: number;
    Main: Product;
    Images: { S3Url: string; Code: string }[];
};

export type Fabric = "" | string;
export type LiningType = "" | string;
export type Buttontype = "" | string;
export type ShirtMeasurementType = {
    BellyTummy: string;
    JacketWidth: string;
    Chest: number;
    Shoulder: number;
    ArmLength: number;
    ArmShoulderJoint: number;
    ArmBicepWidth: number;
    JacketLength: number;
    Abdomen: number;
    Hips: number;
    Neck: number;
};
export type TrouserMeasurementType = {
    HipsCrotch: string;
    Waist: number;
    UpperHips: number;
    Hips: number;
    Crotch: number;
    Outswam: number;
    Thigh: number;
    Calf: number;
};
export type ImageMeasurementType = "" | string;
export type MeasurementType = {
    Shirt: ShirtMeasurementType;
    Trouser: TrouserMeasurementType;
    Images: ImageMeasurementType[];
};

export interface ProductTranslation {
    Id: number;
    ProductId: number;
    Language: string;
    TranslatedName: string;
}
