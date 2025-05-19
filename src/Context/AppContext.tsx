import { createContext, useContext, useState, type ReactNode } from "react";

type ThemeType = "dark" | "light";

export interface ThemeObj {
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
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const AppContextProvider = ({ children }: Props) => {
  const themeColor = {
    dark: {
      color: "#000000",
      iconBgColor: "#141419",
      bodyColor: "#2e2e2e",
      boxColor: "#4b4551",
      highLight: "#4db1e5",
    },
    light: {
      color: "#ffffff",
      iconBgColor: "#e5e5ea",
      bodyColor: "#f5f5f7",
      boxColor: "#ffffff",
      highLight: "#8080ff",
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
