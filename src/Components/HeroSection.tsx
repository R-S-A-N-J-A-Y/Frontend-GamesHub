import { useAuth } from "../Context/AuthContext";
import HeroCard from "./HeroCard";

const HeroSection = () => {
  const {
    state: { isLogged, profile },
  } = useAuth();
  return (
    <div>
      <p className="fw-bold fs-2">
        Hello {isLogged ? profile.name : "User"} !!
      </p>
      <HeroCard />
    </div>
  );
};

export default HeroSection;
