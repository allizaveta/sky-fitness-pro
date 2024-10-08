import { useAuthorizationModal } from "../../context/AuthorizationContext";
import { ModalWrapper } from "../../utils/ModalWrapper";

export function ResetPassword() {
  const { resetPasswordEmail } = useAuthorizationModal();
  return (
    <ModalWrapper containerClassName="w-[360px] h-[250px] pd-lg">
      <div className="bg-white w-[360px] h-[223px] pd-lg rounded-[30px] flex flex-col items-center">
        <img
          src="/logo (1).svg"
          className="w-[220px] h-auto pt-[40px] pb-[48px]"
        />
        <p>
          Ссылка для востановления пароля отправлена на {resetPasswordEmail}
        </p>
      </div>
    </ModalWrapper>
  );
}
