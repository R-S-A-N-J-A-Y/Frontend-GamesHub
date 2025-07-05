import { useState } from "react";
import type { Platform } from "../Context/GameContext";
import { useAppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

type GameData = {
  _id: string;
  name: string;
  coverImageUrl: string;
  peopleAdded: number;
  ratings: number;
  likes: number;
  platforms: Platform[];
  price: number;
};

const LibraryPage = () => {
  const { theme, themeColor } = useAppContext();
  const currTheme = themeColor[theme];
  const Navigate = useNavigate();

  const [games, setGames] = useState<GameData | null>(null);

  return (
    <div>
      <p className="fw-bold fs-3 m-0 mb-4">Library</p>
      {!games ? (
        <div className="d-flex flex-column align-items-center">
          <h2 className="fs-3 font-bolder mb-2">
            Your Library Is{" "}
            <span style={{ color: `${currTheme.highLight}` }}>Empty.</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-4 text-center">
            You haven’t added any games yet.
            <br />
            Found something cool? Add it to your Library!
          </p>
          <div>
            <button
              className="btn fw-bold w-100"
              style={{ background: `${currTheme.highLight}` }}
              onClick={() => Navigate("/explore")}
            >
              Browse Games
            </button>
          </div>
        </div>
      ) : (
        <div>ge</div>
      )}
    </div>
  );
};

export default LibraryPage;
