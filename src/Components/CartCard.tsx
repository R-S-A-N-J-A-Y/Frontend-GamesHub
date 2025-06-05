import styled from "styled-components";
import { ImCross } from "react-icons/im";
import { useAppContext } from "../Context/AppContext";

interface Props {
  data: {
    _id: string;
    addedAt: string;
  };
}

const ImageWrapper = styled.div`
  height: 150px;
  width: 150px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-image: url(DaysGone.jpg);
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
    <div
      className="d-flex flex-column gap-3 flex-md-row justify-content-between align-items-center px-5 py-4 fs-5 fw-bold rounded-4"
      style={{
        background: curr.boxColor,
        borderLeft: `8px solid ${curr.highLight}`,
      }}
    >
      <div className="d-flex align-items-center gap-5">
        <ImageWrapper className="rounded-3" />
        <div className="d-flex flex-column gap-3">
          <div>
            <h3 className="fw-bolder">Days Gone</h3>
            <h5>PS5</h5>
          </div>
          <div>100</div>
        </div>
      </div>
      <div>
        {day} {MonthName} {year}
      </div>
      <div>Quanitity</div>
      <div>890</div>
      <button style={{ background: "none", border: "none" }}>
        <ImCross color="red" size={20} />
      </button>
    </div>
  );
};

export default CartCard;
