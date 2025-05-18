import { createContext, useContext, useState, type ReactNode } from "react";

type ThemeType = "dark" | "light";

export interface ThemeObj {
  color: string;
  bodyColor: string;
  boxColor: string;
  highLight: string;
}

interface AppContextType {
  themeColor: Record<ThemeType, ThemeObj>;
  theme: ThemeType;
  toggleTheme: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: Props) => {
  const themeColor = {
    dark: {
      color: "#000000",
      bodyColor: "#2e2e2e",
      boxColor: "#454545",
      highLight: "#4db1e5",
    },
    light: {
      color: "#ffffff",
      bodyColor: "#ebebeb",
      boxColor: "#c6c6c6",
      highLight: "#ba9df1",
    },
  };
  const [theme, setTheme] = useState<ThemeType>("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "dark" ? "light" : "dark"));
  };

  return (
    <AppContext.Provider value={{ theme, themeColor, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
