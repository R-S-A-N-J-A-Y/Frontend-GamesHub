import styled from "styled-components";
import { useAppContext } from "../Context/AppContext";

const Card = styled.div`
  height: 280px;
  cursor: pointer;
`;
const ExploreCategorySkeletonCard = () => {
  const { theme, themeColor } = useAppContext();
  const curr = themeColor[theme];
  return (
    <Card
      className="card border border-2 rounded-4"
      style={{ background: `${curr.boxColor}` }}
    >
      <div
        className="card-img-overlay text-center d-flex flex-column justify-content-around rounded-4"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <h5 className="card-title fw-bold fs-2 placeholder-glow">
          <span className="border border-top-0 border-start-0 border-end-0 d-inline-block p-2 placeholder col-7 rounded-2 bg-secondary"></span>
        </h5>

        <div className="placeholder-glow">
          <p
            className="border px-4 py-2 rounded-2 d-inline-block fw-bold placeholder col-4 bg-secondary"
            style={{
              height: "40px",
            }}
          ></p>
        </div>

        <div className="d-flex flex-column gap-2 placeholder-glow">
          <div className="d-flex justify-content-between px-2 py-1 border-bottom fw-bold">
            <p className="card-text p-0 m-0 fw-bold placeholder col-4 rounded-2 bg-secondary"></p>
            <p className="card-text p-0 m-0 fw-bold placeholder col-1 rounded-1 bg-secondary">
              {" "}
            </p>
          </div>
          <div className="d-flex justify-content-between px-2">
            <p className="card-text p-0 m-0 placeholder col-4 rounded-2 bg-secondary"></p>
            <p className="card-text p-0 m-0 placeholder col-1 rounded-1 bg-secondary"></p>
          </div>
          <div className="d-flex justify-content-between px-2">
            <p className="card-text p-0 m-0 placeholder col-4 rounded-2 bg-secondary"></p>
            <p className="card-text p-0 m-0 placeholder col-1 rounded-1 bg-secondary"></p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExploreCategorySkeletonCard;
