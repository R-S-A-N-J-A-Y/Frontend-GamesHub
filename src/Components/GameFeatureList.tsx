import { useAppContext } from "../Context/AppContext";
import type { featureType } from "../Pages/GameDetailsPage";
import GameFeatureCard from "./GameFeatureCard";

interface Props {
  name: string;
  features: featureType[];
}

const GameFeatureList = ({ name, features }: Props) => {
  const { theme, themeColor } = useAppContext();
  const curr = themeColor[theme];
  return (
    <div className="p-5 d-flex flex-column" style={{ gap: "60px" }}>
      <div className="text-center">
        <h5 className="text-secondary">Key Features</h5>
        <h1>
          Why you should Play{" "}
          <span className="fw-bold" style={{ color: `${curr.highLight}` }}>
            {name}
          </span>{" "}
        </h1>
      </div>
      <div className="px-5 py-3 d-flex flex-column gap-5">
        {features.map((ft, idx) => (
          <GameFeatureCard key={idx} feature={ft} />
        ))}
      </div>
    </div>
  );
};

export default GameFeatureList;
