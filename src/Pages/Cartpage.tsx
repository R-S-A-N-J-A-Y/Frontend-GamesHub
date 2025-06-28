import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import CartCard from "../Components/CartCard";
import styled from "styled-components";
import UndoSection from "../Components/UndoSection";

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
  const [showUndo, setShowUndo] = useState(false);
  const isUndoRef = useRef<boolean | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/cart`,
          {
            headers: { "x-auth-token": token },
          }
        );
        setCartArray(result.data.data);
      } catch (err) {
        alert(err);
      }
    };

    fetch();
  }, [token]);

  const deleteCart = async (id: string) => {
    setShowUndo(true);

    // cart Backup and updated
    const cartBackup = cartArray;
    setCartArray(cartArray.filter((data) => data._id !== id));

    const fetch = async () => {
      try {
        await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/user/cart/${id}`,
          {
            headers: { "x-auth-token": token },
          }
        );
      } catch (err) {
        console.log(err);
        alert("Error");
        setCartArray(cartBackup);
      } finally {
        setShowUndo(false);
      }
    };

    //undo will shows the 5 seconds.
    setTimeout(() => {
      if (!isUndoRef.current) fetch();
      else {
        setCartArray(cartBackup);
      }
      setShowUndo(false);
    }, 5000);
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
          `${import.meta.env.VITE_BACKEND_URL}/user/cart`,
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

  const handleUndo = () => {
    isUndoRef.current = true;
  };

  return (
    <Wrapper className="position-relative d-flex flex-column gap-5 mt-3">
      {showUndo && (
        <UndoSection
          handleUndo={handleUndo}
          message={`Oops! You just removed an item.\nWant to Undo that?`}
        />
      )}
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
