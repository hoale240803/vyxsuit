import { useRouter } from "next/router";
import styles from "@/styles/product-list.module.scss";
import clsx from "clsx";
import Link from "next/link";
import { useSuitBuilder } from "@/context/suit-builder/suit-builder.provider";
import { TrouserType } from "@/models/product.model";

const Step3 = () => {
  const router = useRouter();
  const { trouser, selectTrouser } = useSuitBuilder();
  
  const { id } = router.query;

  const nextStep = () => {
    router.push(`/product/${id}/builder/step-4`);
  };
  const handleChose = (type: TrouserType) => selectTrouser(type)

  return (
    <>
      <div className={clsx(styles["step-3"], "container-fluid mt-5")}>
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
                href={`/product/${id}/builder/step-2`}
                className="primary-color text-decoration-none"
                passHref
              >
                <p className="mb-0 primary-color">Back to prevous</p>
              </Link>
            </div>
          </div>
          <div className="col-6">
            <p className="text-center fs-4">Step 3/11</p>
            <div className="text-center fs-4">
              <h3>Trouser</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className={clsx(styles["suit-type"], "offset-2 col-4")} id="SideLoopStyleWith2Plates" onClick={() => handleChose('SideLoopStyleWith2Plates')}>
            <img src="https://d1wuhi05elo03b.cloudfront.net/TrouserType/SideLoopStyleWith2Plates/TrouserType_SideLoopStyleWith2Plates_005.JPG" className={clsx("w-100")} />
            <div className={clsx(styles["overlay"], (trouser === 'SideLoopStyleWith2Plates' ? styles['active'] : ''))}></div>
            <span className={clsx(styles["checkmark"], (trouser === 'SideLoopStyleWith2Plates' ? styles['active'] : ''))}>
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

          <div className={clsx(styles["suit-type"], "col-4")} id="DoubleButtonDoublePlated" onClick={() => handleChose('DoubleButtonDoublePlated')}>
            <img src="https://d1wuhi05elo03b.cloudfront.net/TrouserType/DoubleButtonDoublePlated/TrouserType_DoubleButtonDoublePlated_002.JPG" className={clsx("w-100")} />
            <div className={clsx(styles["overlay"], (trouser === 'DoubleButtonDoublePlated' ? styles['active'] : ''))}></div>
            <span className={clsx(styles["checkmark"], (trouser === 'DoubleButtonDoublePlated' ? styles['active'] : ''))}>
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

        <div className="row mt-3">
          <div className={clsx(styles["suit-type"], "offset-2 col-4")} id="DoubleButtonPlateLessDisconnectedSideLoop" onClick={() => handleChose('DoubleButtonPlateLessDisconnectedSideLoop')}>
            <img src="https://d1wuhi05elo03b.cloudfront.net/TrouserType/DoubleButtonPlateLessDisconnectedSideLoop/TrouserType_DoubleButtonPlateLessDisconnectedSideLoop_004.JPG" className={clsx("w-100")} />
            <div className={clsx(styles["overlay"], (trouser === 'DoubleButtonPlateLessDisconnectedSideLoop' ? styles['active'] : ''))}></div>
            <span className={clsx(styles["checkmark"], (trouser === 'DoubleButtonPlateLessDisconnectedSideLoop' ? styles['active'] : ''))}>
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

          <div className={clsx(styles["suit-type"], "col-4")} id="PlateLessStandardSingleButton" onClick={() => handleChose('PlateLessStandardSingleButton')}>
            <img src="https://d1wuhi05elo03b.cloudfront.net/TrouserType/PlateLessStandardSingleButton/TrouserType_PlateLessStandardSingleButton_006.JPG" className={clsx("w-100")} />
            <div className={clsx(styles["overlay"], (trouser === 'PlateLessStandardSingleButton' ? styles['active'] : ''))}></div>
            <span className={clsx(styles["checkmark"], (trouser === 'PlateLessStandardSingleButton' ? styles['active'] : ''))}>
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

export default Step3;
