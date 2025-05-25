import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, type FormData } from "../Validation/RegisterForm";
import { useAppContext } from "../Context/AppContext";

const RegisterForm = () => {
  const { theme, themeColor, toggleTheme } = useAppContext();
  const currTheme = themeColor[theme];

  const Navigate = useNavigate();
  const { Register } = useAuth();

  // Form Data
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
  });

  const onSubmit = async (data: FieldValues) => {
    const res = await CallBackend(data);
    if (res) {
      Navigate("/");
      Register(data);
    }
  };

  const CallBackend = async (data: FieldValues) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/register", {
        countryCode: "IN",
        ...data,
      });
      return res.data.success;
    } catch (err) {
      alert(err);
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
      <form
        className="text-white rounded-4 mb-3 d-flex flex-column gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          {...register("name")}
          type="text"
          className="form-control"
          placeholder="name"
          name="name"
        />
        {errors.name && (
          <p className="text-danger fw-bold">{errors.name.message}</p>
        )}
        <input
          {...register("email")}
          type="email"
          className="form-control"
          placeholder="email"
          name="email"
        />
        {errors.email && (
          <p className="text-danger fw-bold">{errors.email.message}</p>
        )}

        <input
          {...register("password")}
          type="text"
          className="form-control"
          placeholder="password"
          name="password"
        />
        {errors.password && (
          <p className="text-danger fw-bold">{errors.password.message}</p>
        )}

        <input
          {...register("phone")}
          type="text"
          className="form-control"
          placeholder="phone"
          name="phone"
        />
        {errors.phone && (
          <p className="text-danger fw-bold">{errors.phone.message}</p>
        )}

        <input
          {...register("dob")}
          type="date"
          className="form-control"
          placeholder="dob"
          name="dob"
        />
        {errors.dob && (
          <p className="text-danger fw-bold">{errors.dob.message}</p>
        )}

        <input
          {...register("gender")}
          type="text"
          className="form-control"
          placeholder="gender"
          name="gender"
        />
        {errors.gender && (
          <p className="text-danger fw-bold">{errors.gender.message}</p>
        )}
        <div>
          <button type="submit" className="btn btn-primary">
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
