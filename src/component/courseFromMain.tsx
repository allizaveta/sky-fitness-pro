import { CourseType } from "../types";
import { imageMappings } from "../imageMapping";
import { Link } from "react-router-dom";
import RoutesPath from "../RoutesPath";
import { addCourseToUser as addCourseToFirebase } from "../api";
import { removeCourseFromUser as removeCourseFromFirebase } from "../api";
import { useAppDispatch, useAppSelector } from "../store/store";
import {
  addCourseToUser,
  removeCourseFromUser,
} from "../store/slices/userSlice";
import { useAuthorizationModal } from "../context/AuthorizationContext";
interface CourseMainProps {
  course: CourseType;
}

export function CourseMain({ course }: CourseMainProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const userCourses = user?.courses || [];
  const isCourseAdded = userCourses.some(
    (userCourse) => userCourse._id === course._id
  );
  const { openUnauthorizedModal } = useAuthorizationModal();

  const handleAddCourse = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (user) {
      try {
        await addCourseToFirebase(user._id, course._id);
        dispatch(addCourseToUser(course));
      } catch (error) {
        console.error("Ошибка при добавлении курса:", error);
      }
    } else {
      openUnauthorizedModal();
    }
  };

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

  return (
    <Link
      to={`${RoutesPath.COURSE}/${course._id}`}
      className="flex justify-center"
    >
      <div className="bg-white w-[343px] laptop:w-[360px] h-[550px] flex flex-col gap-[24px] shadow-[0px_4px_67px_-12px_#00000021] rounded-[30px] relative ">
        <img src={imageMappings[course.nameRU]} alt={course.nameRU} />
        {isCourseAdded ? (
          <img
            className="h-[30px] w-[30px] absolute fill-black top-[24px] right-[24px] cursor-pointer"
            src="../public/deleteCourse.svg"
            alt="Удалить курс"
            onClick={() => handleRemoveCourse(course._id)}
          />
        ) : (
          <img
            className="h-[30px] w-[30px] absolute fill-black top-[24px] right-[24px]"
            src="../public/addCourse.svg"
            alt="Добавить курс"
            onClick={handleAddCourse}
          />
        )}
        <div className="p-[30px] pt-0">
          <p className="text-3xl font-semibold leading-9 text-left pb-[20px]">
            {course.nameRU}
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
    </Link>
  );
}
