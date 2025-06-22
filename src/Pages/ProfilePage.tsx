import { useEffect } from "react";
import AboutSection from "../Components/AboutSection";
import ProfileSection from "../Components/ProfileSection";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { useAppContext } from "../Context/AppContext";

const ProfilePage = () => {
  const {
    state: { token, profile, role },
    UserProfile,
  } = useAuth();

  const { backendUrl } = useAppContext();

  useEffect(() => {
    const fetch = async () => {
      const headers = { "x-auth-token": token };
      try {
        const data = await axios.get(`${backendUrl}/user/profile`, {
          headers: headers,
        });
        UserProfile(data.data);
      } catch (err) {
        alert(err);
      }
    };
    fetch();
  }, [token, UserProfile, backendUrl]);

  return (
    <div className="d-flex gap-5" style={{ minHeight: "78vh" }}>
      <div
        className="p-5 d-flex flex-column align-items-center gap-4"
        style={{ width: "430px" }}
      >
        <ProfileSection name={profile.name} role={role} />
      </div>
      <div
        className="flex-fill px-5 py-4 d-flex flex-column"
        style={{ gap: "30px" }}
      >
        <AboutSection profile={profile} />
      </div>
    </div>
  );
};

export default ProfilePage;
