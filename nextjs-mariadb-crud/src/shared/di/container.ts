import { MeasurementImageEntity } from "@/models/entities/measurement-image.entity";
import { ShirtMeasurementEntity } from "@/models/entities/shirt-measurement.entity";
import { CustomerRepository } from "@/repositories/customer.repository";
import { MeasurementRepository } from "@/repositories/measurement.Repository";
import { OrderRepository } from "@/repositories/order.repository";
import { OrderService } from "@/services/order/order.service";

// Factory function for OrderRepository
export const createOrderRepository = () => new OrderRepository();
export const createCustomerRepository = () => new CustomerRepository();
// export const createMeasurementRepository = () => new MeasurementRepository();
// export const createMeasurementRepository = () => new MeasurementRepository();
// export const createMeasurementRepository = () => new MeasurementRepository();
// export const createMeasurementRepository = () =>
//     new MeasurementImageRepository();

// Factory function for OrderService
export const createOrderService = () =>
    new OrderService(createOrderRepository());
