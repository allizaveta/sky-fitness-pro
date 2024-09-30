import { useEffect, useState } from "react";
import { CourseType } from "../types";
import { ModalWrapper } from "../utils/ModalWrapper";
import { getWorkout } from "../api";
import { Link } from "react-router-dom";

type WorkoutChooseProps = {
  course: CourseType;
  thisCourse:
    | {
        [key: string]: {
          isDone: boolean;
          values: number[];
        };
      }
    | undefined;
  close: () => void;
};

export function WorkoutChoose({
  course,
  thisCourse,
  close,
}: WorkoutChooseProps) {
  const [arr, setArr] = useState<
    { id: string; isDone: boolean; name: string }[]
  >([]);
  const uniqueArr = arr.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  async function getWorkoutName(id: string) {
    try {
      const res = await getWorkout(id);
      return res.name;
    } catch {
      return "Error";
    }
  }

  useEffect(() => {
    setArr([]);
    course.workouts.map((el) => {
      getWorkoutName(el).then((res) => {
        const name = res;
        setArr((prev) => {
          const newArr = [...prev];
          if (thisCourse && thisCourse[el] && thisCourse[el].isDone) {
            newArr.push({ id: el, isDone: true, name: name });
          } else {
            newArr.push({ id: el, isDone: false, name: name });
          }
          return newArr;
        });
      });
    });
  }, [course, thisCourse]);

  return (
    <ModalWrapper>
      <div className="w-[460px] p-[40px] flex flex-col gap-[48px] relative">
        <h2 className="text-lg font-normal leading-9 text-center">
          Выберите тренировку
        </h2>
        <div
          className="exit w-[25px] h-[25px] bg-red-600 absolute right-[40px] top-[50px] hover:cursor-pointer"
          onClick={() => close()}
        >
          <img src="../close-svgrepo-com.svg" alt="exit" className="w-[25px] h-[25px]" />
        </div>
        <div className="flex flex-col gap-[34px]">
          <div className="flex flex-col gap-[20px]">
            {uniqueArr.map((el, index) => {
              return (
                <Link to={`/workout/${el.id}`} key={index}>
                  <div className="border-b-[1px] pb-[10px] flex gap-[10px]">
                    {el.isDone ? (
                      <img src="../workout_done.svg" />
                    ) : (
                      <img src="../workout_not_done.svg" />
                    )}
                    <div>
                      <p className="font-roboto text-xl font-normal leading-6 text-left">
                        {el.name}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
