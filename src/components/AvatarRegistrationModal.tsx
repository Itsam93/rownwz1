import {
  useCallback,
  useEffect,
} from "react";

import { createPortal } from "react-dom";

import RegistrationForm, {
  type AvatarRegistration,
} from "./RegistrationForm";

interface AvatarRegistrationModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: (
    registration: AvatarRegistration
  ) => void;
}

export default function AvatarRegistrationModal({
  open,
  onClose,
  onComplete,
}: AvatarRegistrationModalProps) {
  const handleEscape =
    useCallback(
      (event: KeyboardEvent): void => {
        if (event.key === "Escape") {
          onClose();
        }
      },
      [onClose]
    );

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      "hidden";

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open, handleEscape]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div
      className="
        fixed
        inset-0
        z-[100000]
        flex
        items-center
        justify-center
        overflow-y-auto
        p-4
        sm:p-6
      "
      role="dialog"
      aria-modal="true"
      aria-label="Create your ROWN avatar"
    >
      <button
        type="button"
        aria-label="Close avatar registration"
        onClick={onClose}
        className="
          absolute
          inset-0
          cursor-default
          bg-[#123524]/70
          backdrop-blur-sm
        "
      />

      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          animate-[avatarModalIn_300ms_ease-out]
        "
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="
            absolute
            right-4
            top-4
            z-20
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-[#EAF6ED]
            text-xl
            font-medium
            leading-none
            text-[#166534]
            transition
            hover:bg-[#15803D]
            hover:text-white
            focus:outline-none
            focus:ring-2
            focus:ring-[#16A34A]
            focus:ring-offset-2
          "
        >
          <span
            aria-hidden="true"
          >
            ×
          </span>
        </button>

        <RegistrationForm
          onComplete={onComplete}
        />
      </div>
    </div>,
    document.body
  );
}