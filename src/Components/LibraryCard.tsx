const LibraryCard = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-between px-4"
      style={{ height: "50px" }}
    >
      <div
        className="d-flex gap-3 align-items-center"
        style={{ height: "100%" }}
      >
        <img
          src="DaysGone.jpg"
          alt=""
          className="rounded-3"
          style={{ height: "100%", width: "50px", objectFit: "cover" }}
        />
        <div>
          <p className="fs-6 fw-bold m-0">Days Gone Remastered</p>
          <p
            className="fw-bold m-0"
            style={{ color: "rgba(185, 159, 159, 0.81)", fontSize: "13px" }}
          >
            PS5
          </p>
        </div>
      </div>

      <div style={{ color: "rgba(255, 255, 255, 0.78)", fontSize: "13px" }}>
        <p className="fs-6 fw-bold m-0">12 Jan</p>
        <p className="fw-bold m-0">2025</p>
      </div>

      <button className="btn btn-outline-danger border-2 fw-bold">
        Remove
      </button>
    </div>
  );
};

export default LibraryCard;
