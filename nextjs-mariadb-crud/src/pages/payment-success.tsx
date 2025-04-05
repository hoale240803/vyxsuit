import { useSuitBuilder } from "@/context/suit-builder/suit-builder.provider";
import {
  MeasurementRequest,
  OrderDetailsRequest,
} from "@/models/request/request.model";
import { base64ToFile } from "@/utils/productGroup";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export default function PaymentSuccess() {
  const router = useRouter();
  const {
    product,
    suitType,
    suitStyle,
    fabric,
    trouser,
    lining,
    button,
    customer,
    shipping,
    measurement,
    uploadImageMeasurement,
  } = useSuitBuilder();

  const [isSubmitting, setIsSubmitting] = useState(true);

  useEffect(() => {
    const createOrder = async (): Promise<any> => {

    if(!button || !customer || !fabric || !lining || !measurement || !product || !shipping || !suitStyle || !suitType || !trouser) return;
    if(measurement.Images.length <= 0) return; 
    //upload image to s3
    const filesConverted = measurement.Images.map((img) => {
        return base64ToFile(img);
      });
      console.log("files:", filesConverted);

      if(!filesConverted?.length) return;
  
      const formData = new FormData();
      filesConverted.forEach((file, index) => {
        formData.append("files", file); // key là 'files', backend sẽ nhận là mảng
      });
  
      const res = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });
  
      const response: { urls: any[] } = await res.json();
  
      const orderPayload = {
        lang: "en",
        captchaToken: "",
        salesOrderNumber: "",
        customer: { ...customer },
        shippingInfo: { ...shipping },
        payment: {
          currencyCode: "USD",
          currencyRate: 1,
        },
        measurements: {
          measurementType: "Shirt",
          unit: measurement?.Unit || "Cm",
          shirtMeasurements: {
            measurementType: "Shirt",
            chest: measurement.Shirt.Chest,
            shoulder: measurement.Shirt.Shoulder,
            armLength: measurement.Shirt.ArmLength,
            armShoulderJoint: measurement.Shirt.ArmShoulderJoint,
            armBicepWidth: measurement.Shirt.ArmBicepWidth,
            jacketWidth: measurement.Shirt.JacketLength,
            abdomen: measurement.Shirt.Abdomen,
            bellyTummy: measurement.Shirt.Belly,
            hips: measurement.Shirt.Hips,
            neck: measurement.Shirt.Neck,
          },
          trouserMeasurements: {
            waist: measurement.Trouser.Waist,
            upperHips: measurement.Trouser.UpperHips,
            hips: measurement.Trouser.Hips,
            hipsCrotch: measurement.Trouser.Crotch,
            outswarm: measurement.Trouser.Outswam, // chú ý: JSON là 'Outswam' nhưng interface là 'outswarm'
            thigh: measurement.Trouser.Thigh,
            calf: measurement.Trouser.Calf,
          },
          measurementImages: response.urls.map((img) => ({
            name: img.fileName,
            s3Url: img.signedUrl,
          })),
        } as MeasurementRequest,
        orderDetails: {
          suitId: product.Id,
          suitTypeId: suitType.Id,
          trouserId: trouser.Id,
          tailoredFit: suitStyle === "ConfortFit" ? "ConfortFit" : "SlimFit",
          jacketId: 0,
          fabricId: fabric.selected.data.Id,
          liningId: lining.selected.data.Id,
          buttonId: button.selected.data.Id,
        },
      };
  
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      console.log(await orderResponse.text())
    }

    createOrder();
  }, [button, customer, fabric, lining, measurement, product, shipping, suitStyle, suitType, trouser]);

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Payment Successful!</h1>
      <p className="mb-4">
        Thank you for your order. We will process it shortly.
      </p>
      <button
        className="p-3 w-100 bg-primary-color border-0 accent-color fs-5 btn-primary"
        disabled={!isSubmitting}
        onClick={() => router.push("/")}
      ></button>
    </div>
  );
}
