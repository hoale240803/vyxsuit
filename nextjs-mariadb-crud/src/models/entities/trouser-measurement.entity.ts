import { MeasurementType } from "../enum";

export class TrouserMeasurementEntity {
    measurementId: number;
    waist: number;
    upperHips: number;
    hipsCrotch: number;
    outswarm: number;
    thigh: number;
    calf: number;
    measurementType: MeasurementType;

    constructor(
        measurementId: number,
        waist: number,
        upperHips: number,
        hipCrotch: number,
        outswarm: number,
        thigh: number,
        calf: number,
        measurementType: MeasurementType
    ) {
        this.measurementId = measurementId;
        this.waist = waist;
        this.upperHips = upperHips;
        this.hipsCrotch = hipCrotch;
        this.outswarm = outswarm;
        this.thigh = thigh;
        this.calf = calf;
        this.measurementType = measurementType;
    }
}
