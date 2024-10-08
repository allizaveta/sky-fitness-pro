import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextType {
  isModalOpen: boolean;
  isRegistrationOpen: boolean;
  isPasswordModalOpen: boolean;
  isUnauthorizedModalOpen: boolean;
  isResetPasswordModalOpen: boolean;
  resetPasswordEmail: string;
  exercise: boolean;
  openModal: () => void;
  closeModal: () => void;
  openRegistrationModal: () => void;
  closeRegistrationModal: () => void;
  openPasswordModal: () => void;
  closePasswordModal: () => void;
  openUnauthorizedModal: () => void;
  closeUnauthorizedModal: () => void;
  openResetPasswordModal: (email: string) => void;
  closeResetPasswordModal: () => void;
  openExercise: () => void;
  closeExercise: () => void;
}

const AuthorizationContext = createContext<ModalContextType | undefined>(
  undefined
);

export function AuthorizationProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isUnauthorizedModalOpen, setIsUnauthorizedModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState<string>("");
  const [exercise, setExercise] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openRegistrationModal = () => setIsRegistrationOpen(true);
  const closeRegistrationModal = () => setIsRegistrationOpen(false);

  const openPasswordModal = () => setIsPasswordModalOpen(true);
  const closePasswordModal = () => setIsPasswordModalOpen(false);

  const openUnauthorizedModal = () => setIsUnauthorizedModalOpen(true);
  const closeUnauthorizedModal = () => setIsUnauthorizedModalOpen(false);

  const openResetPasswordModal = (email: string) => {
    setResetPasswordEmail(email);
    setIsResetPasswordModalOpen(true);
  };
  const closeResetPasswordModal = () => setIsResetPasswordModalOpen(false);

  const openExercise = () => setExercise(true);
  const closeExercise = () => setExercise(false);

  return (
    <AuthorizationContext.Provider
      value={{
        isModalOpen,
        isRegistrationOpen,
        isPasswordModalOpen,
        isUnauthorizedModalOpen,
        isResetPasswordModalOpen,
        resetPasswordEmail,
        exercise,
        openModal,
        closeModal,
        openRegistrationModal,
        closeRegistrationModal,
        openPasswordModal,
        closePasswordModal,
        openUnauthorizedModal,
        closeUnauthorizedModal,
        openResetPasswordModal,
        closeResetPasswordModal,
        openExercise,
        closeExercise,
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
