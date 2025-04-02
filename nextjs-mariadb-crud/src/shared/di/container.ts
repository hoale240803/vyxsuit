import { CustomerRepository } from "@/repositories/customer.repository";
import { MeasurementRepository } from "@/repositories/measurement.Repository";
import {
    OrderDetailRepository,
    OrderRepository,
} from "@/repositories/order.repository";
import { ProductRepository } from "@/repositories/product.repository";

// Factory function for OrderRepository
export const createOrderRepository = () => new OrderRepository();
export const createCustomerRepository = () => new CustomerRepository();
export const createMeasurementRepository = () => new MeasurementRepository();
export const createProductRepository = () => new ProductRepository();
export const createOrderDetailsRepository = () => new OrderDetailRepository();
