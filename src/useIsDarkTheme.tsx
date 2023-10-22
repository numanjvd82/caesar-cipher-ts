import { useState } from "react";

export function useThemeMode(): [boolean, () => void] {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (isDarkMode) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  return [isDarkMode, toggleTheme];
}

export function isDarkMode() {
  return document.documentElement.classList.contains("dark");
}
