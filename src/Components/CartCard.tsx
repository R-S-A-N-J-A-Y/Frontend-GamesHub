import styled from "styled-components";
import { ImCross } from "react-icons/im";
import { useAppContext } from "../Context/AppContext";
import { MdCurrencyRupee } from "react-icons/md";
import type { CartData } from "../Pages/Cartpage";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { useRef, useState } from "react";

interface Props {
  data: CartData;
  deleteCart: (id: string) => void;
  UpdateQuantity: (cartId: string, value: number) => Promise<boolean>;
}

const CardWrapper = styled.div<{
  $background_color: string;
  $highlight: string;
}>`
  background: ${({ $background_color }) => $background_color};
  border-left: 8px solid ${({ $highlight }) => $highlight};
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 0.5fr;
  grid-template-areas: "col1 col2 col3 col4 col5";
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  font-weight: bold;
  font-size: 1.2rem;

  @media (min-width: 600px) and (max-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      "col1 col1 col1 col1"
      "col2 col3 col4 col5";
    text-align: center;
  }

  @media (min-width: 350px) and (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "col1 col1"
      "col2 col3"
      "col4 col5";
    text-align: center;
  }

  @media (max-width: 350px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "col1"
      "col2"
      "col3"
      "col4"
      "col5";
    gap: 1.5rem;
    text-align: center;
  }
`;

const CartGameInfoWrapper = styled.div`
  grid-area: col1;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div<{ $image_url: string }>`
  height: 80px;
  width: 100px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url(${({ $image_url }) => $image_url});
  border-radius: 8px;
`;

const CartGameInfo = styled.div`
  @media (max-width: 600px) {
    align-items: center;
  }
`;

const CartCard = ({ data, deleteCart, UpdateQuantity }: Props) => {
  const { theme, themeColor } = useAppContext();
  const curr = themeColor[theme];

  const date = new Date(data.addedAt);
  const year = date.getFullYear();
  const day = date.getDate();
  const MonthName = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date
  );

  const [localQuantity, setLocalQuantity] = useState(data.quantity);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleUpdateQuantity = (isInc: boolean) => {
    const newQuantity = localQuantity + (isInc ? 1 : -1);
    if (newQuantity < 1 || newQuantity > 5) return;

    setLocalQuantity(newQuantity);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      const result = await UpdateQuantity(
        data._id,
        newQuantity - data.quantity
      );
      if (!result) setLocalQuantity(data.quantity);
    }, 800);
  };

  return (
    <CardWrapper $background_color={curr.boxColor} $highlight={curr.highLight}>
      {/* Game Details */}
      <CartGameInfoWrapper className="d-flex align-items-center gap-4">
        <ImageWrapper $image_url={data.game.coverImageUrl} />
        <CartGameInfo className="d-flex flex-column gap-2 fs-5">
          <div>
            <p className="m-0 fw-bolder">{data.game.name}</p>
            <p className="fs-6 m-0 text-secondary">
              {data.game.platforms[0].name}
            </p>
          </div>
          <div className="d-flex align-items-center fs-6">
            <MdCurrencyRupee size={23} />
            <p className="m-0">{data.game.price}</p>
          </div>
        </CartGameInfo>
      </CartGameInfoWrapper>

      {/* Date Added */}
      <div style={{ gridArea: "col2" }} className="text-center">
        {day} {MonthName} {year}
      </div>

      {/* Quantity */}
      <div
        style={{ gridArea: "col3" }}
        className="d-flex gap-2 align-items-center justify-content-center"
      >
        {localQuantity === 1 ? (
          <FaArrowDown color="grey" size={25} />
        ) : (
          <FaArrowDown
            size={25}
            style={{ cursor: "pointer" }}
            onClick={() => handleUpdateQuantity(false)}
          />
        )}
        <p className="m-0 fs-3">{localQuantity}</p>
        {localQuantity === 5 ? (
          <FaArrowUp color="grey" size={25} />
        ) : (
          <FaArrowUp
            size={25}
            style={{ cursor: "pointer" }}
            onClick={() => handleUpdateQuantity(true)}
          />
        )}
      </div>

      {/* Total Price */}
      <div
        style={{ gridArea: "col4" }}
        className="d-flex align-items-center justify-content-center"
      >
        <MdCurrencyRupee size={23} />
        <p className="m-0">{data.game.price * localQuantity}</p>
      </div>

      {/* Delete Button */}
      <button
        style={{ gridArea: "col5", background: "none", border: "none" }}
        onClick={() => deleteCart(data._id)}
      >
        <ImCross color="red" size={20} />
      </button>
    </CardWrapper>
  );
};

export default CartCard;
