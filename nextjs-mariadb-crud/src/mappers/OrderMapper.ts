import { 
  Customer, 
  Order, 
  OrderDetail, 
  OrderDetails,
  Product,
  ShirtMeasurement,
  TrouserMeasurement,
  SuitType,
  ShippingMethodType,
  MeasurementUnitType,
  TailoredFitType
} from '../types/OrderTypes';

import { 
  OrderJoinRow, 
  OrderDetailRow,
  ProductRow,
  ShirtMeasurementRow
} from '../repositories/OrderRepository';
import { TrouserMeasurementRow } from '@/types/DatabaseEntities';

/**
 * Maps database entities to application DTOs
 */
export class OrderMapper {
  
  /**
   * Map order join row to customer DTO
   */
  static toCustomer(order: OrderJoinRow): Customer {
    return {
      Id: order.CustomerId,
      FirstName: order.FirstName,
      LastName: order.LastName,
      Email: order.Email,
      CompanyName: order.CompanyName ?? undefined
    };
  }

  /**
   * Map order join row to order DTO
   */
  static toOrder(order: OrderJoinRow): Order {
    return {
      OrderId: order.OrderId,
      CustomerId: order.CustomerId,
      MeasurementId: order.MeasurementId,
      SalesOrderNumber: order.SalesOrderNumber,
      CreatedAt: order.CreatedAt,
      TotalAmount: order.TotalAmount,
      Country: order.Country,
      City: order.City,
      State: order.State,
      ZipCode: order.ZipCode,
      Phone: order.Phone,
      ShippingMethod: this.parseEnum(
        order.ShippingMethod, 
        ShippingMethodType, 
        ShippingMethodType.Standard
      ),
      Note: order.Note ?? undefined,
      CurrencyCode: order.CurrencyCode,
      MeasurementUnit: this.parseEnum(
        order.MeasurementUnit, 
        MeasurementUnitType, 
        MeasurementUnitType.Centimeter
      )
    };
  }

  /**
   * Map order detail row to order detail DTO
   */
  static toOrderDetail(detail: OrderDetailRow): OrderDetail {
    return {
      Id: detail.Id,
      OrderId: detail.OrderId,
      ProductId: detail.ProductId,
      Price: detail.Price,
      Quantity: detail.Quantity,
      SuitType: detail.SuitType ? 
        this.parseEnum(detail.SuitType, SuitType, SuitType.TwoPiece) : 
        undefined,
      TrouserId: detail.TrouserId ?? undefined,
      TailoredFit: detail.TailoredFit ? 
        this.parseEnum(detail.TailoredFit, TailoredFitType, TailoredFitType.ComfortFit) : 
        undefined,
      FabricId: detail.FabricId ?? undefined,
      LiningId: detail.LiningId ?? undefined,
      ButtonId: detail.ButtonId ?? undefined
    };
  }

  /**
   * Map product row to product DTO
   */
  static toProduct(product: ProductRow): Product {
    return {
      Id: product.Id,
      Name: product.Name,
      Description: product.Description ?? undefined,
      S3Url: product.S3Url ?? undefined,
      ProductType: product.ProductType,
      Code: product.Code ?? undefined,
      Price: product.Price
    };
  }

  /**
   * Map shirt measurement row to shirt measurement DTO
   */
  static toShirtMeasurement(measurement: ShirtMeasurementRow | null): ShirtMeasurement {
    if (!measurement) return {} as ShirtMeasurement;
    
    return {
      Id: measurement.Id,
      MeasurementId: measurement.MeasurementId,
      Chest: measurement.Chest ?? undefined,
      Shoulder: measurement.Shoulder ?? undefined,
      ArmLength: measurement.ArmLength ?? undefined,
      ArmShoulderJoint: measurement.ArmShoulderJoint ?? undefined,
      ArmBicepWidth: measurement.ArmBicepWidth ?? undefined,
      JacketWidth: measurement.JacketWidth ?? undefined,
      Abdomen: measurement.Abdomen ?? undefined,
      BellyTummy: measurement.BellyTummy ?? undefined,
      Hips: measurement.Hips ?? undefined,
      Neck: measurement.Neck ?? undefined
    };
  }

  /**
   * Map trouser measurement row to trouser measurement DTO
   */
  static toTrouserMeasurement(measurement: TrouserMeasurementRow | null): TrouserMeasurement {
    if (!measurement) return {} as TrouserMeasurement;
    
    return {
      Id: measurement.Id,
      MeasurementId: measurement.MeasurementId,
      Waist: measurement.Waist ?? undefined,
      UpperHips: measurement.UpperHips ?? undefined,
      HipsCrotch: measurement.HipsCrotch ?? undefined,
      Outswarm: measurement.Outswarm ?? undefined,
      Thigh: measurement.Thigh ?? undefined,
      Calf: measurement.Calf ?? undefined
    };
  }

  /**
   * Map shipping info from order
   */
  static toShippingInfo(order: OrderJoinRow) {
    return {
      country: order.Country,
      state: order.State,
      city: order.City,
      zipCode: order.ZipCode,
      phone: order.Phone
    };
  }

  /**
   * Map all order-related data to a complete OrderDetails DTO
   */
  static toOrderDetails(
    order: OrderJoinRow,
    orderDetail: OrderDetailRow,
    designSuit: ProductRow,
    fabric: ProductRow,
    shirtMeasurement: ShirtMeasurementRow | null,
    trouserMeasurement: TrouserMeasurementRow | null,
    trouser: ProductRow | null = null,
    lining: ProductRow | null = null,
    button: ProductRow | null = null
  ): OrderDetails {
    return {
      customer: this.toCustomer(order),
      order: this.toOrder(order),
      orderDetail: this.toOrderDetail(orderDetail),
      designSuit: this.toProduct(designSuit),
      suitType: orderDetail.SuitType ? 
        this.parseEnum(orderDetail.SuitType, SuitType, SuitType.TwoPiece) : 
        SuitType.TwoPiece,
      trouser: trouser ? this.toProduct(trouser) : undefined,
      fabric: this.toProduct(fabric),
      lining: lining ? this.toProduct(lining) : undefined,
      button: button ? this.toProduct(button) : undefined,
      shirtMeasurement: this.toShirtMeasurement(shirtMeasurement),
      trouserMeasurement: this.toTrouserMeasurement(trouserMeasurement),
      shippingInfo: this.toShippingInfo(order)
    };
  }

