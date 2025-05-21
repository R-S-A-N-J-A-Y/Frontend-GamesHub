import GenreCard from "../Components/GenreCard";

const GenresPage = () => {
  return (
    <div>
      <p className="fw-bold fs-2">Available Genres</p>
      <div className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {[...Array(5)].map((key) => (
          <div className="col" key={key}>
            <GenreCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenresPage;
