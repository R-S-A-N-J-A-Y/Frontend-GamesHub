import { motion } from "framer-motion";
import GameScreenshotCard from "./GameScreenshotCard";
import { useEffect, useRef, useState } from "react";

interface Props {
  screenshots: string[];
}

const GameGallery = ({ screenshots }: Props) => {
  const CarouselRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (CarouselRef.current) {
      setWidth(
        CarouselRef.current.scrollWidth - CarouselRef.current.offsetWidth
      );
    }
  }, [screenshots]);

  return (
    <div className="d-flex flex-column gap-5">
      <h2 className="ms-5 mt-4">Game Gallery</h2>

      <motion.div
        ref={CarouselRef}
        style={{ cursor: "grab", overflow: "hidden" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="d-flex gap-5"
          whileTap={{ cursor: "grabbing" }}
        >
          {screenshots.map((img, idx) => (
            <motion.div key={idx} style={{ minWidth: 500 }}>
              <GameScreenshotCard imgUrl={img} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GameGallery;
