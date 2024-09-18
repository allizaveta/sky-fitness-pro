import React from "react";

interface ModalWrapperProps {
  onOutsideClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}

export function ModalWrapper({ onOutsideClick, children }: ModalWrapperProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-45"
      onClick={onOutsideClick}
    >
      <div className="bg-white w-[360px] h-[460px] pd-lg rounded-[30px] flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
