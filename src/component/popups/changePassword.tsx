import { changePassword } from "../../api";
import { useAuthorizationModal } from "../../context/AuthorizationContext";
import { ModalWrapper } from "../../utils/ModalWrapper";
import { useState } from "react";

export function ChangePassword() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { closePasswordModal } = useAuthorizationModal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      await changePassword(newPassword, confirmPassword);
      setSuccess(true);
      closePasswordModal();
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <ModalWrapper containerClassName="w-[360px] h-[363px] pd-lg ">
      <div className="bg-white w-[360px] h-[460px] pd-lg rounded-[30px] flex flex-col items-center">
        <img
          src="/logo (1).svg"
          className="w-[220px] h-auto pt-[40px] pb-[48px]"
        />
        <form className="flex flex-col mb-[34px]" onSubmit={handleSubmit}>
          <input
            placeholder="Новый пароль"
            className="w-[280px] h-[52px] px-[18px] py-[16px] rounded-[8px] border border-[#D0CECE] opacity-100 mb-[10px]"
            type="password"
            name="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            placeholder="Повторите пароль"
            className="w-[280px] h-[52px] px-[18px] py-[16px] rounded-[8px] border border-[#D0CECE] opacity-100"
            type="password"
            name="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {success && <p className="text-green-500">Пароль успешно изменен!</p>}
          {error && <div className="text-red-500">{error}</div>}
          <button
            className="rounded-full bg-custom-green hover:bg-hover-green active:bg-active-green w-[280px] h-[52px] mt-[20px] text-lg font-normal leading-5 active:text-white text-center"
            type="submit"
          >
            Подтвердить
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
}
