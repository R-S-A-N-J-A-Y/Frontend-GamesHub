import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const LoginForm = () => {
  const Navigate = useNavigate();
  const { Login } = useAuth();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
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
    if (res.success) {
      Navigate("/");
      Login(res.data);
    }
  };

  const CallBackend = async () => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        countryCode: "IN",
        ...userData,
      });
      return res.data;
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div
      className="text-white border p-5 rounded-4"
      style={{ width: "600px", margin: "0 auto", marginTop: "100px" }}
    >
      <h3 className="mb-4">Login</h3>
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
      <button className="btn btn-primary" onClick={HandleSubmit}>
        Login
      </button>
    </div>
  );
};

export default LoginForm;
