import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "@/styles/carousel.component.module.scss";

interface CarouselProps {
  images: string[];
  onPaginate?: (direction: number) => void; // Add prop for parent control
}

const Carousel = ({ images, onPaginate }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [direction, setDirection] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const holdTimerRef = useRef<NodeJS.Timeout>();

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      scale: 0.8,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      scale: 1,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      scale: 0.8,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
    // Call parent handler if provided
    if (onPaginate) {
      onPaginate(newDirection);
    }
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault(); // Prevent default scroll behavior
    if (e.deltaY > 0) {
      paginate(1);
    } else {
      paginate(-1);
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    setStartX(e.pageX);
    holdTimerRef.current = setTimeout(() => {
      setIsHolding(true);
    }, 200); // Hold for 200ms to activate
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isHolding) return;

    const currentX = e.pageX;
    const diff = currentX - startX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        paginate(-1); // Move right
      } else {
        paginate(1); // Move left
      }
      setIsHolding(false);
      setStartX(currentX);
    }
  };

  const handleMouseUp = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
    setIsHolding(false);
  };

  const handleTouchStart = (e: TouchEvent) => {
    setStartX(e.touches[0].pageX);
    holdTimerRef.current = setTimeout(() => {
      setIsHolding(true);
    }, 200);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isHolding) return;

    const currentX = e.touches[0].pageX;
    const diff = currentX - startX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        paginate(-1);
      } else {
        paginate(1);
      }
      setIsHolding(false);
      setStartX(currentX);
    }
  };

  const handleTouchEnd = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }
    setIsHolding(false);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // Mouse events
      container.addEventListener("mousedown", handleMouseDown);
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("mouseleave", handleMouseUp);

      // Touch events  
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove);
      container.addEventListener("touchend", handleTouchEnd);

      // Wheel event
      container.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        container.removeEventListener("mousedown", handleMouseDown);
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("mouseleave", handleMouseUp);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, [isHolding, startX]);

  const handlePreviewClick = (direction: number) => {
    paginate(direction);
  };

  return (
    <div className={styles.carouselContainer} ref={containerRef}>
      <div className={styles.carousel}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className={styles.slide}
          >
            <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
          </motion.div>
        </AnimatePresence>

        {/* Side previews */}
        <div
          className={styles.preview + " " + styles.previewLeft}
          onClick={() => handlePreviewClick(-1)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={
              images[currentIndex === 0 ? images.length - 1 : currentIndex - 1]
            }
            alt="Previous"
          />
        </div>
        <div
          className={styles.preview + " " + styles.previewRight}
          onClick={() => handlePreviewClick(1)}
          style={{ cursor: "pointer" }}
        >
          <img
            src={
              images[currentIndex === images.length - 1 ? 0 : currentIndex + 1]
            }
            alt="Next"
          />
        </div>
{/* 
        <button
          className={styles.navButton + " " + styles.prevButton}
          onClick={() => paginate(-1)}
        >
          ‹
        </button>
        <button
          className={styles.navButton + " " + styles.nextButton}
          onClick={() => paginate(1)}
        >
          ›
        </button> */}
      </div>
    </div>
  );
};

export default Carousel;
