import { useEffect } from "react";
import { useAuthorizationModal } from "../context/AuthorizationContext";

interface ModalWrapperProps {
  containerClassName?: string;
  children: React.ReactNode;
}

export function ModalWrapper({
  containerClassName,
  children,
}: ModalWrapperProps) {
  const { closeModal, closeRegistrationModal } = useAuthorizationModal();
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [closeModal, closeRegistrationModal]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
      closeRegistrationModal();
    }
  };
  return (
    <div
      onClick={handleOutsideClick}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-45"
    >
      <div
        className={`bg-white rounded-[30px] flex flex-col items-center ${containerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
