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
        return await mariadbHelper.insert("shirtmeasurement", entity);
    }

    async createTrouserMeasurementAsync(
        entity: TrouserMeasurementEntity
    ): Promise<number> {
        return await mariadbHelper.insert("trousermeasurement", entity);
    }

    async createMeasurementImageAsync(entities: MeasurementImageEntity[]) {
        entities.forEach((img) => {
            mariadbHelper.insert("measurementimage", {
                name: img.name,
                s3Url: img.s3Url,
                measurementId: img.measurementId,
            });
        });
    }

    async createMeasurementAsync(entity: MeasurementEntity): Promise<number> {
        return await mariadbHelper.insert("measurement", entity);
    }
}
