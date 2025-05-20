import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "../Layouts/AppLayout";
import HomePage from "../Pages/HomePage";
import ExplorePage from "../Pages/ExplorePage";
import CommunityPage from "../Pages/CommunityPage";
import NotificationPage from "../Pages/NotificationPage";
import Cartpage from "../Pages/Cartpage";
import ProfilePage from "../Pages/ProfilePage";
import PlatformsPage from "../Pages/PlatformsPage";
import GenresPage from "../Pages/GenresPage";
import TagsPage from "../Pages/TagsPage";
import StoresPage from "../Pages/StoresPage";
import StudiosPage from "../Pages/StudiosPage";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <AppLayout>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />}>
              <Route path="genres" element={<GenresPage />} />
              <Route path="platforms" element={<PlatformsPage />} />
              <Route path="tags" element={<TagsPage />} />
              <Route path="stores" element={<StoresPage />} />
              <Route path="studios" element={<StudiosPage />} />
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
