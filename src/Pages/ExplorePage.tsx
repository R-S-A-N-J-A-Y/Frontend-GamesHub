import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import GeneralGameList from "../Components/GeneralGameList";
import { useAppContext } from "../Context/AppContext";

const ExplorePage = () => {
  const location = useLocation();
  const [url, setUrl] = useState("/explore");
  const { theme, themeColor } = useAppContext();
  const CurrTheme = themeColor[theme];

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  if (url !== "/explore") return <Outlet />;
  return (
    <div className="d-flex flex-column gap-5">
      <div className="d-flex flex-column gap-2">
        <p className="fw-bolder fs-1 m-0">
          Top Picks of the
          <span style={{ color: `${CurrTheme.highLight}` }}> Moment.</span>
        </p>
        <p className="fs-5 m-0 text-secondary">
          Top Games by Popularity and Fresh Releases
        </p>
      </div>

      <GeneralGameList />
    </div>
  );
};

export default ExplorePage;
