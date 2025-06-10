import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import GeneralGameList from "../Components/GeneralGameList";
import { useAppContext } from "../Context/AppContext";
import styled from "styled-components";
import DropDown from "../Components/DropDown";

const Wrapper = styled.div`
  min-height: 78vh;
`;

const HeadSection = styled.div``;

const OrderByDropDown = ["Name", "Popularity", "Ratings", "Release Date"];
const Platforms = ["PC", "PlayStation", "Xbox", "Nintendo", "Apple", "Android"];

const ExplorePage = () => {
  const location = useLocation();
  const [url, setUrl] = useState("/explore");

  const { theme, themeColor } = useAppContext();
  const CurrTheme = themeColor[theme];

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  const HandleClick = (name: string, item: string) => {
    console.log(name, item);
  };

  if (url !== "/explore") return <Outlet />;

  return (
    <Wrapper className="d-flex flex-column gap-4">
      <HeadSection className="d-flex flex-column gap-4 pb-2">
        <div className="d-flex flex-column gap-2">
          <p className="fw-bolder fs-1 m-0">
            Top Picks of the
            <span style={{ color: `${CurrTheme.highLight}` }}> Moment.</span>
          </p>
          <p className="fs-5 m-0 text-secondary">
            Top Games by Popularity and Fresh Releases
          </p>
        </div>

        <div className="d-flex gap-4">
          <DropDown
            name="Order By"
            listItems={OrderByDropDown}
            handleClick={HandleClick}
          />
          <DropDown
            name="Platforms"
            listItems={Platforms}
            handleClick={HandleClick}
          />
        </div>
      </HeadSection>

      <GeneralGameList />
    </Wrapper>
  );
};

export default ExplorePage;
