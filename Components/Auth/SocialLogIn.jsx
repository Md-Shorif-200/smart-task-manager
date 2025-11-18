"use client"
import { FcGoogle } from "react-icons/fc";

import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import { useRouter } from "next/navigation";


const SocialLogIn = () => {
  const { googleSignIn } = useAuth();
  const router = useRouter();

  const handleGoogleSignIn = () => {
    googleSignIn();
    toast.success("succesfully logged in!", { duration: 2000 });
    router.push("/");
  };

  return (
    <div className="">
      {/* google */}
  <button
  onClick={handleGoogleSignIn}
  className="w-full my-3 flex items-center justify-center gap-3 bg-[#1E1E1E] text-white border border-[#333] py-2.5 rounded-md hover:bg-[#2C2C2C] transition"
>
  <FcGoogle className="text-xl" />
  Login with Google
</button>
    </div>
  );
};

export default SocialLogIn;
