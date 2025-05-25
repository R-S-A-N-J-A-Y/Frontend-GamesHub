import { AppContextProvider } from "./Context/AppContext";
import { AuthProvider } from "./Context/AuthContext";
import { GameContextProvider } from "./Context/GameContext";
import AppRoutes from "./Routes/AppRoutes";

const App = () => {
  return (
    <AppContextProvider>
      <AuthProvider>
        <GameContextProvider>
          <AppRoutes />
        </GameContextProvider>
      </AuthProvider>
    </AppContextProvider>
  );
};

export default App;
