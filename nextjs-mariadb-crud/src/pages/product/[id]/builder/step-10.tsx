import { useRouter } from "next/router";
import styles from "@/styles/product-list.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { useSuitBuilder } from "@/context/suit-builder/suit-builder.provider";
import ReCAPTCHA from "react-google-recaptcha";
import { base64ToFile } from "@/utils/productGroup";
import {
  MeasurementRequest,
  OrderDetailsRequest,
  OrderRequest,
} from "@/models/request/request.model";
import { useEffect, useState } from "react";
import { calculateTotalWithCurrency, formatNumber } from "@/utils/format";

const Step10 = () => {
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
  const { id } = router.query;

  const [capcha, setCapcha] = useState<string>("");
  const [salesOrderNumber, setSalesOrderNumber] = useState<string>("");
  const [salesOrderAmount, setSalesOrderAmount] = useState<number>(0);

  useEffect(() => {
    setCapcha("");
    const payload = {
      productId: product.Id,
      suitTypeId: suitType.Id,
      fabricId: fabric.selected.data.Id,
    };
    if(!payload.productId || !payload.suitTypeId || !payload.fabricId) return;
    fetch("/api/generate-sales-order-number", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setSalesOrderNumber(data?.orderNumber);
        setSalesOrderAmount(data?.totalAmount || 0);
      });
  }, [product, suitType, fabric]);

  const nextStep = async () => {
    // router.push(`/product/${id}/builder/step-11`);

    

    /// TODO: set images to localstorage
    // const s3Urls: string[] = [];
    // uploadImageMeasurement(s3Urls);

    /// TODO: Call stripe payment
    await getStripePaymentToken();
  };

  const getStripePaymentToken = async () => {
    const paymentPayload = {
      productId: product.Id,
      suitType: suitType.Id,
      fabricId: fabric.selected.data.Id,
      captchaToken: capcha,
    };
    const resp = await fetch("/api/stripe-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentPayload),
    });

    const token = await resp.text();
    console.log("stripe token", token);
    router.push(
      {
        pathname: `/product/${id}/builder/step-11`,
        query: { token, totalAmount: salesOrderAmount }, // gửi token vào query params
      },
      `/product/${id}/builder/step-11`
    );
  };

  const handleCaptchaChange = (token: string | null) => {
    console.log("capcha token:", token);
    setCapcha(token || "");
  };

  return (
    <>
      <div className={clsx(styles["step-2"], "container-fluid mt-5")}>
        <div className="row">
          <div className="col-3">
            <div className="w-100 d-inline-flex align-items-center justify-content-end gap-3">
              <svg
                width={"2rem"}
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                enableBackground="new 0 0 32 32"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <line
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    x1="6"
                    y1="16"
                    x2="28"
                    y2="16"
                  ></line>{" "}
                  <polyline
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                    points="14,24.5 5.5,16 14,7.5 "
                  ></polyline>{" "}
                </g>
              </svg>
              <Link
                href={`/product/${id}/builder/step-9`}
                className="primary-color text-decoration-none"
                passHref
              >
                <p className="mb-0 primary-color">Back to prevous</p>
              </Link>
            </div>
          </div>
          <div className="col-6">
            <p className="text-center fs-4">Step 10/11</p>
            <div className="text-center fs-4">
              <h3>Overview</h3>
              {/* <p className={styles["sub-text"]}>
                Choose the fit that complements your body and style preferences.
              </p> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-12">
            <h3>User information</h3>
          </div>
          <div className="col-6">
            <span className="fw-bold fs-4">User: </span>{" "}
            <span className="fs-4">
              {customer.firstName} {customer.lastName}
            </span>
          </div>
          <div className="col-6">
            <span className="fw-bold fs-4">Purchase Order: </span>{" "}
            <span className="fs-4">{salesOrderNumber}</span>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <h3>Product information</h3>
          </div>
          <div className="col-8 mt-3">
            <div className="w-100">
              <h4>Suit collections</h4>
              <img src={product.S3Url} alt={product.Name} className="w-100" />
              <h3>{product.Name}</h3>
              <p className="mb-0">
                <span className="fs-4">Suit Type:</span>{" "}
                <span className="fs-5">
                  {suitType.Name === "TwoPieceSuit"
                    ? "Two-piece"
                    : "Three-piece"}
                </span>
              </p>
              <p className="mb-0">
                <span className="fs-4">Fitting:</span>{" "}
                <span className="fs-5">
                  {suitStyle === "ConfortFit" ? "Comfort fit" : "Slim fit"}
                </span>
              </p>
              <h2 className="text-center">
                Total: <span>{formatNumber(salesOrderAmount)} USD</span>
              </h2>
            </div>
          </div>
          <div className="col-4 mt-3">
            <div className="row">
              <div className="col-12 mt-2">
                <div className="w-100">
                  <h4>Trouser</h4>
                  <img
                    src={trouser?.S3Url}
                    alt={trouser?.Name}
                    className="w-100"
                  />
                </div>
              </div>
              <div className="col-12 mt-4">
                <div className="w-100">
                  <h4>Fabric</h4>
                  <img
                    src={fabric?.selected.data.S3Url}
                    alt={fabric?.selected.data.Code}
                    className="w-100"
                  />
                </div>
              </div>
              <div className="col-12 mt-4">
                <div className="w-100">
                  <h4>Lining</h4>
                  <img
                    src={lining?.selected.data.S3Url}
                    alt={lining?.selected.data.Code}
                    className="w-100"
                  />
                </div>
              </div>
              <div className="col-12 mt-4">
                <div className="w-100">
                  <h4>Button</h4>
                  <img
                    src={button?.selected.data.S3Url}
                    alt={button?.selected.data.Code}
                    className="w-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 ">
            <ReCAPTCHA
              sitekey={"6Lc-AwQrAAAAAFdgi3JpIE643tTCZ9q4hUfPSkH8"}
              onChange={handleCaptchaChange}
              // ref={recaptchaRef}
            />
          </div>
          <div className="col-4 m-auto mt-5 ">
            <button
              className="p-3 w-100 bg-primary-color border-0 accent-color fs-5 btn-primary"
              disabled={!capcha}
              onClick={nextStep}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step10;
