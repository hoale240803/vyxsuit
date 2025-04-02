import mariadbHelper from "@/lib/mariadb.ado";
import { MeasurementImageEntity } from "@/models/entities/measurement-image.entity";
import { MeasurementEntity } from "@/models/entities/measurement.entity";
import { ShirtMeasurementEntity } from "@/models/entities/shirt-measurement.entity";
import { TrouserMeasurementEntity } from "@/models/entities/trouser-measurement.entity";

export interface IMeasurementRepository {
    createMeasurementAsync(entity: MeasurementEntity): Promise<number>;
    createShirtMeasurementAsync(
        entity: ShirtMeasurementEntity
    ): Promise<number>;
    createTrouserMeasurementAsync(
        entity: TrouserMeasurementEntity
    ): Promise<number>;
    createMeasurementImageAsync(
        entity: MeasurementImageEntity[]
    ): Promise<void>;
}

export class MeasurementRepository implements IMeasurementRepository {
    async createShirtMeasurementAsync(
        entity: ShirtMeasurementEntity
    ): Promise<number> {
        const params = [
            entity.abdomen,
            entity.armBicepWidth,
            entity.armLength,
            entity.armShoulderJoint,
            entity.bellyTummy,
            entity.chest,
            entity.hips,
            entity.jacketWidth,
            entity.measurementId,
            entity.neck,
            entity.shoulder,
        ];
        const m: any = await mariadbHelper.insert("shirtmeasurement", params);

        return m.insertId;
    }

    async createTrouserMeasurementAsync(
        entity: TrouserMeasurementEntity
    ): Promise<number> {
        const params = [
            entity.calf,
            entity.hipCrotch,
            entity.measurementId,
            entity.outswarm,
            entity.thigh,
            entity.waist,
        ];
        const m: any = await mariadbHelper.insert("trousermeasurement", params);

        return m.insertId;
    }

    async createMeasurementImageAsync(entities: MeasurementImageEntity[]) {
        // Create an array of promises, each inserting one measurement image.
        const insertPromises = entities.map((img) =>
            mariadbHelper.insert("measurement_image", {
                name: img.name,
                s3Url: img.s3Url,
                measurementId: img.measurementId,
            })
        );

        // Wait for all insertions to complete.
        const results = await Promise.all(insertPromises);
    }

    async createMeasurementAsync(entity: MeasurementEntity): Promise<number> {
        const params = [entity.unit, entity.measurementType];
        const m: any = await mariadbHelper.insert("measurement", params);

        return m.insertId;
    }
}
