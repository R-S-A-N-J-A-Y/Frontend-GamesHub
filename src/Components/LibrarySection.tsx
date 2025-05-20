import LibraryCard from "./LibraryCard";
import { useAppContext } from "../Context/AppContext";
import { FaArrowRightLong } from "react-icons/fa6";

const LibrarySection = () => {
  const { theme, themeColor } = useAppContext();
  const currTheme = themeColor[theme];
  return (
    <div
      className="border rounded-3 p-3 w-50 d-flex flex-column gap-3"
      style={{ background: `${currTheme.boxColor}` }}
    >
      <div className="d-flex justify-content-between align-items-center pe-2">
        <p className="fw-bold fs-4 m-0">Library</p>
        <FaArrowRightLong size={25} color={`${currTheme.bodyColor}`} />
      </div>

      <div className="d-flex flex-column gap-4">
        {[...Array(3)].map(() => (
          <LibraryCard />
        ))}
      </div>
    </div>
  );
};

export default LibrarySection;
