import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex justify-between pt-[40px] pb-[39px] laptop:pt-[50px] laptop:pb-[60px]">
      <div className="flex flex-col">
        <img src="/logo (1).svg" className="w-[220px] h-auto pb-[15px]" />
        <p className="hidden laptop:block opacity-50">
          Онлайн-тренировки для занятий дома
        </p>
      </div>
      <button className="bg-custom-green rounded-full w-[83px] h-[36px] laptop:w-[103px] laptop:h-[52px]  hover:bg-hover-green active:bg-active-green self-center text-lg font-normal leading-5 text-center active:text-white">
        <Link to="/login">Войти</Link>
      </button>
    </header>
  );
}
