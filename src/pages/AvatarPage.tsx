import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { useNavigate } from "react-router-dom";

import AvatarCanvas from "../components/AvatarCanvas";
import { avatarAssets } from "../config/avatarAssets";
import { avatarFrames } from "../config/avatarFrames";
import type { Position } from "../types/avatar";

interface AvatarUser {
  fullName: string;
  churchName: string;
  groupName: string;
  copiesSponsored: number;
}

interface AvatarCanvasHandle {
  download: () => void;
}

function AvatarPage() {
  const navigate = useNavigate();

  const canvasRef =
    useRef<AvatarCanvasHandle | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  const [user, setUser] =
    useState<AvatarUser | null>(null);

  const [image, setImage] =
    useState<string | null>(null);

  const [zoom, setZoom] =
    useState<number>(1);

  const [position, setPosition] =
    useState<Position>({
      x: 0,
      y: 0,
    });

  const config =
    avatarFrames.rown;

  const frameImage =
    avatarAssets.rown.frame;

  useEffect(() => {
    const stored =
      localStorage.getItem("avatarUser");

    if (!stored) {
      navigate("/");
      return;
    }

    try {
      const parsedUser =
        JSON.parse(stored) as Partial<AvatarUser>;

      if (
        typeof parsedUser.fullName !==
          "string" ||
        typeof parsedUser.churchName !==
          "string" ||
        typeof parsedUser.groupName !==
          "string" ||
        typeof parsedUser.copiesSponsored !==
          "number"
      ) {
        navigate("/");
        return;
      }

      const fullName =
        parsedUser.fullName.trim();

      const churchName =
        parsedUser.churchName.trim();

      const groupName =
        parsedUser.groupName.trim();

      const copiesSponsored =
        parsedUser.copiesSponsored;

      if (
        !fullName ||
        !churchName ||
        !groupName ||
        !Number.isInteger(
          copiesSponsored
        ) ||
        copiesSponsored < 1
      ) {
        navigate("/");
        return;
      }

      setUser({
        fullName,
        churchName,
        groupName,
        copiesSponsored,
      });
    } catch {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const handleUpload = (
    file: File
  ): void => {
    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      window.alert(
        "Please upload a JPG, PNG, or WEBP image."
      );
      return;
    }

    const url =
      URL.createObjectURL(file);

    const img =
      new Image();

    img.onload = () => {
      const canvasSize =
        config.canvasSize;

      const scale =
        Math.max(
          canvasSize / img.width,
          canvasSize / img.height
        );

      setZoom(scale);

      setPosition({
        x: 0,
        y: 0,
      });

      setImage((previousImage) => {
        if (previousImage) {
          URL.revokeObjectURL(
            previousImage
          );
        }

        return url;
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);

      window.alert(
        "Unable to load this image. Please choose another photo."
      );
    };

    img.src = url;
  };

  const onFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    const file =
      event.target.files?.[0];

    if (file) {
      handleUpload(file);
    }
  };

  const handleDownload =
    (): void => {
      canvasRef.current?.download();
    };

  const handleChangePhoto =
    (): void => {
      if (image) {
        URL.revokeObjectURL(image);
      }

      setImage(null);

      setZoom(1);

      setPosition({
        x: 0,
        y: 0,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value =
          "";
      }
    };

  const handleBackToHome =
    (): void => {
      navigate("/");
    };

  if (!user) {
    return null;
  }

  const hasImage =
    Boolean(image);

  return (
    <main
      className="
        min-h-screen
        bg-[#F7FAF7]
        px-4
        py-6
        sm:px-6
        sm:py-8
      "
    >
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBackToHome}
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                px-3
                py-2
                text-sm
                font-medium
                text-[#166534]
                transition
                hover:bg-[#EAF6ED]
                hover:text-[#14532D]
                focus:outline-none
                focus:ring-2
                focus:ring-[#16A34A]
                focus:ring-offset-2
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M19 12H5" />
                <path d="m12 19-7-7 7-7" />
              </svg>

              <span>
                Back
              </span>
            </button>

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-[#15803D]
                text-white
                shadow-sm
              "
              aria-label="ROWN"
            >
              <span
                className="
                  text-sm
                  font-extrabold
                  tracking-tight
                "
              >
                R
              </span>
            </div>
          </div>

          <div className="text-center">
            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#15803D]
              "
            >
              Reach Out World Nigeria
            </p>

            <h1
              className="
                mt-2
                text-3xl
                font-extrabold
                tracking-tight
                text-[#123524]
                sm:text-4xl
              "
            >
              Create Your ROWN Avatar
            </h1>

            <p
              className="
                mx-auto
                mt-3
                max-w-xl
                text-sm
                leading-6
                text-[#5F6F64]
                sm:text-base
              "
            >
              Upload your photo and create
              your personalized ROWN avatar.
            </p>

            <p
              className="
                mt-3
                text-sm
                font-semibold
                text-[#166534]
              "
            >
              Welcome, {user.fullName}
            </p>
          </div>
        </header>

        <section
          className="
            rounded-2xl
            border
            border-[#DCE9DF]
            bg-white
            p-5
            shadow-[0_8px_30px_rgba(20,83,45,0.06)]
            sm:p-6
          "
        >
          <div
            className="
              flex
              flex-col
              items-center
              text-center
            "
          >
            <div
              className="
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-[#EAF6ED]
                text-[#15803D]
              "
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 16V4" />
                <path d="m7 9 5-5 5 5" />
                <path d="M5 20h14" />
              </svg>
            </div>

            <h2
              className="
                text-lg
                font-bold
                text-[#123524]
              "
            >
              Add Your Photo
            </h2>

            <p
              className="
                mt-1
                max-w-sm
                text-sm
                leading-5
                text-[#6B7B70]
              "
            >
              Choose a clear photo where
              your face is visible.
            </p>

            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="
                mt-5
                inline-flex
                items-center
                justify-center
                rounded-xl
                bg-[#15803D]
                px-7
                py-3
                text-sm
                font-bold
                text-white
                shadow-sm
                shadow-[#15803D]/20
                transition
                hover:bg-[#166534]
                hover:shadow-md
                focus:outline-none
                focus:ring-2
                focus:ring-[#16A34A]
                focus:ring-offset-2
                active:scale-[0.98]
              "
            >
              Choose Photo
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={onFileChange}
              className="hidden"
            />

            <p
              className="
                mt-3
                text-xs
                text-[#87948B]
              "
            >
              JPG, PNG or WEBP
            </p>
          </div>
        </section>

        {hasImage && (
          <section
            className="
              mt-5
              rounded-2xl
              border
              border-[#DCE9DF]
              bg-white
              p-5
              shadow-[0_8px_30px_rgba(20,83,45,0.06)]
              sm:p-6
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <div>
                <h2
                  className="
                    text-sm
                    font-bold
                    text-[#123524]
                  "
                >
                  Adjust Photo
                </h2>

                <p
                  className="
                    mt-1
                    text-xs
                    text-[#7A887F]
                  "
                >
                  Position your photo inside
                  the avatar frame.
                </p>
              </div>

              <span
                className="
                  rounded-full
                  bg-[#EAF6ED]
                  px-3
                  py-1
                  text-xs
                  font-bold
                  tabular-nums
                  text-[#166534]
                "
              >
                {Math.round(zoom * 100)}%
              </span>
            </div>

            <div className="mt-5">
              <input
                id="zoom"
                type="range"
                min="0.01"
                max="3"
                step="0.01"
                value={zoom}
                onChange={(event) =>
                  setZoom(
                    Number(
                      event.target.value
                    )
                  )
                }
                className="
                  h-2
                  w-full
                  cursor-pointer
                  appearance-none
                  rounded-full
                  bg-[#DCE9DF]
                  accent-[#15803D]
                "
              />

              <div
                className="
                  mt-2
                  flex
                  justify-between
                  text-[11px]
                  font-medium
                  text-[#87948B]
                "
              >
                <span>
                  Smaller
                </span>

                <span>
                  Larger
                </span>
              </div>
            </div>

            <div
              className="
                mt-4
                flex
                items-start
                gap-2
                rounded-xl
                bg-[#F5FAF6]
                px-3
                py-2.5
                text-xs
                leading-5
                text-[#5F6F64]
              "
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="
                  mt-0.5
                  h-4
                  w-4
                  shrink-0
                  text-[#15803D]
                "
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                />

                <path d="M12 8v4" />

                <path d="M12 16h.01" />
              </svg>

              <span>
                Drag your photo directly on
                the preview to reposition it.
              </span>
            </div>
          </section>
        )}

        {hasImage && image && (
          <section className="mt-5">
            <div
              className="
                mb-4
                flex
                items-center
                justify-between
              "
            >
              <div>
                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.16em]
                    text-[#15803D]
                  "
                >
                  Preview
                </p>

                <h2
                  className="
                    mt-1
                    text-lg
                    font-bold
                    text-[#123524]
                  "
                >
                  Your ROWN Avatar
                </h2>
              </div>

              <div
                className="
                  hidden
                  items-center
                  gap-1.5
                  text-xs
                  font-medium
                  text-[#718077]
                  sm:flex
                "
              >
                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-[#16A34A]
                  "
                />

                Ready
              </div>
            </div>

            <div
              className="
                overflow-hidden
                rounded-2xl
                border
                border-[#DCE9DF]
                bg-white
                p-3
                shadow-[0_12px_40px_rgba(20,83,45,0.08)]
                sm:p-5
              "
            >
              <AvatarCanvas
                ref={canvasRef}
                uploadedImage={image}
                frameImage={frameImage}
                copiesSponsored={
                  user.copiesSponsored
                }
                config={config}
                zoom={zoom}
                position={position}
                onPositionChange={
                  setPosition
                }
              />
            </div>
          </section>
        )}

        {hasImage && (
          <section
            className="
              mt-6
              rounded-2xl
              border
              border-[#DCE9DF]
              bg-white
              p-5
              shadow-[0_8px_30px_rgba(20,83,45,0.06)]
              sm:p-6
            "
          >
            <div
              className="
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
                sm:justify-center
              "
            >
              <button
                type="button"
                onClick={handleDownload}
                className="
                  inline-flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#15803D]
                  px-6
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-sm
                  shadow-[#15803D]/20
                  transition
                  hover:bg-[#166534]
                  hover:shadow-md
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#16A34A]
                  focus:ring-offset-2
                  active:scale-[0.98]
                  sm:w-auto
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v12" />
                  <path d="m7 10 5 5 5-5" />
                  <path d="M5 21h14" />
                </svg>

                Download Avatar
              </button>

              <button
                type="button"
                onClick={handleChangePhoto}
                className="
                  inline-flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#CFE0D4]
                  bg-white
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-[#166534]
                  transition
                  hover:border-[#A9CBB4]
                  hover:bg-[#F5FAF6]
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#16A34A]
                  focus:ring-offset-2
                  active:scale-[0.98]
                  sm:w-auto
                "
              >
                Choose Different Photo
              </button>
            </div>
          </section>
        )}

        {!hasImage && (
          <section
            className="
              mt-5
              rounded-2xl
              border
              border-dashed
              border-[#CFE0D4]
              bg-white
              px-6
              py-10
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-[#EAF6ED]
                text-[#15803D]
              "
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect
                  width="18"
                  height="18"
                  x="3"
                  y="3"
                  rx="2"
                />

                <circle
                  cx="8.5"
                  cy="8.5"
                  r="1.5"
                />

                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>

            <h2
              className="
                mt-4
                text-base
                font-bold
                text-[#123524]
              "
            >
              Your avatar preview will
              appear here
            </h2>

            <p
              className="
                mx-auto
                mt-1
                max-w-sm
                text-sm
                leading-5
                text-[#748178]
              "
            >
              Upload a photo above to
              begin creating your ROWN avatar.
            </p>
          </section>
        )}

        <footer className="py-8 text-center">
          <div
            className="
              mx-auto
              mb-3
              h-px
              max-w-xs
              bg-[#DCE9DF]
            "
          />

          <p
            className="
              text-xs
              font-medium
              text-[#87948B]
            "
          >
            Reach Out World Nigeria
          </p>

          <p
            className="
              mt-1
              text-[11px]
              text-[#A0AAA4]
            "
          >
            Create. Represent. Reach out.
          </p>
        </footer>
      </div>
    </main>
  );
}

export default AvatarPage;