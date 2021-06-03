import { User } from '@oasis-sh/react-gql';
import { createContext, useState } from 'react';

const AuthContext = createContext<{ user: User | undefined }>({
  user: undefined,
});

export const AuthProvider: React.FC = ({ children }) => {
  const [user] = useState<User | undefined>();

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
