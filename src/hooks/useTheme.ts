import { useCallback, useState } from "react";

const KEY = "skot-theme";

function readInitial() {
  if (document.documentElement.classList.contains("dark")) return true; // set by the inline script in index.html
  try {
    return localStorage.getItem(KEY) === "dark";
  } catch {
    return false;
  }
}

/** Light / dark switch. The class lives on <html>; index.html restores it before first paint. */
export function useTheme() {
  const [dark, setDark] = useState(readInitial);

  // keep <html> in sync with state (also covers the case where the inline script did not run)
  if (typeof document !== "undefined") document.documentElement.classList.toggle("dark", dark);

  const toggle = useCallback(() => {
    setDark((d) => {
      const nd = !d;
      try {
        localStorage.setItem(KEY, nd ? "dark" : "light");
      } catch {
        /* storage can be unavailable (private mode) – the switch still works */
      }
      return nd;
    });
  }, []);

  return { dark, toggle };
}
