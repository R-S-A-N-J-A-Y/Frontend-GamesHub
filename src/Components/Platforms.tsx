import { FaPlaystation } from "react-icons/fa";
import { FaWindows } from "react-icons/fa";
import { FaXbox } from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import { FaApple } from "react-icons/fa6";
import { BsAndroid2 } from "react-icons/bs";

import type { Platform } from "../Context/GameContext";

interface Props {
  platforms: Platform[];
  size?: string;
}

const Platforms = ({ platforms, size }: Props) => {
  const uniquePlatforms = Array.from(
    new Map(platforms.map((p) => [p.parentPlatform._id, p])).values()
  );

  return (
    <>
      {uniquePlatforms.map((obj) => (
        <div key={obj._id}>
          {obj.parentPlatform.name === "PC" && (
            <FaWindows size={size} color="white" />
          )}
          {obj.parentPlatform.name === "PlayStation" && (
            <FaPlaystation size={size} color="white" />
          )}
          {obj.parentPlatform.name === "Xbox" && (
            <FaXbox size={size} color="white" />
          )}
          {obj.parentPlatform.name === "Nintendo" && (
            <BsNintendoSwitch size={size} color="white" />
          )}
          {obj.parentPlatform.name === "Android" && (
            <BsAndroid2 size={size} color="white" />
          )}
          {obj.parentPlatform.name === "ios" && (
            <FaApple size={size} color="white" />
          )}
        </div>
      ))}
    </>
  );
};

export default Platforms;
