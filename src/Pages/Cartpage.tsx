import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import CartCard from "../Components/CartCard";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 75vh;
`;

export type CartData = {
  _id: string;
  addedAt: string;
  game: {
    name: string;
    coverImageUrl: string;
    price: number;
    platforms: { name: string; _id: string }[];
  };
};

const Cartpage = () => {
  const {
    state: { token },
  } = useAuth();
  const [cartArray, setCartArray] = useState<CartData[]>([]);

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

  const deleteCart = async (id: string) => {
    const currArray = cartArray;
    setCartArray(cartArray.filter((data) => data._id !== id));
    const fetch = async () => {
      try {
        const result = await axios.delete(
          `http://localhost:3000/user/cart/${id}`,
          {
            headers: { "x-auth-token": token },
          }
        );
        console.log(result);
      } catch (err) {
        console.log(err);
        alert("Error");
        setCartArray(currArray);
      }
    };
    fetch();
  };

  return (
    <Wrapper className="d-flex flex-column gap-5 mt-3">
      <h3>Your Cart</h3>
      {cartArray.length === 0 ? (
        <p>Your cart is Empty.</p>
      ) : (
        <div className="d-flex flex-column gap-5">
          {cartArray.map((data, idx) => (
            <CartCard key={idx} data={data} deleteCart={deleteCart} />
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default Cartpage;
