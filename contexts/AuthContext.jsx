import { createContext, useState } from "react";

export const AuthContext = createContext();

const initialState = {
  isSession: false,
  token: null,
};

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(initialState);

  const signOut = () => {
    setSession(initialState);
  };

  return (
    <AuthContext.Provider value={{ session, setSession, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};