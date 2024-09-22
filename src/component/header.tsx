import { Link } from "react-router-dom";
import RoutesPath from "../RoutesPath";
import { useAuthorizationModal } from "../context/AuthorizationContext";
import { useUserContext } from "../context/userContext";
import { useState } from "react";

export function Header() {
  const { openModal } = useAuthorizationModal();
  const { currentUser, handleLogout } = useUserContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  return (
    <>
      <header className="flex justify-between pt-[40px] pb-[39px] laptop:pt-[50px] laptop:pb-[60px]">
        <div className="flex flex-col">
          <Link to={RoutesPath.HOME}>
            <img src="/logo (1).svg" className="w-[220px] h-auto pb-[15px]" />
          </Link>
          <p className="hidden laptop:block opacity-50">
            Онлайн-тренировки для занятий дома
          </p>
        </div>
        {currentUser ? ( // Используем currentUser для проверки авторизации
          <div className="relative">
            <button onClick={toggleDropdown} className="text-lg font-normal">
              {currentUser.email}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 bg-white shadow-lg rounded">
                <p>{currentUser.email}</p>
                <button>Мой профиль</button>
                <button onClick={handleLogout}>Выйти</button>{" "}
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => openModal()}
            className="bg-custom-green rounded-full w-[83px] h-[36px] laptop:w-[103px] laptop:h-[52px] hover:bg-hover-green active:bg-active-green self-center text-lg font-normal leading-5 text-center active:text-white"
          >
            Войти
          </button>
        )}
      </header>
    </>
  );
}
