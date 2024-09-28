import { Link, useNavigate } from "react-router-dom";
import RoutesPath from "../RoutesPath";
import { CourseType } from "../types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { imageMappings } from "../imageMapping";
import {
  getCourseProgress,
  removeCourseFromUser as removeCourseFromFirebase,
} from "../api";
import { removeCourseFromUser } from "../store/slices/userSlice";
import { useEffect, useState } from "react";
import { Loading } from "../component/loading";

type CourseProgressType = {
  [key: string]: {
    id: string;
    workouts?: {
      [key: string]: {
        isDone: boolean;
        values: number[];
      };
    };
  };
};

export function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [coursesProgress, setCoursesProgress] = useState<CourseProgressType>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);

  const handleRemoveCourse = async (courseId: string) => {
    if (user) {
      try {
        await removeCourseFromFirebase(user._id, courseId);
        dispatch(removeCourseFromUser(courseId));
      } catch (error) {
        console.error("Ошибка при удалении курса:", error);
      }
    } else {
      console.error("Пользователь не авторизован");
    }
  };

  const navigate = useNavigate();

  function continueButton(course: CourseType, id: number) {
    navigate(`/${RoutesPath.WORKOUT}/${course.workouts[id]}`);
  }

  useEffect(() => {
    async function fetchCourseProgress() {
      getCourseProgress(user?._id ?? "").then(() => {
        setIsLoading(false);
      });
      setCoursesProgress(await getCourseProgress(user?._id ?? ""));
    }
    fetchCourseProgress();
  }, [user]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="mb-[200px]">
        <h2 className="font-roboto text-[40px] font-semibold leading-[44px] text-left text-black mb-[40px]">
          Профиль
        </h2>
        <div className="bg-white rounded-[30px] mb-[60px]">
          {/* Мобильная версия */}
          <div className="laptop:hidden p-[30px] flex flex-col items-center">
            <img
              src="../public/profile.png"
              alt="profile pic"
              className="w-[80px] h-[80px] mb-[20px]"
            />
            <p className="text-lg">Логин: {user?.email}</p>
            <div className="flex flex-col gap-[10px] w-full">
              <button className="bg-custom-green rounded-full w-full h-[46px] hover:bg-hover-green active:bg-active-green text-lg font-normal leading-5 text-center active:text-white">
                Изменить пароль
              </button>
              <button className="rounded-full bg-white hover:bg-hover-white active:bg-active-white w-full h-[46px] text-lg font-normal leading-5 text-center border-[1px] border-black">
                Выйти
              </button>
            </div>
          </div>

          {/* Десктопная версия */}
          <div className="hidden laptop:flex p-[30px] flex-row gap-[33px] items-center">
            <img src="../public/profile.png" alt="profile pic" />
            <div className="flex flex-col gap-[30px] items-start">
              <p>Логин: {user?.email}</p>
              <div className="flex flex-row gap-[10px] ">
                <button className="bg-custom-green rounded-full w-[206px] h-[46px] hover:bg-hover-green active:bg-active-green self-center text-lg font-normal leading-5 text-center active:text-white">
                  Изменить пароль
                </button>
                <button className="rounded-full bg-white hover:bg-hover-white active:bg-active-white w-[206px] h-[46px] text-lg font-normal leading-5 text-center border-[1px] border-black">
                  Выйти
                </button>
              </div>
            </div>
          </div>
        </div>
        <h2 className="font-roboto text-[40px] font-semibold leading-[44px] text-left text-black mb-[40px]">
          Мои курсы
        </h2>

        <div className="flex flex-wrap gap-6">
          {user?.courses && user.courses.length > 0 ? (
            user.courses.map((course: CourseType) => {
              const thisCourse = coursesProgress[course._id]?.workouts;
              const doneWorkouts = thisCourse
                ? Object.values(thisCourse).filter((x) => x.isDone).length
                : 0;
              const percent = doneWorkouts / course.workouts.length;

              console.log(doneWorkouts, percent);

              return (
                <div
                  key={course._id}
                  className="relative bg-white w-[360px] laptop:w-[360px] h-[649px] flex flex-col gap-[24px] shadow-[0px_4px_67px_-12px_#00000021] rounded-[30px]"
                >
                  <Link to={`/${RoutesPath.COURSE}/${course._id}`}>
                    <img
                      src={imageMappings[course.nameRU]}
                      alt={course.nameRU}
                    />
                  </Link>
                  <img
                    className="h-[30px] w-[30px] absolute fill-black top-[24px] right-[24px] cursor-pointer"
                    src="../public/deleteCourse.svg"
                    alt="Удалить курс"
                    onClick={() => handleRemoveCourse(course._id)}
                  />
                  <div className="p-[30px] pt-0">
                    <p className="text-3xl font-semibold leading-9 text-left pb-[20px]">
                      {course.nameRU}
                    </p>
                    <div className="flex flex-wrap gap-[6px] text-sm font-normal leading-5 text-left">
                      <div className="flex flex-row h-[38px] bg-inactive-btn rounded-[50px] p-[10px] gap-[6px]">
                        <img src="/Calendar.svg" className="w-[16px]" />
                        <p className="self-center">25 дней</p>
                      </div>
                      <div className="flex flex-row h-[38px] bg-inactive-btn rounded-[50px] п-[10px] gap-[6px]">
                        <img src="/Time.svg" className="w-[16px]" />
                        <p className="self-center">20-50 мин/день</p>
                      </div>
                      <div className="flex flex-row h-[38px] bg-inactive-btn rounded-[50px] п-[10px] gap-[6px]">
                        <img
                          src="/mingcute_signal-fill.svg"
                          className="w-[16px]"
                        />
                        <p className="self-center">Сложность</p>
                      </div>
                    </div>
                    <p>Прогресс: {percent * 100}%</p>
                    <div className="w-[283px] h-[6px] bg-inactive-btn rounded-full mb-[10px]">
                      <div
                        className={`w-custom h-[6px] bg-exercise-blue rounded-full`}
                        style={{ width: `${percent * 300}px` }}
                      />
                    </div>

                    <button
                      className="bg-custom-green rounded-full w-[300px] h-[52px] hover:bg-hover-green active:bg-active-green self-center text-lg font-normal leading-5 text-center active:text-white"
                      onClick={() => continueButton(course, doneWorkouts)}
                    >
                      Продолжить
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p>У вас пока нет добавленных курсов.</p>
          )}
        </div>
      </div>
    </>
  );
}
