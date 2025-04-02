import { useRouter } from "next/router";
import styles from "@/styles/product-list.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { useSuitBuilder } from "@/context/suit-builder/suit-builder.provider";
import { useEffect, useState } from "react";
import { buildFabric, buildLining } from "@/utils/productGroup";
import { GroupedProduct } from "@/models/product.model";
import EmblaCarousel from "@/components/EmblaCarousel";

const Step6 = () => {
  const router = useRouter();
  const { fabric, lining, selectLining } = useSuitBuilder();
  const [products, setProducts] = useState<GroupedProduct[]>([]);
  const [productIndexSelected, setProductIndexSelected] = useState<number>(0);
  const [fabricBuiled, setFabricBuiled] = useState<{
    group: string;
    fabric: { code: string; index: number; image: string };
  }>();
  const [liningBuiled, setLiningBuiled] = useState<{
    code: string;
    index: number;
    image: string;
  }>();
  const { id } = router.query;

  useEffect(() => {
    const fabricObj = buildFabric(fabric);
    setFabricBuiled(fabricObj);
  }, [fabric]);

  useEffect(() => {
    const liningObj = buildLining(lining);
    setLiningBuiled(liningObj);
    setTimeout(() => {
      console.log('set index scroll');
      setProductIndexSelected(liningObj.index);
    }, 500);
  }, [lining]);

  useEffect(() => {
    fetch("/api/linings")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const nextStep = () => {
    router.push(`/product/${id}/builder/step-7`);
  };
  const handleChose = (img: GroupedProduct, index: number) => {
    selectLining(`${img.Main.Code}:;${index}:;${img.Main.S3Url}`);
    setProductIndexSelected(index);
    setLiningBuiled(buildLining(lining));
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
                href={`/product/${id}/builder/step-5`}
                className="primary-color text-decoration-none"
                passHref
              >
                <p className="mb-0 primary-color">Back to prevous</p>
              </Link>
            </div>
          </div>
          <div className="col-6">
            <p className="text-center fs-4">Step 6/11</p>
            <div className="text-center fs-4">
              <h3>Lining</h3>
              <p className={styles["sub-text"]}>
                Personalize the interior of your suit with a luxurious lining
                that adds flair to every movement.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <EmblaCarousel indexSelected={productIndexSelected}>
              {products?.map((img, index) => (
                <div className="embla__slide" key={img.Main.Code}>
                  <div
                    className={clsx(styles["suit-type"])}
                    onClick={() => handleChose(img, index)}
                  >
                    <img
                      src={img.Main.S3Url}
                      alt={img.Main.Code}
                      style={{
                        width: "300px",
                        height: "300px",
                        cursor: "pointer",
                      }}
                    />

                    <div
                      className={clsx(
                        styles["overlay"],
                        liningBuiled?.code === img.Main.Code
                          ? styles["active"]
                          : ""
                      )}
                    ></div>
                    <span
                      className={clsx(
                        styles["checkmark"],
                        liningBuiled?.code === img.Main.Code
                          ? styles["active"]
                          : ""
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
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-3">
            <img
              src={fabricBuiled?.fabric.image}
              alt={`faric`}
              style={{
                width: "300px",
                height: "300px",
                cursor: "pointer",
              }}
            />
          </div>
          <div className="col-3">
            {liningBuiled?.image ? (
              <img
                src={liningBuiled?.image}
                alt={`faric`}
                style={{
                  width: "300px",
                  height: "300px",
                  cursor: "pointer",
                }}
              />
            ) : null}
          </div>
          <div className="col-12 mt-5 text-center">
            {/* <h4>Selected Fabrics: {fabricBuiled?.fabric.code} </h4> */}
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

export default Step6;
