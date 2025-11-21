import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme, Appearance } from "react-native";

interface ColorPalette {
  primary: string;
  secondary: string;
  background: string;
  card: string;
  text: string;
  subtleText: string;
  inputBackground: string;
  inputBorder: string;
  googleIcon: string;
  error: string;
}

const LightTheme: ColorPalette = {
  primary: "#4b6cb7",
  secondary: "#182848",
  background: "#F0F2F5",
  card: "white",
  text: "#333333",
  subtleText: "#999999",
  inputBackground: "#F4F7F9",
  inputBorder: "#EAEAEA",
  googleIcon: "#DB4437",
  error: "#DC3545",
};

const DarkTheme: ColorPalette = {
  primary: "#7AB8FF",
  secondary: "#5574AA",
  background: "#121212",
  card: "#1E1E1E",
  text: "#E0E0E0",
  subtleText: "#A0A0A0",
  inputBackground: "#282828",
  inputBorder: "#3A3A3A",
  googleIcon: "#DB4437",
  error: "#FF7088",
};

interface ThemeContextType {
  scheme: "light" | "dark";
  colors: ColorPalette;
}

const ThemeContext = createContext<ThemeContextType>({
  scheme: "light",
  colors: LightTheme,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemScheme = useColorScheme();
  const [scheme, setScheme] = useState<"light" | "dark">(
    systemScheme === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    const initial = Appearance.getColorScheme();
    setScheme(initial === "dark" ? "dark" : "light");

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setScheme(colorScheme === "dark" ? "dark" : "light");
    });

    return () => subscription.remove();
  }, []);

  const colors = scheme === "dark" ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ colors, scheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
