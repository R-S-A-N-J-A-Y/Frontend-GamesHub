import axiosInstance from "./axiosInstance";
import qs from "qs";

interface FetchGamesParams {
  sortBy: string;
  order: string;
  platforms: string[];
  token: string;
}

export const fetchGames = ({
  sortBy,
  order,
  platforms,
  token,
}: FetchGamesParams) => {
  const hasPlatforms = platforms && platforms.length > 0;
  const url = hasPlatforms ? "/user/games/filter" : "/user/games/";

  const config = {
    params: {
      sortBy,
      order,
      platforms,
    },
    headers: {
      "x-auth-token": token,
    },
    paramsSerializer: (params: Record<string, unknown>) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  };

  return axiosInstance.get(url, config);
};

export const fetchGame = (token: string, gameId: string) => {
  return axiosInstance.get(`/user/games/${gameId}`, {
    headers: { "x-auth-token": token },
  });
};

export const fetchCategories = (category: string) => {
  return axiosInstance.get(`/user/${category}/`);
};

export const fetchSelectedCategoryGames = (
  category: string,
  id: string,
  token: string
) => {
  return axiosInstance.get(
    `${import.meta.env.VITE_BACKEND_URL}/user/${category}/${id}`,
    {
      headers: { "x-auth-token": token },
    }
  );
};

export const getSimilarGenreGames = (genres: string[]) => {
  return axiosInstance.get("/user/games/genres", {
    params: { genres },
    paramsSerializer: (genres) =>
      qs.stringify(genres, { arrayFormat: "repeat" }),
  });
};