  /**
   * Map a flattened query result row to a complete OrderDetails DTO
   * This is used for the optimized single-query approach
   */
  static fromJoinQueryRow(row: OrderDetailRow): OrderDetails {
    // First, construct the OrderJoinRow structure
    const orderJoinRow: OrderJoinRow = {
      OrderId: row.OrderId,
      CustomerId: row.CustomerId,
      MeasurementId: row.MeasurementId,
      SalesOrderNumber: row.SalesOrderNumber,
      CreatedAt: row.CreatedAt,
      TotalAmount: row.TotalAmount,
      Country: row.Country,
      City: row.City,
      State: row.State,
      ZipCode: row.ZipCode,
      Phone: row.Phone,
      ShippingMethod: row.ShippingMethod,
      Note: row.Note,
      CurrencyCode: row.CurrencyCode,
      MeasurementUnit: row.MeasurementUnit,
      FirstName: row.FirstName,
      LastName: row.LastName,
      Email: row.Email,
      CompanyName: row.CompanyName
    };

    // Construct OrderDetailRow
    const orderDetailRow: OrderDetailRow = {
      Id: row.,
      OrderId: row.OrderId,
      ProductId: row.ProductId,
      Price: row.Price,
      Quantity: row.Quantity,
      SuitType: row.SuitType,
      TrouserId: row.TrouserId,
      TailoredFit: row.TailoredFit,
      FabricId: row.FabricId,
      LiningId: row.LiningId,
      ButtonId: row.ButtonId
    };

    // Map products
    const designSuit: ProductRow = {
      Id: row.DesignSuitId,
      Name: row.DesignSuitName,
      Description: row.DesignSuitDescription,
      S3Url: row.DesignSuitS3Url,
      ProductType: row.DesignSuitProductType,
      Code: row.DesignSuitCode,
      Price: row.DesignSuitPrice
    };

    const fabric: ProductRow = {
      Id: row.FabricId,
      Name: row.FabricName,
      Description: row.FabricDescription,
      S3Url: row.FabricS3Url,
      ProductType: row.FabricProductType,
      Code: row.FabricCode,
      Price: row.FabricPrice
    };

    // Optional products
    let trouser: ProductRow | null = null;
    if (row.TrouserId) {
      trouser = {
        Id: row.TrouserId,
        Name: row.TrouserName,
        Description: row.TrouserDescription,
        S3Url: row.TrouserS3Url,
        ProductType: row.TrouserProductType,
        Code: row.TrouserCode,
        Price: row.TrouserPrice
      };
    }

    let lining: ProductRow | null = null;
    if (row.LiningId) {
      lining = {
        Id: row.LiningId,
        Name: row.LiningName,
        Description: row.LiningDescription,
        S3Url: row.LiningS3Url,
        ProductType: row.LiningProductType,
        Code: row.LiningCode,
        Price: row.LiningPrice
      };
    }

    let button: ProductRow | null = null;
    if (row.ButtonId) {
      button = {
        Id: row.ButtonId,
        Name: row.ButtonName,
        Description: row.ButtonDescription,
        S3Url: row.ButtonS3Url,
        ProductType: row.ButtonProductType,
        Code: row.ButtonCode,
        Price: row.ButtonPrice
      };
    }

    // Map measurements
    let shirtMeasurement: ShirtMeasurementRow | null = null;
    if (row.ShirtMeasurementId) {
      shirtMeasurement = {
        Id: row.ShirtMeasurementId,
        MeasurementId: row.MeasurementId,
        Chest: row.Chest,
        Shoulder: row.Shoulder,
        ArmLength: row.ArmLength,
        ArmShoulderJoint: row.ArmShoulderJoint,
        ArmBicepWidth: row.ArmBicepWidth,
        JacketWidth: row.JacketWidth,
        Abdomen: row.Abdomen,
        BellyTummy: row.BellyTummy,
        Hips: row.Hips,
        Neck: row.Neck
      };
    }

    let trouserMeasurement: TrouserMeasurementRow | null = null;
    if (row.TrouserMeasurementId) {
      trouserMeasurement = {
        Id: row.TrouserMeasurementId,
        MeasurementId: row.MeasurementId,
        Waist: row.Waist,
        UpperHips: row.UpperHips,
        HipsCrotch: row.HipsCrotch,
        Outswarm: row.Outswarm,
        Thigh: row.Thigh,
        Calf: row.Calf
      };
    }

    // Use our existing mapping method to convert to the final DTO
    return this.toOrderDetails(
      orderJoinRow,
      orderDetailRow,
      designSuit,
      fabric,
      shirtMeasurement,
      trouserMeasurement,
      trouser,
      lining,
      button
    );
  }

  /**
   * Helper method to safely parse enum values
   */
  private static parseEnum<T extends Record<string, string>>(
    value: string | null | undefined, 
    enumType: T, 
    defaultValue: T[keyof T]
  ): T[keyof T] {
    if (!value) return defaultValue;
    
    const enumValues = Object.values(enumType);
    return enumValues.includes(value as T[keyof T]) 
      ? value as T[keyof T] 
      : defaultValue;
  }
}