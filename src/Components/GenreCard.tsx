import styled from "styled-components";
import { CardHoverAnimation } from "./GameCard";

const Card = styled.div`
  height: 280px;
  width: 300px;
  ${CardHoverAnimation}
`;

const GenreCard = () => {
  return (
    <Card
      className="card text-bg-dark d-flex align-items-center justify-content-center border border-2 rounded-4"
      style={{ height: "280px", width: "300px" }}
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
            PC
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
            <p className="card-text p-0 m-0 fw-bold">3000 </p>
          </div>
          <div className="d-flex justify-content-between px-2">
            <p className="card-text p-0 m-0">RDR2</p>
            <p className="card-text p-0 m-0">3000 </p>
          </div>
          <div className="d-flex justify-content-between px-2">
            <p className="card-text p-0 m-0">The Last of US</p>
            <p className="card-text p-0 m-0">3000 </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GenreCard;
