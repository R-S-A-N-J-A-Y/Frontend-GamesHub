import LibraryCard from "./LibraryCard";
import { useAppContext, type ThemeObj } from "../Context/AppContext";
import { MdDoubleArrow } from "react-icons/md";
import styled from "styled-components";
import { CardHoverAnimation } from "./GameCard";

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

const LibrarySection = () => {
  const { theme, themeColor } = useAppContext();
  const currTheme = themeColor[theme];
  return (
    <Wrapper className="flex-fill  border rounded-4 px-5 py-4 d-flex flex-column gap-3">
      <div className="d-flex justify-content-between align-items-center pe-2">
        <p className="fw-bold fs-4 m-0">Library</p>
        <ArrowIcon size={25} color={`${currTheme.highLight}`} />
      </div>

      <div className="d-flex flex-column gap-4">
        {[...Array(3)].map(() => (
          <LibraryCard />
        ))}
      </div>
    </Wrapper>
  );
};

export default LibrarySection;
