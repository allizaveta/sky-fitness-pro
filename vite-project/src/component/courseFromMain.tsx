export function CourseMain() {
  return (
    <div className="bg-white w-[343px] laptop:w-[360px] h-[501px] flex flex-col gap-[24px] shadow-[0px_4px_67px_-12px_#00000021] rounded-[30px]">
      <img src="/Mask group (5).png" />
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
      </div>
    </div>
  );
}
