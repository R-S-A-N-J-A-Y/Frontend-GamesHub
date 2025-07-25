import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "../Layouts/AppLayout";
import HomePage from "../Pages/HomePage";
import ExplorePage from "../Pages/ExplorePage";
import CommunityPage from "../Pages/CommunityPage";
import NotificationPage from "../Pages/NotificationPage";
import Cartpage from "../Pages/Cartpage";
import ProfilePage from "../Pages/ProfilePage";
import ExploreCategoryPage from "../Pages/ExploreCategoryPage";
import CategoryGameList from "../Components/CategoryGameList";
import AuthLayout from "../Layouts/AuthLayout";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import GameLayout from "../Layouts/GameLayout";
import GameDetailsPage from "../Pages/GameDetailsPage";
import ScrollToTop from "../Components/ScrollToTop";
import ProtectedRoute from "./ProtectedRoute";
import LibraryPage from "../Pages/LibraryPage";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* AppLayout Routes  */}
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/explore/:type" element={<ExploreCategoryPage />} />
            <Route path="/explore/:type/:id" element={<CategoryGameList />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/notifications" element={<NotificationPage />} />
              <Route path="/cart" element={<Cartpage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/library" element={<LibraryPage />} />
            </Route>
          </Route>

          {/* AuthLayout Routes  */}
          <Route path="/auth/*" element={<AuthLayout />}>
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>

          <Route path="/games/:id" element={<GameLayout />}>
            <Route index element={<GameDetailsPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default AppRoutes;
