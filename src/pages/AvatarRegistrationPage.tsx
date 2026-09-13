import RegistrationForm, {
  type AvatarRegistration,
} from "../components/RegistrationForm";

export default function AvatarRegistrationPage() {
  const handleComplete = (
    _registration: AvatarRegistration
  ): void => {
    window.location.assign("/avatar");
  };

  return (
    <main className="min-h-screen bg-[#F8FBF8]">
      <div
        className="
          grid
          min-h-screen
          w-full
          lg:grid-cols-2
        "
      >
        {/* Campaign Message */}

        <section
          className="
            relative
            flex
            min-h-[620px]
            flex-col
            justify-center
            overflow-hidden
            bg-[#166534]
            px-6
            py-12
            sm:px-10
            sm:py-16
            lg:min-h-screen
            lg:px-[8vw]
            lg:py-20
            xl:px-[10vw]
          "
        >
          <div
            className="
              absolute
              -right-24
              -top-24
              h-72
              w-72
              rounded-full
              border
              border-white/10
            "
            aria-hidden="true"
          />

          <div
            className="
              absolute
              -bottom-40
              -left-40
              h-96
              w-96
              rounded-full
              border
              border-white/10
            "
            aria-hidden="true"
          />

          <div
            className="
              absolute
              bottom-20
              right-16
              h-32
              w-32
              rounded-full
              border
              border-white/5
            "
            aria-hidden="true"
          />

          <div
            className="
              relative
              z-10
              mx-auto
              w-full
              max-w-2xl
            "
          >
            <div
              className="
                mb-7
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-white/20
                bg-white/10
                px-4
                py-2
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#86EFAC]
                "
                aria-hidden="true"
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-white
                  sm:text-xs
                "
              >
                Reach Out World Nigeria
              </span>
            </div>

            <p
              className="
                text-[11px]
                font-bold
                uppercase
                tracking-[0.24em]
                text-[#BBF7D0]
                sm:text-xs
              "
            >
              Sponsor a Copy. Reach a Life.
            </p>

            <h1
              className="
                mt-5
                max-w-3xl
                text-4xl
                font-extrabold
                leading-[1.04]
                tracking-[-0.04em]
                text-white
                sm:text-5xl
                lg:text-5xl
                xl:text-6xl
              "
            >
              Take Rhapsody of Realities to Every Man's World.
            </h1>

            <p
              className="
                mt-7
                max-w-xl
                text-base
                leading-7
                text-[#E5F5E9]
                sm:text-lg
                sm:leading-8
              "
            >
              Be a part of the vision of our Highly Esteemed Zonal 
              Pastor in Sponsoring One Million Copies of Rhapsody of 
              Realities in 30 Days. 
            </p>

            <p
              className="
                mt-5
                max-w-xl
                text-base
                font-semibold
                leading-7
                text-white
                sm:text-lg
                sm:leading-8
              "
            >
              Together, we can take Rhapsody of Realities to
              the ends of the earth, reaching the last man.
            </p>

            <div
              className="
                mt-9
                max-w-xl
                border-l-2
                border-[#86EFAC]
                pl-5
              "
            >
              <p
                className="
                  text-sm
                  font-semibold
                  leading-6
                  text-white
                  sm:text-base
                "
              >
                "Taking Rhapsody to Every Man's World"
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  leading-5
                  text-[#CDEBD5]
                  sm:text-sm
                "
              >
                One sponsorship can help put God's Word into
                someone's hands.
              </p>
            </div>

            <div
              className="
                mt-12
                border-t
                border-white/15
                pt-5
              "
            >
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#BBF7D0]
                  sm:text-xs
                "
              >
                Courtesy
              </p>

              <p
                className="
                  mt-1
                  text-sm
                  font-semibold
                  text-white
                  sm:text-base
                "
              >
                CE NWZ1
              </p>
            </div>
          </div>
        </section>

        {/* Registration */}

        <section
          className="
            flex
            min-h-[620px]
            items-center
            justify-center
            bg-white
            px-4
            py-12
            sm:px-8
            sm:py-16
            md:px-12
            lg:min-h-screen
            lg:px-[5vw]
            lg:py-20
            xl:px-[7vw]
          "
        >
          <div
            className="
              w-full
              max-w-xl
            "
          >
            <RegistrationForm
              onComplete={handleComplete}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
