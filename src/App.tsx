import { AppContextProvider } from "./Context/AppContext";
import { GameContextProvider } from "./Context/GameContext";
import AppRoutes from "./Routes/AppRoutes";

const App = () => {
  return (
    <GameContextProvider>
      <AppContextProvider>
        <AppRoutes />
      </AppContextProvider>
    </GameContextProvider>
  );
};

export default App;
