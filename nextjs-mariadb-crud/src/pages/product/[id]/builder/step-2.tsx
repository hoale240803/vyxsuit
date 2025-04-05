import { useRouter } from "next/router";
import styles from "@/styles/product-list.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { useSuitBuilder } from "@/context/suit-builder/suit-builder.provider";
import { GroupedProduct, Product, SuitType } from "@/models/product.model";
import { useEffect, useState } from "react";

const Step2 = () => {
  const router = useRouter();
  const { suitType, selectSuitType } = useSuitBuilder();
  const { id } = router.query;

  const [products, setProducts] = useState<GroupedProduct[]>([]);

  useEffect(() => {
    fetch("/api/suit-types")
      .then((res) => res.json())
      .then((data) => setProducts(data || []));
  }, []);

  const nextStep = () => {
    router.push(`/product/${id}/builder/step-3`);
  };

  const handleChose = (type: Product) => selectSuitType(type);

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
                href={"/product-list"}
                className="primary-color text-decoration-none"
                passHref
              >
                <p className="mb-0 primary-color">Back to prevous</p>
              </Link>
            </div>
          </div>
          <div className="col-6">
            <p className="text-center fs-4">Step 2/11</p>
            <div className="text-center fs-4">
              <h3>Two-Piece or Three-Piece? Your Choice.</h3>
              <p className={styles["sub-text"]}>
                Choose the suit structure that aligns with your style and
                comfort. Whether it’s a sleek two-piece or a refined
                three-piece, the decision is yours.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          {products.map((item, index) => (
            <div
              key={index}
              className={clsx(styles["suit-type"], "col-5 offset-1")}
              onClick={() => handleChose(item.Main)}
            >
              <img src="/images/2Piece.png" className={clsx("w-100")} />
              <div
                className={clsx(
                  styles["overlay"],
                  suitType?.Id === item.Main.Id ? styles["active"] : ""
                )}
              ></div>
              <span
                className={clsx(
                  styles["checkmark"],
                  suitType?.Id === item.Main.Id ? styles["active"] : ""
                )}
              >
                <svg
                  width="7rem"
                  height="7rem"
                  viewBox="0 0 36 36"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--twemoji"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <path
                    fill="#fff"
                    d="M34.459 1.375a2.999 2.999 0 0 0-4.149.884L13.5 28.17l-8.198-7.58a2.999 2.999 0 1 0-4.073 4.405l10.764 9.952s.309.266.452.359a2.999 2.999 0 0 0 4.15-.884L35.343 5.524a2.999 2.999 0 0 0-.884-4.149z"
                  ></path>
                </svg>
              </span>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-4 m-auto mt-5 ">
            <button
              className="p-3 w-100 bg-primary-color border-0 accent-color fs-5 btn-primary"
              onClick={nextStep}
              disabled={!suitType}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step2;
