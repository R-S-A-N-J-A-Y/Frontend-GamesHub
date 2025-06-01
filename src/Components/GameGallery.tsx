import { motion, useMotionValue } from "framer-motion";
import GameScreenshotCard from "./GameScreenshotCard";
import { useEffect, useRef, useState } from "react";

interface Props {
  screenshots: string[];
}

const GameGallery = ({ screenshots }: Props) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const firstCardRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);

  const [halfWidth, setHalfWidth] = useState(0);

  const [halfCardPlusGap, setHalfCardPlusGap] = useState(0);

  useEffect(() => {
    if (!carouselRef.current) return;
    const fullScrollWidth = carouselRef.current.scrollWidth;
    setHalfWidth(fullScrollWidth / 2);
  }, [screenshots]);

  useEffect(() => {
    if (!firstCardRef.current) return;
    const cardEl = firstCardRef.current;
    const cardWidth = cardEl.offsetWidth;
    const gapPx = 48;
    setHalfCardPlusGap((cardWidth + gapPx) / 2);
  }, [screenshots]);

  useEffect(() => {
    if (halfWidth > 0 && halfCardPlusGap > 0) {
      if (halfCardPlusGap < halfWidth) {
        x.set(-halfCardPlusGap);
      }
    }
  }, [halfWidth, halfCardPlusGap, x]);

  useEffect(() => {
    return x.onChange((latest) => {
      if (latest < -halfWidth) {
        x.set(latest + halfWidth);
      } else if (latest > 0) {
        x.set(latest - halfWidth);
      }
    });
  }, [x, halfWidth]);

  const extendedScreenshots = [...screenshots, ...screenshots];

  return (
    <div className="d-flex flex-column gap-5">
      <h2 className="ms-5 mt-4">Game Gallery</h2>

      <motion.div
        ref={carouselRef}
        style={{ cursor: "grab", overflow: "hidden" }}
      >
        <motion.div
          style={{ x }}
          drag="x"
          dragElastic={0.2}
          dragConstraints={{ left: -Infinity, right: Infinity }}
          whileTap={{ cursor: "grabbing" }}
          className="d-flex gap-5"
        >
          {extendedScreenshots.map((imgUrl, idx) => (
            <motion.div
              key={idx}
              ref={idx === 0 ? firstCardRef : null}
              style={{ minWidth: 500 }}
            >
              <GameScreenshotCard imgUrl={imgUrl} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GameGallery;
