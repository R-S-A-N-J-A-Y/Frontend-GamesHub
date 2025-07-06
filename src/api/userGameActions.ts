import axiosInstance from "./axiosInstance";

export const ToggleLikeApi = (
  id: string,
  currStatus: boolean,
  token: string
) => {
  try {
    const config = { headers: { "x-auth-token": token } };
    return axiosInstance.patch(
      `${import.meta.env.VITE_BACKEND_URL}/user/toggleLike`,
      { gameId: id, liked: !currStatus },
      config
    );
  } catch (err) {
    alert(err);
  }
};

export const ToggleWatchListApi = (
  id: string,
  currStatus: boolean,
  token: string
) => {
  try {
    const config = { headers: { "x-auth-token": token } };
    return axiosInstance.patch(
      `${import.meta.env.VITE_BACKEND_URL}/user/toggleWatchList`,
      { gameId: id, watched: !currStatus },
      config
    );
  } catch (err) {
    alert(err);
  }
};
