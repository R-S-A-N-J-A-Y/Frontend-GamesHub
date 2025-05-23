import styled from "styled-components";
import { CardHoverAnimation } from "./GameCard";
import type { ExploreCategoryItem } from "../Context/GameContext";
import { useNavigate } from "react-router-dom";

const Card = styled.div`
  height: 280px;
  cursor: pointer;
  ${CardHoverAnimation}
`;

interface Props {
  data: ExploreCategoryItem;
  type: string;
}

const ExploreCategoryCard = ({ data, type }: Props) => {
  const Navigate = useNavigate();

  const onCategoryCardClick = (id: string) => {
    Navigate(`/explore/${type}/${id}`);
  };

  return (
    <Card
      className="card text-bg-dark d-flex align-items-center justify-content-center border border-2 rounded-4"
      onClick={() => onCategoryCardClick(data._id)}
    >
      <img
        src="/DaysGone.jpg"
        className="card-img rounded-4"
        style={{
          objectFit: "cover",
          height: "100%",
          opacity: "0.7",
        }}
        alt="Preview"
      />
      <div
        className="card-img-overlay text-center d-flex flex-column justify-content-around rounded-4"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <h5 className="card-title fw-bold fs-2">
          <span className="border border-top-0 border-start-0 border-end-0  d-inline-block p-2">
            {data.name}
          </span>
        </h5>

        <div>
          <p
            className="border px-4 py-2 rounded-2 d-inline-block fw-bold"
            style={{
              background: "transparent",
              backdropFilter: "blur(10px)",
            }}
          >
            View
          </p>
        </div>

        <div className="d-flex flex-column gap-2">
          <div className="d-flex justify-content-between px-2 py-1 border-bottom fw-bold">
            <p className="card-text p-0 m-0 fw-bold">Total Game: </p>
            <p className="card-text p-0 m-0 fw-bold">{data.totalGames} </p>
          </div>
          <div className="d-flex justify-content-between px-2">
            <p className="card-text p-0 m-0">{data.popularGame[0].gameName}</p>
            <p className="card-text p-0 m-0">{data.popularGame[0].likes}</p>
          </div>
          <div className="d-flex justify-content-between px-2">
            <p className="card-text p-0 m-0">{data.popularGame[1].gameName}</p>
            <p className="card-text p-0 m-0">{data.popularGame[1].likes}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExploreCategoryCard;
