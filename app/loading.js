import React from "react";
import { ImSpinner9 } from "react-icons/im";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#333333]">
      <ImSpinner9 className="text-6xl text-cyan-400 animate-spin" />
    </div>
  );
}
