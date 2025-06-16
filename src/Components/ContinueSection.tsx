import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import GameCard from "./GameCard";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import type { Gamedata } from "../Context/GameContext";

const ContinueSection = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  const {
    state: { token },
  } = useAuth();
  const [gameData, setGameData] = useState<Gamedata[]>([]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const fullScrollWidth = carousel.scrollWidth;
      const visibleWidth = carousel.offsetWidth;
      setWidth(fullScrollWidth - visibleWidth);
    }
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/user/recentlyWatched/",
          { headers: { "x-auth-token": token } }
        );
        setGameData(result.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, [token]);

  return (
    <div>
      <p className="fw-bold fs-2 m-0">Continue Where you Left</p>
      <motion.div
        ref={carouselRef}
        className="overflow-hidden position-relative"
        style={{
          cursor: "grab",
          padding: "20px",
          marginLeft: "-120px", // Start under sidebar
          marginRight: "-15px",
          paddingLeft: "120px", // Room for first card
          zIndex: 0,
        }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="d-flex gap-5"
          whileTap={{ cursor: "grabbing" }}
        >
          {gameData.map((game, _) => (
            <motion.div key={_} style={{ flex: "0 0 auto" }}>
              <GameCard game={game} cardWidth="300px" />
            </motion.div>
          ))}
          <div style={{ flex: "0 0 auto", width: "10px" }} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContinueSection;
