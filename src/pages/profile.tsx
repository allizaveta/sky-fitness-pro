import { useParams } from "react-router-dom"

export function Profile() {
    const {userId} = useParams();

    return (
        <div>Profile {userId}</div>
    )
}