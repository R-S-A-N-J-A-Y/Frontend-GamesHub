import ContinueSection from "../Components/ContinueSection";
import LibrarySection from "../Components/LibrarySection";
import HeroSection from "../Components/HeroSection";
import AccessoriedSection from "../Components/AccessoriedSection";

const HomePage = () => {
  return (
    <div className="d-flex flex-column gap-3">
      <HeroSection />
      <ContinueSection />
      <div className="d-flex gap-5">
        <AccessoriedSection />
        <LibrarySection />
      </div>
    </div>
  );
};

export default HomePage;
