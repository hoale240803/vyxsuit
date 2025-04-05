import {
  GroupedProduct,
  MeasurementType,
  Product,
  UnitMeasurementType,
} from "@/models/product.model";
import Compressor from "compressorjs";
import { v4 as uuidv4 } from 'uuid';

export const buildGroup = (products: Product[]): GroupedProduct[] => {
  return products.reduce((acc: GroupedProduct[], product: Product) => {
    const existingGroup = acc.find(
      (group) =>
        group.Name === product.Name && group.Description === product.Description
    );

    if (existingGroup) {
      existingGroup.Images.push({
        Id: product.Id,
        S3Url: product.S3Url,
        Code: product.Code,
      });
    } else {
      const main = products.find(
        (prod) =>
          prod.IsPrimary &&
          prod.Name === product.Name &&
          prod.Description === product.Description
      );
      acc.push({
        Id: product.Id,
        Name: product.Name,
        Description: product.Description,
        Price: 0,
        Main: main || product,
        Images: [{ Id: product.Id, S3Url: product.S3Url, Code: product.Code }],
      });
    }

    return acc;
  }, []);
};

export const buildFabric = (
  source: string
): {
  group: string;
  fabric: { id: number; code: string; index: number; image: string };
} => {
  if (!source)
    return {
      group: "",
      fabric: { id: 0, code: "", index: 0, image: "" },
    };
  const arr = source.split(":;");
  return {
    group: arr[2],
    fabric: {
      id: Number(arr[0]),
      code: arr[0],
      index: Number(arr[1]),
      image: arr[3],
    },
  };
};

export const buildLining = (
  source: string
): { code: string; index: number; image: string } => {
  if (!source) return { code: "", index: 0, image: "" };

  const arr = source.split(":;");
  return { code: arr[0], index: Number(arr[1]), image: arr[2] };
};

export const calculateMeasurementByUnit = (
  measurementSource: MeasurementType,
  unit: UnitMeasurementType
): MeasurementType => {
  let measurementClone = JSON.parse(JSON.stringify(measurementSource));
  console.log("measurementClone", measurementClone, unit);
  Object.keys(measurementClone.Shirt).forEach((item) => {
    measurementClone.Shirt[item] = Math.round(
      convertMeasurementByUnit(unit, measurementClone.Shirt[item])
    );
  });

  Object.keys(measurementSource.Trouser).forEach((item) => {
    measurementClone.Trouser[item] = Math.round(
      convertMeasurementByUnit(unit, measurementClone.Trouser[item])
    );
  });

  measurementClone.Unit = unit;

  return measurementClone;
};

export const convertMeasurementByUnit = (
  unit: UnitMeasurementType,
  source: number
) => {
  const CM_TO_INCH = 0.393701;
  const INCH_TO_CM = 2.54;
  const factor = unit === "Cm" ? INCH_TO_CM : CM_TO_INCH;

  return source * factor;
};

export function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...args), delay);
  };
}

export function compressAndConvertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.6, // Adjust quality
      maxWidth: 800,
      maxHeight: 800,
      success(compressedFile) {
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

export function base64ToFile(base64: string, extension = 'png'): File {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || `image/${extension}`;
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  const filename = `${uuidv4()}.${extension}`;

  return new File([u8arr], filename, { type: mime });
}

