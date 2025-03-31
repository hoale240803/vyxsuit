export type Product = {
    Id: number;
    Name: string;
    Description: string;
    S3Url: string;
    ProductType: string;
    Code: string;
    Price: number;
};

export type GroupedProduct = {
    Name: string;
    Description: string;
    Price: number;
    Main: Product;
    Images: { S3Url: string; Code: string }[];
};

export type SuitType = '' | '2Piece' | '3Piece';
export type TrouserType = '' | 'SideLoopStyleWith2Plates' | 'DoubleButtonDoublePlated' | 'DoubleButtonPlateLessDisconnectedSideLoop' | 'PlateLessStandardSingleButton';
export type SuitStyle = '' | 'ConfortFit' | 'SlimFit';
export type Fabric = '' | string;