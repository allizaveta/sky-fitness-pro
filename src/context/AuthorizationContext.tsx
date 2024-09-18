import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface ModalContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const AuthorizationContext = createContext<ModalContextType | undefined>(
  undefined
);

export function AuthorizationProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; // Отключаем прокрутку
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <AuthorizationContext.Provider
      value={{ isModalOpen, openModal, closeModal }}
    >
      {children}
    </AuthorizationContext.Provider>
  );
}

export function useAuthorizationModal() {
  const context = useContext(AuthorizationContext);
  if (!context) {
    throw new Error("useModal должен использоваться внутри ModalProvider");
  }
  return context;
}
