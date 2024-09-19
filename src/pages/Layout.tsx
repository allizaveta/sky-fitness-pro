import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../component/header";
import { Authorization } from "../component/popups/authorization";
import { Main } from "./main";

export function Layout() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="bg-bg pr-pd-s pl-pd-s laptop:pr-pd-lg laptop:pl-pd-lg">
      <Header />
      <Main></Main>
      <Outlet />
      {isLoginPage && <Authorization />}
    </div>
  );
}
