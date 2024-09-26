import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isModalOpen: boolean;
  isRegistrationOpen: boolean;
  isPasswordModalOpen: boolean;
  isUnauthorizedModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  openRegistrationModal: () => void;
  closeRegistrationModal: () => void;
  openPasswordModal: () => void;
  closePasswordModal: () => void;
  openUnauthorizedModal: () => void;
  closeUnauthorizedModal: () => void;
}

const AuthorizationContext = createContext<ModalContextType | undefined>(
  undefined
);

export function AuthorizationProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isUnauthorizedModalOpen, setIsUnauthorizedModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openRegistrationModal = () => setIsRegistrationOpen(true);
  const closeRegistrationModal = () => setIsRegistrationOpen(false);

  const openPasswordModal = () => setIsPasswordModalOpen(true);
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  const openUnauthorizedModal = () => setIsUnauthorizedModalOpen(true);
  const closeUnauthorizedModal = () => setIsUnauthorizedModalOpen(false);

  return (
    <AuthorizationContext.Provider
      value={{
        isModalOpen,
        isRegistrationOpen,
        isPasswordModalOpen,
        isUnauthorizedModalOpen,
        openModal,
        closeModal,
        openRegistrationModal,
        closeRegistrationModal,
        openPasswordModal,
        closePasswordModal,
        openUnauthorizedModal,
        closeUnauthorizedModal,
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
