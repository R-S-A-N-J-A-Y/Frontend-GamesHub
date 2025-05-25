import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Schema, type FormData } from "../Validation/RegisterForm";

const RegisterForm = () => {
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
    <form
      className="text-white border p-5 rounded-4"
      onSubmit={handleSubmit(onSubmit)}
      style={{ width: "600px", margin: "0 auto", marginTop: "100px" }}
    >
      <h3 className="mb-4">Register</h3>
      <input
        {...register("name")}
        type="text"
        className="form-control mb-3"
        placeholder="name"
        name="name"
      />
      {errors.name && (
        <p className="text-danger fw-bold">{errors.name.message}</p>
      )}
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

      <input
        {...register("password")}
        type="text"
        className="form-control mb-3"
        placeholder="password"
        name="password"
      />
      {errors.password && (
        <p className="text-danger fw-bold">{errors.password.message}</p>
      )}

      <input
        {...register("phone")}
        type="text"
        className="form-control mb-3"
        placeholder="phone"
        name="phone"
      />
      {errors.phone && (
        <p className="text-danger fw-bold">{errors.phone.message}</p>
      )}

      <input
        {...register("dob")}
        type="date"
        className="form-control mb-3"
        placeholder="dob"
        name="dob"
      />
      {errors.dob && (
        <p className="text-danger fw-bold">{errors.dob.message}</p>
      )}

      <input
        {...register("gender")}
        type="text"
        className="form-control mb-3"
        placeholder="gender"
        name="gender"
      />
      {errors.gender && (
        <p className="text-danger fw-bold">{errors.gender.message}</p>
      )}

      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
