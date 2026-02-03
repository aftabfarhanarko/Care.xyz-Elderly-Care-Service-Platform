import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen  dark:bg-gray-900 dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-900 dark:via-rose-950 dark:to-gray-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-rose-600 dark:border-rose-500"></div>
    </div>
  );
};

export default Loading;
