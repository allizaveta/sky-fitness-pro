import { useParams } from "react-router-dom";
import { getWorkout } from "../api";
import { useEffect, useState } from "react";
import { WorkoutType } from "../types";
import YouTube from "react-youtube";
import { ModalWrapper } from "../utils/ModalWrapper";

export function Workout() {
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState<WorkoutType | null>(null);
  const [exercise, setExercise] = useState(false);

  useEffect(() => {
    getWorkout(workoutId)
      .then((workout) => {
        setWorkout(workout);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [workoutId]);

  return (
    <div className="flex flex-col gap-[24px] laptop:gap-[40px]">
      <div className="header">
        <h1 className="font-roboto text-lg laptop:text-6xl font-medium leading-6 laptop:leading-none text-left mb-[10px] laptop:mb-[14px]">
          {workout?.course}
        </h1>
        <p className="font-roboto text-sm laptop:text-2xl font-normal leading-5 laptop:leading-9 text-left">
          {workout?.name}
        </p>
      </div>
      <div className="video">
        {workout?.video && (
          <YouTube
            videoId={workout.video}
            opts={{
              width: "100%",
              height: "100%",
            }}
            className="w-full h-[189px] laptop:h-[639px]"
          />
        )}
      </div>
      <div className="flex flex-col exercise rounded-[30px] bg-white shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] mb-[94px] laptop:mb-[200px] p-[30px] laptop:p-[40px]">
        <div className="flex gap-[20px] flex-col mb-[40px]">
          <h2 className="font-StratosSkyeng text-4xl font-normal leading-10 text-left">
            Упражнения тренировки {workout?.number}
          </h2>
          <div className="flex flex-col laptop:grid">
            {workout?.exercises?.map((el, id) => {
              return (
                <div key={id}>
                  <p className="font-roboto text-sm font-normal leading-5 text-left mb-[10px]">
                    {el.name} {el.amount}
                  </p>
                  <div className="w-[283px] laptop:w-[320px] h-[6px] bg-inactive-btn rounded-full">
                    <div className="w-[160px] h-[6px] bg-exercise-blue rounded-full" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <button
          className="bg-custom-green rounded-full w-[283px] h-[52px] laptop:w-[320px] hover:bg-hover-green active:bg-active-green self-center text-lg font-normal leading-5 text-center active:text-white"
          onClick={() => setExercise(true)}
        >
          Заполнить свой прогресс
        </button>
      </div>
      {exercise && (
        <ModalWrapper containerClassName="w-426 p-[40px] flex flex-col gap-[48px]">
          <h3 className="font-StratosSkyeng text-4xl font-normal leading-[35.2px] text-left">
            Мой прогресс
          </h3>
          <div className="flex flex-col gap-[34px]">
            <div className="flex flex-col gap-[20px]">
              {workout?.exercises?.map((el, id) => {
                return (
                  <div key={id}>
                    <p className="font-roboto text-sm font-normal leading-[19.8px] text-left mb-[10px]">
                      Сколько раз вы сделали {el.name.toLowerCase()}?
                    </p>
                    <input
                      placeholder="0"
                      className="p-4 pl-4.5 pr-4.5 rounded-lg border border-solid border-[#D0CECE] w-[320px]"
                    />
                  </div>
                );
              })}
            </div>
            <button
              className="bg-custom-green rounded-full w-[283px] h-[52px] laptop:w-[320px] hover:bg-hover-green active:bg-active-green self-center text-lg font-normal leading-5 text-center active:text-white"
              onClick={() => {
                console.log("Сохраняю");
                setExercise(false);
              }}
            >
              Сохранить
            </button>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
}
