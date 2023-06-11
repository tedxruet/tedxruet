"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext<() => void>(() => {});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      return;
    }
    document.documentElement.classList.remove("dark");
  }, [theme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as string | undefined;
    if (savedTheme === "light") {
      return setTheme("light");
    }
  }, []);

  const switchTheme = useCallback(() => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.removeItem("theme");
      return;
    }
    setTheme("light");
    localStorage.setItem("theme", "light");
  }, [theme]);

  return (
    <ThemeContext.Provider value={switchTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
