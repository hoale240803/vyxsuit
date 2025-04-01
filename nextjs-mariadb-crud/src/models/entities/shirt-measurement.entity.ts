export class ShirtMeasurementEntity {
    MeasurementId: number;
    Chest: number;
    Shoulder: number;
    ArmLength: number;
    ArmShoulderJoint: number;
    ArmBicepWidth: number;
    JacketWidth: number;
    Abdomen: number;
    BellyTummy: number;
    Hips: number;
    Neck: number;

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
        this.MeasurementId = measurementId;
        this.Chest = chest;
        this.Shoulder = shoulder;
        this.ArmLength = armLength;
        this.ArmShoulderJoint = armShoulderPoint;
        this.ArmBicepWidth = armBiceWidth;
        this.JacketWidth = jacketWidth;
        this.Abdomen = abdomen;
        this.BellyTummy = bellyTummy;
        this.Hips = hips;
        this.Neck = neck;
    }
}
