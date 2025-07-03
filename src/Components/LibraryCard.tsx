import styled from "styled-components";
import type { WatchListDataType } from "./LibrarySection";

interface Props {
  game: WatchListDataType;
  onClick: (id: string) => void;
}

const Wrapper = styled.div`
  padding: 0 30px;

  display: grid;
  grid-template-columns: minmax(210px, 2.7fr) minmax(50px, 1.2fr) 100px;
  align-items: center;
  grid-template-areas: "col1 col2 col3";
  gap: 30px;

  @media (max-width: 620px) {
    padding: 0;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "col1 col1"
      "col2 col3";
    row-gap: 20px;
  }
`;

const Col1 = styled.div`
  grid-area: col1;
`;

const Col2 = styled.div`
  grid-area: col2;
`;

const Col3 = styled.div`
  grid-area: col3;
`;

const LibraryCard = ({ game, onClick }: Props) => {
  const addedDate = new Date(game.addedAt);
  const year = addedDate.getFullYear();
  const day = String(addedDate.getDate()).padStart(2, "0");

  const MonthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    new Date(addedDate)
  );

  return (
    <Wrapper className="w-100">
      <Col1 className="d-flex gap-3 align-items-center">
        <img
          src={game.coverImageUrl}
          alt=""
          className="rounded-3"
          style={{ height: "50px", width: "50px", objectFit: "cover" }}
        />
        <div>
          <p className="fs-6 fw-bold m-0">{game.name}</p>
          {game.platforms.length !== 0 && (
            <p
              className="fw-bold m-0"
              style={{ color: "rgba(185, 159, 159, 0.81)", fontSize: "13px" }}
            >
              {game.platforms[0].name}
            </p>
          )}
        </div>
      </Col1>

      <Col2
        style={{
          color: "rgba(255, 255, 255, 0.78)",
          fontSize: "13px",
        }}
      >
        <p className="fs-6 fw-bold m-0">
          {day} {MonthName}
        </p>
        <p className="fw-bold m-0">{year}</p>
      </Col2>

      <Col3 className="d-inline-block">
        <button
          className="btn btn-outline-danger border-2 fw-bold"
          onClick={() => onClick(game._id)}
        >
          Remove
        </button>
      </Col3>
    </Wrapper>
  );
};

export default LibraryCard;
