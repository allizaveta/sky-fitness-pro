import { useEffect } from "react";
import { useAuthorizationModal } from "../context/AuthorizationContext";

export function Authorization() {
  const { closeModal, openRegistrationModal } = useAuthorizationModal();

  // Закрытие модалки при нажатии Escape
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
  }, [closeModal]);

  // Закрытие модалки при клике за её пределы
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-45"
      onClick={handleOutsideClick}
    >
      <div className="bg-white w-[360px] h-[460px] pd-lg rounded-[30px] flex flex-col items-center">
        <img
          src="/logo (1).svg"
          className="w-[220px] h-auto pt-[40px] pb-[48px]"
        />
        <div className="flex flex-col mb-[34px]">
          <input
            placeholder="Логин"
            className="w-[280px] h-[52px] px-[18px] py-[16px] rounded-[8px] border border-[#D0CECE] opacity-100 mb-[10px]"
            type="text"
          />
          <input
            placeholder="Пароль"
            className="w-[280px] h-[52px] px-[18px] py-[16px] rounded-[8px] border border-[#D0CECE] opacity-100"
            type="email"
          />
        </div>
        {/* скрытое сообщение об ошибке */}
        <p className="text-error hidden">
          Пароль введен неверно, попробуйте
          <br />
          еще раз. <a href="#">Восстановить пароль?</a>
        </p>
        <button className="rounded-full bg-custom-green hover:bg-hover-green active:bg-active-green w-[280px] h-[52px] mb-[10px] text-lg font-normal leading-5 active:text-white text-center">
          Войти
        </button>
        <button
          className="rounded-full bg-white hover:bg-hover-white active:bg-active-white w-[280px] h-[52px] text-lg font-normal leading-5 text-center border-[1px] border-black"
          onClick={() => {
            closeModal();
            openRegistrationModal();
          }}
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
}
