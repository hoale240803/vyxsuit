import { GroupedProduct, Product } from "@/models/product.model";

export const buildGroup = (products: Product[]): GroupedProduct[] => {
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

export const buildFabric = (
  source: string
): { group: string; fabric: { code: string; index: number, image: string } } => {
  if (!source)
    return {
      group: "",
      fabric: { code: "", index: 0, image: '' },
    };
  const arr = source.split(":;");
  return {
    group: arr[2],
    fabric: {
      code: arr[0],
      index: Number(arr[1]),
      image: arr[3]
    },
  };
};

export const buildLining = (
  source: string
): { code: string; index: number, image: string } => {
  if (!source)
    return { code: "", index: 0, image: '' };

  const arr = source.split(":;");
  return { code: arr[0], index: Number(arr[1]), image: arr[2] };
};