import { useRouter } from "next/router";
import styles from "@/styles/product-list.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { useSuitBuilder } from "@/context/suit-builder/suit-builder.provider";
import { SuitStyle } from "@/models/product.model";
import Compressor from 'compressorjs';

const Step0 = () => {
  const router = useRouter();
  const { measurement, selectSuitStyle } = useSuitBuilder();
  const { id } = router.query;

  const nextStep = () => {
    router.push(`/product/${id}/builder/step-9`);
  };
  const handleChose = (type: SuitStyle) => selectSuitStyle(type);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      new Compressor(files[0], {
        quality: 0.6,  // Chất lượng nén ảnh
        maxWidth: 800, // Kích thước tối đa chiều rộng
        success(result) {
          const base64Image = URL.createObjectURL(result);  // Chuyển đổi hình ảnh nén thành base64
          console.log(base64Image);
        },
        error(err) {
          console.error(err);
        },
      });
    }
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
                href={`/product/${id}/builder/step-7`}
                className="primary-color text-decoration-none"
                passHref
              >
                <p className="mb-0 primary-color">Back to prevous</p>
              </Link>
            </div>
          </div>
          <div className="col-6">
            <p className="text-center fs-4">Step 8/11</p>
            <div className="text-center fs-4">
              <h3>Measurement</h3>
              {/* <p className={styles["sub-text"]}>
                Choose the fit that complements your body and style preferences.
              </p> */}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center mt-4">
          <div className="col-4">
            <div className="w-100 h-100 d-flex flex-row justify-content-center gap-3">
              <h4 className="mb-0">Unit for measurement: </h4>
              <div className={clsx(styles["radio-container"])}>
                <input type="radio" id="option1" name="option" />
                <label
                  htmlFor="option1"
                  className={clsx(styles["radio-label"])}
                >
                  Cm
                </label>
              </div>
              <div className={clsx(styles["radio-container"])}>
                <input type="radio" id="option2" name="option" />
                <label
                  htmlFor="option2"
                  className={clsx(styles["radio-label"])}
                >
                  Inch
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6">
            <video width="100%" controls>
              <source src="https://drive.google.com/file/d/1vFLSA-xTN2su92t0GOQSuNsw3q70G6nP/view?t=4" />
            </video>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-12">
                <h2>Shirt</h2>
              </div>
              {/* row */}
              <div className={clsx(styles["field"], "col-6")}>
                <label>Chest:</label>
              </div>
              <div className="col-6">
                <input type="number" placeholder="Input chest" />
              </div>

              {/* row */}
              <div className={clsx(styles["field"], "col-6")}>
                <label>Shoulder:</label>
              </div>
              <div className="col-6">
                <input type="number" placeholder="Input shoulder" />
              </div>

              {/* row */}
              <div className={clsx(styles["field"], "col-6")}>
                <label>Arm Length:</label>
              </div>
              <div className="col-6">
                <input type="number" placeholder="Input arm length" />
              </div>

              {/* row */}
              <div className={clsx(styles["field"], "col-6")}>
                <label>Arm-Shoulder Joint:</label>
              </div>
              <div className="col-6">
                <input type="number" placeholder="Input arm-shoulder joint" />
              </div>

              {/* row */}
              <div className={clsx(styles["field"], "col-6")}>
                <label>Arm-Bicep Width:</label>
              </div>
              <div className="col-6">
                <input type="number" placeholder="Input arm-bicep width" />
              </div>
            </div>
          </div>

          <div className="col-6 offset-6">
            <div className="row">
              {/* row */}
              <div className={clsx(styles["field"], "col-6")}>
                <label>Jacket Length:</label>
              </div>
              <div className="col-6">
                <input type="number" placeholder="Input jacket length" />
              </div>

              {/* row */}
              <div className={clsx(styles["field"], "col-6")}>
                <label>Abdomen:</label>
              </div>
              <div className="col-6">
                <input type="number" placeholder="Input abdomen" />
              </div>

              {/* row */}
              <div className={clsx(styles["field"], "col-6")}>
                <label>Belly / Tummy:</label>
              </div>
              <div className="col-6">
                <input type="number" placeholder="Input belly" />
              </div>

              {/* row */}
              <div className={clsx(styles["field"], "col-6")}>
                <label>Hips:</label>
              </div>
              <div className="col-6">
                <input type="number" placeholder="Input hips" />
              </div>

              {/* row */}
              <div className={clsx(styles["field"], "col-6")}>
                <label>Neck:</label>
              </div>
              <div className="col-6">
                <input type="number" placeholder="Input neck" />
              </div>
            </div>
          </div>

          <div className="col-6">
            <video width="100%" controls>
              <source src="https://drive.google.com/file/d/1SawRL1uMdH_SPAVKBk1aCzrFQu8tvhNk/view?t=3" />
            </video>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-12">
                <h2>Trouser</h2>
              </div>
              {/* row */}
              <div className={clsx(styles["field"], "col-6")}>
                <label>Waist:</label>
              </div>
              <div className="col-6">
                <input type="number" placeholder="Input waist" />
              </div>

              {/* row */}
              <div className={clsx(styles["field"], "col-6")}>
                <label>Upper Hips:</label>
              </div>
              <div className="col-6">
                <input type="number" placeholder="Input upper hips" />
              </div>

              {/* row */}
              <div className={clsx(styles["field"], "col-6")}>
                <label>Hips:</label>
              </div>
              <div className="col-6">
                <input type="number" placeholder="Input hips" />
              </div>

              {/* row */}
              <div className={clsx(styles["field"], "col-6")}>
                <label>Crotch:</label>
              </div>
              <div className="col-6">
                <input type="number" placeholder="Input crotch" />
              </div>

              {/* row */}
              <div className={clsx(styles["field"], "col-6")}>
                <label>Outswam:</label>
              </div>
              <div className="col-6">
                <input type="number" placeholder="Input outswam" />
              </div>

              {/* row */}
              <div className={clsx(styles["field"], "col-6")}>
                <label>Thigh:</label>
              </div>
              <div className="col-6">
                <input type="number" placeholder="Input thigh" />
              </div>

              {/* row */}
              <div className={clsx(styles["field"], "col-6")}>
                <label>Calf:</label>
              </div>
              <div className="col-6">
                <input type="number" placeholder="Input calf" />
              </div>
            </div>
          </div>

        </div>
        <div className="row">
          <div className="col-8">
            <div className="w-100 h-100 d-flex flex-row justify-content-center align-items-center gap-3">
            <h5>Images (front, back, left side, rigth side)</h5>
            <label className={clsx(styles["icon"], styles["btn-icon"])} htmlFor="btn-upload-img">
               <input type="file" className="hidden" id="btn-upload-img" multiple accept="image/jpeg, image/png" onChange={handleFileChange} />
               Upload
            </label>
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

export default Step0;
