import { motion } from "framer-motion";
import GameCard from "./GameCard";
import { useEffect, useRef, useState } from "react";
import { type ThemeObj } from "../Context/AppContext";
import axios from "axios";
import qs from "qs";
import type { Gamedata } from "../Context/GameContext";

interface Props {
  theme: ThemeObj;
  genres: string[];
}

const GameSimilarSection = ({ theme, genres }: Props) => {
  const CarouselEffect = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  const [similarGenre, setSimilarGenre] = useState<Gamedata[]>([]);

  useEffect(() => {
    const carousel = CarouselEffect.current;
    if (!carousel) return;

    const calculateWidth = () => {
      const fullScrollWidth = carousel.scrollWidth;
      const visibleWidth = carousel.offsetWidth;
      setWidth(fullScrollWidth - visibleWidth + 100); // +60 buffer
    };

    calculateWidth();

    const resizeObserver = new ResizeObserver(calculateWidth);
    resizeObserver.observe(carousel);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/games/genres`,
          {
            params: { genres },
            paramsSerializer: (genres) =>
              qs.stringify(genres, { arrayFormat: "repeat" }),
          }
        );
        setSimilarGenre(result.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [genres]);

  return (
    <div className="d-flex flex-column gap-5 mb-5">
      <div className="text-center px-5">
        <h5 className="text-secondary fw-bold mb-4">Don’t stop here!</h5>
        <h2 className="fw-bolder">
          Discover something else worth{" "}
          <span style={{ color: theme.highLight }}>Exploring.</span>{" "}
        </h2>
      </div>

      <motion.div
        ref={CarouselEffect}
        style={{ overflow: "hidden", cursor: "grab", padding: "20px" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -width, right: 0 }}
          className="d-flex gap-5"
          whileTap={{ cursor: "grabbing" }}
          style={{ minWidth: "fit-content" }}
        >
          {similarGenre.map((game, idx) => (
            <motion.div key={idx}>
              <GameCard game={game} cardWidth="300px" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GameSimilarSection;
