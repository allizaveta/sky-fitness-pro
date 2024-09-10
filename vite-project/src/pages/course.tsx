import { useParams } from "react-router-dom";

export function Course() {
    const { courseId } = useParams();

    return (
        <div>Course {courseId}</div>
    )
}