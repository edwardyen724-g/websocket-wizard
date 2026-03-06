import React, { createContext, useContext } from 'react';

const SupabaseContext = createContext(null);

export const SupabaseProvider = ({ children }) => {
  return <SupabaseContext.Provider value={{}}>{children}</SupabaseContext.Provider>;
};

export const useSupabase = () => {
  return useContext(SupabaseContext);
};