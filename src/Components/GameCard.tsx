import { useAppContext } from "../Context/AppContext";

const GameCard = () => {
  const { theme, themeColor } = useAppContext();
  const curr = themeColor[theme];

  return (
    <div className="card" style={{ width: "300px" }}>
      <img src="DaysGone.jpg" className="card-img-top" alt="..." />
      <div
        className="card-body"
        style={{
          background: `${curr.boxColor}`,
          color: `${curr.color === "#000000" ? "#ffffff" : "#000000"}`,
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
    </div>
  );
};

export default GameCard;
