import { useAuthorizationModal } from "../../context/AuthorizationContext";
import { ModalWrapper } from "../../utils/ModalWrapper";

export function UnauthorizedUser() {
  const { openModal, closeUnauthorizedModal } = useAuthorizationModal();
  return (
    <ModalWrapper containerClassName="w-[360px] h-[250px]">
      <img
        src="/logo (1).svg"
        className="w-[220px] h-auto pt-[40px] pb-[48px]"
      />
      <p>Войдите, чтобы добавить курс</p>
      <button
        onClick={() => {
          closeUnauthorizedModal();
          openModal();
        }}
        className="bg-custom-green rounded-full mt-[20px] w-[250px] h-[52px] hover:bg-hover-green active:bg-active-green self-center text-lg font-normal leading-5 text-center active:text-white"
      >
        Войти
      </button>
    </ModalWrapper>
  );
}
