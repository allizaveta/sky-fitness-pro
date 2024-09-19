import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface ModalWrapperProps {
  containerClassName?: string;
  children: React.ReactNode;
}

export function ModalWrapper({
  containerClassName,
  children,
}: ModalWrapperProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Блокируем скролл при открытии модалки
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const currentPath = location.pathname;
        const newPath = currentPath.substring(0, currentPath.lastIndexOf("/"));
        navigate(newPath || "/");
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      // Разрешаем скролл при закрытии модалки
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [location.pathname, navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-45">
      <div
        className={`bg-white rounded-[30px] flex flex-col items-center ${containerClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
