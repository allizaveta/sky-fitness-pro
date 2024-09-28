import { useAuthorizationModal } from "../../context/AuthorizationContext";
import RoutesPath from "../../RoutesPath";
import { ModalWrapper } from "../../utils/ModalWrapper";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/slices/userSlice";
import { auth } from "../../api";
import { useNavigate } from "react-router-dom";

export function Authorization() {
  const { closeModal, openRegistrationModal, openResetPasswordModal } =
    useAuthorizationModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    login: "",
    password: "",
  });
  const [error, setError] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    setError("");
  }

  async function clickOnButton() {
    auth(user.login, user.password)
      .then((userData) => {
        if (userData) {
          dispatch(
            setAuth({
              isAuth: true,
              user: {
                _id: userData._id,
                name: userData.name,
                password: userData.password,
                email: userData.email,
                courses: userData.courses,
              },
              token: userData.token,
            })
          );
          closeModal();
          setError("");
          navigate(RoutesPath.HOME);
        } else {
          setError("Ошибка авторизации, попробуйте позднее");
        }
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message == "Firebase: Error (auth/invalid-credential).") {
          setError(
            "Ошибка в логине или пароле. Проверьте введенные данные еще раз."
          );
        } else if (
          error.message ==
          "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests)."
        ) {
          setError(
            "Слишком много попыток входа. Пожалуйста, попробуйте позднее."
          );
        } else if (
          error.message === "Firebase: Error (auth/network-request-failed)."
        ) {
          setError("Ошибка соединения, попробуйте позднее.");
        } else {
          setError("Неопознанная ошибка. Пожалуйста, попробуйте позднее.");
        }
      });
  }

  return (
    <ModalWrapper containerClassName="w-[360px] h-[460px] pd-lg ">
      <div className="bg-white w-[360px] h-[460px] pd-lg rounded-[30px] flex flex-col items-center">
        <img
          src="/logo (1).svg"
          className="w-[220px] h-auto pt-[40px] pb-[48px]"
        />
        <div className="flex flex-col mb-[34px]">
          <input
            placeholder="Логин"
            className="w-[280px] h-[52px] px-[18px] py-[16px] rounded-[8px] border border-[#D0CECE] opacity-100 mb-[10px]"
            type="email"
            name="login"
            onChange={handleInputChange}
          />
          <input
            placeholder="Пароль"
            className="w-[280px] h-[52px] px-[18px] py-[16px] rounded-[8px] border border-[#D0CECE] opacity-100"
            type="password"
            name="password"
            onChange={handleInputChange}
          />
        </div>
        {/* скрытое сообщение об ошибке */}
        {error !== "" ? (
          <p className="text-error">
            {error}{" "}
            <a
              onClick={() => {
                closeModal();
                openResetPasswordModal(user.login);
              }}
            >
              Восстановить пароль?
            </a>
          </p>
        ) : null}

        <button
          className="rounded-full bg-custom-green hover:bg-hover-green active:bg-active-green w-[280px] h-[52px] mb-[10px] text-lg font-normal leading-5 active:text-white text-center"
          onClick={clickOnButton}
        >
          Войти
        </button>
        <button
          onClick={() => {
            closeModal();
            openRegistrationModal();
          }}
          className="rounded-full bg-white hover:bg-hover-white active:bg-active-white w-[280px] h-[52px] text-lg font-normal leading-5 text-center border-[1px] border-black"
        >
          Зарегистрироваться
        </button>
      </div>
    </ModalWrapper>
  );
}
