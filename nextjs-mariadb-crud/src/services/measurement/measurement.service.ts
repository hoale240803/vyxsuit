import { execute } from "@/lib/mariadb.ado";

export async function createMeasurement(measurement: {
    measurementType: "Shirt" | "Trouser";
    unit: "Cm" | "Inch";
    shirtMeasurements?: { [key: string]: number };
    trouserMeasurements?: { [key: string]: number };
    // Each image should have a name and a pre-uploaded S3 URL.
    measurementImages: Array<{ name: string; s3Url: string }>;
}): Promise<number> {
    // Insert into Measurement table.
    const insertMeasurementSql = `
      INSERT INTO Measurement (MeasurementType, Unit)
      VALUES (?, ?)
    `;
    const measurementParams = [measurement.measurementType, measurement.unit];
    const measurementResult: any = await execute(
        insertMeasurementSql,
        measurementParams
    );
    const measurementId = measurementResult.insertId;

    // If Shirt measurement, insert into ShirtMeasurement.
    if (
        measurement.measurementType === "Shirt" &&
        measurement.shirtMeasurements
    ) {
        const {
            chest,
            shoulder,
            armLength,
            armShoulderJoint,
            armBicepWidth,
            jacketWidth,
            abdomen,
            bellyTummy,
            hips,
            neck,
        } = measurement.shirtMeasurements;
        const insertShirtSql = `
        INSERT INTO ShirtMeasurement (MeasurementId, Chest, Shoulder, ArmLength, ArmShoulderJoint, ArmBicepWidth, JacketWidth, Abdomen, BellyTummy, Hips, Neck)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
        const shirtParams = [
            measurementId,
            chest || null,
            shoulder || null,
            armLength || null,
            armShoulderJoint || null,
            armBicepWidth || null,
            jacketWidth || null,
            abdomen || null,
            bellyTummy || null,
            hips || null,
            neck || null,
        ];
        await execute(insertShirtSql, shirtParams);
    }

    // If Trouser measurement, insert into TrouserMeasurement.
    if (
        measurement.measurementType === "Trouser" &&
        measurement.trouserMeasurements
    ) {
        const { waist, upperHips, hipsCrotch, outswarm, thigh, calf } =
            measurement.trouserMeasurements;
        const insertTrouserSql = `
        INSERT INTO TrouserMeasurement (MeasurementId, Waist, UpperHips, HipsCrotch, Outswarm, Thigh, Calf)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
        const trouserParams = [
            measurementId,
            waist || null,
            upperHips || null,
            hipsCrotch || null,
            outswarm || null,
            thigh || null,
            calf || null,
        ];
        await execute(insertTrouserSql, trouserParams);
    }

    // Insert each measurement image.
    const insertImageSql = `
      INSERT INTO MeasurementImage (Name, S3Url, MeasurementId)
      VALUES (?, ?, ?)
    `;
    for (const image of measurement.measurementImages) {
        const imageParams = [image.name, image.s3Url, measurementId];
        await execute(insertImageSql, imageParams);
    }

    return measurementId;
}
