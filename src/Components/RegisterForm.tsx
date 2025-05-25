import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, type FormData } from "../Validation/RegisterForm";
import { useAppContext } from "../Context/AppContext";
import { useState } from "react";

const RegisterForm = () => {
  const { theme, themeColor, toggleTheme } = useAppContext();
  const currTheme = themeColor[theme];

  const [serverError, setServerError] = useState<string>("");

  const Navigate = useNavigate();
  const { Register } = useAuth();

  // Form Data
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (data: FieldValues) => {
    const { result, token } = await CallBackend(data);
    if (result?.success) {
      Navigate("/");
      Register({ ...result.data, token });
    } else {
      setServerError(result.data.message);
    }
  };

  const CallBackend = async (data: FieldValues) => {
    try {
      const { confirmPassword, ...user } = data;
      console.log(confirmPassword);
      const res = await axios.post("http://localhost:3000/auth/register", {
        countryCode: "IN",
        ...user,
      });
      const token = res.headers["x-auth-token"];
      return { result: res.data, token };
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          return { result: err.response };
        }
      }
      alert(err);
      return {
        result: {
          success: false,
          data: { message: "Unexpected error occurred" },
        },
      };
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between mb-4">
        <h3 className="fw-bold">Register Form</h3>
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
        <p className="text-danger fw-bold fs-6 mb-4">*{serverError}</p>
      )}
      <form
        className="text-white rounded-4 mb-3 d-flex flex-column gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            {...register("name")}
            type="text"
            className="form-control"
            placeholder="name"
            name="name"
          />
          {errors.name && (
            <p className="m-0 p-0 text-danger fw-bold">
              *{errors.name.message}
            </p>
          )}
        </div>
        <div>
          <input
            {...register("email")}
            type="email"
            className="form-control"
            placeholder="email"
            name="email"
          />
          {errors.email && (
            <p className="m-0 p-0 text-danger fw-bold">
              *{errors.email.message}
            </p>
          )}
        </div>
        <div className="d-flex gap-3">
          <div className="flex-fill">
            <input
              {...register("password")}
              type="text"
              className="form-control"
              placeholder="password"
              name="password"
            />
            {errors.password && (
              <p className="m-0 p-0 text-danger fw-bold">
                *{errors.password.message}
              </p>
            )}
          </div>
          <div className="flex-fill">
            <input
              {...register("confirmPassword")}
              type="text"
              className="form-control"
              placeholder="confirmPassword"
              name="confirmPassword"
            />
            {errors.confirmPassword && (
              <p className="m-0 p-0 text-danger fw-bold">
                *{errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <input
            {...register("phone")}
            type="text"
            className="form-control"
            placeholder="phone"
            name="phone"
          />
          {errors.phone && (
            <p className="m-0 p-0 text-danger fw-bold">
              *{errors.phone.message}
            </p>
          )}
        </div>
        <div>
          <input
            {...register("dob")}
            type="date"
            className="form-control"
            placeholder="dob"
            name="dob"
          />
          {errors.dob && (
            <p className="m-0 p-0 text-danger fw-bold">*{errors.dob.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("gender")}
            type="text"
            className="form-control"
            placeholder="gender"
            name="gender"
          />
          {errors.gender && (
            <p className="m-0 p-0 text-danger fw-bold">
              *{errors.gender.message}
            </p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className={`btn btn-primary ${isValid ? "" : "disabled"}`}
          >
            Register
          </button>
        </div>
      </form>

      <p className="fw-bold">
        Already have an Account. Try{" "}
        <span
          className="text-primary"
          onClick={() => Navigate("login")}
          style={{ cursor: "pointer" }}
        >
          Log In
        </span>
      </p>
    </>
  );
};

export default RegisterForm;
