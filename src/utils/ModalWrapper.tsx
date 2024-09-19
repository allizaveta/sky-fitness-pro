interface ModalWrapperProps {
  containerClassName?: string;
  children: React.ReactNode;
}

export function ModalWrapper({
  containerClassName,
  children,
}: ModalWrapperProps) {
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
