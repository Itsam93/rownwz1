import type { ReactNode } from "react";

function Spinner(): ReactNode {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className="
          h-12
          w-12
          animate-spin
          rounded-full
          border-4
          border-[#DCE9DF]
          border-t-[#15803D]
        "
        aria-label="Loading"
        role="status"
      />

      <p className="text-sm font-medium text-[#526158]">
        Preparing your avatar...
      </p>
    </div>
  );
}

export default Spinner;