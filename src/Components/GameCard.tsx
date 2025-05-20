import styled from "styled-components";
import { useAppContext } from "../Context/AppContext";
import { MdAddToPhotos } from "react-icons/md";
import { GoHeartFill } from "react-icons/go";

const Card = styled.div`
  width: 300px;
  border: none;
  border-radius: 10px;
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease-in;

  &:hover {
    box-shadow: 2px 2px 10px rgba(117, 112, 112, 0.53);
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
        style={{ borderRadius: "10px 10px 0 0" }}
        alt="..."
      />
      <div
        className="card-body"
        style={{
          background: `${curr.boxColor}`,
          color: `${curr.name === "dark" ? "#ffffff" : "#000000"}`,
          borderRadius: "0px 0px 10px 10px",
        }}
      >
        <div className="d-flex flex-column gap-2">
          <p className="fs-5 fw-bold m-0 p-0">Days Gone Remastered</p>
          <div className="d-flex align-items-center gap-4">
            <p className="m-0 p-0" style={{ fontSize: "20px" }}>
              $78
            </p>
          </div>
          <div className="d-flex gap-2">
            <button
              className="p-1"
              style={{ border: "none", background: "none" }}
            >
              <GoHeartFill size={29} color="red" />{" "}
            </button>
            <a
              href="#"
              className="btn fw-bold w-100"
              style={{ background: `${curr.highLight}` }}
            >
              Purchase
            </a>
            <button
              className={`btn d-flex align-items-center gap-1 border text-${
                theme === "dark" ? "white" : "black"
              }`}
            >
              <MdAddToPhotos
                size={20}
                color={theme === "dark" ? "white" : "black"}
              />{" "}
              ADD
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GameCard;
