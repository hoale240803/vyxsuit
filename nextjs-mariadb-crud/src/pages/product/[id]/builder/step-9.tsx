import { useRouter } from "next/router";
import styles from "@/styles/product-list.module.scss";
import clsx from "clsx";
import Link from "next/link";
import Select, { Option } from "@/components/Select";
import { countries } from "@/shared/country";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Step9 = () => {
  const router = useRouter();
  const { id } = router.query;
  const countrySource = countries.map((country) => ({
    label: country.name,
    value: country.code2,
  })) as Option[];

  const [stateSources, setStateSource] = useState<Option[]>([]);

  const nextStep = () => {
    router.push(`/product/${id}/builder/step-10`);
  };

  const handleSelectCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    const selected = countries.find((x) => x.code2 === event.target.value);

    if (selected?.states) {
      setStateSource(
        selected.states.map((state) => ({
          label: state.name,
          value: state.code,
        }))
      );
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    console.log('capcha token:', token);
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
                enable-background="new 0 0 32 32"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <line
                    fill="none"
                    stroke="#D4AF37"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    x1="6"
                    y1="16"
                    x2="28"
                    y2="16"
                  ></line>{" "}
                  <polyline
                    fill="none"
                    stroke="#D4AF37"
                    stroke-width="2"
                    stroke-miterlimit="10"
                    points="14,24.5 5.5,16 14,7.5 "
                  ></polyline>{" "}
                </g>
              </svg>
              <Link
                href={`/product/${id}/builder/step-8`}
                className="primary-color text-decoration-none"
                passHref
              >
                <p className="mb-0 primary-color">Back to prevous</p>
              </Link>
            </div>
          </div>
          <div className="col-6">
            <p className="text-center fs-4">Step 9/11</p>
            <div className="text-center fs-4">
              <h3>Payment & Shipping</h3>
              {/* <p className={styles["sub-text"]}>
                Choose the fit that complements your body and style preferences.
              </p> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row mt-3">
          <div className="col-12">
            <h3 className="mb-0 fw-light">Customer information</h3>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <input placeholder="Email Address" />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <input placeholder="First name *" />
          </div>
          <div className="col-6">
            <input placeholder="Last name *" />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <input placeholder="Company name" />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <Select
              options={countrySource}
              placeholder={"Country / Region *"}
              onChange={handleSelectCountry}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-4">
            <input placeholder="Town/City *" />
          </div>
          <div className="col-4">
            <Select
              options={stateSources}
              placeholder={"State *"}
              onChange={handleSelectCountry}
            />
          </div>
          <div className="col-4">
            <input placeholder="Zip Code *" />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <input placeholder="Phone" />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              <span className="label fw-light ms-3">
                Ship to a different address?
              </span>
            </label>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <input
              placeholder="Notes about your order, e.g. special notes for delivery."
              multiple
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <div className="w-100 h-100 d-flex flex-row justify-content-start gap-3">
              <p className="mb-0">Shipping method: </p>
              <div className={clsx("radio-container", "fs-6 fw-light")}>
                <input
                  type="radio"
                  id="option1"
                  name="option"
                  value="Standard"
                  // checked={measurement.Unit === "cm"}
                  // onChange={handleChangeUnit}
                />
                <label htmlFor="option1" className={clsx("radio-label")}>
                  Standard
                </label>
              </div>
              <div className={clsx("radio-container", "fs-6 fw-light")}>
                <input
                  type="radio"
                  id="option2"
                  name="option"
                  value="Express"
                  // checked={measurement.Unit === "inch"}
                  // onChange={handleChangeUnit}
                />
                <label htmlFor="option2" className={clsx("radio-label")}>
                  Express
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-12">
            <h3 className="mb-0 fw-light">Payment</h3>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              <span className="label fw-light ms-3">
                Your personal information will be used to process your order,
                enhance your experience on the website, and for other specific
                purposes as described in our{" "}
                <span className="text-decoration-underline primary-color">
                  Privacy policy
                </span>
                .
              </span>
            </label>
          </div>
        </div>
        <div className="row mt-3">
          <ReCAPTCHA
            sitekey={'6Lc-AwQrAAAAAFdgi3JpIE643tTCZ9q4hUfPSkH8'}
            onChange={handleCaptchaChange}
            // ref={recaptchaRef}
          />
        </div>

        <div className="row mt-3">
          <div className="col-4 m-auto mt-5 ">
            <button
              className="p-3 w-100 bg-primary-color border-0 accent-color fs-5"
              onClick={nextStep}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step9;
