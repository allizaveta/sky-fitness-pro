import { Link, useNavigate } from "react-router-dom";
import RoutesPath from "../RoutesPath";
import { CourseProgressType, CourseType } from "../types";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { imageMappings } from "../imageMapping";
import {
  getCourseProgress,
  removeCourseFromUser as removeCourseFromFirebase,
} from "../api";
import { removeCourseFromUser, setAuth } from "../store/slices/userSlice";
import { useEffect, useState } from "react";
import { Loading } from "../component/loading";
import { useAuthorizationModal } from "../context/AuthorizationContext";
import { ChangePassword } from "../component/popups/changePassword";
import { WorkoutChoose } from "../component/workoutChoose";

export function Profile() {
  const { openPasswordModal, isPasswordModalOpen } = useAuthorizationModal();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [coursesProgress, setCoursesProgress] = useState<CourseProgressType>(
    {}
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isChoosingWorkout, setIsChoosingWorkout] = useState<boolean[]>(
    Array(user?.courses.length).fill(false)
  );

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

  useEffect(() => {
    async function fetchCourseProgress() {
      getCourseProgress(user?._id ?? "").then(() => {
        setIsLoading(false);
      });
      setCoursesProgress(await getCourseProgress(user?._id ?? ""));
    }
    fetchCourseProgress();
  }, [user]);

  const nav = useNavigate();

  const handleLogout = () => {
    dispatch(setAuth({ isAuth: false, token: null, user: null }));
    nav(RoutesPath.HOME);
  };

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
              src="../profile.png"
              alt="profile pic"
              className="w-[80px] h-[80px] mb-[20px]"
            />
            <h2 className="text-2xl font-medium leading-[35.2px] text-left">
              {user?.name}
            </h2>
            <p className="text-lg">Логин: {user?.email}</p>
            <div className="flex flex-col gap-[10px] w-full">
              <button
                onClick={openPasswordModal}
                className="bg-custom-green rounded-full w-full h-[46px] hover:bg-hover-green active:bg-active-green text-lg font-normal leading-5 text-center active:text-white"
              >
                Изменить пароль
              </button>
              <button
                className="rounded-full bg-white hover:bg-hover-white active:bg-active-white w-full h-[46px] text-lg font-normal leading-5 text-center border-[1px] border-black"
                onClick={handleLogout}
              >
                Выйти
              </button>
            </div>
          </div>

          {/* Десктопная версия */}
          <div className="hidden laptop:flex p-[30px] flex-row gap-[33px] items-center">
            <img src="../profile.png" alt="profile pic" />
            <div className="flex flex-col gap-[30px] items-start">
              <h2 className="text-2xl font-medium leading-[35.2px] text-left">
                {user?.name}
              </h2>
              <p>Логин: {user?.email}</p>
              <div className="flex flex-row gap-[10px] ">
                <button
                  onClick={openPasswordModal}
                  className="bg-custom-green rounded-full w-[206px] h-[46px] hover:bg-hover-green active:bg-active-green self-center text-lg font-normal leading-5 text-center active:text-white"
                >
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

        <div className="flex gap-[24px] flex-col laptop:grid laptop:grid-cols-3 laptop:gap-[40px] pb-[34px] items-center">
          {user?.courses && user.courses.length > 0 ? (
            user.courses.map((course: CourseType, index) => {
              const thisCourse = coursesProgress[course._id]?.workouts;
              const doneWorkouts = thisCourse
                ? Object.values(thisCourse).filter((x) => x.isDone).length
                : 0;
              const percent = doneWorkouts / course.workouts.length;

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
                    src="../deleteCourse.svg"
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
                    <p className="mt-[20px]">
                      Прогресс: {Math.round(percent * 100)}%
                    </p>
                    <div className="w-[283px] h-[6px] bg-inactive-btn rounded-full mb-[15px]">
                      <div
                        className={`w-custom h-[6px] bg-exercise-blue rounded-full`}
                        style={{ width: `${percent * 300}px` }}
                      />
                    </div>

                    <button
                      className="bg-custom-green rounded-full w-[300px] h-[52px] hover:bg-hover-green active:bg-active-green self-center text-lg font-normal leading-5 text-center active:text-white"
                      onClick={() =>
                        setIsChoosingWorkout((prev) => {
                          const newArr = prev.map(() => false);
                          newArr[index] = true;
                          return newArr;
                        })
                      }
                    >
                      Продолжить
                    </button>
                  </div>
                  {isChoosingWorkout[index] && (
                    <WorkoutChoose course={course} thisCourse={thisCourse} close={() => setIsChoosingWorkout(Array(user?.courses.length).fill(false))} />
                  )}
                </div>
              );
            })
          ) : (
            <p>У вас пока нет добавленных курсов.</p>
          )}
        </div>
      </div>
      {isPasswordModalOpen && <ChangePassword />}
    </>
  );
}
