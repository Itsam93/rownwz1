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
    <main className="min-h-screen overflow-x-hidden bg-[#F8FBF8]">
      <div className="grid min-h-screen w-full lg:grid-cols-2">
        <section
          className="
            order-1
            flex
            items-center
            justify-center
            bg-white
            px-4
            py-10
            sm:px-6
            sm:py-12
            md:px-10
            md:py-16
            lg:order-2
            lg:min-h-screen
            lg:px-[5vw]
            lg:py-20
            xl:px-[7vw]
          "
        >
          <div className="w-full max-w-lg">
            <RegistrationForm
              onComplete={handleComplete}
            />
          </div>
        </section>

        <section
          className="
            order-2
            relative
            flex
            min-h-[560px]
            items-center
            overflow-hidden
            bg-[#166534]
            px-5
            py-12
            sm:min-h-[600px]
            sm:px-8
            sm:py-16
            md:px-12
            md:py-20
            lg:order-1
            lg:min-h-screen
            lg:px-[7vw]
            lg:py-20
            xl:px-[9vw]
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-20
              h-52
              w-52
              rounded-full
              border
              border-white/10
              sm:-right-24
              sm:-top-24
              sm:h-72
              sm:w-72
            "
            aria-hidden="true"
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-24
              -left-24
              h-64
              w-64
              rounded-full
              border
              border-white/10
              sm:-bottom-40
              sm:-left-40
              sm:h-96
              sm:w-96
            "
            aria-hidden="true"
          />

          <div
            className="
              pointer-events-none
              absolute
              bottom-12
              right-8
              h-24
              w-24
              rounded-full
              border
              border-white/5
              sm:bottom-20
              sm:right-16
              sm:h-32
              sm:w-32
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
                mb-6
                inline-flex
                max-w-full
                items-center
                gap-2.5
                rounded-full
                border
                border-white/20
                bg-white/10
                px-3.5
                py-2
                sm:mb-7
                sm:gap-3
                sm:px-4
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  shrink-0
                  rounded-full
                  bg-[#86EFAC]
                  sm:h-2
                  sm:w-2
                "
                aria-hidden="true"
              />

              <span
                className="
                  truncate
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.16em]
                  text-white
                  sm:text-[10px]
                  sm:tracking-[0.2em]
                  md:text-xs
                "
              >
                Reach Out World Nigeria
              </span>
            </div>

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.2em]
                text-[#BBF7D0]
                sm:text-[11px]
                sm:tracking-[0.24em]
                md:text-xs
              "
            >
              Sponsor a Copy. Reach a Life.
            </p>

            <h1
              className="
                mt-4
                max-w-3xl
                text-[clamp(2.25rem,8vw,4rem)]
                font-extrabold
                leading-[1.03]
                tracking-[-0.045em]
                text-white
                sm:mt-5
                lg:text-[clamp(3rem,4.2vw,4.25rem)]
                xl:text-[4.5rem]
              "
            >
              Take Rhapsody of Realities to Every Man's World.
            </h1>

            <p
              className="
                mt-6
                max-w-xl
                text-sm
                leading-6
                text-[#E5F5E9]
                sm:mt-7
                sm:text-base
                sm:leading-7
                md:text-lg
                md:leading-8
              "
            >
              Be a part of the vision of our Highly Esteemed
              Zonal Pastor in Sponsoring One Million Copies of
              Rhapsody of Realities in 30 Days.
            </p>

            <p
              className="
                mt-5
                max-w-xl
                text-sm
                font-semibold
                leading-6
                text-white
                sm:text-base
                sm:leading-7
                md:text-lg
                md:leading-8
              "
            >
              Together, we can take Rhapsody of Realities to
              the ends of the earth, reaching the last man.
            </p>

            <div
              className="
                mt-8
                max-w-xl
                border-l-2
                border-[#86EFAC]
                pl-4
                sm:mt-9
                sm:pl-5
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
                mt-10
                border-t
                border-white/15
                pt-5
                sm:mt-12
              "
            >
              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-[#BBF7D0]
                  sm:text-[10px]
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
      </div>
    </main>
  );
}
