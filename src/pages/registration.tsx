import { Link } from "react-router-dom";

export function Registration() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-45">
      <div className="bg-white w-[360px] h-[487px] pd-lg rounded-[30px] flex flex-col items-center">
        <img
          src="/logo (1).svg"
          className="w-[220px] h-auto pt-[40px] pb-[48px]"
        />
        <div className="flex flex-col mb-[34px]">
          <input
            placeholder="Эл. почта"
            className="w-[280px] h-[52px] px-[18px] py-[16px] rounded-[8px] border border-[#D0CECE] opacity-100 mb-[10px]"
            type="email"
          />
          <input
            placeholder="Пароль"
            className="w-[280px] h-[52px] px-[18px] py-[16px] rounded-[8px] border border-[#D0CECE] opacity-100 mb-[10px]"
            type="password"
          />
          <input
            placeholder="Повторите пароль"
            className="w-[280px] h-[52px] px-[18px] py-[16px] rounded-[8px] border border-[#D0CECE] opacity-100"
            type="password"
          />
        </div>
        {/* скрытое сообщение об ошибке */}
        <p className="text-error hidden">
          Данная почта уже используется.
          <br />
          <a href="#"> Попробуйте войти.</a>
        </p>
        <button className="rounded-full bg-custom-green hover:bg-hover-green active:bg-active-green w-[280px] h-[52px] mb-[10px] text-lg font-normal leading-5 active:text-white text-center">
          Зарегистрироваться
        </button>
        <button className="rounded-full bg-white hover:bg-hover-white active:bg-active-white w-[280px] h-[52px] text-lg font-normal leading-5 text-center border-[1px] border-black">
          <Link to="/login">Войти</Link>
        </button>
      </div>
    </div>
  );
}
