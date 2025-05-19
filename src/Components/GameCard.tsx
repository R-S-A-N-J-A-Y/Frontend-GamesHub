import styled from "styled-components";
import { useAppContext } from "../Context/AppContext";

const Card = styled.div`
  width: 300px;
  border: none;
  border-radius: 18px;
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease-in;

  &:hover {
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.29);
    transform: scale(1.02);
  }
`;

const GameCard = () => {
  const { theme, themeColor } = useAppContext();
  const curr = themeColor[theme];

  return (
    <Card className="card">
      <img
        src="DaysGone.jpg"
        className="card-img-top"
        style={{ borderRadius: "18px 18px 0 0" }}
        alt="..."
      />
      <div
        className="card-body"
        style={{
          background: `${curr.boxColor}`,
          color: `${curr.color === "#000000" ? "#ffffff" : "#000000"}`,
          borderRadius: "0px 0px 18px 18px",
        }}
      >
        <h5 className="card-title">Days Gone</h5>
        <p className="card-text">
          Some quick example text to build on the card title and make up the
          bulk of the card’s content.
        </p>
        <a
          href="#"
          className="btn fw-bold"
          style={{ background: `${curr.highLight}` }}
        >
          Purchase
        </a>
      </div>
    </Card>
  );
};

export default GameCard;
