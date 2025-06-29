import { MdCurrencyRupee } from "react-icons/md";
import { ArrowIcon } from "./LibrarySection";
import { useAppContext } from "../Context/AppContext";

interface Props {
  games: number;
  total: number;
}

const BuyCard = ({ games, total }: Props) => {
  const { theme, themeColor } = useAppContext();
  const curr = themeColor[theme];

  return (
    <div
      className="p-5 d-flex justify-content-between align-items-center gap-3 border rounded-4"
      style={{ background: curr.boxColor }}
    >
      <div>
        <button
          className={`border border-2 rounded-3 fs-5 fw-bold px-4 py-2 d-flex gap-3 align-items-center text-${
            curr.name === "dark" ? "white" : "black"
          }`}
          style={{
            background: "transparent",
          }}
        >
          <ArrowIcon style={{ transform: "rotate(180deg)" }} size={25} />
          Continue Exploring
        </button>
      </div>
      <div className=" fs-5 fw-bold" style={{ width: "300px" }}>
        <div className="row mb-3">
          <div className="col-6">
            <p className="m-0 p-0">No. of Games:</p>
          </div>
          <div className="col-6 text-end">
            <p className="m-0 p-0">
              <MdCurrencyRupee />
              {games}
            </p>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-6">
            <p className="m-0 p-0">Tax:</p>
          </div>
          <div className="col-6 text-end">
            <p className="m-0 p-0">Free</p>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-6">
            <p className="m-0 p-0">Total:</p>
          </div>
          <div className="col-6 text-end">
            <p className="m-0 p-0">
              <MdCurrencyRupee />
              {total}
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <button
              className="p-2 btn w-100 fw-bolder fs-5 text-white"
              style={{ background: curr.highLight }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyCard;
