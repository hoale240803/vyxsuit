export type ProductType =
    | "DesignOfSuit"
    | "JacketOnly"
    | "TrouserOnly"
    | "VestCoatOnly"
    | "FabricOptions"
    | "Shirt"
    | "TailoredFit"
    | "Button"
    | "Lining"
    | "SuitType";

export type TrouserType =
    | ""
    | "SideLoopStyleWith2Plates"
    | "DoubleButtonDoublePlated"
    | "DoubleButtonPlateLessDisconnectedSideLoop"
    | "PlateLessStandardSingleButton";

export type SuitStyle = "" | "ConfortFit" | "SlimFit";
export enum SuitStyleEnum {
    ConfortFit,
    SlimFit,
}

export type SuitType = "TwoPieceSuit" | "ThreePieceSuit";
export enum SuitTypeEnum {
    TwoPieceSuit = "TwoPieceSuit",
    ThreePieceSuit = "ThreePieceSuit",
}
export type ShippingMethod = "Standard" | "Express";
export type PaymentStatus = "failed" | "success" | "none";
export type MeasurementType = "Shirt" | "Trouser";
export type MeasurementUnit = "Cm" | "Inch";
