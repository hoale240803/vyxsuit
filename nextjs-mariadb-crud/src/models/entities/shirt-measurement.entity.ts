export class ShirtMeasurementEntity {
    measurementId: number;
    chest: number;
    shoulder: number;
    armLength: number;
    armShoulderJoint: number;
    armBicepWidth: number;
    jacketWidth: number;
    abdomen: number;
    bellyTummy: number;
    hips: number;
    neck: number;

    constructor(
        measurementId: number,
        chest: number,
        shoulder: number,
        armLength: number,
        armShoulderPoint: number,
        armBiceWidth: number,
        jacketWidth: number,
        abdomen: number,
        bellyTummy: number,
        hips: number,
        neck: number
    ) {
        this.measurementId = measurementId;
        this.chest = chest;
        this.shoulder = shoulder;
        this.armLength = armLength;
        this.armShoulderJoint = armShoulderPoint;
        this.armBicepWidth = armBiceWidth;
        this.jacketWidth = jacketWidth;
        this.abdomen = abdomen;
        this.bellyTummy = bellyTummy;
        this.hips = hips;
        this.neck = neck;
    }
}
