import LibraryCard from "./LibraryCard";
import { useAppContext, type ThemeObj } from "../Context/AppContext";
import { MdDoubleArrow } from "react-icons/md";
import styled from "styled-components";
import { CardHoverAnimation } from "./GameCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useGameContext } from "../Context/GameContext";
import { useNavigate } from "react-router-dom";

export const ArrowIcon = styled(MdDoubleArrow)`
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateX(6px); /* move 4px to the right */
  }
`;

const Wrapper = styled.div<{ theme: ThemeObj }>`
  background: ${({ theme }) => theme.boxColor};
  padding: 1.5rem 3rem;
  ${CardHoverAnimation};

  @media (max-width: 450px) {
    padding: 1rem 2rem;
  }
`;

export interface WatchListDataType {
  name: string;
  _id: string;
  shortName: string;
  coverImageUrl: string;
  platforms: {
    _id: string;
    name: string;
  }[];
  addedAt: string;
}

const LibrarySection = () => {
  const Navigate = useNavigate();
  const {
    state: { token },
  } = useAuth();
  const { ToggleWatchList } = useGameContext();

  const { theme, themeColor, backendUrl } = useAppContext();
  const currTheme = themeColor[theme];

  const [watchList, setWatchList] = useState<WatchListDataType[]>([]);

  const handleRemove = (id: string) => {
    setWatchList(watchList.filter((game) => game._id !== id));
    ToggleWatchList(id, true);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(`${backendUrl}/user/watchListPreview`, {
          headers: { "x-auth-token": token },
        });
        setWatchList(result.data.data);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    };
    fetch();
  }, [token, backendUrl]);

  return (
    <Wrapper
      theme={currTheme}
      className="flex-fill border rounded-4 d-flex flex-column gap-3 w-100"
    >
      <div className="d-flex justify-content-between align-items-center pe-2">
        <p className="fw-bold fs-4 m-0">Library</p>
        <ArrowIcon size={25} color={`${currTheme.highLight}`} />
      </div>

      {watchList.length === 0 ? (
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
        watchList.map((data, index) => (
          <div key={index} className="d-flex gap-5">
            <LibraryCard game={data} onClick={handleRemove} />
          </div>
        ))
      )}
    </Wrapper>
  );
};

export default LibrarySection;
