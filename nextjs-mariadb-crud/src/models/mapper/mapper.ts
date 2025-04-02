import { log } from "console";
import { CustomerEntity } from "../entities/customer.entity";
import { MeasurementEntity } from "../entities/measurement.entity";
import { OrderEntity } from "../entities/order.entity";
import { ShirtMeasurementEntity } from "../entities/shirt-measurement.entity";
import { TrouserMeasurementEntity } from "../entities/trouser-measurement.entity";
import {
    CustomerRequest,
    MeasurementRequest,
    OrderRequest,
    ShirtMeasurementRequest,
    TrouserMeasurementRequest,
} from "../request/request.model";

export interface AbstractMapper<TSource, TDestination> {
    toEntity(source: TSource): TDestination;
    toDTO(entity: TDestination): TSource;
}

export class CustomerMapper
    implements AbstractMapper<CustomerRequest, CustomerEntity>
{
    toEntity(source: CustomerRequest) {
        return new CustomerEntity(
            source.firstName,
            source.lastName,
            source.email,
            source.companyName
        );
    }

    toDTO(entity: CustomerEntity) {
        return {
            firstName: entity.firstName,
            lastName: entity.lastName,
            email: entity.email,
            companyName: entity.companyName,
        };
    }
}

export class MeasurementMapper
    implements AbstractMapper<MeasurementRequest, MeasurementEntity>
{
    toDTO(entity: MeasurementEntity): MeasurementRequest {
        throw new Error("Method not implemented.");
    }
    toEntity(source: MeasurementRequest): MeasurementEntity {
        return {
            id: source.id,
            unit: source.unit,
        };
    }
}

export class ShirtMeasurementMapper
    implements AbstractMapper<ShirtMeasurementRequest, ShirtMeasurementEntity>
{
    toEntity(source: ShirtMeasurementRequest): ShirtMeasurementEntity {
        return {
            abdomen: source.abdomen,
            armBicepWidth: source.armBicepWidth,
            armLength: source.armLength,
            armShoulderJoint: source.armShoulderJoint,
            chest: source.chest,
            jacketWidth: source.jacketWidth,
            bellyTummy: source.bellyTummy,
            neck: source.neck,
            hips: source.hips,
            shoulder: source.shoulder,
            measurementId: source.measurementId,
            measurementType: source.measurementType,
        };
    }

    toDTO(entity: ShirtMeasurementEntity): ShirtMeasurementRequest {
        return {
            id: 0,
            abdomen: entity.abdomen,
            armBicepWidth: entity.armBicepWidth,
            armLength: entity.armLength,
            armShoulderJoint: entity.armShoulderJoint,
            chest: entity.chest,
            jacketWidth: entity.jacketWidth,
            bellyTummy: entity.bellyTummy,
            neck: entity.neck,
            hips: entity.hips,
            shoulder: entity.shoulder,
            measurementId: entity.measurementId,
            measurementType: entity.measurementType,
        };
    }
}

export class TrouserMeasurementMapper
    implements
        AbstractMapper<TrouserMeasurementRequest, TrouserMeasurementEntity>
{
    toEntity(source: TrouserMeasurementRequest): TrouserMeasurementEntity {
        return {
            calf: source.calf,
            thigh: source.thigh,
            waist: source.waist,
            hipsCrotch: source.hipsCrotch,
            measurementId: source.measurementId,
            outswarm: source.outswarm,
            upperHips: source.upperHips,
            measurementType: source.measurementType,
        };
    }

    toDTO(entity: TrouserMeasurementEntity): TrouserMeasurementRequest {
        return {
            id: 0,
            calf: entity.calf,
            thigh: entity.thigh,
            waist: entity.waist,
            hipsCrotch: entity.hipsCrotch,
            measurementId: entity.measurementId,
            outswarm: entity.outswarm,
            upperHips: entity.upperHips,
            measurementType: entity.measurementType,
        };
    }
}

export class OrderMapper implements AbstractMapper<OrderRequest, OrderEntity> {
    toDTO(entity: OrderEntity): OrderRequest {
        throw new Error("Method not implemented.");
    }
    toEntity(source: OrderRequest): OrderEntity {
        log("source", source);
        return {
            note: source.shippingInfo.note,
            city: source.shippingInfo.city,
            phone: source.shippingInfo.phone,
            state: source.shippingInfo.state,
            country: source.shippingInfo.country,
            zipCode: source.shippingInfo.zipCode,
            differentAddress: source.shippingInfo.differentAddress,

            currencyCode: source.payment.currencyCode,
            currencyRate: source.payment.currencyRate,

            lang: source.lang,
            paymentStatus: "none",
            salesOrderNumber: source.salesOrderNumber,
            shippingMethod: source.shippingInfo.shippingMethod,
        } as OrderEntity;
    }
}
