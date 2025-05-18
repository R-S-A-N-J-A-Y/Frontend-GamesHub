import { useAppContext } from "../Context/AppContext";

const HeroSection = () => {
  const { theme, themeColor } = useAppContext();
  const currTheme = themeColor[theme];

  return (
    <div
      className="card"
      style={{
        minWidth: "800px",
        height: "300px",
        background: `${currTheme.boxColor}`,
        scrollSnapAlign: "start",
      }}
    >
      <img
        src="DaysGone.jpg"
        className="card-img h-100"
        style={{ objectFit: "cover" }}
        alt="Preview"
      />
      <div
        className="card-img-overlay d-flex flex-column justify-content-between gap-2 flex-fill p-5 m-3"
        style={{
          color: currTheme.color === "#000000" ? "#ffffff" : "#000000",
        }}
      >
        <p className="border rounded-4 px-4 py-2 position-absolute top-0 end-0 mt-3 me-3">
          New
        </p>
        <p className="fs-2 fw-bold m-0 p-0">Days Gone</p>
        <p className="fs-4 m-0 p-0">$78</p>
        <div className="d-flex gap-3">
          <button className="btn btn-primary">Purchase</button>
          <button className="btn btn-primary">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
