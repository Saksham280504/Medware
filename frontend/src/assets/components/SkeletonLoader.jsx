import React from "react";

const SkeletonCard = () => {
  return (
    <div
      role="status"
      className="w-80 p-6 bg-white rounded-xl shadow-md animate-pulse flex flex-col items-center gap-4"
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full">
        <div className="w-12 h-12 bg-gray-300 rounded-full" />
      </div>

      {/* Title */}
      <div className="h-6 bg-gray-200 rounded-full w-48" />

      {/* Buttons */}
      <div className="flex w-full gap-4">
        <div className="h-10 bg-gray-200 rounded-lg w-1/2" />
        <div className="h-10 bg-gray-200 rounded-lg w-1/2" />
      </div>

      {/* Lines */}
      <div className="space-y-2 w-full">
        <div className="h-2.5 bg-gray-200 rounded-full w-full" />
        <div className="h-2.5 bg-gray-200 rounded-full w-full" />
        <div className="h-2.5 bg-gray-200 rounded-full w-full" />
        <div className="h-2.5 bg-gray-200 rounded-full w-3/4" />
      </div>

      <span className="sr-only">Loading...</span>
    </div>
  );
};

const SkeletonLoader = () => {
  return (
    <article className="flex flex-wrap gap-10 w-full justify-center p-10">
      {[...Array(6)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </article>
  );
};

export default SkeletonLoader;
