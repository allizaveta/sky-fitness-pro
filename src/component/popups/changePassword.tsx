import { ModalWrapper } from "../../utils/ModalWrapper";

export function ChangePassword() {
  return (
    <ModalWrapper containerClassName="w-[360px] h-[460px] pd-lg ">
      <div className="bg-white w-[360px] h-[460px] pd-lg rounded-[30px] flex flex-col items-center">
        <img
          src="/logo (1).svg"
          className="w-[220px] h-auto pt-[40px] pb-[48px]"
        />
        <div className="flex flex-col mb-[34px]">
          <input
            placeholder="Новый пароль"
            className="w-[280px] h-[52px] px-[18px] py-[16px] rounded-[8px] border border-[#D0CECE] opacity-100 mb-[10px]"
            type="password"
            name="password"
          />
          <input
            placeholder="Повторите пароль"
            className="w-[280px] h-[52px] px-[18px] py-[16px] rounded-[8px] border border-[#D0CECE] opacity-100"
            type="password"
            name="password"
          />
        </div>
        <button className="rounded-full bg-custom-green hover:bg-hover-green active:bg-active-green w-[280px] h-[52px] mb-[10px] text-lg font-normal leading-5 active:text-white text-center">
          Подтвердить
        </button>
      </div>
    </ModalWrapper>
  );
}
