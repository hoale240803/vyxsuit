import { GroupedProduct } from "@/models/product.model";
import styles from "@/styles/product-list.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState<GroupedProduct[]>([]);

  useEffect(() => {
    fetch("/api/product-api")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

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

      <div
        className={clsx(
          styles["products-container"],
          " container-fluid p-5 pt-3"
        )}
      >
        {products?.length > 0 ? (
          products.map((prod, index) => (
            <div className="row" key={index}>
              {products.slice(index * 4, index * 4 + 4).map((item) => (
                <div className="col-md-3 mb-4" key={item.Main.Id}>
                  <img
                    src={item.Main.S3Url}
                    alt={item.Name || "Product Image"}
                    className="w-100"
                  />
                  <p className="fs-4 mb-0">{item.Name}</p>
                  <p className="fs-6">{item.Description}</p>
                  <Link href={`/product/${item.Main.Id}/builder/step-2`} passHref>
                    <button className="p-3 w-100 border-0">
                      <span>View options</span>
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </>
  );
}
