export class MeasurementImageEntity {
    name: string;
    s3Url: string;
    measurementId: number;

    constructor(name: string, s3Url: string, measurementId: number) {
        this.name = name;
        this.s3Url = s3Url;
        this.measurementId = measurementId;
    }
}
