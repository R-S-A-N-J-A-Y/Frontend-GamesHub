import { AppContextProvider } from "./Context/AppContext";
import AppRoutes from "./Routes/AppRoutes";

const App = () => {
  return (
    <AppContextProvider>
      <AppRoutes />
    </AppContextProvider>
  );
};

export default App;
