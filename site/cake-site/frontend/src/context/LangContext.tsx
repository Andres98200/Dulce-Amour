// src/context/LangContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from "react";

type LangContextType = {
  lang: "es" | "fr";
  setLang: (lang: "es" | "fr") => void;
};

const LangContext = createContext<LangContextType | undefined>(undefined);

export const LangProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<"es" | "fr">("es");
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
};

export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) throw new Error("useLang must be used within a LangProvider");
  return context;
};
