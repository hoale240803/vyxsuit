import { GroupedProduct, Product } from "@/models/product.model";

export const Group = (products: Product[]) : GroupedProduct[] =>{
    return products.reduce((acc: GroupedProduct[], product: Product) => {
        const existingGroup = acc.find(
            (group) => group.Name === product.Name &&
                group.Description === product.Description
        );

        if (existingGroup) {
            existingGroup.Images.push({ S3Url: product.S3Url, Code: product.Code });
        } else {
            acc.push({
                Name: product.Name,
                Description: product.Description,
                Price: 0,
                Main: product,
                Images: [{ S3Url: product.S3Url, Code: product.Code }]
            });
        }

        return acc;
    }, []);
}