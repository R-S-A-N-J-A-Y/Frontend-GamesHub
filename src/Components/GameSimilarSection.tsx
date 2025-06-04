import { motion } from "framer-motion";
import GameCard from "./GameCard";
import { useRef } from "react";

const data = {
  _id: "string",
  name: "string",
  coverImageUrl: "string",
  peopleAdded: 0,
  ratings: 0,
  likes: 0,
  liked: true, //Only Available when User Logged In
  watched: true,
};

const cards = [...Array(5)];

const GameSimilarSection = () => {
  const ExtendedCards = [...cards, ...cards];
  const CarouselEffect = useRef<HTMLDivElement | null>(null);

  return (
    <div className="d-flex flex-column gap-5 px-5">
      <h2>You May like this too...</h2>
      <motion.div
        ref={CarouselEffect}
        style={{ overflow: "hidden", cursor: "grab" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: -Infinity, right: Infinity }}
          className="d-flex gap-4"
          whileTap={{ cursor: "grabbing" }}
        >
          {ExtendedCards.map((_) => (
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
