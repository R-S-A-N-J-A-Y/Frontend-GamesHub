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
  UpdateQuantity: (
    cartId: string,
    isInc: boolean,
    value: number
  ) => Promise<boolean>;
}

const CardWrapper = styled.div<{
  $background_color: string;
  $highlight: string;
}>`
  background: ${({ $background_color }) => $background_color};
  border-left: 8px solid ${({ $highlight }) => $highlight};
`;

const ImageWrapper = styled.div<{ $image_url: string }>`
  height: 80px;
  width: 100px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url(${({ $image_url }) => $image_url});
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

  // Maintaining the quantity changes for debouncing
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
        newQuantity > data.quantity,
        newQuantity - data.quantity
      );
      if (!result) setLocalQuantity(data.quantity);
    }, 3000);
  };

  return (
    <CardWrapper
      $background_color={curr.boxColor}
      $highlight={curr.highLight}
      className="d-flex flex-column gap-3 flex-md-row justify-content-between align-items-center px-5 py-4 fs-5 fw-bold rounded-4"
    >
      {/* GameDetails  */}
      <div className="d-flex align-items-center gap-5">
        <ImageWrapper
          $image_url={data.game.coverImageUrl}
          className="rounded-3"
        />
        <div className="d-flex flex-column gap-3 fs-5">
          <div>
            <p className="m-0 p-0 fw-bolder">{data.game.name}</p>
            <p className="fs-6 m-0 p-0 text-secondary">
              {data.game.platforms[0].name}
            </p>
          </div>
          <div className="d-flex align-items-center fs-6">
            <MdCurrencyRupee size={23} />
            <p className="m-0 p-0">{data.game.price}</p>
          </div>
        </div>
      </div>

      {/* Date Added  */}
      <div>
        {day} {MonthName} {year}
      </div>

      {/* Quantity  */}
      <div className="d-flex gap-2 align-items-center">
        {localQuantity === 1 ? (
          <FaArrowDown color="grey" size={25} />
        ) : (
          <FaArrowDown
            size={25}
            style={{ cursor: "pointer" }}
            onClick={() => handleUpdateQuantity(false)}
          />
        )}
        <p className="p-0 m-0 fs-3">{localQuantity}</p>
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

      {/* Total Price  */}
      <div>
        <div className="d-flex align-items-center">
          <MdCurrencyRupee size={23} />
          <p className="m-0 p-0">{data.game.price * localQuantity}</p>
        </div>
      </div>

      {/* Delete Cart Button  */}
      <button
        style={{ background: "none", border: "none" }}
        onClick={() => deleteCart(data._id)}
      >
        <ImCross color="red" size={20} />
      </button>
    </CardWrapper>
  );
};

export default CartCard;
