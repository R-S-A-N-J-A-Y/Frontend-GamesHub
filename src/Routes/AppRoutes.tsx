import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "../Layouts/AppLayout";
import HomePage from "../Pages/HomePage";
import ExplorePage from "../Pages/ExplorePage";
import CommunityPage from "../Pages/CommunityPage";
import NotificationPage from "../Pages/NotificationPage";
import Cartpage from "../Pages/Cartpage";
import ProfilePage from "../Pages/ProfilePage";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <AppLayout>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />}>
              <Route path="platform" element={<Cartpage />} />
            </Route>
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/cart" element={<Cartpage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </AppLayout>
      </Router>
    </>
  );
};

export default AppRoutes;
