import { useNavigate } from "react-router-dom";
import RoutesPath from "../../RoutesPath";
import { ModalWrapper } from "../../utils/ModalWrapper";

export function Authorization() {
  const navigate = useNavigate();
  return (
    <ModalWrapper containerClassName="w-[360px] h-[460px] pd-lg">
      <div className="bg-white w-[360px] h-[460px] pd-lg rounded-[30px] flex flex-col items-center">
        <img
          src="/logo (1).svg"
          className="w-[220px] h-auto pt-[40px] pb-[48px]"
        />
        <div className="flex flex-col mb-[34px]">
          <input
            placeholder="Логин"
            className="w-[280px] h-[52px] px-[18px] py-[16px] rounded-[8px] border border-[#D0CECE] opacity-100 mb-[10px]"
            type="email"
          />
          <input
            placeholder="Пароль"
            className="w-[280px] h-[52px] px-[18px] py-[16px] rounded-[8px] border border-[#D0CECE] opacity-100"
            type="password"
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
          onClick={() => navigate(RoutesPath.REGISTER)}
          className="rounded-full bg-white hover:bg-hover-white active:bg-active-white w-[280px] h-[52px] text-lg font-normal leading-5 text-center border-[1px] border-black"
        >
          Зарегистрироваться
        </button>
      </div>
    </ModalWrapper>
  );
}
