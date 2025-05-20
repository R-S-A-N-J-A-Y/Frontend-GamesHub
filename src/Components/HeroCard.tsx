import styled from "styled-components";
import { useAppContext, type ThemeObj } from "../Context/AppContext";
import { MdAddToPhotos } from "react-icons/md";

const Card = styled.div<{ theme: ThemeObj }>`
  height: 250px;
  background: ${({ theme }) => theme.boxColor};
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }
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
      <div className="card-img-overlay d-flex flex-column justify-content-between gap-2 flex-fill p-5 m-3 text-white">
        <p className="border rounded-4 px-4 py-2 position-absolute top-0 end-0 mt-3 me-3">
          New
        </p>
        <p className="fs-2 fw-bold m-0 p-0">Days Gone Remastered</p>
        <p className="fs-4 m-0 p-0">$78</p>
        <div className="d-flex gap-3">
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
      </div>
    </Card>
  );
};

export default HeroCard;
