// src/context/AppContext.tsx
import React, { createContext, useState } from 'react';

type Owner = {
  name: string;
  email: string;
};

type AppContextType = {
  currentOwner: Owner | null;
  registerOwner: (owner: Owner) => void;
  loginOwner: (email: string) => boolean;
};

export const AppContext = createContext<AppContextType>({
  currentOwner: null,
  registerOwner: () => { },
  loginOwner: () => false,
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [currentOwner, setCurrentOwner] = useState<Owner | null>(null);

  const registerOwner = (owner: Owner) => {
    setOwners((prev) => [...prev, owner]);
    setCurrentOwner(owner);
  };

  const loginOwner = (email: string) => {
    const found = owners.find((o) => o.email === email);
    if (found) {
      setCurrentOwner(found);
      return true;
    }
    return false;
  };

  return (
    <AppContext.Provider value={{ currentOwner, registerOwner, loginOwner }}>
      {children}
    </AppContext.Provider>
  );
};
