"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { IoMdClose, IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
const base_url = process.env.NEXT_PUBLIC_BASE_URL;

const CreatProjectModal = ({ setShowCreatProjectModal, selectedTeam }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const router   = useRouter();

  const form_input =
    "w-full pl-3 pr-3 py-3 rounded-lg border border-gray-600 bg-[#1E1E1E] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 my-2";

  const onSubmit = async (data) => {

    
    const projectData = {
      teamId: selectedTeam?._id,
      team_name : selectedTeam.team_name,
      teamOwner_name : selectedTeam.owner_name,
      project_name: data.project_name,
      description : data.description,
      date : new Date()
    };

         try {
    const res = await fetch(`${base_url}/add-project`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    });

    const result = await res.json();


     

    if (result.acknowledged == true && result.insertedId) {
    toast.success("Project added successfully!");
    reset();
    setShowCreatProjectModal(false);
  router.push('/all-projects')
    }

   

  } catch (error) {
    toast.error(error.message);
  }



  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-[#1E1E1E] w-96 rounded-lg shadow-lg p-6 relative animate-scaleUp">
        {/* Close Button */}
        <button
          className="absolute top-7 right-3 text-white text-2xl hover:text-red-500 transition cursor-pointer"
          onClick={() => setShowCreatProjectModal(false)}
        >
          <IoMdClose />
        </button>

        {/* Title */}
        <h2 className="text-white text-2xl font-semibold mb-4">
          Add New Project
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* NAME */}
          <input
            type="text"
            {...register("project_name", { required: true })}
            placeholder="Project Name"
            className={form_input}
          />

   

          <textarea
            name="description"
                {...register("description", { required: true })}
            placeholder="Description"
            className={form_input}
        
          ></textarea>

          {/* SUBMIT BUTTON */}
          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full flex justify-center items-center gap-2 bg-cyan-500 text-white py-2 rounded-md hover:bg-cyan-600 transition font-semibold cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" /> Adding...
              </>
            ) : (
              <>
                <IoMdAdd className="text-xl font-bold" /> Creat Project
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatProjectModal;
