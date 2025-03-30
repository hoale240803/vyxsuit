import { useRouter } from "next/router";

import styles from "@/styles/about-us.module.scss";
import clsx from "clsx";
import Image from "next/image";
import Carousel from "@/components/Carousel";

export default function AboutUs() {
  const router = useRouter();

  return (
    <>
      <div className="container-fluid relative">
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
        </div>
      </div>

      <section className="container-fluid mt-5 bg-secondary-light-color">
        <div className="row vh-100">
          <div className="col-8 offset-2 text-center mt-4">
            <h4>Who We Are</h4>
            <h2>More Than a Brand—A Global Movement</h2>
            <p>
              At VYX, we believe in the power of connection. By partnering with
              renowned suit makers from across the globe, we merge timeless
              craftsmanship with modern accessibility. Every suit we deliver is
              a testament to our commitment to excellence, affordability, and
              global artistry.
            </p>
          </div>
          <div className="col-12 p-5 pt-2 position-relative text-center">
            <img src="/images/map-snip.jpg" />
            {/* <div
              className={clsx(
                "bg-primary-color rounded-circle",
                styles["map-pointer"]
              )}
              style={{ width: '1.5rem', height: '1.5rem' }}
            ></div> */}
          </div>
        </div>
      </section>

      <section className="container-fluid pt-5">
        <div className="row">
          <div className="col-8 offset-2 text-center mt-4">
            <h4>Our Story</h4>
            <h2>From Tradition to Transformation</h2>
            <p>
              Our journey began with a simple yet ambitious vision: to make
              bespoke tailoring accessible to everyone. Recognizing the untapped
              potential of master tailors in underserved regions, we set out to
              connect their artistry with a global audience. Through innovation,
              integrity, and a shared passion for craftsmanship, VYX has grown
              into more than just a fashion brand—it’s a bridge between
              tradition and modernity.
            </p>
          </div>

          <div className="col-12">
            <Carousel
              images={[
                "/images/about-4.png",
                "/images/about-2.png",
                "/images/about-3.png",
              ]}
            />
          </div>
        </div>
      </section>

      <section className="container-fluid pt-5">
        <div className="row">
          <div className="col-8 m-auto text-center mt-4">
            <h4>Why Choose Us</h4>
            <h2>What Makes Us Different?</h2>
            <p>
              We’re not just selling suits; we’re creating legacies. Here’s why
              thousands trust us to redefine their wardrobe:
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-3 p-4">
            <h4>Unparalleled Craftsmanship</h4>
            <p>Every piece is meticulously handcrafted by seasoned artisans.</p>
          </div>
          <div className="col-3 p-4">
            <h4>Tailored for You</h4>
            <p>
              From the first consultation to the final stitch, your preferences
              shape the result.
            </p>
          </div>
          <div className="col-3 p-4">
            <h4>Affordability Meets Quality</h4>
            <p>
              Luxury should be attainable—our innovative model ensures you get
              premium suits at unmatched prices.
            </p>
          </div>
          <div className="col-3 p-4">
            <h4>Ethical & Transparent</h4>
            <p>
              We value sustainability and fair partnerships, ensuring everyone
              involved thrives.
            </p>
          </div>
        </div>
        <div className="row p-4">
          <div className="h-50 w-100"></div>
          <div
            className={clsx(
              styles["img-25-container"],
              "col-6 vh-40 position-relative"
            )}
          >
            <img src="/images/about-2.png" className={styles["img-25"]} />
          </div>
          <div
            className={clsx(
              "col-6 bg-secondary-color p-5",
              styles["img-right"]
            )}
          >
            <h3 className={clsx("text-white")}>The Faces Behind the Fabric</h3>
            <p className={clsx("text-white")}>
              Our artisans are the heart and soul of our brand. Each one brings
              decades of experience, passion, and dedication to every piece they
              create. By working with these skilled craftsmen and women, we
              honor their legacy while helping them thrive in a global market.
            </p>
            <button className={clsx("primary-btn")}>
              Discover Our Collaborations
            </button>
          </div>
        </div>
      </section>

      <section className="row bg-secondary-light-color">
        <div className={clsx(styles["parts-4-container"], "col-6 vh-75 position-relative overflow-hidden")}>
          <div className={clsx(styles["part-1"])}>
            <img src="/images/about-5.png" className="w-100" />
          </div>
          <div className={clsx(styles["part-2"])}>
            <p className="fs-1 mb-0">&ldquo;</p>
            <blockquote className="mb-0">
            Tailoring excellence that transcends borders and redefines value.
            </blockquote>
            <p className="fs-1 text-end">&rdquo;</p>
          </div>
          <div className={clsx(styles['part-3'])}>
            <img src="/images/about-5.png" className="w-100" />
          </div>
        </div>
        <div className="col-3">
          <div className="w-100 h-100 d-flex flex-column justify-content-center">
          <h2>Transforming the Way the World Wears Bespoke</h2>
          <p>
            Luxury shouldn’t be reserved for the few—it should empower the many.
            Our vision is to democratize bespoke tailoring by bridging the gap
            between master artisans and global consumers. We aim to create a
            world where craftsmanship is celebrated, and quality is within
            reach.
          </p>
          </div>
        </div>

        <div className="col-6 p-5">
          <div className="w-100 h-100 d-flex flex-column justify-content-center">
            <h3>Global Artistry, Personalized for You</h3>
            <p className="fw-bold">
              At VYX, our mission is to deliver timeless craftsmanship through
              strategic partnerships. By working directly with the best
              artisans, we:
            </p>
            <ul className={clsx(styles["border-l--primary"])}>
              <li>
                Eliminate unnecessary markups, making luxury bespoke accessible.
              </li>
              <li>Champion ethical production and timeless design.</li>
              <li>
                Provide tailored solutions that enhance confidence and style for
                every customer.
              </li>
            </ul>
          </div>
        </div>
        <div className="col-6 vh-70 overflow-hidden">
          <img
            src="/images/about-3.png"
            alt="about 3"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="col-12 pt-5">
          <div className={clsx(styles["stars-container"])}>
            <div className={styles["star"]}></div>
            <div className={styles["star"]}></div>
            <div className={styles["star"]}></div>
            <div className={styles["star"]}></div>
            <div className={styles["star"]}></div>
          </div>
        </div>

        <div className="col-6 text-center m-auto">
          <h2>More Than Suits—A Commitment to Quality and Connection</h2>
          <p>
            A well-tailored suit is more than just clothing—it’s a symbol of
            confidence, ambition, and individuality. Our mission is to honor the
            skill of master artisans while ensuring their craft is celebrated
            globally. We aim to help you dress for success, knowing you’re
            wearing something made with care, precision, and purpose.
          </p>
          <p>
            With every suit, we bring the world closer together through shared
            values of excellence and accessibility.
          </p>
        </div>
      </section>

      <section className="row bg-secondary-light-color pt-5">
        <div className="col-6 vh-70">
          <div className="w-100 h-100 d-flex flex-column justify-content-center text-center ps-5 pe-4 align-items-center gap-3">
            <h2>Your Confidence, Our Commitment</h2>
            <p>
              At VYX, we don’t just make suits; we craft experiences. Our
              promise is to deliver not just garments, but a reflection of your
              individuality and ambition. When you wear our suits, you wear the
              culmination of tradition, skill, and innovation—all tailored just
              for you.
            </p>
            <button className={clsx("primary-btn")}>
              Learn More About Our Vision
            </button>
            <button className={clsx("primary-btn")}>
              Start Your Bespoke Journey
            </button>
          </div>
        </div>
        <div className="col-6 vh-70">
          <img
            src="/images/about-2.png"
            alt="about 4"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </section>
    </>
  );
}
