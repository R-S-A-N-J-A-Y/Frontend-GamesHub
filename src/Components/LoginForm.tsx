import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useForm, type FieldValues } from "react-hook-form";

const LoginForm = () => {
  const Navigate = useNavigate();
  const { Login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setUserData((currData) => ({
  //     ...currData,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  const Validate = () => {
    return true;
  };

  const onSubmit = (data: FieldValues) => {
    if (!Validate()) return;
    console.log(data);
    // const res = await CallBackend();
    // if (res.success) {
    //   Navigate("/");
    //   Login(res.data);
    // }
  };

  // const CallBackend = async () => {
  //   try {
  //     const res = await axios.post("http://localhost:3000/auth/login", {
  //       countryCode: "IN",
  //       ...userData,
  //     });
  //     const token = res.headers["x-auth-token"];
  //     console.log(token);
  //     console.log(res);
  //     return res.data;
  //   } catch (err) {
  //     alert(err);
  //   }
  // };

  return (
    <form
      className="text-white border p-5 rounded-4"
      style={{ width: "600px", margin: "0 auto", marginTop: "100px" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="mb-4">Login</h3>
      <input
        {...register("email", { required: true })}
        type="email"
        className="form-control mb-3"
        placeholder="email"
        name="email"
      />
      {errors.email?.type === "required" && (
        <p className="text-danger fw-bold">*Email is Required.</p>
      )}
      <input
        {...register("password", { required: true, minLength: 6 })}
        type="text"
        className="form-control mb-3"
        placeholder="password"
        name="password"
      />
      {errors.password?.type === "required" && (
        <p className="text-danger fw-bold">*Password is Required.</p>
      )}
      {errors.password?.type === "minLength" && (
        <p className="text-danger fw-bold">
          *Password must be atleast 6 Length.
        </p>
      )}
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
