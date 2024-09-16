import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Main } from "./pages/main";
import { Registration } from "./pages/registration";
import { NotFound } from "./pages/not_found";
import { Authorization } from "./pages/authorization";
import { Course } from "./pages/course";
import { Profile } from "./pages/profile";
import { Workout } from "./pages/workout";
import { Layout } from "./pages/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Main />} />
        <Route path="course/:courseId" element={<Course />} />
        <Route path="profile/:userId" element={<Profile />} />
        <Route path="workout/:workoutId" element={<Workout />} />
      </Route>
      <Route path="/registration" element={<Registration />} />
      <Route path="/login" element={<Authorization />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
