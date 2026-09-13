import {
  type FormEvent,
  useState,
} from "react";

import Spinner from "./Spinner";

export interface AvatarRegistration {
  fullName: string;
  churchName: string;
  groupName: string;
  copiesSponsored: number;
}

interface RegistrationFormProps {
  onComplete: (
    registration: AvatarRegistration
  ) => void;
}

export default function RegistrationForm({
  onComplete,
}: RegistrationFormProps) {
  const [fullName, setFullName] =
    useState("");

  const [churchName, setChurchName] =
    useState("");

  const [groupName, setGroupName] =
    useState("");

  const [copiesSponsored, setCopiesSponsored] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [error, setError] =
    useState("");

  const clearError = (): void => {
    if (error) {
      setError("");
    }
  };

  const handleCopiesChange = (
    value: string
  ): void => {
    const digitsOnly =
      value.replace(/\D/g, "");

    if (!digitsOnly) {
      setCopiesSponsored("");
      clearError();
      return;
    }

    const formatted =
      Number(digitsOnly).toLocaleString(
        "en-US"
      );

    setCopiesSponsored(formatted);
    clearError();
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    setError("");

    const name =
      fullName.trim();

    const church =
      churchName.trim();

    const group =
      groupName.trim();

    const copies =
      Number(
        copiesSponsored.replace(/,/g, "")
      );

    if (!name) {
      setError(
        "Please enter your full name."
      );
      return;
    }

    if (!church) {
      setError(
        "Please enter your church name."
      );
      return;
    }

    if (!group) {
      setError(
        "Please enter your group name."
      );
      return;
    }

    if (
      !copiesSponsored.trim() ||
      !Number.isInteger(copies) ||
      copies < 1
    ) {
      setError(
        "Please enter a valid number of copies."
      );
      return;
    }

    try {
      setIsSubmitting(true);

      const registration: AvatarRegistration =
        {
          fullName: name,
          churchName: church,
          groupName: group,
          copiesSponsored: copies,
        };

      localStorage.setItem(
        "avatarUser",
        JSON.stringify(registration)
      );

      onComplete(registration);
    } catch {
      setIsSubmitting(false);

      setError(
        "Something went wrong. Please try again."
      );
    }
  };

  const inputClassName = `
    w-full
    rounded-xl
    border
    border-[#CFE0D4]
    bg-[#FAFCFA]
    px-5
    py-3.5
    text-base
    font-medium
    text-[#123524]
    placeholder:text-[#9AA69E]
    outline-none
    transition
    duration-200
    focus:border-[#15803D]
    focus:bg-white
    focus:ring-4
    focus:ring-[#16A34A]/10
    disabled:cursor-not-allowed
    disabled:opacity-50
  `;

  const labelClassName = `
    mb-2
    block
    text-xs
    font-bold
    uppercase
    tracking-[0.12em]
    text-[#526158]
  `;

  return (
    <section className="mx-auto w-full max-w-lg">
      <div
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-[#DCE9DF]
          bg-white
          p-7
          shadow-[0_24px_70px_rgba(20,83,45,0.12)]
          sm:rounded-3xl
          sm:p-10
        "
      >
        {isSubmitting && (
          <div
            className="
              absolute
              inset-0
              z-10
              flex
              items-center
              justify-center
              rounded-2xl
              bg-white/90
              backdrop-blur-sm
              sm:rounded-3xl
            "
            aria-live="polite"
            aria-label="Creating your avatar"
          >
            <Spinner />
          </div>
        )}

        <div
          className={
            isSubmitting
              ? "pointer-events-none opacity-40"
              : ""
          }
        >
          <div className="mb-9 text-center">
            <div
              className="
                mx-auto
                mb-5
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-[#EAF6ED]
                text-[#15803D]
              "
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-8 w-8"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v12" />
                <path d="m7 10 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
            </div>

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#15803D]
                sm:text-xs
              "
            >
              Reach Out World Nigeria
            </p>

            <h2
              className="
                mt-3
                text-2xl
                font-extrabold
                tracking-tight
                text-[#123524]
                sm:text-3xl
              "
            >
              Create Your ROWN Avatar
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-md
                text-sm
                leading-6
                text-[#68766D]
                sm:text-base
                sm:leading-7
              "
            >
              Enter your details to create
              your personalized ROWN avatar.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="avatar-full-name"
                className={labelClassName}
              >
                Full Name
              </label>

              <input
                id="avatar-full-name"
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(event) => {
                  setFullName(
                    event.target.value
                  );

                  clearError();
                }}
                autoComplete="name"
                autoFocus
                disabled={isSubmitting}
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="avatar-church-name"
                className={labelClassName}
              >
                Church Name
              </label>

              <input
                id="avatar-church-name"
                type="text"
                name="churchName"
                placeholder="Enter your church name"
                value={churchName}
                onChange={(event) => {
                  setChurchName(
                    event.target.value
                  );

                  clearError();
                }}
                disabled={isSubmitting}
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="avatar-group-name"
                className={labelClassName}
              >
                Group Name
              </label>

              <input
                id="avatar-group-name"
                type="text"
                name="groupName"
                placeholder="Enter your group name"
                value={groupName}
                onChange={(event) => {
                  setGroupName(
                    event.target.value
                  );

                  clearError();
                }}
                disabled={isSubmitting}
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="avatar-copies-sponsored"
                className={labelClassName}
              >
                Number of Copies Sponsoring
              </label>

              <input
                id="avatar-copies-sponsored"
                type="text"
                name="copiesSponsored"
                inputMode="numeric"
                pattern="[0-9,]*"
                placeholder="e.g. 10,000"
                value={copiesSponsored}
                onChange={(event) => {
                  handleCopiesChange(
                    event.target.value
                  );
                }}
                disabled={isSubmitting}
                className={inputClassName}
                aria-describedby="copies-sponsored-hint"
              />

              <p
                id="copies-sponsored-hint"
                className="
                  mt-2
                  text-xs
                  leading-5
                  text-[#89958E]
                  sm:text-sm
                "
              >
                Enter the total number of
                copies you are sponsoring.
              </p>
            </div>

            {error && (
              <div
                className="
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-sm
                  font-medium
                  leading-5
                  text-red-700
                "
                role="alert"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="
                inline-flex
                min-h-14
                w-full
                items-center
                justify-center
                rounded-xl
                bg-[#15803D]
                px-6
                py-4
                text-base
                font-bold
                text-white
                shadow-sm
                shadow-[#15803D]/20
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:bg-[#166534]
                hover:shadow-md
                hover:shadow-[#15803D]/20
                focus:outline-none
                focus:ring-2
                focus:ring-[#16A34A]
                focus:ring-offset-2
                disabled:cursor-not-allowed
                disabled:opacity-50
                disabled:hover:translate-y-0
              "
            >
              {isSubmitting
                ? "Creating Your Avatar..."
                : "Continue"}
            </button>
          </form>

          <div
            className="
              mt-7
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span
              className="
                h-px
                w-10
                bg-[#CFE0D4]
              "
              aria-hidden="true"
            />

            <p
              className="
                text-center
                text-[10px]
                font-medium
                leading-4
                text-[#89958E]
                sm:text-xs
              "
            >
              Your sponsored copies will
              appear on your avatar
            </p>

            <span
              className="
                h-px
                w-10
                bg-[#CFE0D4]
              "
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
