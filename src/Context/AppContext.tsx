import { createContext, useContext, useState, type ReactNode } from "react";

type ThemeType = "dark" | "light";

export interface ThemeObj {
  name: string;
  color: string;
  iconBgColor: string;
  bodyColor: string;
  boxColor: string;
  highLight: string;
}

interface AppContextType {
  themeColor: Record<ThemeType, ThemeObj>;
  theme: ThemeType;
  toggleTheme: () => void;
  backendUrl: string;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export interface Props {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: Props) => {
  const themeColor = {
    dark: {
      name: "dark",
      color: "#1a1b1f",
      iconBgColor: "#393b47",
      bodyColor: "#1a1b1f",
      boxColor: "#22222c",
      highLight: "#0a82ed",
    },
    light: {
      name: "light",
      color: "#ffffff",
      iconBgColor: "#e5e5ea",
      bodyColor: "#f5f5f7",
      boxColor: "#ffffff",
      highLight: "#8080ff",
    },
  };

  const [theme, setTheme] = useState<ThemeType>("dark");
  const backendUrl = "http://localhost:3000";

  const toggleTheme = () => {
    setTheme((curr) => (curr === "dark" ? "light" : "dark"));
  };

  return (
    <AppContext.Provider value={{ theme, themeColor, toggleTheme, backendUrl }}>
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
