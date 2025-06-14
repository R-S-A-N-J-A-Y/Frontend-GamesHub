import styled from "styled-components";
import type { WatchListDataType } from "./LibrarySection";

interface Props {
  game: WatchListDataType;
  onClick: (id: string) => void;
}

const Wrapper = styled.div`
  padding: 0 30px;
  gap: 10px;

  @media (max-width: 590px) {
    padding: 0;
  }
`;

const LibraryCard = ({ game, onClick }: Props) => {
  const addedDate = new Date(game.addedAt);
  const year = addedDate.getFullYear();
  const day = String(addedDate.getDate()).padStart(2, "0");

  const MonthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    new Date(addedDate)
  );

  return (
    <Wrapper className="d-flex align-items-center justify-content-between w-100 flex-wrap mb-2">
      <div className="d-flex gap-3 align-items-center">
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
      </div>

      <div style={{ color: "rgba(255, 255, 255, 0.78)", fontSize: "13px" }}>
        <p className="fs-6 fw-bold m-0">
          {day} {MonthName}
        </p>
        <p className="fw-bold m-0">{year}</p>
      </div>

      <button
        className="btn btn-outline-danger border-2 fw-bold"
        onClick={() => onClick(game._id)}
      >
        Remove
      </button>
    </Wrapper>
  );
};

export default LibraryCard;
