import axios from "axios";
import { GoEye, GoEyeClosed } from "react-icons/go";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";

import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FormData, Schema } from "../Validation/LoginForm";
import { useAppContext } from "../Context/AppContext";
import OverlayLoader from "./OverLayLodder";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { theme, themeColor, toggleTheme } = useAppContext();
  const currTheme = themeColor[theme];

  const Navigate = useNavigate();
  const { Login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(Schema) });

  const onSubmit = async (data: FieldValues) => {
    const { result, token } = await CallBackend(data);
    if (result?.success) {
      Navigate("/");
      Login({ ...result.data, token });
    } else {
      setServerError(result);
    }
  };

  const CallBackend = async (userData: FieldValues) => {
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
        {
          countryCode: "IN",
          ...userData,
        }
      );
      const token = res.headers["x-auth-token"];
      return { result: res.data, token };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.data) {
          return { result: err.response.data };
        }
      }
      alert(err);
      return { result: { message: "Unknown Error Acquired..." } };
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  return (
    <>
      {isLoading && <OverlayLoader message="Validating in the Database..." />}
      <div className="d-flex justify-content-between mb-4">
        <h3 className="fw-bold">Login Form</h3>
        <button
          className={` rounded-4 px-3 py-1 
            bg-${currTheme.name === "dark" ? "light" : "dark"} 
            text-${currTheme.name}`}
          onClick={toggleTheme}
          style={{ top: "50px", right: "50px" }}
        >
          Theme
        </button>
      </div>
      {serverError && (
        <p className="text-danger fw-bold fs-5 mb-4">*{serverError}</p>
      )}
      <form
        className="text-white rounded-4 mb-3 d-flex flex-column gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("email")}
          type="email"
          className="form-control"
          placeholder="email"
          name="email"
        />
        {errors.email && (
          <p className="text-danger fw-bold">*{errors.email.message}</p>
        )}

        <div className="input-group">
          <input
            {...register("password", { required: true, minLength: 6 })}
            type={`${showPassword ? "text" : "password"}`}
            className="form-control"
            placeholder="password"
            name="password"
          />
          <span
            className="input-group-text"
            id="basic-addon2"
            onClick={() => setShowPassword((val) => !val)}
            style={{ cursor: "pointer" }}
          >
            {!showPassword ? <GoEye /> : <GoEyeClosed />}
          </span>
        </div>
        {errors.password && (
          <p className="text-danger fw-bold">*{errors.password.message}</p>
        )}

        <div>
          <button
            type="submit"
            className={`btn btn-primary ${isValid ? "" : "disabled"}`}
          >
            Login
          </button>
        </div>
      </form>
      <p className="fw-bold">
        Don't have an Account. Try{" "}
        <span
          className="text-primary"
          onClick={() => Navigate("/auth")}
          style={{ cursor: "pointer" }}
        >
          Registering
        </span>
      </p>
    </>
  );
};

export default LoginForm;
