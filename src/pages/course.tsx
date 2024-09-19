import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourses } from "../api";
import { CourseType } from "../types";

export function Course() {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<CourseType | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await getCourses();
      const foundCourse = courses.find((c) => c._id === courseId);
      setCourse(foundCourse || null);
    };

    fetchCourses();
  }, [courseId]);

  if (!course) {
    return <div>Загрузка...</div>;
  }
  return (
    <div>
      <div>
        <img
          className="pb-[60px] object-fill hidden laptop:block"
          src="/skill card 1.svg"
        />
        <img src="/Mask group (5).png" className="pb-[40px] laptop:hidden" />
        <div className="mb-[60px]">
          <p className="text-4xl font-bold leading-[44px] text-left pb-[40px]">
            Подойдет для вас, если:
          </p>
          <div className="flex flex-col laptop:flex-row gap-[22px]">
            <div className="bg-[linear-gradient(115.81deg,_#151720_34.98%,_#1E212E_91.5%)] rounded-[28px] h-[141px] text-white flex flex-row p-[20px] gap-[25px]">
              <p className="text-7xl font-medium leading-[101.25px] text-left text-custom-green self-center">
                1
              </p>
              <p className="text-lg font-normal leading-[26.4px] text-left text-wrap self-center">
                Давно хотели попробовать йогу, но не решались начать
              </p>
            </div>
            <div className="bg-[linear-gradient(115.81deg,_#151720_34.98%,_#1E212E_91.5%)] rounded-[28px] h-[141px] text-white flex flex-row p-[20px] gap-[25px]">
              <p className="text-7xl font-medium leading-[101.25px] text-left text-custom-green self-center">
                2
              </p>
              <p className="text-lg font-normal leading-[26.4px] text-left text-wrap self-center">
                Хотите укрепить позвоночник, избавиться от болей в спине и
                суставах
              </p>
            </div>
            <div className="bg-[linear-gradient(115.81deg,_#151720_34.98%,_#1E212E_91.5%)] rounded-[28px] h-[141px] text-white flex flex-row p-[20px] gap-[25px]">
              <p className="text-7xl font-medium leading-[101.25px] text-left text-custom-green self-center">
                3
              </p>
              <p className="text-lg font-normal leading-[26.4px] text-left text-wrap self-center">
                Ищете активность, полезную для тела и души
              </p>
            </div>
          </div>
        </div>
        <div className="directions">
          <p className="text-3xl font-semibold leading-[44px] text-left pb-[40px]">
            Направления
          </p>
          <div className="bg-custom-green laptop:h-[146px] rounded-[28px] p-[30px] flex flex-col gap-[24px] laptop:grid laptop:grid-cols-3 laptop:items-center laptop:gap-y-[34px]">
            <div className="flex flex-row gap-[8px]">
              <img src="/Icon.svg" className="w-[26px] h-[26px]" />
              <p className="text-lg font-normal leading-[26.4px] text-left">
                Йога для новичков
              </p>
            </div>
            <div className="flex flex-row gap-[8px]">
              <img src="/Icon.svg" className="w-[26px] h-[26px]" />
              <p className="text-lg font-normal leading-[26.4px] text-left">
                Кундалини-йога
              </p>
            </div>
            <div className="flex flex-row gap-[8px]">
              <img src="/Icon.svg" className="w-[26px] h-[26px]" />
              <p className="text-lg font-normal leading-[26.4px] text-left">
                Хатха-йога
              </p>
            </div>
            <div className="flex flex-row gap-[8px]">
              <img src="/Icon.svg" className="w-[26px] h-[26px]" />
              <p className="text-lg font-normal leading-[26.4px] text-left">
                Классическая йога
              </p>
            </div>
            <div className="flex flex-row gap-[8px]">
              <img src="/Icon.svg" className="w-[26px] h-[26px]" />
              <p className="text-lg font-normal leading-[26.4px] text-left">
                Йогатерапия
              </p>
            </div>
            <div className="flex flex-row gap-[8px]">
              <img src="/Icon.svg" className="w-[26px] h-[26px]" />
              <p className="text-lg font-normal leading-[26.4px] text-left">
                Аштанга-йога
              </p>
            </div>
          </div>
        </div>
        <div className="ads h-[488px] mb-[40px] relative">
          <img
            src="/groupe.png"
            className="absolute w-[474px] h-auto bottom-[292px] right-[-17px] laptop:hidden"
          />
          <div className="bg-white rounded-[30px] mt-[100px] relative laptop:h-[486px] p-[40px] pb-[30px] laptop:pb-0 shadow-[0px_4px_67px_-12px_rgba(0,0,0,0.13)] content-center z-10 ">
            <div className="laptop:w-[437px] flex flex-col gap-[28px] justify-center">
              <p className="text-4xl laptop:text-6xl font-medium laptop:font-semibold leading-[35.2px] laptop:leading-[60px] text-left text-wrap">
                Начните путь к новому телу
              </p>
              <div className="pl-[15px]">
                <ul className="list-disc opacity-60 text-2xl font-normal leading-6 list-inside text-left list-marker:space-[18px] list-marker--[30px]">
                  <li>проработка всех групп мышц</li>
                  <li>тренировка суставов</li>
                  <li>улучшение циркуляции крови</li>
                  <li>упражнения заряжают бодростью</li>
                  <li>помогают противостоять стрессам</li>
                </ul>
              </div>
              <button className="bg-custom-green rounded-[46px] h-[52px] w-[100%] text-lg font-normal leading-5">
                Войдите, чтобы добавить курс
              </button>
            </div>
          </div>
          <img
            src="/lines.svg"
            className="absolute h-[486px] bottom-[-43px] right-0 hidden z-10 laptop:block"
          />
          <img
            src="/Mask group.png"
            className="w-[487px] h-[542px] absolute bottom-[9px] right-0 rotate-357 z-10 hidden laptop:block"
          />
        </div>
      </div>
    </div>
  );
}
