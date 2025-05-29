import AboutSection from "../Components/AboutSection";

const ProfilePage = () => {
  return (
    <div className="d-flex gap-5" style={{ minHeight: "78vh" }}>
      <div className="bg-primary" style={{ width: "500px" }}>
        hi
      </div>
      <div className="flex-fill px-5 py-4 d-flex flex-column gap-4">
        <AboutSection />
      </div>
    </div>
  );
};

export default ProfilePage;
