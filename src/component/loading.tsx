export function Loading() {
  return (
    <div className="grid h-custom place-items-center bg-bg">
      <div className="cup bg-custom-green relative h-[25vh] w-[33.3333333333vh] rounded-[5.5555555556vh_5.5555555556vh_16.6666666667vh_16.6666666667vh] translate-y-[16.6666666667vh]">
        <div className="cup__handler absolute bg-bg rounded-[11.1111111111vh_5.5555555556vh_11.1111111111vh_6.9444444444vh] border-[1.3888888889vh] border-l-[2.7777777778vh] border-custom-green h-[13.8888888889vh] w-[13.8888888889vh] translate-x-[62.5%] translate-y-[-18.75%] place-self-center-end top-[3vh] right-[0vw]"></div>
        <div className="cup__steam absolute bg-active-white rounded-[13.8888888889vh_6.9444444444vh] h-[16.6666666667vh] w-[11.1111111111vh] translate-y-[-25vh] place-self-start-center top-[7vh] right-[76px]">
        </div>
      </div>
    </div>
  );
}
