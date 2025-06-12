import { motion, useMotionValue } from "framer-motion";
import GameScreenshotCard from "./GameScreenshotCard";
import { useEffect, useRef, useState } from "react";
import type { ThemeObj } from "../Context/AppContext";
import styled from "styled-components";

interface Props {
  screenshots: string[];
  theme: ThemeObj;
}

const ScreenshotWrapper = styled(motion.div)`
  min-width: 500px;

  @media (max-width: 768px) {
    min-width: 90%;
  }
`;

const GameGallery = ({ screenshots, theme }: Props) => {
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
    return x.on("change", (latest) => {
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
      <div className="text-center p-5">
        <h5 className="text-secondary fw-bold mb-4">
          Curious how the game looks?
        </h5>
        <h2 className="fw-bolder">
          Get a sneak peek before{" "}
          <span style={{ color: theme.highLight }}>you play !</span>{" "}
        </h2>
      </div>

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
            <ScreenshotWrapper key={idx} ref={idx === 0 ? firstCardRef : null}>
              <GameScreenshotCard imgUrl={imgUrl} />
            </ScreenshotWrapper>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GameGallery;
