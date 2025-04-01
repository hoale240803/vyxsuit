export class MeasurementImageEntity {
    Name: string;
    S3Url: string;
    MeasurementId: number;

    constructor(name: string, s3Url: string, measurementId: number) {
        this.Name = name;
        this.S3Url = s3Url;
        this.MeasurementId = measurementId;
    }
}
