import { useRouter } from "next/router";
import styles from "@/styles/product-list.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { useSuitBuilder } from "@/context/suit-builder/suit-builder.provider";
import { SuitStyle } from "@/models/product.model";

const Step4 = () => {
  const router = useRouter();
  const { suitStyle, selectSuitStyle } = useSuitBuilder();
  const { id } = router.query;

  const nextStep = () => {
    router.push(`/product/${id}/builder/step-5`);
  };
  const handleChose = (type: SuitStyle) => selectSuitStyle(type)

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
                href={`/product/${id}/builder/step-3`}
                className="primary-color text-decoration-none"
                passHref
              >
                <p className="mb-0 primary-color">Back to prevous</p>
              </Link>
            </div>
          </div>
          <div className="col-6">
            <p className="text-center fs-4">Step 4/11</p>
            <div className="text-center fs-4">
              <h3>Your Perfect Fit Awaits</h3>
              <p className={styles["sub-text"]}>
                Choose the fit that complements your body and style preferences.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className={clsx(styles["suit-type"], "col-5 offset-1")} onClick={() => handleChose('ConfortFit')}>
            <img src="/images/2-piece.JPG" className={clsx("w-100")} />
            <span className={clsx(styles["img-alt"], "fs-3")}>Comfort Fit</span>
            
            <div className={clsx(styles["radio-container"], "mt-4")}>
              <input type="radio" id="option1" name="option" checked={suitStyle === 'ConfortFit'} />
              <label htmlFor="option1" className={clsx(styles['radio-label'])}>Comfort Fit</label>
            </div>
          </div>
          <div className={clsx(styles["suit-type"], "col-5")} onClick={() => handleChose('SlimFit')}>
            <img src="/images/3-piece.JPG" className={clsx("w-100")} />
            <span className={clsx(styles["img-alt"], "fs-3")}>Slim Fit</span>

            <div className={clsx(styles["radio-container"], "mt-4")}>
              <input type="radio" id="option2" name="option" checked={suitStyle === 'SlimFit'} />
              <label htmlFor="option2" className={clsx(styles['radio-label'])}>Slim Fit</label>
            </div>
          </div>
        </div>
        <div className="row">
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

export default Step4;
