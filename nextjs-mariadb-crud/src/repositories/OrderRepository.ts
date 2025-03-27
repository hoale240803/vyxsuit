import { OrderJoinRow } from "@/types/OrderTypes";
import { query } from "../lib/db";
import {
  OrderDetailRow,
  ProductRow,
  ShirtMeasurementRow,
  TrouserMeasurementRow,
} from "../types/DatabaseEntities";



export class OrderRepository {
  /**
   * Find an order by ID with customer and measurement info
   */
  async findOrderById(orderId: number): Promise<OrderJoinRow | null> {
    const orders = await query<OrderJoinRow>(
      `SELECT o.*, c.FirstName, c.LastName, c.Email, c.CompanyName,
       m.Unit as MeasurementUnit
       FROM orders o
       JOIN customer c ON o.CustomerId = c.Id
       JOIN measurement m ON o.MeasurementId = m.Id
       WHERE o.OrderId = ?`,
      [orderId]
    );

    return orders.length > 0 ? orders[0] : null;
  }

  /**
   * Find order details by order ID
   */
  async findOrderDetailsByOrderId(
    orderId: number
  ): Promise<OrderDetailRow | null> {
    const details = await query<OrderDetailRow>(
      `SELECT * FROM orderdetail WHERE OrderId = ?`,
      [orderId]
    );

    return details.length > 0 ? details[0] : null;
  }

  /**
   * Find shirt measurements by measurement ID
   */
  async findShirtMeasurement(
    measurementId: number
  ): Promise<ShirtMeasurementRow | null> {
    const measurements = await query<ShirtMeasurementRow>(
      `SELECT * FROM shirtmeasurement WHERE MeasurementId = ?`,
      [measurementId]
    );

    return measurements.length > 0 ? measurements[0] : null;
  }

  /**
   * Find trouser measurements by measurement ID
   */
  async findTrouserMeasurement(
    measurementId: number
  ): Promise<TrouserMeasurementRow | null> {
    const measurements = await query<TrouserMeasurementRow>(
      `SELECT * FROM trousermeasurement WHERE MeasurementId = ?`,
      [measurementId]
    );

    return measurements.length > 0 ? measurements[0] : null;
  }

  /**
   * Find product by ID
   */
  async findProductById(productId: number): Promise<ProductRow | null> {
    const products = await query<ProductRow>(
      `SELECT * FROM product WHERE Id = ?`,
      [productId]
    );

    return products.length > 0 ? products[0] : null;
  }

  async getOrderDetailsOptimized(
    orderId: number
  ): Promise<OrderDetailRow | null> {
    const orderDetails = await query<OrderDetailRow>(
      `
      SELECT 
        o.*,
        c.Id AS CustomerId, c.FirstName, c.LastName, c.Email, c.CompanyName,
        m.Unit AS MeasurementUnit,
        od.Id AS OrderDetailId, od.ProductId, od.Price, od.Quantity, 
        od.SuitType, od.TrouserId, od.TailoredFit, od.FabricId, od.LiningId, od.ButtonId,
        
        p1.Id AS DesignSuitId, p1.Name AS DesignSuitName, p1.Description AS DesignSuitDescription,
        p1.S3Url AS DesignSuitS3Url, p1.ProductType AS DesignSuitProductType, 
        p1.Code AS DesignSuitCode, p1.Price AS DesignSuitPrice,
        
        p2.Id AS FabricId, p2.Name AS FabricName, p2.Description AS FabricDescription,
        p2.S3Url AS FabricS3Url, p2.ProductType AS FabricProductType, 
        p2.Code AS FabricCode, p2.Price AS FabricPrice,
        
        p3.Id AS TrouserId, p3.Name AS TrouserName, p3.Description AS TrouserDescription,
        p3.S3Url AS TrouserS3Url, p3.ProductType AS TrouserProductType, 
        p3.Code AS TrouserCode, p3.Price AS TrouserPrice,
        
        p4.Id AS LiningId, p4.Name AS LiningName, p4.Description AS LiningDescription,
        p4.S3Url AS LiningS3Url, p4.ProductType AS LiningProductType, 
        p4.Code AS LiningCode, p4.Price AS LiningPrice,
        
        p5.Id AS ButtonId, p5.Name AS ButtonName, p5.Description AS ButtonDescription,
        p5.S3Url AS ButtonS3Url, p5.ProductType AS ButtonProductType, 
        p5.Code AS ButtonCode, p5.Price AS ButtonPrice,
        
        sm.Id AS ShirtMeasurementId, sm.Chest, sm.Shoulder, sm.ArmLength, 
        sm.ArmShoulderJoint, sm.ArmBicepWidth, sm.JacketWidth, sm.Abdomen, 
        sm.BellyTummy, sm.Hips, sm.Neck,
        
        tm.Id AS TrouserMeasurementId, tm.Waist, tm.UpperHips, tm.HipsCrotch, 
        tm.Outswarm, tm.Thigh, tm.Calf
      FROM 
        orders o
      JOIN 
        customer c ON o.CustomerId = c.Id
      JOIN 
        measurement m ON o.MeasurementId = m.Id
      JOIN 
        orderdetail od ON o.OrderId = od.OrderId
      JOIN 
        product p1 ON od.ProductId = p1.Id
      LEFT JOIN 
        product p2 ON od.FabricId = p2.Id
      LEFT JOIN 
        product p3 ON od.TrouserId = p3.Id
      LEFT JOIN 
        product p4 ON od.LiningId = p4.Id
      LEFT JOIN 
        product p5 ON od.ButtonId = p5.Id
      LEFT JOIN 
        shirtmeasurement sm ON o.MeasurementId = sm.MeasurementId
      LEFT JOIN 
        trousermeasurement tm ON o.MeasurementId = tm.MeasurementId
      WHERE 
        o.OrderId = ?
    `,
      [orderId]
    );

    return orderDetails.length > 0 ? orderDetails[0] : null;
  }
}

export type { OrderDetailRow, ProductRow, ShirtMeasurementRow };

  export { OrderJoinRow };
