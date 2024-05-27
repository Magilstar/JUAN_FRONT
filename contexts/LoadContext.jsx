import { createContext, useState } from "react";

export const LoadContext = createContext();

export const LoadProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadContext.Provider>
  );
};
