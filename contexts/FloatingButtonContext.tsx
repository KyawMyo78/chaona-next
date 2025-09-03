import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FloatingButtonContextType {
  isFloatingButtonVisible: boolean;
  showFloatingButton: () => void;
  hideFloatingButton: () => void;
}

const FloatingButtonContext = createContext<FloatingButtonContextType | undefined>(undefined);

export const useFloatingButton = () => {
  const context = useContext(FloatingButtonContext);
  if (context === undefined) {
    throw new Error('useFloatingButton must be used within a FloatingButtonProvider');
  }
  return context;
};

interface FloatingButtonProviderProps {
  children: ReactNode;
}

export const FloatingButtonProvider: React.FC<FloatingButtonProviderProps> = ({ children }) => {
  const [isFloatingButtonVisible, setIsFloatingButtonVisible] = useState(true);

  const showFloatingButton = () => setIsFloatingButtonVisible(true);
  const hideFloatingButton = () => setIsFloatingButtonVisible(false);

  return (
    <FloatingButtonContext.Provider value={{
      isFloatingButtonVisible,
      showFloatingButton,
      hideFloatingButton,
    }}>
      {children}
    </FloatingButtonContext.Provider>
  );
};
