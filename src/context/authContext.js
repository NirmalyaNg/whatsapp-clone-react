import React, { createContext, useReducer } from "react";
import reducer, { initialState } from "./reducer";

export const authContext = createContext();
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <authContext.Provider value={{ state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};
