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