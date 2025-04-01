export class TrouserMeasurementEntity {
    MeasureMentId: number;
    Waist: number;
    UpperHips: number;
    HipCrotch: number;
    Outswarm: number;
    Thigh: number;
    Calf: number;

    constructor(
        measurementId: number,
        waist: number,
        upperHips: number,
        hipCrotch: number,
        outswarm: number,
        thigh: number,
        calf: number
    ) {
        this.MeasureMentId = measurementId;
        this.Waist = waist;
        this.UpperHips = upperHips;
        this.HipCrotch = hipCrotch;
        this.Outswarm = outswarm;
        this.Thigh = thigh;
        this.Calf = calf;
    }
}
