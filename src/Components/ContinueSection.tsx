import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import GameCard from "./GameCard";

const ContinueSection = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const fullScrollWidth = carousel.scrollWidth;
      const visibleWidth = carousel.offsetWidth;
      setWidth(fullScrollWidth - visibleWidth);
    }
  }, []);

  return (
    <div>
      <p className="fw-bold fs-2 mb-4">Continue Where you Left</p>

      <motion.div
        ref={carouselRef}
        className="overflow-hidden position-relative"
        style={{
          cursor: "grab",
          marginLeft: "-120px", // Start under sidebar
          marginRight: "-50px",
          paddingLeft: "120px", // Room for first card
          zIndex: 0,
        }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="d-flex gap-5"
        >
          {[...Array(5)].map((_, i) => (
            <motion.div key={i} style={{ flex: "0 0 auto" }}>
              <GameCard />
            </motion.div>
          ))}
          <div style={{ flex: "0 0 auto", width: "10px" }} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContinueSection;
