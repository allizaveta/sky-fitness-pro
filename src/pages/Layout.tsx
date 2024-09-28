import { Outlet } from "react-router-dom";
import { Header } from "../component/header";
import { useAuthorizationModal } from "../context/AuthorizationContext";
import { Authorization } from "../component/popups/authorization";
import { Registration } from "../component/popups/registration";
import { UnauthorizedUser } from "../component/popups/unauthorizedUser";
import { ResetPassword } from "../component/popups/resetPassword";

export function Layout() {
  const {
    isModalOpen,
    isRegistrationOpen,
    isUnauthorizedModalOpen,
    isResetPasswordModalOpen,
  } = useAuthorizationModal();
  return (
    <div className="bg-bg pr-pd-s pl-pd-s laptop:pr-pd-lg laptop:pl-pd-lg">
      <Header />
      <Outlet />
      {isModalOpen && <Authorization />}
      {isRegistrationOpen && <Registration />}
      {isUnauthorizedModalOpen && <UnauthorizedUser />}
      {isResetPasswordModalOpen && <ResetPassword />}
    </div>
  );
}
