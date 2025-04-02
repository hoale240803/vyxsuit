export class TrouserMeasurementEntity {
    measurementId: number;
    waist: number;
    upperHips: number;
    hipCrotch: number;
    outswarm: number;
    thigh: number;
    calf: number;

    constructor(
        measurementId: number,
        waist: number,
        upperHips: number,
        hipCrotch: number,
        outswarm: number,
        thigh: number,
        calf: number
    ) {
        this.measurementId = measurementId;
        this.waist = waist;
        this.upperHips = upperHips;
        this.hipCrotch = hipCrotch;
        this.outswarm = outswarm;
        this.thigh = thigh;
        this.calf = calf;
    }
}
