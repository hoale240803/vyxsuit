import { useRouter } from "next/router";

import styles from "@/styles/about-us.module.scss";
import clsx from "clsx";

export default function AboutUs() {
  const router = useRouter();

  return (
    <>
      <div className="container-fluid h-75vh relative">
        <div className="row">
          <div className={clsx(styles["banner-left-logo"], "col-6 h-100")}>
            <h1>Our Vision: To Make Luxury Bespoke Accessible to All.</h1>
            <p>
              Every stitch tells a story. We connect the world’s best artisans
              with discerning customers who deserve quality without compromise.
            </p>
          </div>
          <div className={clsx(styles["banner-right-logo"], "col-6 h-100")}>
            <img src="/images/logo-lg.png" className="w-100" />
          </div>

          <div className="w-100">
            <div className="img-cantainer">
              <img />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
