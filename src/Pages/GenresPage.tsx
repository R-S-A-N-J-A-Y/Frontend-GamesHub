import GenreCard from "../Components/GenreCard";
import { useGameContext } from "../Context/GameContext";

import axios from "axios";
import { useEffect, useState } from "react";

const GenresPage = () => {
  const { state, FetchGenre } = useGameContext();
  const [currPage, setCurrPage] = useState(0);
  const [startPage, setStartPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call To Backend .
        const res = await axios.get("http://localhost:3000/user/genres/", {
          params: { page: currPage, limit: 20 },
        });

        // Data Retrival from result.
        const data = res.data.data || [];

        const UpdatedData = data.map((d) => ({
          ...d,
          gameCount: 0,
          popularGame: [
            { gameName: "The LAst of US", likes: 0 },
            { gameName: "The LAst of US", likes: 0 },
          ],
        }));

        // Updating the GameContext
        FetchGenre(UpdatedData);
      } catch (err) {
        alert(err);
      }
    };
    fetchData();
  }, [currPage, FetchGenre]);

  console.log(startPage, currPage);

  return (
    <div>
      <p className="fw-bold fs-2">Available Genres</p>
      {state.genres.length === 0 ? (
        <p className="mb-5">No data to Show</p>
      ) : (
        <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-5 mb-5">
          {state.genres.map((data, key) => (
            <div className="col" key={key}>
              <GenreCard data={data} />
            </div>
          ))}
        </div>
      )}

      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currPage === 0 ? "disabled" : ""}`}>
            <h1
              className="page-link"
              style={{ cursor: "pointer" }}
              onClick={() => {
                const newPage = currPage - 1;
                setCurrPage(newPage);
                if (currPage !== 1) {
                  setStartPage(currPage - 2);
                }
              }}
            >
              Previous
            </h1>
          </li>
          <li
            className={`page-item ${startPage === currPage ? "disabled" : ""}`}
          >
            <h1
              className="page-link"
              onClick={() => setCurrPage(startPage)}
              style={{ cursor: "pointer" }}
            >
              {startPage + 1}
            </h1>
          </li>
          <li
            className={`page-item ${
              startPage + 1 === currPage ? "disabled" : ""
            }`}
          >
            <h1
              className="page-link"
              onClick={() => setCurrPage(startPage + 1)}
              style={{ cursor: "pointer" }}
            >
              {startPage + 2}
            </h1>
          </li>
          <li
            className={`page-item ${
              startPage + 2 === currPage ? "disabled" : ""
            }`}
          >
            <h1
              className="page-link"
              onClick={() => setCurrPage(startPage + 2)}
              style={{ cursor: "pointer" }}
            >
              {startPage + 3}
            </h1>
          </li>
          <li
            className={`page-item ${
              state.genres.length === 0 ? "disabled" : ""
            }`}
          >
            <h1
              className="page-link"
              style={{ cursor: "pointer" }}
              onClick={() => {
                const newPage = currPage + 1;
                setStartPage(newPage - 1);
                setCurrPage(newPage);
              }}
            >
              Next
            </h1>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default GenresPage;
