import { Outlet } from "react-router-dom";
import { Header } from "../component/header";

export function Layout() {
  return (
    <div className="bg-bg pr-pd-s pl-pd-s laptop:pr-pd-lg laptop:pl-pd-lg">
      <Header />
      <Outlet />
    </div>
  );
}
