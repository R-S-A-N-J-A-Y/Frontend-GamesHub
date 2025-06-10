import { ImCross } from "react-icons/im";
import { useAppContext } from "../Context/AppContext";
import styled from "styled-components";

const DropDownButton = styled.div`
  padding: 10px 20px;
`;

const DropDownMenu = styled.ul`
  padding: 15px 20px;

  &.dropdown-menu.show {
    display: flex !important;
    flex-direction: column;
    gap: 10px;
  }
`;

const ListItems = styled.li`
  cursor: pointer;
`;

interface Props {
  name: string;
  listItems: string[];
  handleClick: (name: string, item: string) => void;
}

const DropDown = ({ name, listItems, handleClick }: Props) => {
  const { theme, themeColor } = useAppContext();
  const CurrTheme = themeColor[theme];

  return (
    <div className="dropdown">
      <DropDownButton
        className={`btn  dropdown-toggle rounded-5 fw-bold text-${
          CurrTheme.name === "light" ? "dark" : "light"
        } border border-${CurrTheme.name === "light" ? "dark" : "light"}`}
        data-bs-toggle="dropdown"
      >
        {name}
      </DropDownButton>
      <DropDownMenu className="dropdown-menu">
        {listItems.map((item, idx) => (
          <ListItems
            key={idx}
            className="fw-bold"
            onClick={() => handleClick(name, item)}
          >
            {item}
          </ListItems>
        ))}
        <ListItems
          className="fw-bold d-flex gap-2 align-items-center text-danger"
          onClick={() => handleClick(name, "")}
        >
          <ImCross color="red" />
          Clear
        </ListItems>
      </DropDownMenu>
    </div>
  );
};

export default DropDown;
