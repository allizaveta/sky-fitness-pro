import { useParams } from "react-router-dom";
import { addWorkoutProgress, getWorkout, getWorkoutProgress } from "../api";
import { useEffect, useState } from "react";
import { WorkoutType } from "../types";
import YouTube from "react-youtube";
import { ModalWrapper } from "../utils/ModalWrapper";
import { arr } from "../utils/array";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export function Workout() {
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState<WorkoutType | null>(null);
  const [exercise, setExercise] = useState(false);
  const [error, setError] = useState("");
  const [amountOfExercises, setAmountOfExercises] = useState<number[]>([]);
  const courseId = arr.find((el) => el.workouts.includes(workoutId ?? ""))?.id;
  const user = useSelector((state: RootState) => state.auth.user);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (isNaN(Number(value))) {
      setError("Вы можете вводить в поле только числа");
    } else {
      setError("");
      setAmountOfExercises((prevArray) => {
        const newArray = [...(prevArray ?? [])];
        newArray[Number(name)] = Number(value);
        return newArray;
      });
    }
  }

  function onSaveButton() {
    console.log(amountOfExercises, courseId);
    console.log(workout?.exercises);
    const isDone = amountOfExercises.every((el, index) => {
      return workout?.exercises && el >= workout.exercises[index + 1]?.amount;
    });
    console.log(isDone);

    if (user && courseId && workoutId) {
      addWorkoutProgress(user._id, courseId, workoutId, amountOfExercises, isDone ?? false).then(() => {
        setExercise(false);
      }).catch((e) => {
        setError(e.message);
      });
    } else {
      console.error("User is not logged in or authenticated");
    }
  }

  useEffect(() => {
    getWorkout(workoutId)
      .then((workout) => {
        setWorkout(workout);
      })
      .catch((e) => {
        console.error(e);
      });

    if (user && courseId && workoutId) {
      getWorkoutProgress(user._id, courseId, workoutId).then((values) => {
        if (values !== null) {
          setAmountOfExercises(values);
        } else {
          setAmountOfExercises([]);
        }
      });
    } else {
      console.error("User is not logged in or authenticated");
    }
  }, [workoutId, user, courseId]);

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
              const percent = amountOfExercises[id - 1] / el.amount > 100 ? 283 : Math.round((283 * (amountOfExercises[id - 1]) / el.amount));
              return (
                <div key={id}>
                  <p className="font-roboto text-sm font-normal leading-5 text-left mb-[10px]">
                    {el.name} {el.amount}
                  </p>
                  <div className="w-[283px] h-[6px] bg-inactive-btn rounded-full">
                    <div
                      className={`w-custom h-[6px] bg-exercise-blue rounded-full`}
                      style={{ 'width': `${percent}px` }}
                    />
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
                      placeholder={amountOfExercises[id - 1] ? amountOfExercises[id - 1].toString(): (el.amount ?? '').toString()}
                      className="p-4 pl-4.5 pr-4.5 rounded-lg border border-solid border-[#D0CECE] w-[320px]"
                      name={`${id - 1}`}
                      onChange={handleInputChange}
                    />
                  </div>
                );
              })}
            </div>
            {error !== "" && <p className="text-error">{error}</p>}
            <button
              className="bg-custom-green rounded-full w-[283px] h-[52px] laptop:w-[320px] hover:bg-hover-green active:bg-active-green self-center text-lg font-normal leading-5 text-center active:text-white"
              onClick={() => {
                onSaveButton();
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
