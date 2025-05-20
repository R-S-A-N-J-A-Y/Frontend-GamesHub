import { useAppContext } from "../Context/AppContext";
import { ArrowIcon } from "./LibrarySection";

const AccessoriedSection = () => {
  const { theme, themeColor } = useAppContext();
  const currTheme = themeColor[theme];
  return (
    <div
      className="border rounded-4 p-4 d-flex flex-column gap-2"
      style={{
        background: `${currTheme.boxColor}`,
        height: "300px",
        width: "100%",
        maxWidth: "300px",
      }}
    >
      <div className="d-flex justify-content-between align-items-center pe-2">
        <p className="fw-bold fs-4 m-0">Accessories</p>
        <ArrowIcon size={25} color={`${currTheme.highLight}`} />
      </div>

      <div
        className="d-flex justify-content-center"
        style={{ height: "93%", overflow: "hidden" }}
      >
        <img
          src="GameConsole.png"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

export default AccessoriedSection;
