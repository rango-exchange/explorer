import React, { createContext, useContext, PropsWithChildren } from 'react';

interface MainContextProps {
  isMobile: boolean;
}

const MainContext = createContext<MainContextProps | undefined>(undefined);

export const MainProvider = (props: PropsWithChildren<MainContextProps>) => {
  const { isMobile, children } = props;
  return (
    <MainContext.Provider value={{ isMobile }}>{children}</MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error('useMainContext must be used within an MainProvider');
  }
  return context;
};
