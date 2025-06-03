import GameCard from "./GameCard";

const data = {
  _id: "string",
  name: "string",
  coverImageUrl: "string",
  peopleAdded: 0,
  ratings: 0,
  likes: 0,
  liked: true, //Only Available when User Logged In
  watched: true,
};

const GameSimilarSection = () => {
  return (
    <div className="d-flex flex-column gap-5 px-5">
      <h2>You May like this too...</h2>
      <div>
        {[...Array(5)].map(() => (
          <GameCard game={data} />
        ))}
      </div>
    </div>
  );
};

export default GameSimilarSection;
