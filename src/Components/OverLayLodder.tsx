import styled from "styled-components";
import { useAppContext } from "../Context/AppContext";

interface Props {
  message?: string;
}

const AlertBox = styled.div<{ bg: string; borderColor: string }>`
  position: absolute;
  top: 6%;
  left: 50%;
  transform: translateX(-50%);
  max-width: 90vw;

  background-color: ${(props) => props.bg};
  border: 2px solid ${(props) => props.borderColor};
  padding: 12px 24px;
  text-align: center;
  border-radius: 12px;

  animation: slideIn 1s ease-in-out forwards;

  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: translateX(-50%) translateY(-30px);
    }
    80% {
      opacity: 1;
      transform: translateX(-50%) translateY(10px);
    }
    100% {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
  }
`;

const OverlayLoader = ({ message = "Please wait..." }: Props) => {
  const { theme, themeColor } = useAppContext();
  const currTheme = themeColor[theme];

  return (
    <AlertBox
      bg={currTheme.name === "dark" ? currTheme.boxColor : currTheme.boxColor}
      borderColor={currTheme.highLight}
    >
      <p className="m-0 fw-bold">{message}</p>
    </AlertBox>
  );
};

export default OverlayLoader;
