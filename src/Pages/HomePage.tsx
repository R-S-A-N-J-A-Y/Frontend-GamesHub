import ContinueSection from "../Components/ContinueSection";
import LibrarySection from "../Components/LibrarySection";
import HeroSection from "../Components/HeroSection";

const HomePage = () => {
  return (
    <div className="d-flex flex-column gap-3">
      <HeroSection />
      <ContinueSection />
      <div className="d-flex gap-2">
        <div className="p-5 bg-dark">jh</div>
        <LibrarySection />
      </div>
    </div>
  );
};

export default HomePage;
