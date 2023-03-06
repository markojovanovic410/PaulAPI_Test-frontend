import { createContext, useContext, useEffect, useState } from "react";


export const CookieContext = createContext();

export function useCookie() {
  return useContext(CookieContext);
}

export const CookieContextProvider = ({ children, initcookie }) => {
  const [cookie, setCookie] = useState(initcookie);

  const contextProvider = {
    cookie,
    setCookie
  };
  return <CookieContext.Provider value={contextProvider}>{children}</CookieContext.Provider>;
};
