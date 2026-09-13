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
          border-gray-200
          border-t-[#3a2418]
        "
        aria-label="Loading"
        role="status"
      />

      <p className="text-sm text-gray-600">
        Preparing your avatar...
      </p>
    </div>
  );
}

export default Spinner;