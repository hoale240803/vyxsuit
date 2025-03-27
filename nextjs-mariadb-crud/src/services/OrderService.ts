import { OrderRepository } from '../repositories/OrderRepository';
import { OrderDetails } from '../types/OrderTypes';
import { OrderMapper } from '../mappers/OrderMapper';

const orderRepository = new OrderRepository();

/**
 * Get complete order details for email notifications
 */
export async function getOrderDetails(orderId: number): Promise<OrderDetails | null> {
  try {
    // Get order with joined customer info
    const order = await orderRepository.findOrderById(orderId);
    if (!order) return null;

    // Get order details
    const orderDetail = await orderRepository.findOrderDetailsByOrderId(orderId);
    if (!orderDetail) return null;

    // Get measurements
    const shirtMeasurement = await orderRepository.findShirtMeasurement(order.MeasurementId);
    // Use type assertion to convert null values to undefined where needed
    const trouserMeasurement = await orderRepository.findTrouserMeasurement(order.MeasurementId);

    // Get products
    const designSuit = await orderRepository.findProductById(orderDetail.ProductId);
    const fabric = await orderRepository.findProductById(orderDetail.FabricId || 0);
    
    if (!designSuit || !fabric) {
      throw new Error('Missing required product information');
    }

    // Get optional products
    let trouser = null;
    if (orderDetail.TrouserId) {
      trouser = await orderRepository.findProductById(orderDetail.TrouserId);
    }

    let lining = null;
    if (orderDetail.LiningId) {
      lining = await orderRepository.findProductById(orderDetail.LiningId);
    }

    let button = null;
    if (orderDetail.ButtonId) {
      button = await orderRepository.findProductById(orderDetail.ButtonId);
    }

    // Use the mapper to create the DTO
    return OrderMapper.toOrderDetails(
      order,
      orderDetail,
      designSuit,
      fabric,
      shirtMeasurement,
      trouserMeasurement,
      trouser,
      lining,
      button
    );
    
  } catch (error) {
    console.error('Error fetching order details:', error);
    return null;
  }
}

/**
 * Get complete order details for email notifications using a single optimized query
 * This reduces database round-trips for better performance when sending emails
 */
export async function getOrderDetailsOptimized(orderId: number): Promise<OrderDetails | null> {
  try {
    // Execute a single optimized query to fetch all related data
    const results = await orderRepository.getOrderDetailsOptimized(orderId);

    if (!results || results.length === 0) {
      return null;
    }

    const row = results[0];
    
    // Extract and map order info
    const order = {
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
      // Additional customer fields from JOIN
      FirstName: row.FirstName,
      LastName: row.LastName,
      Email: row.Email,
      CompanyName: row.CompanyName
    };

    // Extract and map order detail
    const orderDetail = {
      Id: row.OrderDetailId,
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

    // Extract and map design suit
    const designSuit = row.DesignSuitId ? {
      Id: row.DesignSuitId,
      Name: row.DesignSuitName,
      Description: row.DesignSuitDescription,
      S3Url: row.DesignSuitS3Url,
      ProductType: row.DesignSuitProductType,
      Code: row.DesignSuitCode,
      Price: row.DesignSuitPrice
    } : null;

    // Extract and map fabric
    const fabric = row.FabricId ? {
      Id: row.FabricId,
      Name: row.FabricName,
      Description: row.FabricDescription,
      S3Url: row.FabricS3Url,
      ProductType: row.FabricProductType,
      Code: row.FabricCode,
      Price: row.FabricPrice
    } : null;

    // Extract and map trouser
    const trouser = row.TrouserId ? {
      Id: row.TrouserId,
      Name: row.TrouserName,
      Description: row.TrouserDescription,
      S3Url: row.TrouserS3Url,
      ProductType: row.TrouserProductType,
      Code: row.TrouserCode,
      Price: row.TrouserPrice
    } : null;

    // Extract and map lining
    const lining = row.LiningId ? {
      Id: row.LiningId,
      Name: row.LiningName,
      Description: row.LiningDescription,
      S3Url: row.LiningS3Url,
      ProductType: row.LiningProductType,
      Code: row.LiningCode,
      Price: row.LiningPrice
    } : null;

    // Extract and map button
    const button = row.ButtonId ? {
      Id: row.ButtonId,
      Name: row.ButtonName,
      Description: row.ButtonDescription,
      S3Url: row.ButtonS3Url,
      ProductType: row.ButtonProductType,
      Code: row.ButtonCode,
      Price: row.ButtonPrice
    } : null;

    // Extract and map shirt measurement
    const shirtMeasurement = row.ShirtMeasurementId ? {
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
    } : null;

    // Extract and map trouser measurement
    const trouserMeasurement = row.TrouserMeasurementId ? {
      Id: row.TrouserMeasurementId,
      MeasurementId: row.MeasurementId,
      Waist: row.Waist,
      UpperHips: row.UpperHips,
      HipsCrotch: row.HipsCrotch,
      Outswarm: row.Outswarm,
      Thigh: row.Thigh,
      Calf: row.Calf
    } : null;

    // For validation
    if (!designSuit || !fabric) {
      throw new Error('Missing required product information');
    }

    // Use the mapper to create the DTO with proper typing
    return OrderMapper.toOrderDetails(
      order,
      orderDetail,
      designSuit,
      fabric,
      shirtMeasurement,
      trouserMeasurement,
      trouser,
      lining,
      button
    );
    
  } catch (error) {
    console.error('Error fetching optimized order details:', error);
    
    // If optimized query fails, fall back to the original method
    console.log('Falling back to standard order details fetch method');
    return getOrderDetails(orderId);
  }
}