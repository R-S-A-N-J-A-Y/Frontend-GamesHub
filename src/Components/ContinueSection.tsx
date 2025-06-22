import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import GameCard from "./GameCard";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import type { Gamedata } from "../Context/GameContext";
import GameCardSkeleton from "./GameCardSkeleton";
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

const ContinueSection = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(0);

  const {
    state: { token },
  } = useAuth();
  const [gameData, setGameData] = useState<Gamedata[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { theme, themeColor, backendUrl } = useAppContext();
  const curr = themeColor[theme];
  const Navigate = useNavigate();

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
        const result = await axios.get(`${backendUrl}/user/recentlyWatched/`, {
          headers: { "x-auth-token": token },
        });
        setGameData(result.data.data);
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    };
    fetch();
  }, [backendUrl, token]);

  if (gameData.length === 0)
    return (
      <div>
        <p className="fw-bold fs-2 m-0">Continue Where you Left</p>
        <div className="d-flex flex-column align-items-center p-5 gap-3">
          <h2 className="fs-3 font-bolder mb-2">
            Explore Your First{" "}
            <span className="fw-bold" style={{ color: `${curr.highLight}` }}>
              Game
            </span>{" "}
            Here.
          </h2>
          <div>
            <button
              className="btn fw-bold w-100"
              style={{ background: `${curr.highLight}` }}
              onClick={() => Navigate("/explore")}
            >
              Browse Games
            </button>
          </div>
        </div>
      </div>
    );

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
          {!isLoading &&
            gameData.map((game, _) => (
              <motion.div key={_} style={{ flex: "0 0 auto" }}>
                <GameCard game={game} cardWidth="300px" />
              </motion.div>
            ))}

          {isLoading &&
            [...Array(5)].map((_, key) => (
              <motion.div key={key} style={{ flex: "0 0 auto" }}>
                <GameCardSkeleton cardWidth="300px" />
              </motion.div>
            ))}

          <div style={{ flex: "0 0 auto", width: "10px" }} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContinueSection;
