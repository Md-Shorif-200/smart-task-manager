"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaArrowRight, FaSpinner } from "react-icons/fa";
import Link from "next/link";
import useAuth from "../Hooks/useAuth";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SocialLogIn from "./SocialLogIn";

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const {logIn} = useAuth();
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await logIn(data.email, data.password);
      toast.success("succesfully logged in!",{duration : 2000});
      router.push('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center px-4">
      <div className="bg-[#2C2C2C] rounded-xl shadow-2xl p-10 max-w-md w-full relative">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome Back!
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email address
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400 w-4 h-4" />
              </div>

              <input
                type="email"
                id="email"
                placeholder="name@example.com"
                {...register("email", { required: "Email is required" })}
                className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-600 bg-[#1E1E1E] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400 w-4 h-4" />
              </div>

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-600 bg-[#1E1E1E] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

              {/* Toggle Password */}
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400 hover:text-gray-200 w-4 h-4" />
                ) : (
                  <FaEye className="text-gray-400 hover:text-gray-200 w-4 h-4" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                          >
                            {isSubmitting ? (
                              <>
                                <FaSpinner className="animate-spin"></FaSpinner>
              
                                Submitting...
                              </>
                            ) : (
                              <>
                                Log In
                                <FaArrowRight className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </button>
        </form>
                                <p className="text-gray-200 capitalize font-semibold text-lg my-2 text-center">or ,</p>
          <SocialLogIn/>

        {/* Link */}
        <p className="mt-6 text-center text-gray-400 text-sm">
          Do not have an account?{" "}
          <Link href="/sign-up" className="text-cyan-500 hover:text-cyan-400 font-medium">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}
