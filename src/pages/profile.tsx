import { useUserContext } from "../context/userContext";

export function Profile() {
  const { currentUser, handleLogout } = useUserContext();
  return (
    <>
      <div className="mb-[200px]">
        <h2 className="font-roboto text-[40px] font-semibold leading-[44px] text-left text-black mb-[40px]">
          Профиль
        </h2>
        <div className="bg-white rounded-[30px] mb-[60px]">
          <div className="p-[30px]  flex flex-row gap-[33px] items-center">
            <img src="../public/profile.png" alt="profile pic" />
            <div className="flex flex-col gap-[30px] items-start">
              <p>Логин: {currentUser?.email}</p>
              <div className="flex flex-row gap-[10px] ">
                <button className="bg-custom-green rounded-full w-[206px] h-[46px] hover:bg-hover-green active:bg-active-green self-center text-lg font-normal leading-5 text-center active:text-white">
                  Изменить пароль
                </button>
                <button
                  className="rounded-full bg-white hover:bg-hover-white active:bg-active-white w-[206px] h-[46px] text-lg font-normal leading-5 text-center border-[1px] border-black"
                  onClick={handleLogout}
                >
                  Выйти
                </button>
              </div>
            </div>
          </div>
        </div>
        <h2 className="font-roboto text-[40px] font-semibold leading-[44px] text-left text-black mb-[40px]">
          Мои курсы
        </h2>
        <div className="relative bg-white w-[360px] laptop:w-[360px] h-[649px] flex flex-col gap-[24px] shadow-[0px_4px_67px_-12px_#00000021] rounded-[30px]">
          <img src="../public/MaskGroup(5).png"></img>
          <img
          className="h-[30px] w-[30px] absolute fill-black top-[24px] right-[24px]"
          src="../public/deleteCourse.png"
        />
          <div className="p-[30px] pt-0">
            <p className="text-3xl font-semibold leading-9 text-left pb-[20px]">
              Йога
            </p>
            <div className="flex flex-wrap gap-[6px] text-sm font-normal leading-5 text-left">
              <div className="flex flex-row h-[38px] bg-inactive-btn rounded-[50px] p-[10px] gap-[6px]">
                <img src="/Calendar.svg" className="w-[16px]" />
                <p className="self-center">25 дней</p>
              </div>
              <div className="flex flex-row h-[38px] bg-inactive-btn rounded-[50px] p-[10px] gap-[6px]">
                <img src="/Time.svg" className="w-[16px]" />
                <p className="self-center">20-50 мин/день</p>
              </div>
              <div className="flex flex-row h-[38px] bg-inactive-btn rounded-[50px] p-[10px] gap-[6px]">
                <img src="/mingcute_signal-fill.svg" className="w-[16px]" />
                <p className="self-center">Сложность</p>
              </div>
            </div>
            <p>Прогресс 40%</p>
            <button className="bg-custom-green rounded-full w-[300px] h-[52px] hover:bg-hover-green active:bg-active-green self-center text-lg font-normal leading-5 text-center active:text-white">
              Продолжить
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
