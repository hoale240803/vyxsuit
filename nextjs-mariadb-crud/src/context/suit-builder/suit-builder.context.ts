import { GroupedProduct, ImageMeasurementType, MeasurementType, Product, ShirtMeasurementType, SuitStyle, SuitType, TrouserMeasurementType, UnitMeasurementType } from '@/models/product.model';
import { CustomerRequest, ShippingInfoRequest } from '@/models/request/request.model';
import { createContext } from 'react';

export const SuitBuilderDefault = {
  Term: {
    orderPolicyAgreement: false,
    privacyPolicy: false
  },
  Product: {
    Id: 0,
    Name: '',
    Description: '',
    S3Url: '',
    ProductType: '',
    Code: '',
    Price: 0,
    IsPrimary: false
  },
  ProductSelection: {
    group: undefined,
    selected: {
      data: {
        Id: 0,
        Name: '',
        Description: '',
        S3Url: '',
        ProductType: '',
        Code: '',
        Price: 0,
        IsPrimary: false
      },
      index: -1
    }
  },
  Measurement: {
    Shirt: {
      Chest: 0,
      Shoulder: 0,
      ArmLength: 0,
      ArmShoulderJoint: 0,
      ArmBicepWidth: 0,
      JacketLength: 0,
      Abdomen: 0,
      Belly: 0,
      Hips: 0,
      Neck: 0,
    },
    Trouser: {
      Waist: 0,
      UpperHips: 0,
      Hips: 0,
      Crotch: 0,
      Outswam: 0,
      Thigh: 0,
      Calf: 0,
    },
    Images: [],
    Unit: 'cm'
  },
  Customer: {
    firstName: '',
    lastName: '',
    email: '',
    companyName: ''
  },
  Shipping: {
    note: '',
    country: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    shippingMethod: 'Standard',
    differentAddress: false
  }
}

export type ProductSeletection = {
  group: Product | undefined;
  selected: {
    data: Product;
    index: number;
  };
}

export type StepBuilderVerify = {
  orderPolicyAgreement: boolean;
  privacyPolicy: boolean;
}

// Define the type for the context value
export interface SuitBuilderContextType {
  termAccepted: StepBuilderVerify,
  acceptTern: (term: StepBuilderVerify) => void;
  product: Product;
  selectProduct: (option: Product) => void;
  suitType: SuitType;
  selectSuitType: (option: SuitType) => void;
  trouser: Product;
  selectTrouser: (option: Product) => void;
  suitStyle: SuitStyle;
  selectSuitStyle: (option: SuitStyle) => void;
  fabric: ProductSeletection;
  selectFabric: (option: ProductSeletection) => void;
  lining: ProductSeletection,
  selectLining: (option: ProductSeletection) => void;
  button: ProductSeletection,
  selectButton: (option: ProductSeletection) => void;
  measurement: MeasurementType
  selectUnitOfMeasurement: (option: UnitMeasurementType) => void;
  updateShirtMeasurement: (option: ShirtMeasurementType) => void;
  updateTrouserMeasurement: (option: TrouserMeasurementType) => void;
  pushImageMeasurement: (option: ImageMeasurementType | ImageMeasurementType[]) => void;
  deleteImageMeasurement: (index: number) => void;

  customer: CustomerRequest;
  selectCustomer: (guest: CustomerRequest) => void;
  shipping: ShippingInfoRequest;
  selectShippingInfo: (guest: ShippingInfoRequest) => void;

  clear: () => void;
}

export const suitBuilderContextDefaultValue: SuitBuilderContextType = {
  termAccepted: {
    orderPolicyAgreement: false,
    privacyPolicy: false
  },
  acceptTern: () => {},
  // Initialize the product and selectProduct to an empty object
  product: SuitBuilderDefault.Product,
  selectProduct: () => {},
  suitType: '',
  selectSuitType: () => {},
  trouser: SuitBuilderDefault.Product,
  selectTrouser: () => {},
  suitStyle: '',
  selectSuitStyle: () => {},
  fabric: SuitBuilderDefault.ProductSelection,
  selectFabric: () => {},
  lining: SuitBuilderDefault.ProductSelection,
  selectLining: () => {},
  button: SuitBuilderDefault.ProductSelection,
  selectButton: () => {},
  measurement: {} as MeasurementType,
  selectUnitOfMeasurement: () => {},
  updateShirtMeasurement: () => {},
  updateTrouserMeasurement: () => {},
  pushImageMeasurement: () => {},
  deleteImageMeasurement: () => {},

  customer: {} as CustomerRequest,
  selectCustomer: () => {},
  shipping: {} as ShippingInfoRequest,
  selectShippingInfo: () => {},

  // Clear the context values
  clear: () => {},
};

// Create a context with a default value (null)
export const SuitBuilderContext = createContext<SuitBuilderContextType>(suitBuilderContextDefaultValue);
