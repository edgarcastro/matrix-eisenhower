import React, { Dispatch, SetStateAction, useState } from 'react';

interface ContextModel {
  email?: string | null;
  displayName?: string | null;
  setEmail: Dispatch<SetStateAction<string | undefined | null>>;
  setDisplayName: Dispatch<SetStateAction<string | undefined | null>>;
}

const defaultValue: ContextModel = {
  email: '',
  displayName: '',
  setEmail() {
    //Do nothing
  },
  setDisplayName() {
    //Do nothing
  },
};

export const AppContext: React.Context<ContextModel> =
  React.createContext(defaultValue);

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string | undefined | null>('');
  const [displayName, setDisplayName] = useState<string | undefined | null>('');

  const value: ContextModel = {
    email,
    displayName,
    setEmail,
    setDisplayName,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
