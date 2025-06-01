import styled from "styled-components";

interface Props {
  imgUrl: string;
}

const ImgContainer = styled.div<{ imgUrl: string }>`
  background-image: url(${({ imgUrl }) => imgUrl});
  height: 300px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

const GameScreenshotCard = ({ imgUrl }: Props) => {
  return (
    <ImgContainer
      imgUrl={imgUrl}
      className="border border-3 rounded-3"
    ></ImgContainer>
  );
};

export default GameScreenshotCard;
