import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import GeneralGameList from "../Components/GeneralGameList";
import { useAppContext } from "../Context/AppContext";
import { ImCross } from "react-icons/im";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 78vh;
`;

const HeadSection = styled.div``;

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
          <div className="dropdown">
            <button
              className={`btn  dropdown-toggle rounded-5 fw-bold text-${
                CurrTheme.name === "light" ? "dark" : "light"
              } border border-${CurrTheme.name === "light" ? "dark" : "light"}`}
              style={{ padding: "10px 20px" }}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Order By
            </button>
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item">Name</button>
              </li>
              <li>
                <button className="dropdown-item">Popularity</button>
              </li>
              <li>
                <button className="dropdown-item">Ratings</button>
              </li>
              <li>
                <button className="dropdown-item">Release Date</button>
              </li>
              <li>
                <button className="dropdown-item d-flex align-items-center text-danger fw-bold gap-2">
                  <ImCross color="red" />
                  Clear
                </button>
              </li>
            </ul>
          </div>

          <div className="dropdown">
            <button
              className={`btn  dropdown-toggle rounded-5 fw-bold text-${
                CurrTheme.name === "light" ? "dark" : "light"
              } border border-${CurrTheme.name === "light" ? "dark" : "light"}`}
              style={{ padding: "10px 20px" }}
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Platforms
            </button>

            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item">PC</button>
              </li>
              <li>
                <button className="dropdown-item">Playstation</button>
              </li>
              <li>
                <button className="dropdown-item">Xbox</button>
              </li>
              <li>
                <button className="dropdown-item">Nintendo</button>
              </li>
              <li>
                <button className="dropdown-item">Android</button>
              </li>

              <li>
                <button className="dropdown-item">Apple</button>
              </li>
              <li>
                <button className="dropdown-item d-flex align-items-center text-danger fw-bold gap-2">
                  <ImCross color="red" />
                  Clear
                </button>
              </li>
            </ul>
          </div>
        </div>
      </HeadSection>

      <GeneralGameList />
    </Wrapper>
  );
};

export default ExplorePage;
