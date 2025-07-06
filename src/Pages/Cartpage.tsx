import { useEffect, useRef, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import CartCard from "../Components/CartCard";
import styled from "styled-components";
import UndoSection from "../Components/UndoSection";
import { useAppContext } from "../Context/AppContext";
import BuyCard from "../Components/BuyCard";
import { useNavigate } from "react-router-dom";
import { deleteCart, getCart, updateCart } from "../api/userGameActions";

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
  const Navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [cartArray, setCartArray] = useState<CartData[]>([]);
  const [showUndo, setShowUndo] = useState(false);
  const isUndoRef = useRef<boolean | null>(null);
  const deletedItemRef = useRef<CartData | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetch = async () => {
      try {
        const result = await getCart(token);
        setCartArray(result.data.data);
      } catch (err) {
        alert(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, [token]);

  const DeleteCart = async (id: string) => {
    setShowUndo(true);

    const itemToDelete = cartArray.find((cart) => cart._id === id);
    if (!itemToDelete) return;

    // cart Backup and updated
    deletedItemRef.current = itemToDelete;
    setCartArray(cartArray.filter((data) => data._id !== id));

    const fetch = async () => {
      try {
        await deleteCart(token, id);
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

  const UpdateQuantity = async (cartId: string, value: number) => {
    const fetch = async () => {
      try {
        await updateCart(token, cartId, value);
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
        <section
          className="d-flex justify-content-center align-items-center"
          style={{ height: "35vh" }}
        >
          <section
            className="spinner-border"
            role="status"
            style={{ width: "3rem", height: "3rem", borderWidth: "8px" }}
          >
            <span className="visually-hidden">Loading...</span>
          </section>
        </section>
      ) : cartArray.length === 0 ? (
        <div className="p-4 d-flex flex-column align-items-center">
          <h2 className="fs-3 fw-bolder mb-3">
            Your Cart Is{" "}
            <span style={{ color: `${CurrTheme.highLight}` }}>Empty.</span>
          </h2>
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Found something exciting? Add it to your Cart before it’s gone!
          </p>
          <div>
            <button
              className="btn fw-bold w-100"
              style={{ background: `${CurrTheme.highLight}` }}
              onClick={() => Navigate("/explore")}
            >
              Browse Games
            </button>
          </div>
        </div>
      ) : (
        <div className="d-flex flex-column gap-5">
          {cartArray.map((data, idx) => (
            <CartCard
              key={idx}
              data={data}
              deleteCart={DeleteCart}
              UpdateQuantity={UpdateQuantity}
            />
          ))}
        </div>
      )}
      {cartArray.length > 0 && (
        <BuyCard
          games={cartArray.length}
          total={cartArray.reduce(
            (acc, cart) => acc + cart.game.price * cart.quantity,
            0
          )}
        />
      )}
    </Wrapper>
  );
};

export default Cartpage;
