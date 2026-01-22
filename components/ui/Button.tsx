"use client";

import React from "react";
import clsx from "clsx";

export default function Button({ children, className, ...props }: any) {
  return (
    <button
      className={clsx(
        "px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
