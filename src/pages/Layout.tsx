import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../component/header";
import { Authorization } from "../component/popups/authorization";
import { Main } from "./main";
import { Registration } from "../component/popups/registration";

export function Layout() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/registration";

  return (
    <div className="bg-bg pr-pd-s pl-pd-s laptop:pr-pd-lg laptop:pl-pd-lg">
      <Header />
      <Main />
      <Outlet />
      {isLoginPage && <Authorization />}
      {isRegisterPage && <Registration />}
    </div>
  );
}
