const GenreCard = () => {
  return (
    <div
      className="card text-bg-dark w-25 d-flex align-items-center justify-content-center border border-2 rounded-3"
      style={{ height: "250px" }}
    >
      <img
        src="/DaysGone.jpg"
        className="card-img"
        style={{ objectFit: "cover", height: "100%" }}
        alt="Preview"
      />
      <div
        className="card-img-overlay p-3 text-center d-flex flex-column justify-content-center gap-2 p-2 rounded-4"
        style={{ backdropFilter: "blur(5px)" }}
      >
        <h5 className="card-title fw-bold">PC</h5>
        <p className="card-text p-0 m-0 fw-bold">Total Game: 305</p>
        <div className="d-flex flex-column gap-2">
          <h5 className="card-title fw-bold m-0">Popular Games</h5>
          <p className="card-text p-0 m-0">The Last of US</p>
          <p className="card-text p-0 m-0">The Last of US</p>
          <p className="card-text p-0 m-0">The Last of US</p>
        </div>
      </div>
    </div>
  );
};

export default GenreCard;
