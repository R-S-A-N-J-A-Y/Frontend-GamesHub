import GameScreenshotCard from "./GameScreenshotCard";

interface Props {
  screenshots: string[];
}

const GameGallery = ({ screenshots }: Props) => {
  return (
    <div className="d-flex flex-column gap-5 p-5">
      <h2>Game Gallery</h2>
      <div className="row row-cols-3">
        {screenshots.map((img) => (
          <div className="col">
            <GameScreenshotCard imgUrl={img} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameGallery;
