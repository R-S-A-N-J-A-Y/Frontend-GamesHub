import GenreCard from "../Components/GenreCard";
import { useGameContext } from "../Context/GameContext";

import axios from "axios";
import { useEffect } from "react";

const GenresPage = () => {
  const { state, FetchGenre } = useGameContext();

  useEffect(() => {
    const fetchData = async () => {
      const data = (await callBackend()) || [];
      const UpdatedData = data.map((d) => ({
        ...d,
        gameCount: 0,
        popularGame: [
          { gameName: "The LAst of US", likes: 0 },
          { gameName: "The LAst of US", likes: 0 },
        ],
      }));
      FetchGenre(UpdatedData);
    };
    fetchData();
  }, []);

  const callBackend = async () => {
    try {
      const res = await axios.get("http://localhost:3000/user/genres");
      return res.data.data;
    } catch (err) {
      alert(err);
    }
  };

  console.log(state.genres);

  return (
    <div>
      <p className="fw-bold fs-2">Available Genres</p>
      <div className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {Array.isArray(state.genres) ? (
          state.genres.map((data, key) => (
            <div className="col" key={key}>
              <GenreCard data={data} />
            </div>
          ))
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
};

export default GenresPage;
