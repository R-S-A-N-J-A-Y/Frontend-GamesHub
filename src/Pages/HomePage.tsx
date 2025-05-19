import ContinueSection from "../Components/ContinueSection";
import HeroSection from "../Components/HeroSection";

const HomePage = () => {
  return (
    <div className="d-flex flex-column gap-5">
      <HeroSection />
      <ContinueSection />
    </div>
  );
};

export default HomePage;
