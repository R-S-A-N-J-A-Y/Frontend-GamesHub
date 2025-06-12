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

  const SampleGameData = {
    _id: "string",
    name: "string",
    coverImageUrl:
      "https://ik.imagekit.io/sanjayvault/GamesHub/Game%20Previews/Days%20Gone/Preview/DaysGone.png",
    peopleAdded: 0,
    ratings: 0,
    likes: 0,
    price: 0,

    platforms: [{ _id: "123", parentPlatform: { name: "PC", _id: "akhd" } }],

    liked: true, //Only Available when User Logged In
    watched: true,
  };

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
          {[...Array(5)].map((_, i) => (
            <motion.div key={i} style={{ flex: "0 0 auto" }}>
              <GameCard game={SampleGameData} cardWidth="300px" />
            </motion.div>
          ))}
          <div style={{ flex: "0 0 auto", width: "10px" }} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContinueSection;
