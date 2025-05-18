import GameCard from "./GameCard";

const ContinueSection = () => {
  return (
    <div>
      <p className="fw-bold fs-2">Continue Where you Left</p>
      <div className="row g-2">
        <GameCard />
      </div>
    </div>
  );
};

export default ContinueSection;
