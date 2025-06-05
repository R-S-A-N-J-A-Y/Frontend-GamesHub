import styled from "styled-components";
import { ImCross } from "react-icons/im";
import { useAppContext } from "../Context/AppContext";
import { MdCurrencyRupee } from "react-icons/md";

interface Props {
  data: {
    _id: string;
    addedAt: string;
    game: {
      name: string;
      coverImageUrl: string;
      price: number;
      platforms: { name: string; _id: string }[];
    };
  };
}

const CardWrapper = styled.div<{ backgroundColor: string; highLight: string }>`
  background: ${({ backgroundColor }) => backgroundColor};
  border-left: 8px solid ${({ highLight }) => highLight};
`;

const ImageWrapper = styled.div<{ imageUrl: string }>`
  height: 130px;
  width: 150px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url(${({ imageUrl }) => imageUrl});
`;

const CartCard = ({ data }: Props) => {
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
      backgroundColor={curr.boxColor}
      highLight={curr.highLight}
      className="d-flex flex-column gap-3 flex-md-row justify-content-between align-items-center px-5 py-4 fs-5 fw-bold rounded-4"
    >
      {/* GameDetails  */}
      <div className="d-flex align-items-center gap-5">
        <ImageWrapper
          imageUrl={data.game.coverImageUrl}
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
      <div>Quanitity</div>

      {/* Total Price  */}
      <div>
        <div className="d-flex align-items-center">
          <MdCurrencyRupee size={23} />
          <p className="m-0 p-0">{data.game.price * 1}</p>
        </div>
      </div>

      {/* toggle Button  */}
      <button style={{ background: "none", border: "none" }}>
        <ImCross color="red" size={20} />
      </button>
    </CardWrapper>
  );
};

export default CartCard;
