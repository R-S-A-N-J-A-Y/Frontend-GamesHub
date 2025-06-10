import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import GeneralGameList from "../Components/GeneralGameList";
import { useAppContext } from "../Context/AppContext";
import styled from "styled-components";
import DropDown from "../Components/DropDown";
import { ImCross } from "react-icons/im";

const Wrapper = styled.div`
  min-height: 78vh;
`;

const HeadSection = styled.div``;

const OrderByDropDown = [
  "Name",
  "Popularity",
  "Ratings",
  "Release Date",
  "Price",
];
const Platforms = ["PC", "PlayStation", "Xbox", "Nintendo", "Apple", "Android"];

const ExplorePage = () => {
  const location = useLocation();
  const [url, setUrl] = useState("/explore");

  const { theme, themeColor } = useAppContext();
  const CurrTheme = themeColor[theme];

  const [orderBy, setOrderBy] = useState("");
  const [platform, setPlatform] = useState<string[]>([]);

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  const HandleClick = (name: string, item: string) => {
    if (name === "Platforms") {
      if (item === "") setPlatform([]);
      else
        setPlatform((prev) =>
          prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
        );
    } else setOrderBy(item);
  };

  const RemovePlatform = (item: string) => {
    setPlatform((prev) => prev.filter((obj) => obj != item));
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
            selectedOrder={orderBy}
            handleClick={HandleClick}
          />
          <DropDown
            name="Platforms"
            listItems={Platforms}
            handleClick={HandleClick}
          />
        </div>

        {platform.length > 0 && (
          <div className="d-flex gap-3 align-items-center">
            <p className="fw-bold fs-4">Filters:</p>
            {platform.map((item, idx) => (
              <p
                className={`rounded-3 px-3 py-2 text-${
                  CurrTheme.name === "light" ? "dark" : "light"
                } border border-${
                  CurrTheme.name === "light" ? "dark" : "light"
                } d-flex gap-3 align-items-center`}
                key={idx}
              >
                {item}
                <ImCross
                  color="red"
                  style={{ cursor: "pointer" }}
                  onClick={() => RemovePlatform(item)}
                />
              </p>
            ))}
          </div>
        )}
      </HeadSection>

      <GeneralGameList orderBy={orderBy} platform={platform} />
    </Wrapper>
  );
};

export default ExplorePage;
