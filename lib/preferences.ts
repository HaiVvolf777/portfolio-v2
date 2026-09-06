"use client";

import { useEffect, useSyncExternalStore } from "react";

type ThemePreference = "light" | "dark" | "system";
let memoryTheme: ThemePreference | undefined;
function readPreference(): ThemePreference {
  if (memoryTheme) return memoryTheme;
  try { const value = localStorage.getItem("haider-theme"); if (value === "light" || value === "dark") return value; } catch { /* In-memory controls remain available. */ }
  return "system";
}
function getSnapshot() {
  const preference = readPreference();
  const theme = preference === "system" ? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") : preference;
  return `${preference}|${theme}|${matchMedia("(prefers-reduced-motion: reduce)").matches}`;
}
function subscribe(callback: () => void) {
  const dark = matchMedia("(prefers-color-scheme: dark)");
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const storage = () => { memoryTheme = undefined; callback(); };
  dark.addEventListener("change", callback); motion.addEventListener("change", callback);
  window.addEventListener("haider-preferences", callback); window.addEventListener("storage", storage);
  return () => { dark.removeEventListener("change", callback); motion.removeEventListener("change", callback); window.removeEventListener("haider-preferences", callback); window.removeEventListener("storage", storage); };
}
export function setThemePreference(preference: ThemePreference) {
  memoryTheme = preference;
  try { localStorage.setItem("haider-theme", preference); } catch { /* In-memory fallback. */ }
  window.dispatchEvent(new Event("haider-preferences"));
}
export function usePreferences() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "system|light|false");
  const [preference, resolved, motion] = snapshot.split("|");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", resolved);
    document.documentElement.style.setProperty("color-scheme", resolved);
  }, [resolved]);
  return { theme: resolved as "light" | "dark", themePreference: preference as ThemePreference, reducedMotion: motion === "true", setThemePreference };
}
