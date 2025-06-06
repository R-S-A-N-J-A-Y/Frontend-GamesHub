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
  quantity: number;
  game: {
    _id: string;
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
    const cartBackup = cartArray;
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
        setCartArray(cartBackup);
      }
    };
    fetch();
  };

  const UpdateQuantity = (gameId: string, cartId: string, isInc: boolean) => {
    const cartBackup = cartArray;

    setCartArray([
      ...cartArray.map((cart) =>
        cart._id === cartId
          ? { ...cart, quantity: cart.quantity + (isInc ? 1 : -1) }
          : cart
      ),
    ]);

    const fetch = async () => {
      try {
        await axios.post(
          "http://localhost:3000/user/cart",
          { gameId, isInc },
          { headers: { "x-auth-token": token } }
        );
      } catch (err) {
        console.log(err);
        alert("error...");
        setCartArray(cartBackup);
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
            <CartCard
              key={idx}
              data={data}
              deleteCart={deleteCart}
              UpdateQuantity={UpdateQuantity}
            />
          ))}
        </div>
      )}
    </Wrapper>
  );
};

export default Cartpage;
