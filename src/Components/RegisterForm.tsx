import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const RegisterForm = () => {
  const Navigate = useNavigate();
  const { Register } = useAuth();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    dob: "",
    gender: "",
  });

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData((currData) => ({
      ...currData,
      [e.target.name]: e.target.value,
    }));
  };

  const Validate = () => {
    return true;
  };

  const HandleSubmit = async () => {
    if (!Validate()) return;
    const res = await CallBackend();
    if (res) {
      Navigate("/");
      Register(userData);
    }
  };

  const CallBackend = async () => {
    try {
      const res = await axios.post("http://localhost:3000/auth/register", {
        countryCode: "IN",
        ...userData,
      });
      return res.data.success;
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div
      className="text-white border p-5 rounded-4"
      style={{ width: "600px", margin: "0 auto", marginTop: "100px" }}
    >
      <h3 className="mb-4">Register</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="name"
        name="name"
        value={userData.name}
        onChange={(e) => HandleChange(e)}
      />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="email"
        name="email"
        value={userData.email}
        onChange={(e) => HandleChange(e)}
      />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="password"
        name="password"
        value={userData.password}
        onChange={(e) => HandleChange(e)}
      />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="phone"
        name="phone"
        value={userData.phone}
        onChange={(e) => HandleChange(e)}
      />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="dob"
        name="dob"
        value={userData.dob}
        onChange={(e) => HandleChange(e)}
      />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="gender"
        name="gender"
        value={userData.gender}
        onChange={(e) => HandleChange(e)}
      />
      <button className="btn btn-primary" onClick={HandleSubmit}>
        Register
      </button>
    </div>
  );
};

export default RegisterForm;
