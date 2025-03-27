import { OrderRow } from "./DatabaseEntities";

export enum ShippingMethodType {
  Standard = 'Standard',
  Express = 'Express'
}

export enum SuitType {
  TwoPiece = '2piece',
  ThreePiece = '3piece'
}

export enum TailoredFitType {
  SlimFit = 'SlimFit',
  ComfortFit = 'ComfortFit'
}

export enum MeasurementUnitType {
  Centimeter = 'Cm',
  Inch = 'Inch'
}

export interface Customer {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  CompanyName?: string;
}

export interface Order {
  OrderId: number;
  CustomerId: number;
  MeasurementId: number;
  SalesOrderNumber: string;
  CreatedAt: string;
  TotalAmount: number;
  Country: string;
  City: string;
  State: string;
  ZipCode: string;
  Phone: string;
  ShippingMethod: ShippingMethodType;
  Note?: string;
  CurrencyCode: string;
  MeasurementUnit: MeasurementUnitType;
}

export interface OrderDetail {
  Id: number;
  OrderId: number;
  ProductId: number;
  Price: number;
  Quantity: number;
  SuitType?: SuitType;
  TrouserId?: number;
  TailoredFit?: TailoredFitType;
  FabricId?: number;
  LiningId?: number;
  ButtonId?: number;
}

export interface Product {
  Id: number;
  Name: string;
  Description?: string;
  S3Url?: string;
  ProductType: string;
  Code?: string;
  Price: number;
}

export interface ShirtMeasurement {
  Id: number;
  MeasurementId: number;
  Chest?: number;
  Shoulder?: number;
  ArmLength?: number;
  ArmShoulderJoint?: number;
  ArmBicepWidth?: number;
  JacketWidth?: number;
  Abdomen?: number;
  BellyTummy?: number;
  Hips?: number;
  Neck?: number;
}

export interface TrouserMeasurement {
  Id: number;
  MeasurementId: number;
  Waist?: number;
  UpperHips?: number;
  HipsCrotch?: number;
  Outswarm?: number;
  Thigh?: number;
  Calf?: number;
}

export interface OrderDetails {
  customer: Customer;
  order: Order;
  orderDetail: OrderDetail;
  designSuit: Product;
  suitType: SuitType;
  trouser?: Product;
  fabric: Product;
  lining?: Product;
  button?: Product;
  shirtMeasurement: ShirtMeasurement;
  trouserMeasurement: TrouserMeasurement;
  shippingInfo: {
    country: string;
    state: string;
    city: string;
    zipCode: string;
    phone: string;
  };
}

export interface OrderJoinRow extends OrderRow {
  FirstName: string;
  LastName: string;
  Email: string;
  CompanyName: string | null;
  MeasurementUnit: MeasurementUnitType;
}