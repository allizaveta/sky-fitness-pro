import { createContext, useContext, useState, ReactNode } from "react";
interface IUser {
  uid: string;
  email: string;
}
interface IUserContextProps {
  currentUser: IUser | null;
  setCurrentUser: (user: IUser | null) => void;
  handleLogout: () => void;
}

const UserContext = createContext<IUserContextProps | undefined>(undefined);

// Хук для использования контекста
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  // Логика выхода
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
