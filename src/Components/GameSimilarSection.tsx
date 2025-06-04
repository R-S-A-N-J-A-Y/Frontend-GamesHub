import { motion } from "framer-motion";
import GameCard from "./GameCard";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../Context/AppContext";

const data = {
  _id: "string",
  name: "string",
  coverImageUrl:
    "https://ik.imagekit.io/sanjayvault/GamesHub/Game%20Previews/Days%20Gone/Preview/DaysGone.png",
  peopleAdded: 0,
  ratings: 0,
  likes: 0,
  liked: true, //Only Available when User Logged In
  watched: true,
};

const cards = [...Array(5)];

const GameSimilarSection = () => {
  const { theme, themeColor } = useAppContext();
  const curr = themeColor[theme];

  const CarouselEffect = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!CarouselEffect.current) return;
    setWidth(
      CarouselEffect.current.scrollWidth - CarouselEffect.current.offsetWidth
    );
  }, []);

  return (
    <div className="d-flex flex-column gap-5 mb-5">
      <div className="text-center px-5">
        <h4 className="text-secondary fw-bold">Don’t stop here!</h4>
        <h2 className="fw-bolder">
          Discover something else worth{" "}
          <span style={{ color: curr.highLight }}>Exploring.</span>{" "}
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
        >
          {cards.map((_) => (
            <motion.div key={_}>
              <GameCard game={data} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default GameSimilarSection;
