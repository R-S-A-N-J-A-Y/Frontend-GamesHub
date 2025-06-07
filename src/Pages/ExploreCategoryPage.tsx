import { useParams } from "react-router-dom";
import ExploreCategoryCard from "../Components/ExploreCategoryCard";
import { useGameContext } from "../Context/GameContext";

import axios from "axios";
import { useEffect, useState } from "react";
import ExploreCategorySkeletonCard from "../Components/ExploreCategoryCardSkeleton";
import { useAppContext } from "../Context/AppContext";

const ExploreCategoryPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { type } = useParams<{ type: string }>();
  const { state, updateCategory } = useGameContext();

  const { theme, themeColor } = useAppContext();
  const currTheme = themeColor[theme];

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        // Call To Backend .
        let url = type;
        if (type === "platforms") url = "platformsv";
        const res = await axios.get(`http://localhost:3000/user/${url}/`, {});

        // Data Retrival from result.
        const data = res.data.data || [];

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
  }, [updateCategory, type]);

  if (isLoading)
    return (
      <div>
        <p className="fw-bold fs-2">
          Step Into{" "}
          <span style={{ color: currTheme.highLight }}>
            {type && type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </p>
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
      <p className="fw-bold fs-2">
        Step Into{" "}
        <span style={{ color: currTheme.highLight }}>
          {type && type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </p>
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
    </div>
  );
};

export default ExploreCategoryPage;
