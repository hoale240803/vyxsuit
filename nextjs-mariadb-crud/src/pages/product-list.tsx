import styles from "@/styles/product-list.module.scss";
import clsx from "clsx";
import Link from "next/link";

export default function ProductList() {
  console.log(styles);
  return (
    <>
      <div className={clsx(styles.banner, "container-fluid p-0")}>
        <img src="/images/big-banner.jpg" className="w-100" />

        <div className={styles["banner-text"]}>
          <h1>Craft Your Legacy, Your Brand, One Stitch at a Time.</h1>
          <p className="fs-2">
            Create your dream suit in a few simple steps. From design to fabric,
            every detail is yours to define.
          </p>
          <Link href="#get-starting">
            <button>
              <span>Start Designing Your Suit</span>
            </button>
          </Link>
        </div>
      </div>

      <div
        className={clsx(styles["step-container"], "container-fluid p-0 mt-5")}
        id="get-starting"
      >
        <div className="row">
          <div className="col-6 offset-3">
            <p className="text-center fs-4">Step 1/11</p>
            <div className="text-center fs-4">
              <h3>Define Your Signature Look</h3>
              <p className={styles["sub-text"]}>
                Begin your journey by selecting a design that matches your style
                and occasion. Our exclusive design collection redefines elegance
                with innovation and timeless appeal.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={clsx(styles["products-container"], " container-fluid p-5 pt-3")}>
        <div className="row">
          <div className="col-3">
            <img
              src="https://vyxlyfstyles.shop/wp-content/uploads/2024/12/IMG_4357-768x1152.jpg"
              alt=""
              className="w-100"
            />
            <p className="fs-4 mb-0">The Luminary</p>
            <p className="fs-6">
              Radiating confidence and distinction for trailblazers.
            </p>

            <Link href="product/10/builder">
              <button className="p-3 w-100 border-0"><span>View options</span></button>
            </Link>
          </div>
          
        </div>
      </div>
    </>
  );
}
