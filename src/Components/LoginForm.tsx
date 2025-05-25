import axios from "axios";
import { GoEye, GoEyeClosed } from "react-icons/go";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";

import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type FormData, Schema } from "../Validation/LoginForm";

const LoginForm = () => {
  const Navigate = useNavigate();
  const { Login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(Schema) });

  const onSubmit = async (data: FieldValues) => {
    const res = await CallBackend(data);
    if (res.success) {
      Navigate("/");
      Login(res.data);
    }
  };

  const CallBackend = async (userData: FieldValues) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        countryCode: "IN",
        ...userData,
      });
      const token = res.headers["x-auth-token"];
      console.log(token);
      console.log(res);
      return res.data;
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="border rounded-4 p-5 w-50">
      <form
        className="text-white rounded-4 mb-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="mb-4 fw-bold">Login Form</h3>
        <input
          {...register("email")}
          type="email"
          className="form-control mb-3"
          placeholder="email"
          name="email"
        />
        {errors.email && (
          <p className="text-danger fw-bold">{errors.email.message}</p>
        )}

        <div className="input-group mb-3">
          <input
            {...register("password", { required: true, minLength: 6 })}
            type={`${showPassword ? "text" : "password"}`}
            className="form-control"
            placeholder="password"
            name="password"
          />
          {errors.password && (
            <p className="text-danger fw-bold">{errors.password.message}</p>
          )}

          <span
            className="input-group-text"
            id="basic-addon2"
            onClick={() => setShowPassword((val) => !val)}
            style={{ cursor: "pointer" }}
          >
            {!showPassword ? <GoEye /> : <GoEyeClosed />}
          </span>
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${isValid ? "" : "disabled"}`}
        >
          Login
        </button>
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
    </div>
  );
};

export default LoginForm;
