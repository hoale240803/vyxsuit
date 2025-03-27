"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

const ProductSlider = ({ images }: { images: string[] }) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();
  const imageWidth = 240; // Chiều rộng mỗi ảnh (px)

  useEffect(() => {
    if (isHovered) {
      controls.start({ x: `-${(images.length - 1) * imageWidth}px` });
    } else {
      controls.stop();
    }
  }, [isHovered, controls, images.length]);

  return (
    <div
      className="w-60 h-60 overflow-hidden relative rounded-lg shadow-lg border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="flex"
        animate={controls}
        initial={{ x: 0 }}
        transition={{ ease: "easeInOut", duration: 3, repeat: Infinity }}
      >
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Product ${index}`}
            className="w-60 h-60 object-cover"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ProductSlider;
