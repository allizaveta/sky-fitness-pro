import { useEffect, useState } from "react";
import { getCourses } from "../api";
import { CourseMain } from "../component/courseFromMain";
import { CourseType } from "../types";

export function Main() {
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const fetchedCourses = await getCourses();
      setCourses(fetchedCourses);
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <div className="flex justify-between pb-[34px] laptop:pb-[50px]">
        <p className="text-2xl laptop:text-5xl font-medium leading-relaxed laptop:leading-none text-left break-words">
          Начните заниматься спортом и улучшите качество жизни
        </p>
        <img
          src="/text.svg"
          className="w-[288px] h-[120px] hidden laptop:block"
        />
      </div>
      <div className="flex gap-[24px] flex-col laptop:grid laptop:grid-cols-3 laptop:gap-[40px] pb-[34px]">
        {courses.map((course) => (
          <CourseMain key={course._id} course={course} />
        ))}
      </div>
      <button
        className="rounded-full bg-custom-green w-[127px] h-[52px] mb-[80px] text-lg font-normal leading-5 text-center"
        onClick={() => window.scrollTo(0, 0)}
      >
        Наверх ↑
      </button>
    </div>
  );
}
