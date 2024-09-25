import { Link } from "react-router-dom";
import { useAuthorizationModal } from "../context/AuthorizationContext";
import RoutesPath from "../RoutesPath";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAuth } from "../store/slices/userSlice";
import { RootState, useAppSelector } from "../store/store";

export function Header() {
  const { openModal } = useAuthorizationModal();
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state: RootState) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(setAuth({ isAuth: false, token: null, user: null }));
  };
  const uid = useAppSelector((state) => state.auth.user?._id);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  return (
    <header className="flex justify-between pt-[40px] pb-[39px] laptop:pt-[50px] laptop:pb-[60px]">
      <div className="flex flex-col">
        <Link to={RoutesPath.HOME}>
          <img src="/logo (1).svg" className="w-[220px] h-auto pb-[15px]" />
        </Link>
        <p className="hidden laptop:block opacity-50">
          Онлайн-тренировки для занятий дома
        </p>
      </div>
      {isAuth && user ? (
        <div className="relative flex flex-row items-center">
          <img src="/profilePic.svg" className="h-[42px] w-[42px]"></img>
          <button
            onClick={toggleDropdown}
            className="text-lg font-normal ml-[15px]"
          >
            <span className="hidden laptop:block">{user.email}</span>
          </button>
          <img src="/arrow.svg" className="ml-[5px]" />
          {dropdownOpen && (
            <div className="absolute right-[0px] top-[50px] shadow-lg rounded-[30px] h-[250px] w-[258px] bg-white mt-[24px]">
              <div className="flex flex-col nowrap justify-center items-center gap-2.5 mt-[50px]">
                <p className="font-['StratosSkyeng'] text-lg font-normal leading-[19.8px] text-left text-gray-400 text-gray mb-[24px]">
                  {user.email}
                </p>
                <Link to={`${RoutesPath.PROFILE}/${uid}`}>
                  <button className="bg-custom-green rounded-full w-[206px] h-[46px] hover:bg-hover-green active:bg-active-green self-center text-lg font-normal leading-5 text-center active:text-white">
                    Мой профиль
                  </button>
                </Link>
                <button
                  className="rounded-full bg-white hover:bg-hover-white active:bg-active-white w-[206px] h-[46px] text-lg font-normal leading-5 text-center border-[1px] border-black"
                  onClick={handleLogout}
                >
                  Выйти
                </button>
              </div>
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
  );
}
