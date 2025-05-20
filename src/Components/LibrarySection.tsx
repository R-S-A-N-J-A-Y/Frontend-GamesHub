import LibraryCard from "./LibraryCard";
import { useAppContext } from "../Context/AppContext";
import { MdDoubleArrow } from "react-icons/md";
import styled from "styled-components";

const ArrowIcon = styled(MdDoubleArrow)`
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateX(6px); /* move 4px to the right */
  }
`;

const LibrarySection = () => {
  const { theme, themeColor } = useAppContext();
  const currTheme = themeColor[theme];
  return (
    <div
      className="border rounded-3 p-3 w-50 d-flex flex-column gap-3"
      style={{ background: `${currTheme.boxColor}` }}
    >
      <div className="d-flex justify-content-between align-items-center pe-2">
        <p className="fw-bold fs-4 m-0">Library</p>
        <ArrowIcon size={25} color={`${currTheme.highLight}`} />
      </div>

      <div className="d-flex flex-column gap-4">
        {[...Array(3)].map(() => (
          <LibraryCard />
        ))}
      </div>
    </div>
  );
};

export default LibrarySection;
