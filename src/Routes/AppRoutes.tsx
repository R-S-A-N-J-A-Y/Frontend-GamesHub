import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "../Layouts/AppLayout";
import HomePage from "../Pages/HomePage";
import ExplorePage from "../Pages/ExplorePage";
import CommunityPage from "../Pages/CommunityPage";
import NotificationPage from "../Pages/NotificationPage";
import Cartpage from "../Pages/Cartpage";
import ProfilePage from "../Pages/ProfilePage";
import ExploreCategoryPage from "../Pages/ExploreCategoryPage";
import GameList from "../Components/GameList";
import AuthLayout from "../Layouts/AuthLayout";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* AppLayout Routes  */}
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/explore/:type" element={<ExploreCategoryPage />} />
            <Route path="/explore/:type/:id" element={<GameList />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/cart" element={<Cartpage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          {/* AuthLayout Routes  */}
          <Route path="/auth/*" element={<AuthLayout />}>
            <Route index element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
