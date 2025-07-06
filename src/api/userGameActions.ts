import axiosInstance from "./axiosInstance";

// Get User
export const getProfile = (token: string) => {
  return axiosInstance.get("/user/profile", {
    headers: { "x-auth-token": token },
  });
};

// likes, added games and recently viewed
export const getUserAddedItems = (token: string, isTop3: boolean) => {
  const config = {
    headers: { "x-auth-token": token },
    params: isTop3 ? { isTop3: true } : {},
  };

  return axiosInstance.get("/user/watchListPreview", config);
};

export const getRecentlyWatched = (token: string) => {
  return axiosInstance.get("/user/recentlyWatched/", {
    headers: { "x-auth-token": token },
  });
};

export const ToggleLikeApi = (
  id: string,
  currStatus: boolean,
  token: string
) => {
  try {
    const config = { headers: { "x-auth-token": token } };
    return axiosInstance.patch(
      "/user/toggleLike",
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
      "/user/toggleWatchList",
      { gameId: id, watched: !currStatus },
      config
    );
  } catch (err) {
    alert(err);
  }
};

// Cart endpoints
export const getCart = (token: string) => {
  return axiosInstance.get("/user/cart", {
    headers: { "x-auth-token": token },
  });
};

export const createCart = (token: string, cartId: string) => {
  return axiosInstance.post(
    "/user/cart",
    { gameId: cartId },
    {
      headers: { "x-auth-token": token },
    }
  );
};

export const updateCart = (token: string, cartId: string, value: number) => {
  return axiosInstance.patch(
    "/user/updateCart",
    { cartId, value },
    { headers: { "x-auth-token": token } }
  );
};

export const deleteCart = (token: string, cartId: string) => {
  return axiosInstance.delete(`/user/cart/${cartId}`, {
    headers: { "x-auth-token": token },
  });
};
