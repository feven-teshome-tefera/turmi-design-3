"use client";

import { createContext, Fragment, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("EN");

  useEffect(() => {
    const saved = window.localStorage.getItem("turmi-language");
    const initialLanguage = saved === "AM" || saved === "አማ" ? "AM" : "EN";
    document.documentElement.lang = initialLanguage === "AM" ? "am" : "en";
    setLanguage(initialLanguage);
  }, []);

  function chooseLanguage(value) {
    if (value === language) return;
    window.localStorage.setItem("turmi-language", value);
    document.documentElement.lang = value === "AM" ? "am" : "en";
    setLanguage(value);
  }

  return (
    <LanguageContext.Provider value={{ language, chooseLanguage, isAmharic: language === "AM" }}>
      <Fragment key={language}>{children}</Fragment>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
