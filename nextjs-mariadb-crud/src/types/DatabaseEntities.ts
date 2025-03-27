import { QueryResult } from '../lib/db';
import { ShippingMethodType, SuitType, TailoredFitType } from './OrderTypes';

// Define interfaces for database rows
export interface CustomerRow extends QueryResult {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  CompanyName: string | null;
}

export interface OrderRow extends QueryResult {
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
  Note: string | null;
  CurrencyCode: string;
  Unit?: string; // Aliased as MeasurementUnit in joins
}

export interface OrderDetailRow extends QueryResult {
  Id: number;
  OrderId: number;
  ProductId: number;
  Price: number;
  Quantity: number;
  SuitType: SuitType;
  TrouserId: number | null;
  TailoredFit: TailoredFitType;
  FabricId: number | null;
  LiningId: number | null;
  ButtonId: number | null;
}

export interface ProductRow extends QueryResult {
  Id: number;
  Name: string;
  Description: string | null;
  S3Url: string | null;
  ProductType: string;
  Code: string | null;
  Price: number;
}

export interface ShirtMeasurementRow extends QueryResult {
  Id: number;
  MeasurementId: number;
  Chest: number | null;
  Shoulder: number | null;
  ArmLength: number | null;
  ArmShoulderJoint: number | null;
  ArmBicepWidth: number | null;
  JacketWidth: number | null;
  Abdomen: number | null;
  BellyTummy: number | null;
  Hips: number | null;
  Neck: number | null;
}

export interface TrouserMeasurementRow extends QueryResult {
  Id: number;
  MeasurementId: number;
  Waist: number | null;
  UpperHips: number | null;
  HipsCrotch: number | null;
  Outswarm: number | null;
  Thigh: number | null;
  Calf: number | null;
}