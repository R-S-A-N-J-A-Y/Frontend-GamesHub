import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import GameCard from "./GameCard";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import type { Gamedata } from "../Context/GameContext";
import GameCardSkeleton from "./GameCardSkeleton";
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { ArrowIcon } from "./LibrarySection";

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
  }, [gameData]); // recalculate when data changes

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
            <span className="fw-bold" style={{ color: curr.highLight }}>
              Game
            </span>{" "}
            Here.
          </h2>
          <div>
            <button
              className="btn fw-bold w-100"
              style={{ background: curr.highLight }}
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
          marginLeft: "-120px",
          marginRight: "-15px",
          paddingLeft: "120px",
          paddingRight: "20px", // ensure last item isn't clipped
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
            gameData.map((game, index) => (
              <motion.div key={index} style={{ flex: "0 0 auto" }}>
                <GameCard game={game} cardWidth="300px" />
              </motion.div>
            ))}

          {isLoading &&
            [...Array(5)].map((_, index) => (
              <motion.div key={index} style={{ flex: "0 0 auto" }}>
                <GameCardSkeleton cardWidth="300px" />
              </motion.div>
            ))}

          {/* spacer for end visibility */}
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ width: "500px" }}
          >
            <button
              className="btn fw-bold w-100 fs-5 d-flex gap-3 justify-content-center align-items-center"
              style={{ background: `${curr.highLight}` }}
              onClick={() => Navigate("/explore")}
            >
              Explore
              <ArrowIcon size={25} />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContinueSection;
