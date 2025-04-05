import { useRouter } from "next/router";
import styles from "@/styles/product-list.module.scss";
import clsx from "clsx";
import Link from "next/link";
import Select, { Option } from "@/components/Select";
import { countries } from "@/shared/country";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useSuitBuilder } from "@/context/suit-builder/suit-builder.provider";
import {
  CustomerRequest,
  ShippingInfoRequest,
} from "@/models/request/request.model";

const Step9 = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    termAccepted,
    acceptTern,
    customer,
    shipping,
    selectCustomer,
    selectShippingInfo,
  } = useSuitBuilder();

  const countrySource = countries.map((country) => ({
    label: country.name,
    value: country.code2,
  })) as Option[];

  const [countrySelected, setCountrySelected] = useState<any>();
  const [stateSources, setStateSource] = useState<Option[]>([]);

  useEffect(() => {
    if (shipping.country) {
      const selected = countries.find((x) => x.code2 === shipping.country);
      if (selected) {
        setCountrySelected(selected);
      }
    }
  }, [shipping]);

  useEffect(() => {
    if (countrySelected?.states) {
      setStateSource(
        countrySelected.states.map((state: any) => ({
          label: state.name,
          value: state.code,
        }))
      );
    }
  }, [countrySelected]);

  const nextStep = () => {
    router.push(`/product/${id}/builder/step-10`);
  };

  const handleSelectCountry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    const selected = countries.find((x) => x.code2 === event.target.value);

    if (selected) {
      selectShippingInfo({
        ...shipping,
        country: selected.code2,
        state: "",
      });
    }
  };

  const handleSelectState = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    const selected = stateSources.find((x) => x.value === event.target.value);

    if (selected) {
      selectShippingInfo({
        ...shipping,
        state: selected.value,
      });
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    console.log("capcha token:", token);
  };

  const handleChangeCustomer = (
    field: keyof CustomerRequest,
    value: string
  ) => {
    selectCustomer({
      ...customer,
      [field]: value,
    });
  };

  const handleChangeShipping = (
    field: keyof ShippingInfoRequest,
    value: string
  ) => {
    selectShippingInfo({
      ...shipping,
      [field]: value,
    });
  };

  const handleChangeIsDifferentAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    selectShippingInfo({
      ...shipping,
      differentAddress: isChecked,
    });
  };

  const handleChangeShippingMethod = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    selectShippingInfo({
      ...shipping,
      shippingMethod: event.target.value,
    });
  };

  const handleAcceptTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    acceptTern({
      ...termAccepted,
      privacyPolicy: isChecked,
    });
  }

  const isDisabled = () => {
    if(!customer || !shipping || !termAccepted.privacyPolicy) return true;
    
    return !customer.firstName || !customer.lastName || !customer.email;
  }

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
            <input
              placeholder="Email Address"
              type="email"
              value={customer.email}
              onChange={(e) => handleChangeCustomer("email", e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-6">
            <input
              placeholder="First name *"
              value={customer.firstName}
              onChange={(e) =>
                handleChangeCustomer("firstName", e.target.value)
              }
            />
          </div>
          <div className="col-6">
            <input
              placeholder="Last name *"
              value={customer.lastName}
              onChange={(e) => handleChangeCustomer("lastName", e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <input
              placeholder="Company name"
              value={customer.companyName}
              onChange={(e) =>
                handleChangeCustomer("companyName", e.target.value)
              }
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <Select
              options={countrySource}
              value={shipping.country}
              placeholder={"Country / Region *"}
              onChange={handleSelectCountry}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-4">
            <input
              value={shipping.city}
              onChange={(e) => handleChangeShipping("city", e.target.value)}
              placeholder="Town/City *"
            />
          </div>
          <div className="col-4">
            <Select
              options={stateSources}
              value={shipping.state}
              placeholder={"State *"}
              onChange={handleSelectState}
            />
          </div>
          <div className="col-4">
            <input
              value={shipping.zipCode}
              onChange={(e) => handleChangeShipping("zipCode", e.target.value)}
              placeholder="Zip Code *"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <input
              value={shipping.phone}
              onChange={(e) => handleChangeShipping("phone", e.target.value)}
              placeholder="Phone"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <label className="checkbox-container">
              <input
                type="checkbox"
                defaultChecked={shipping.differentAddress}
                checked={shipping.differentAddress}
                onChange={handleChangeIsDifferentAddress}
              />
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
              value={shipping.note}
              onChange={(e) => handleChangeShipping("note", e.target.value)}
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
                  checked={shipping.shippingMethod === "Standard"}
                  onChange={handleChangeShippingMethod}
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
                  checked={shipping.shippingMethod === "Express"}
                  onChange={handleChangeShippingMethod}
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
              <input type="checkbox" defaultChecked={termAccepted.privacyPolicy} checked={termAccepted.privacyPolicy} onChange={handleAcceptTerm} />
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
        {/* <div className="row mt-3">
          <ReCAPTCHA
            sitekey={"6Lc-AwQrAAAAAFdgi3JpIE643tTCZ9q4hUfPSkH8"}
            onChange={handleCaptchaChange}
          />
        </div> */}

        <div className="row mt-3">
          <div className="col-4 m-auto mt-5 ">
            <button
              className="p-3 w-100 bg-primary-color border-0 accent-color fs-5 btn-primary"
              disabled={isDisabled()}
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
