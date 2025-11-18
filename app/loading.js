import React from "react";
import { ImSpinner9 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#121212]">
      <ImSpinner9 className="text-4xl text-cyan-400 animate-spin" />
    </div>
  );
}
