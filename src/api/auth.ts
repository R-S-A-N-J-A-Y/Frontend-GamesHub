import type { FieldValues } from "react-hook-form";
import axiosInstance from "./axiosInstance";

export const loginApi = (userData: FieldValues) => {
  console.log(userData);
  return axiosInstance.post("/auth/login", userData);
};

export const RegisterApi = (userData: FieldValues) => {
  return axiosInstance.post("/auth/register", {
    countryCode: "IN",
    ...userData,
  });
};
