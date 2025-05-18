import { useAppContext } from "../Context/AppContext";

const Header = () => {
  const { toggleTheme } = useAppContext();
  return (
    <div>
      Header
      <button onClick={toggleTheme}>theme</button>
    </div>
  );
};

export default Header;
