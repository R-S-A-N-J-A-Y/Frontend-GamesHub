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
  const deletedItemRef = useRef<CartData | null>(null);

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

    const itemToDelete = cartArray.find((cart) => cart._id === id);
    if (!itemToDelete) return;

    // cart Backup and updated
    deletedItemRef.current = itemToDelete;
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
        setCartArray((prev) => [...prev, deletedItemRef.current!]);
      } finally {
        setShowUndo(false);
      }
    };

    //undo will shows the 5 seconds.
    setTimeout(() => {
      if (!isUndoRef.current) fetch();
      isUndoRef.current = null;
    }, 5000);
  };

  const UpdateQuantity = async (
    cartId: string,
    isInc: boolean,
    value: number
  ) => {
    const fetch = async () => {
      try {
        await axios.patch(
          `${import.meta.env.VITE_BACKEND_URL}/user/updateCart`,
          { cartId, isInc, value },
          { headers: { "x-auth-token": token } }
        );
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    };
    return await fetch();
  };

  const handleUndo = () => {
    isUndoRef.current = true;
    if (deletedItemRef.current)
      setCartArray((prev) => [...prev, deletedItemRef.current!]);
    setShowUndo(false);
  };

  const cancelShowUndo = () => {
    setShowUndo(false);
  };

  return (
    <Wrapper className="position-relative d-flex flex-column gap-5 mt-3">
      {showUndo && (
        <UndoSection
          handleUndo={handleUndo}
          cancelShowUndo={cancelShowUndo}
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
