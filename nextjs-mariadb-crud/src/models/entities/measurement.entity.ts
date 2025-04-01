import { MeasurementType, MeasurementUnit } from "../enum";

export class MeasurementEntity {
    MeasurementType: MeasurementType;
    Unit: MeasurementUnit;

    constructor(measurementType: MeasurementType, unit: MeasurementUnit) {
        this.MeasurementType = measurementType;
        this.Unit = unit;
    }
}
