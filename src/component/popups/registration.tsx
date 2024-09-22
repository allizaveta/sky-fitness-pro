import { useAuthorizationModal } from "../../context/AuthorizationContext";
import { ModalWrapper } from "../../utils/ModalWrapper";
import RoutesPath from "../../RoutesPath";
import { useState } from "react";
import { register } from "../../api";

export function Registration() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    passwordAgain: "",
  });

  function handleRegistration(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setRegisterData({
      ...registerData,
      [name]: value,
    });
    if (registerData.password !== registerData.passwordAgain) {
      setError("Пароли не совпадают");
      return;
    }
    setError("");
  }

  function onButton() {
    if (registerData.password !== registerData.passwordAgain) {
      setError("Пароли не совпадают");
      return;
    }
    setError("");

    register(registerData.email, registerData.password).then((userData) => {
      if (userData) {
        navigate(RoutesPath.LOGIN);
      } else {
        setError("Ошибка в регистрации, попробуйте позднее.");
      }
    }).catch((error) => {
      console.log(error.message);
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("Данная почта уже используется. Попробуйте войти");
      } else if (error.mesage === "Firebase: Error (auth/network-request-failed).") {
        setError("Ошибка соединения, попробуйте позднее.");
      } else {
        setError("Неопознанная ошибка, попробуйте позднее.");
      }
    })
  }

  return (
    <ModalWrapper containerClassName="w-[360px] h-[487px] pd-lg">
      <div className="bg-white w-[360px] h-[487px] pd-lg rounded-[30px] flex flex-col items-center">
        <img
          src="/logo (1).svg"
          className="w-[220px] h-auto pt-[40px] pb-[48px]"
        />
        <div className="flex flex-col mb-[34px]">
          <input
            placeholder="Эл. почта"
            className="w-[280px] h-[52px] px-[18px] py-[16px] rounded-[8px] border border-[#D0CECE] opacity-100 mb-[10px]"
            type="email"
            name="email"
            onChange={handleRegistration}
          />
          <input
            placeholder="Пароль"
            className="w-[280px] h-[52px] px-[18px] py-[16px] rounded-[8px] border border-[#D0CECE] opacity-100 mb-[10px]"
            type="password"
            name="password"
            onChange={handleRegistration}
          />
          <input
            placeholder="Повторите пароль"
            className="w-[280px] h-[52px] px-[18px] py-[16px] rounded-[8px] border border-[#D0CECE] opacity-100"
            type="password"
            name="passwordAgain"
            onChange={handleRegistration}
          />
        </div>
        {/* скрытое сообщение об ошибке */}
        {error && (
          <p className="text-error">
            {error}
            <br />
            <a href="#"> Попробуйте войти.</a>
          </p>
        )}
        <button className="rounded-full bg-custom-green hover:bg-hover-green active:bg-active-green w-[280px] h-[52px] mb-[10px] text-lg font-normal leading-5 active:text-white text-center">
          Зарегистрироваться
        </button>
        <button
          onClick={() => {
            navigate("login")
          }}
          className="rounded-full bg-white hover:bg-hover-white active:bg-active-white w-[280px] h-[52px] text-lg font-normal leading-5 text-center border-[1px] border-black"
        >
          Войти
        </button>
      </div>
    </ModalWrapper>
  );
}
