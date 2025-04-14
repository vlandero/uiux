// src/context/AppContext.tsx
import React, { createContext, useState } from 'react';
import { Owner } from '../data';


type AppContextType = {
  currentOwner: Owner | null;
  registerOwner: (name: string, email: string) => void;
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

  const registerOwner = (name: string, email: string) => {
    const newId =
      owners.length > 0
        ? Math.max(...owners.map((o) => Number(o.id))) + 1
        : 1;
  
    const owner: Owner = {
      id: newId,
      name,
      email,
    };
  
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
