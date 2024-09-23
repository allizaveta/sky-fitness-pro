import { CourseType } from "../types";
import { imageMappings } from "../imageMapping";
import { Link } from "react-router-dom";
import RoutesPath from "../RoutesPath";
import { addCourseToUser as addCourseToFirebase } from "../api";
import { useAppDispatch, useAppSelector } from "../store/store";
import { addCourseToUser } from "../store/slices/userSlice";
interface CourseMainProps {
  course: CourseType;
}

export function CourseMain({ course }: CourseMainProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleAddCourse = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault(); // Останавливаем всплытие события
    if (user) {
      try {
        // Добавляем курс в Firebase
        await addCourseToFirebase(user._id, course._id);
        // Обновляем Redux
        dispatch(addCourseToUser(course._id));
      } catch (error) {
        console.error("Ошибка при добавлении курса:", error);
      }
    } else {
      console.error("Пользователь не авторизован");
    }
  };

  return (
    <Link to={`${RoutesPath.COURSE}/${course._id}`}>
      <div className="bg-white w-[343px] laptop:w-[360px] h-[550px] flex flex-col gap-[24px] shadow-[0px_4px_67px_-12px_#00000021] rounded-[30px] relative">
        <img src={imageMappings[course.nameRU]} alt={course.nameRU} />
        <img
          className="h-[30px] w-[30px] absolute fill-black top-[24px] right-[24px]"
          src="../public/Add-in-Circle (1).svg"
          onClick={handleAddCourse}
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
