import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isModalOpen: boolean;
  isRegistrationOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  openRegistrationModal: () => void;
  closeRegistrationModal: () => void;
}

const AuthorizationContext = createContext<ModalContextType | undefined>(
  undefined
);

export function AuthorizationProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openRegistrationModal = () => setIsRegistrationOpen(true);
  const closeRegistrationModal = () => setIsRegistrationOpen(false);

  return (
    <AuthorizationContext.Provider
      value={{
        isModalOpen,
        isRegistrationOpen,
        openModal,
        closeModal,
        openRegistrationModal,
        closeRegistrationModal,
      }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
}

export function useAuthorizationModal() {
  const context = useContext(AuthorizationContext);
  if (!context) {
    throw new Error(
      "useAuthorizationModal должен использоваться внутри AuthorizationProvider"
    );
  }
  return context;
}
