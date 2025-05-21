import GenreCard from "../Components/GenreCard";
import { useGameContext } from "../Context/GameContext";

const GenresPage = () => {
  const { genres } = useGameContext();
  return (
    <div>
      <p className="fw-bold fs-2">Available Genres</p>
      <div className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {genres.map((data, key) => (
          <div className="col" key={key}>
            <GenreCard data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenresPage;
