"use client";
import { creatTeam } from "@/app/actions/creatTeam";
import React, { useActionState, useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const CreateTeamModal = ({ isOpen, setModalOpen }) => {

const [state,formAction,isPending] = useActionState(creatTeam,null);
const {user} = useAuth();
const router = useRouter()


 


 console.log(state);

   useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success("Team created successfully!");
      setModalOpen(false)
      router.push('/my-teams')

    } else {
        toast.error(state.message || "Failed to create team!");
        setModalOpen(false)
    }
  }, [state]);
 



const form_input ='w-full pl-10 pr-3 py-3 rounded-lg border border-gray-600 bg-[#1E1E1E] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 my-2'

  return (
    // Overlay
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 animate-fadeIn">
      {/* Modal */}
      <div className="bg-[#1E1E1E] w-96 rounded-lg shadow-lg p-6 relative animate-scaleUp">
        {/* Close Button */}
        <button
          className="absolute top-7 right-3 text-white text-2xl hover:text-red-500 transition cursor-pointer"
          onClick={() => setModalOpen(false)}
        >
          <IoMdClose />
        </button>

        {/* Modal Title */}
        <h2 className="text-white text-2xl font-semibold mb-4 ">
          Create New Team
        </h2>

        {/* Form */}
        <form action={formAction} className="flex flex-col gap-4">
              {/* Hidden Inputs */}
  <input type="hidden" name="owner_name" value={user?.displayName} />
  <input type="hidden" name="owner_email" value={user?.email} />

          <input
            type="text"
            name="team_name"
            placeholder="Team Name"
            className={form_input}
         
            required
          />
          <textarea
            name="description"
            placeholder="Description (optional)"
            className={form_input}
        
          ></textarea>

        

             <button
                        type="submit"
                        disabled={isPending}
                        className="w-full flex justify-center items-center gap-2 bg-cyan-700 text-white py-2 rounded-md hover:bg-cyan-600 transition font-semibold cursor-pointer"
                      >
                        {isPending ? (
                          <>
                            <FaSpinner className="animate-spin"></FaSpinner>
                            Submitting...
                          </>
                        ) : (
                          <>
                         
                            <IoMdAdd className="text-xl font-bold" />
                               Creat Team
                          </>
                        )}
                      </button>


        </form>
      </div>
    </div>
  );
};

export default CreateTeamModal;
