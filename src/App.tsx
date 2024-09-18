import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Main } from "./pages/main";
import { Registration } from "./component/popups/registration";
import { NotFound } from "./pages/not_found";
import { Authorization } from "./component/popups/authorization";
import { Course } from "./pages/course";
import { Profile } from "./pages/profile";
import { Workout } from "./pages/workout";
import { Layout } from "./pages/Layout";
import RoutesPath from "./RoutesPath";

function App() {
  return (
    <Routes>
      <Route path={RoutesPath.HOME} element={<Layout />}>
        <Route index element={<Main />} />
        <Route path={`${RoutesPath.COURSE}/:courseId`} element={<Course />} />
        <Route path={`${RoutesPath.PROFILE}/:userId`} element={<Profile />} />
        <Route
          path={`${RoutesPath.WORKOUT}/:workoutId`}
          element={<Workout />}
        />
      </Route>
      <Route path={RoutesPath.REGISTER} element={<Registration />} />
      <Route path={RoutesPath.LOGIN} element={<Authorization />} />
      <Route path={RoutesPath.NOT_FOUND} element={<NotFound />} />
    </Routes>
  );
}

export default App;
