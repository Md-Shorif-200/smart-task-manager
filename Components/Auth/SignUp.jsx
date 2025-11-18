"use client";
import Link from "next/link";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { FaArrowRight, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

import img_1 from "../../public/Manager.json";
import Lottie from "lottie-react";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useAuth from "../Hooks/useAuth";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const [showPassword, setshowPassword] = useState(false);
  const {creatUser} = useAuth();
  const router = useRouter();



  const onsubmit = async (data) => {



       try {
         const result = await creatUser(data.email,data.password)
         toast.success('Account Created succesfully!',{duration:2000});
         router.push('/')
       } catch (error) {
        console.log(error);
        toast.error(error)
        
       }
     
  };

  return (
    <div className="bg-[#1E1E1E]  w-full min-h-screen flex justify-center items-center z-0 py-10 md:py-14 lg:py-20 ">
      <div className="bg-[#2C2C2C] rounded-md w-[85%] sm:w-[65%] lg:w-[85%]  h-[480px]  z-10 shadow-2xl grid grid-cols-1 lg:grid-cols-2">
        {/* ----------- lottie img */}
  <div className="form_img bg-[#1E1E1E] w-full h-[480px] flex justify-center items-center hidden lg:block">
  <Lottie
    animationData={img_1}
    loop={true}
    className="w-full h-[80%] object-contain"
  />
</div>

        {/* ---------------- sign-up form  */}
        <div className="form_section p-6">
          <h2 className=" text-gray-300 text-3xl font-bold text-center mb-6">
            Create a New Account
          </h2>
          <form action="" onSubmit={handleSubmit(onsubmit)}>
            {/* -----------------name */}
            <div>
              <label htmlFor="" className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is Required" })}
                className="w-full px-3 py-2  "
                placeholder="Enter Your Name"
              />

              {errors.name && (
                <p className="form_error">{errors.name.message} </p>
              )}
            </div>

            <div className="grid grid-cols-1  gap-x-2">
              {/*----------------- email */}
              <div>
                <label htmlFor="" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", { required: "email is Required" })}
                  className="w-full px-3 py-2  "
                  placeholder="Enter Email Adress"
                />

                {errors.email && (
                  <p className="form_error">{errors.email.message} </p>
                )}
              </div>

              {/*--------------- password */}
              <div className="relative">
                <label htmlFor="" className="block text-sm font-medium text-gray-300 mb-1">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "password is Required",

                    pattern: {
                      value:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
                      message:
                        "Password Must Contain  1 Uppercase , 1 Lowercase, 1 number , 1 symbol and be at least 6 characters",
                    },
                  })}
                  className="w-full px-3 py-2  "
                  placeholder="Enter Strong password "
                />

                {errors.password && (
                  <p className="form_error">{errors.password.message} </p>
                )}

                <div
                  className="password_toggle_icon absolute top-1/2 right-3 cursor-pointer"
                  onClick={() => setshowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
                </div>
              </div>
            </div>

            {/* submit button */}

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
                        Creat Account
                        <FaArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </button>

            <p className="text-base capitalize sm:text-end my-2 font-semibold text-gray-300">
              Already have an acount ? please{" "}
              <Link href="/log-in" className="text-cyan-500">
                Log In
              </Link>
            </p>
          </form>

     

         
        </div>
      </div>
    </div>
  );
};

export default SignUp;