import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import GameList from "../Components/GameList";

const ExplorePage = () => {
  const location = useLocation();
  const [url, setUrl] = useState("/explore");

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  if (url !== "/explore") return <Outlet />;
  return (
    <div>
      <GameList />
    </div>
  );
};

export default ExplorePage;
