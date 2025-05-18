import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppLayout from "../Layouts/AppLayout";
import HomePage from "../Pages/HomePage";
import ExplorePage from "../Pages/ExplorePage";
import CommunityPage from "../Pages/CommunityPage";

const AppRoutes = () => {
  return (
    <>
      <Router>
        <AppLayout>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/community" element={<CommunityPage />} />
          </Routes>
        </AppLayout>
      </Router>
    </>
  );
};

export default AppRoutes;
