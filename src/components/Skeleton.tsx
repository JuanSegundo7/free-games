import React from "react";

const SkeletonLoader = ({
  width,
  height,
}: {
  width: string;
  height: string;
}) => {
  return (
    <div
      className="relative space-y-3 overflow-hidden rounded-md bg-neutral-800 shadow before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 hover:shadow-lg before:animate-[shimmer_1.5s_infinite]"
      style={{ width, height }}
    >
      <div
        className="rounded-lg bg-neutral-600"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default SkeletonLoader;
