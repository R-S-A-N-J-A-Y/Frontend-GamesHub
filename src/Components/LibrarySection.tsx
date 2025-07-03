import LibraryCard from "./LibraryCard";
import { useAppContext, type ThemeObj } from "../Context/AppContext";
import { MdDoubleArrow } from "react-icons/md";
import styled from "styled-components";
import { CardHoverAnimation } from "./GameCard";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useGameContext } from "../Context/GameContext";
import { useNavigate } from "react-router-dom";
import UndoSection from "./UndoSection";

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
    padding: 1rem 1.5rem;
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

  const { theme, themeColor } = useAppContext();
  const currTheme = themeColor[theme];

  const [watchList, setWatchList] = useState<WatchListDataType[]>([]);
  const [showUndo, setShowUndo] = useState<boolean>(false);
  const isUndoRef = useRef<boolean | null>(null);
  const deletedItemRef = useRef<WatchListDataType | null>(null);

  const handleRemove = (id: string) => {
    setShowUndo(true);
    const deletedItem = watchList.find((game) => game._id == id);
    if (!deletedItem) return;
    deletedItemRef.current = deletedItem;
    setWatchList(watchList.filter((game) => game._id !== id));

    setTimeout(() => {
      if (isUndoRef.current) return;
      ToggleWatchList(id, true);
      setShowUndo(false);
    }, 5000);
  };

  const handleUndo = () => {
    isUndoRef.current = true;
    if (deletedItemRef.current)
      setWatchList((prev) => [...prev, deletedItemRef.current!]);
    setShowUndo(false);
  };

  const cancelShowUndo = () => {
    setShowUndo(false);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/watchListPreview`,
          {
            headers: { "x-auth-token": token },
          }
        );
        setWatchList(result.data.data);
      } catch (err) {
        console.log(err);
        alert(err);
      }
    };
    fetch();
  }, [token]);

  return (
    <Wrapper
      theme={currTheme}
      className="flex-fill border rounded-4 d-flex flex-column gap-4 w-100"
    >
      {" "}
      {showUndo && (
        <UndoSection
          handleUndo={handleUndo}
          cancelShowUndo={cancelShowUndo}
          message={`Oops! You just removed an item.\nWant to Undo that?`}
        />
      )}
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
        <div className="d-flex flex-column gap-5 px-2">
          {watchList.map((data, index) => (
            <LibraryCard game={data} key={index} onClick={handleRemove} />
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default LibrarySection;
