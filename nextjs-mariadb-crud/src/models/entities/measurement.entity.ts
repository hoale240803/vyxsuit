import { MeasurementType, MeasurementUnit } from "../enum";

export class MeasurementEntity {
    id!: number;
    measurementType: MeasurementType;
    unit: MeasurementUnit;

    constructor(measurementType: MeasurementType, unit: MeasurementUnit) {
        this.measurementType = measurementType;
        this.unit = unit;
    }
}
