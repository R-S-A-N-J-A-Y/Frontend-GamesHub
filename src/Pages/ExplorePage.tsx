import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

const ExplorePage = () => {
  const location = useLocation();
  const [url, setUrl] = useState("/explore");

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);
  if (url !== "/explore") return <Outlet />;
  return <div>hi</div>;
};

export default ExplorePage;
