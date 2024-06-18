import React from "react";
import { motion } from "framer-motion";

// Define the array of slides with numbers

const InfiniteHorizontalScrollSlide = ({ slides }: { slides: any }) => {
  // Duplicate the slides array to ensure seamless looping
  const duplicatedSlides = [...slides, ...slides];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Wrapping div for seamless looping */}
      <motion.div
        className="flex"
        animate={{
          x: ["-100%", "0%"],
          transition: {
            ease: "linear",
            duration: 15,
            repeat: Infinity,
          },
        }}
      >
        {/* Render duplicated slides */}
        {duplicatedSlides.map((slide, index) => (
          <div
            key={index}
            style={{ width: `${100 / slides.length}%` }}
            className={`flex-shrink-0 max-sm:!w-fit`}
          >
            <div className="flex flex-col items-center justify-center h-full text-6xl">
              {slide}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteHorizontalScrollSlide;
