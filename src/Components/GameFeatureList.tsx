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
        <h1 className="mb-4">
          Why you should Play{" "}
          <span className="fw-bold" style={{ color: `${curr.highLight}` }}>
            {name}
          </span>{" "}
        </h1>
        <h5 className="text-secondary fw-bold">
          Discover the features that set it apart.
        </h5>
      </div>
      <div className="px-5 py-3 d-flex flex-column" style={{ gap: "70px" }}>
        {features.map((ft, idx) => (
          <GameFeatureCard key={idx} feature={ft} idx={idx} />
        ))}
      </div>
    </div>
  );
};

export default GameFeatureList;
