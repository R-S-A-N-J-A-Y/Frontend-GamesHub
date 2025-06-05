import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import CartCard from "../Components/CartCard";

const Cartpage = () => {
  const {
    state: { token },
  } = useAuth();
  const [cartArray, setCartArray] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get("http://localhost:3000/user/cart", {
          headers: { "x-auth-token": token },
        });
        setCartArray(result.data.data);
      } catch (err) {
        alert(err);
      }
    };

    fetch();
  }, [token]);

  if (cartArray.length === 0) return <div>Your Cart is empty.</div>;
  return <CartCard />;
};

export default Cartpage;
