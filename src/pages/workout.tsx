import { useParams } from "react-router-dom";

export function Workout() {
    const { workoutId } = useParams();

    return(
        <div>Workout {workoutId ? workoutId : "null"}</div>
    )
}