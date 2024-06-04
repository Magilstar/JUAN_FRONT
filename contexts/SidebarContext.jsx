import { createContext, useState } from "react";

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  return (
    <SidebarContext.Provider value={{ isSidebarVisible, setSidebarVisible }}>
      {children}
    </SidebarContext.Provider>
  );
};
