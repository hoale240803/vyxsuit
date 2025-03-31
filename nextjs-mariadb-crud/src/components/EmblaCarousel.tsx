"use client"; // Only needed for Next.js App Router (13+)

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect } from "react";
import styles from "@/styles/carousel.module.scss";

interface EmblaCarouselProps {
  indexSelected: number;
    // Add props for your carousel component
  children: React.ReactNode; // Add prop for your carousel children (e.g., images)
}

export default function EmblaCarousel({ children, indexSelected }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "center" });

  const scrollToSlide = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    scrollToSlide(indexSelected);
  }, [indexSelected, scrollToSlide]);

  // Scroll to next slide
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Scroll to previous slide
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  return (
    <div className={styles["embla"]}>
      <div className={styles["embla__viewport"]} ref={emblaRef}>
        <div className={styles["embla__container"]}>
          {/* {images.map((img, index) => (
            <div className="embla__slide" key={index}>
              <img
                src={img.S3Url}
                alt={img.Code}
                onClick={() => console.log("Clicked:", img.Code)}
              />
            </div>
          ))} */}

          {children}
        </div>
      </div>
      <button className={styles["embla__prev"]} onClick={scrollPrev}>
        ◀
      </button>
      <button className={styles["embla__next"]} onClick={scrollNext}>
        ▶
      </button>
    </div>
  );
}
