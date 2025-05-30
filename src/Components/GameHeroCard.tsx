import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 100vh;
  background-image: url(https://ik.imagekit.io/sanjayvault/GamesHub/Game%20Previews/Days%20Gone/Screenshots/Screenshot-2.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

const GameHeroCard = () => {
  return (
    <Wrapper className="d-flex gap-5">
      <div className="p-5 bg-primary">
        <h1 className="fw-bolder">Days Gone</h1>
      </div>
      <div></div>
    </Wrapper>
  );
};

export default GameHeroCard;
