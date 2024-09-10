export function Header() {
  return (
    <header className="flex justify-around pt-[40px] pb-[39px] md:pt-[50px] md:pb-[60px]">
      <div className="flex flex-col">
        <img src="/logo (1).svg" className="w-[220px] h-auto pb-[15px]" />
        <p className="hidden md:block ">Онлайн-тренировки для занятий дома</p>
      </div>
      <button className="bg-custom-green rounded-full w-[83px] h-[36px] md:w-[103px] md:h-[52px]  hover:bg-hover-green active:bg-active-green self-center">
        Войти
      </button>
    </header>
  );
}
