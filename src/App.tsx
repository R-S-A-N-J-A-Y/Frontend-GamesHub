import { AppContextProvider } from "./Context/AppContext";
import { AuthProvider } from "./Context/AuthContext";
import { GameContextProvider } from "./Context/GameContext";
import AppRoutes from "./Routes/AppRoutes";

const App = () => {
  return (
    <AuthProvider>
      <GameContextProvider>
        <AppContextProvider>
          <AppRoutes />
        </AppContextProvider>
      </GameContextProvider>
    </AuthProvider>
  );
};

export default App;
