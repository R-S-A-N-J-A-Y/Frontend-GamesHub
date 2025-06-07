import styled from "styled-components";
import { useAppContext } from "../Context/AppContext";

const Card = styled.div`
  border-radius: 10px;
  overflow: hidden;
`;

const GameCardSkeleton = () => {
  const { theme, themeColor } = useAppContext();
  const curr = themeColor[theme];

  return (
    <Card className="card border" aria-hidden="true">
      <div
        className="card-img-top bg-secondary"
        style={{ aspectRatio: "14/9" }}
      ></div>
      <div
        className="card-body placeholder-glow"
        style={{
          background: `${curr.boxColor}`,
        }}
      >
        <div className="d-flex flex-column gap-2 placeholder-glow">
          <p className="fs-2 m-0 p-0 placeholder col-7 bg-secondary rounded-2"></p>
          <div className="d-flex align-items-center gap-4">
            <p className="m-0 placeholder col-2 bg-secondary rounded-2 fs-4"></p>
          </div>
          <div className="d-flex gap-2">
            <button
              className="btn placeholder col-2 disabled bg-secondary"
              style={{ border: "none" }}
            ></button>
            <a
              href="#"
              className="btn fw-bold w-100 placeholder"
              style={{ background: `${curr.highLight}` }}
            ></a>
            <button
              className="btn placeholder col-3 disabled bg-secondary"
              style={{ border: "none" }}
            ></button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GameCardSkeleton;
