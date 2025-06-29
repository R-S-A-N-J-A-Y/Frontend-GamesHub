import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import CartCard from "../Components/CartCard";
import styled from "styled-components";
import UndoSection from "../Components/UndoSection";
import { useAppContext } from "../Context/AppContext";
import BuyCard from "../Components/buyCard";

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
  const { theme, themeColor } = useAppContext();
  const CurrTheme = themeColor[theme];

  const [isLoading, setIsLoading] = useState(false);
  const [cartArray, setCartArray] = useState<CartData[]>([]);
  const [showUndo, setShowUndo] = useState(false);
  const isUndoRef = useRef<boolean | null>(null);
  const deletedItemRef = useRef<CartData | null>(null);

  useEffect(() => {
    setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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
        setCartArray((prev) =>
          prev.map((cart) =>
            cart._id === cartId
              ? { ...cart, quantity: cart.quantity + value }
              : cart
          )
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
      <div className="d-flex flex-column gap-2">
        <p className="fw-bold fs-4 m-0 text-secondary">
          Here's everything you've picked
        </p>
        <p className="fs-2 m-0 fw-bolder">
          Review and Get Ready to
          <span style={{ color: `${CurrTheme.highLight}` }}> Checkout!</span>
        </p>
      </div>
      {isLoading ? (
        <div className="text-center">
          <div
            className="spinner-border"
            role="status"
            style={{ width: "3rem", height: "3rem", borderWidth: "8px" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : cartArray.length === 0 ? (
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
      <BuyCard
        games={cartArray.length}
        total={cartArray.reduce(
          (acc, cart) => acc + cart.game.price * cart.quantity,
          0
        )}
      />
    </Wrapper>
  );
};

export default Cartpage;
