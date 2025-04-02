import { MeasurementUnit } from "../enum";

export class MeasurementEntity {
    id!: number;
    unit: MeasurementUnit;

    constructor(unit: MeasurementUnit) {
        this.unit = unit;
    }
}
