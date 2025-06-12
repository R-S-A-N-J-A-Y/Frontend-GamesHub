import styled from "styled-components";
import { useAppContext, type ThemeObj } from "../Context/AppContext";
import { MdAddToPhotos } from "react-icons/md";
import { CardHoverAnimation } from "./GameCard";

const Card = styled.div<{ theme: ThemeObj }>`
  height: 250px;
  background: ${({ theme }) => theme.boxColor};
  ${CardHoverAnimation}
`;

const ContentWrapper = styled.section`
  padding: 48px;

  @media (max-width: 400px) {
    padding: 20px;
  }

  @media (min-width: 400px) and (max-width: 500px) {
    padding: 30px;
  }
`;

const NewCard = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 0.92rem;
  padding: 5px 12px;
`;

const HeroCard = () => {
  const { theme, themeColor } = useAppContext();
  const currTheme = themeColor[theme];
  return (
    <Card className="card" style={{}}>
      <img
        src="DaysGone.jpg"
        className="card-img h-100"
        style={{ objectFit: "cover" }}
        alt="Preview"
      />
      <ContentWrapper className="card-img-overlay d-flex flex-column justify-content-between gap-2 flex-fill m-3 text-white">
        <NewCard className="border rounded-3">New</NewCard>
        <p className="fw-bold m-0 p-0" style={{ fontSize: "1.25rem" }}>
          Days Gone Remastered
        </p>
        <p className="m-0 p-0" style={{ fontSize: "1.15rem" }}>
          $78
        </p>
        <div className="d-flex align-items-center gap-3 flex-wrap">
          <button
            className="btn fw-bold"
            style={{
              background: `${currTheme.highLight}`,
            }}
          >
            Purchase
          </button>
          <button
            className="btn d-flex align-items-center gap-1 border"
            style={{
              background: `${currTheme.boxColor}`,
              color: currTheme.name === "dark" ? "#ffffff" : "#000000",
            }}
          >
            <MdAddToPhotos size={20} />
            Add to Cart
          </button>
        </div>
      </ContentWrapper>
    </Card>
  );
};

export default HeroCard;
