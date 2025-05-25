import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useForm, type FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";

const Schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "*The Password must be atleast 6 Characters Long." }),
});

type FormData = z.infer<typeof Schema>;

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
    <form
      className="text-white border p-5 rounded-4"
      style={{ width: "600px", margin: "0 auto", marginTop: "100px" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="mb-4">Login</h3>
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
  );
};

export default LoginForm;
