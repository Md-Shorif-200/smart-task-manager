"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { IoMdClose, IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";
const base_url = process.env.NEXT_PUBLIC_BASE_URL;

const AddMemberModal = ({ setShowAddMemberModal, selectedTeam }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const form_input =
    "w-full pl-3 pr-3 py-3 rounded-lg border border-gray-600 bg-[#1E1E1E] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 my-2";

  const onSubmit = async (data) => {

    
    const memberData = {
      teamId: selectedTeam?._id,
      member_name: data.member_name,
      role: data.role,
      capacity: data.capacity,
      date : new Date()
    };

         try {
    const res = await fetch(`${base_url}/add-team_member`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(memberData),
    });

    const result = await res.json();

    if (!result.success) {
      toast.error("Failed to add member");
      return;
    }

    toast.success("Member added successfully!");
    reset();
    setShowAddMemberModal(false);

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
          onClick={() => setShowAddMemberModal(false)}
        >
          <IoMdClose />
        </button>

        {/* Title */}
        <h2 className="text-white text-2xl font-semibold mb-4">
          Add New Member
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* NAME */}
          <input
            type="text"
            {...register("member_name", { required: true })}
            placeholder="Member Name"
            className={form_input}
          />

          {/* ROLE */}
          <select
            {...register("role", { required: true })}
            className={form_input}
          >
            <option value="">Select Role</option>
            <option value="Designer">Designer</option>
            <option value="Developer">Developer</option>
            <option value="QA">QA</option>
            <option value="Manager">Manager</option>
          </select>

          {/* CAPACITY */}
          <select
            {...register("capacity", { required: true })}
            className={form_input}
          >
            <option value="">Select Capacity (0–5)</option>
            {[0, 1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>

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
                <IoMdAdd className="text-xl font-bold" /> Add Member
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMemberModal;
