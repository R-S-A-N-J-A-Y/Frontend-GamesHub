import { useParams } from "react-router-dom";
import ExploreCategoryCard from "../Components/ExploreCategoryCard";
import { useGameContext } from "../Context/GameContext";

import axios from "axios";
import { useEffect, useState } from "react";
import ExploreCategorySkeletonCard from "../Components/ExploreCategoryCardSkeleton";

const ExploreCategoryPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { type } = useParams<{ type: string }>();
  const { state, updateCategory, updateCategoryType } = useGameContext();
  const [currPage, setCurrPage] = useState(0);
  const [startPage, setStartPage] = useState(0);

  //To reset the pages to initial for every different category.
  useEffect(() => {
    setCurrPage(0);
    setStartPage(0); //To reset the pages to initial for every different category.
    updateCategoryType(type || ""); //Sets the Type first To avoid the Rendering of the leftOver page by previous Type.
  }, [updateCategoryType, type]);

  useEffect(() => {
    // To avoid the Fetching data for the left-over page value
    if (type !== state.category.type) return;
    setIsLoading(true);
    const fetchData = async () => {
      try {
        // Call To Backend .
        let url = type;
        if (type === "platforms") url = "platformsv";
        const res = await axios.get(`http://localhost:3000/user/${url}/`, {
          params: { page: currPage, limit: 20 },
        });

        // Data Retrival from result.
        const data = res.data.data || [];

        console.log(data);
        // Updating the GameContext
        updateCategory(type || "", data);
      } catch (err) {
        alert(err);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
    };

    fetchData();
  }, [updateCategory, currPage, state.category.type, type]);

  if (isLoading)
    return (
      <div>
        <p className="fw-bold fs-2">Available {type}</p>
        <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-5 mb-5">
          {[...Array(8)].map((key) => (
            <div className="col" key={key}>
              <ExploreCategorySkeletonCard />
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div>
      <p className="fw-bold fs-2">Available {type}</p>
      {state.category.data.length === 0 ? (
        <p className="mb-5">No data to Show</p>
      ) : (
        <div className="row row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-5 mb-5">
          {state.category.data.map((data, key) => (
            <div className="col" key={key}>
              <ExploreCategoryCard type={type || ""} data={data} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination  */}
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
              state.category.data.length === 0 ? "disabled" : ""
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

export default ExploreCategoryPage;
