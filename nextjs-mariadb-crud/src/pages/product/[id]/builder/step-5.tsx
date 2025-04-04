import { useRouter } from "next/router";
import styles from "@/styles/product-list.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { useSuitBuilder } from "@/context/suit-builder/suit-builder.provider";
import { GroupedProduct, Product } from "@/models/product.model";
import React, { useEffect, useState } from "react";

import EmblaCarousel from "@/components/EmblaCarousel";
import Popup from "@/components/Popup";
import { ProductSeletection } from "@/context/suit-builder/suit-builder.context";

const Step5 = () => {
  const router = useRouter();
  const { fabric, selectFabric } = useSuitBuilder();
  const { id } = router.query;

  const [products, setProducts] = useState<GroupedProduct[]>([]);
  const [productSelected, setProductSelected] = useState<GroupedProduct>();
  const [fabricSelected, setFabricSelected] = useState<Product>();
  const [productIndexSelected, setProductIndexSelected] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/fabrics")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setProductIndexSelected(fabric.selected.index);
    }, 500);
    setFabricSelected(fabric.selected.data);
  }, [fabric]);

  const nextStep = () => {
    if (!fabric) return;
    router.push(`/product/${id}/builder/step-6`);
  };
  const handleChose = (img: Product, index: number) => {
    selectFabric({
      group: productSelected?.Main,
      selected: {
        data: img,
        index: index,
      },
    } as ProductSeletection);
    setProductIndexSelected(index);
  };

  const handleOpenTypePopup = (group: GroupedProduct) => {
    if (productSelected?.Main.Id !== group.Main.Id) {
      setProductIndexSelected(0);
    }
    setProductSelected(group);
    setShowModal(true);
  };

  const chooseFabric = () => {
    setShowModal(false);
    nextStep();
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
                href={`/product/${id}/builder/step-4`}
                className="primary-color text-decoration-none"
                passHref
              >
                <p className="mb-0 primary-color">Back to prevous</p>
              </Link>
            </div>
          </div>
          <div className="col-6">
            <p className="text-center fs-4">Step 5/11</p>
            <div className="text-center fs-4">
              <h3>Fabrics</h3>
              <p className={styles["sub-text"]}>
                Explore our curated selection of premium fabrics to set the
                foundation for your bespoke suit.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          {products.map((item) => (
            <div
              key={item.Main.Code}
              className={clsx("col-4", styles["item"])}
              onClick={() => handleOpenTypePopup(item)}
            >
              <img
                src={item.Main.S3Url}
                alt={item.Name || "Product Image"}
                className="w-100"
              />
            </div>
          ))}

          {showModal && (
            <Popup isOpen={showModal} onClose={() => setShowModal(false)}>
              <h3>Color Options</h3>

              <EmblaCarousel indexSelected={productIndexSelected}>
                {productSelected?.Images.map((img, index) => (
                  <div className="embla__slide" key={img.Id}>
                    <div
                      className={clsx(styles["suit-type"])}
                      onClick={() => handleChose(img as Product, index)}
                    >
                      <img
                        src={img.S3Url}
                        alt={img.Code}
                        style={{
                          width: "300px",
                          height: "300px",
                          cursor: "pointer",
                        }}
                      />

                      <div
                        className={clsx(
                          styles["overlay"],
                          fabricSelected?.Id === img.Id ? styles["active"] : ""
                        )}
                      ></div>
                      <span
                        className={clsx(
                          styles["checkmark"],
                          fabricSelected?.Id === img.Id ? styles["active"] : ""
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
                  </div>
                ))}
              </EmblaCarousel>

              <div className="col-4 m-auto mt-5 ">
                <button
                  className="p-3 w-100 bg-primary-color border-0 accent-color fs-5"
                  onClick={chooseFabric}
                >
                  Continue
                </button>
              </div>
            </Popup>
          )}
        </div>
        <div className="row">
          <div className="col-4 m-auto mt-5 ">
            <button
              className="p-3 w-100 bg-primary-color border-0 accent-color fs-5 btn-primary"
              disabled={!fabric}
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

export default Step5;
