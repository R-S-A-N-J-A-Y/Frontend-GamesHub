import styled from "styled-components";
import { ImCross } from "react-icons/im";
import { useAppContext } from "../Context/AppContext";
import { MdCurrencyRupee } from "react-icons/md";
import type { CartData } from "../Pages/Cartpage";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

interface Props {
  data: CartData;
  deleteCart: (id: string) => void;
  UpdateQuantity: (gameId: string, cartId: string, isInc: boolean) => void;
}

const CardWrapper = styled.div<{
  $background_color: string;
  $highlight: string;
}>`
  background: ${({ $background_color }) => $background_color};
  border-left: 8px solid ${({ $highlight }) => $highlight};
`;

const ImageWrapper = styled.div<{ $image_url: string }>`
  height: 130px;
  width: 150px;
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
        <div className="d-flex flex-column gap-3">
          <div>
            <h3 className="fw-bolder">{data.game.name}</h3>
            <h5>{data.game.platforms[0].name}</h5>
          </div>
          <div className="d-flex align-items-center">
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
        {data.quantity === 1 ? (
          <FaArrowDown color="grey" size={25} />
        ) : (
          <FaArrowDown
            size={25}
            style={{ cursor: "pointer" }}
            onClick={() => UpdateQuantity(data.game._id, data._id, false)}
          />
        )}
        <p className="p-0 m-0 fs-3">{data.quantity}</p>
        {data.quantity === 5 ? (
          <FaArrowUp color="grey" size={25} />
        ) : (
          <FaArrowUp
            size={25}
            style={{ cursor: "pointer" }}
            onClick={() => UpdateQuantity(data.game._id, data._id, true)}
          />
        )}
      </div>

      {/* Total Price  */}
      <div>
        <div className="d-flex align-items-center">
          <MdCurrencyRupee size={23} />
          <p className="m-0 p-0">{data.game.price * data.quantity}</p>
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
