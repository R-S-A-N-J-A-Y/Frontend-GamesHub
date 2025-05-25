import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useForm, type FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const Schema = z.object({
  name: z
    .string()
    .min(3, { message: "*The Name must have atleast 3 Characters." }),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "*The Password must be atleast 6 Characters Long." }),
  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "*Phone must be a 10-digit number." }),
  gender: z
    .string()
    .min(2, { message: "*The Password must be atleast 2 Characters Long." }),
  dob: z.string().refine((val) => !isNaN(new Date(val).getTime()), {
    message: "*Invalid date.",
  }),
});

type FormData = z.infer<typeof Schema>;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(Schema),
  });
  const Navigate = useNavigate();
  const { Register } = useAuth();

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
