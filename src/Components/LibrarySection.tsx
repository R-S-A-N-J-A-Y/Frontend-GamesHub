import LibraryCard from "./LibraryCard";
import { useAppContext, type ThemeObj } from "../Context/AppContext";
import { MdDoubleArrow } from "react-icons/md";
import styled from "styled-components";
import { CardHoverAnimation } from "./GameCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { useGameContext } from "../Context/GameContext";

export const ArrowIcon = styled(MdDoubleArrow)`
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateX(6px); /* move 4px to the right */
  }
`;

const Wrapper = styled.div<{ theme: ThemeObj }>`
  background: ${({ theme }) => theme.boxColor};
  ${CardHoverAnimation};
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
}

const LibrarySection = () => {
  const {
    state: { token },
  } = useAuth();
  const { ToggleWatchList } = useGameContext();
  const { theme, themeColor } = useAppContext();
  const currTheme = themeColor[theme];

  const [watchList, setWatchList] = useState<WatchListDataType[]>([]);

  const handleRemove = (id: string) => {
    setWatchList(watchList.filter((game) => game._id !== id));
    ToggleWatchList(id, false);
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/user/watchListPreview",
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
      className="flex-fill  border rounded-4 px-5 py-4 d-flex flex-column gap-3"
    >
      <div className="d-flex justify-content-between align-items-center pe-2">
        <p className="fw-bold fs-4 m-0">Library</p>
        <ArrowIcon size={25} color={`${currTheme.highLight}`} />
      </div>

      <div className="d-flex flex-column gap-4">
        {watchList.map((data, index) => (
          <div key={index}>
            <LibraryCard game={data} onClick={handleRemove} />
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default LibrarySection;
