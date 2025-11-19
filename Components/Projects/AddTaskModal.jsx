"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { IoMdClose, IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

const AddTaskModal = ({ setShowAddTaskModal, selectedProject,teams }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const router = useRouter();

const currentTeam = teams?.find((team) => team._id == selectedProject.teamId);




  

  const form_input =
    "w-full pl-3 pr-3 py-3 rounded-lg border border-gray-600 bg-[#1E1E1E] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 my-1";

  const labelStyle = "text-gray-300 text-sm font-medium mt-2 mb-1";

  const onSubmit = async (data) => {
 const selectedMember = currentTeam.members.find(
  (m) => m?.id === data?.assigned_member
);

const taskData = {
  project_id: selectedProject?._id,
  team_id: currentTeam._id,
  team_owner: currentTeam.owner_name,
  team_owner_email: currentTeam.owner_email,
  title: data.title,
  assigned_member:  selectedMember
    ? {
        id: selectedMember.id ,
        name: selectedMember.member_name,
      }
    : "Unassigned",
  priority: data.priority,
  status: data.status,
  description: data.description,
};

     console.log(taskData);
     

    try {
      const res = await fetch(`${base_url}/create-task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      const result = await res.json();

        console.log(result);
        

      if (result.success == true && result.insertedId) {
        toast.success(`Task created for ${taskData?.assigned_member?.name} was successful!`);
        reset();
        setShowAddTaskModal(false);
        router.refresh();
      } else {
        toast.error("Failed to add task!");
        reset()
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      reset()
    }
    
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
      <div className="flex justify-center items-start min-h-screen pt-10 sm:pt-20 px-4">
        <div className="bg-[#1E1E1E] w-full sm:w-2xl rounded-lg shadow-lg p-6 relative animate-scaleUp">
          {/* Close Button */}
          <button
            className="absolute top-7 right-3 text-white text-2xl hover:text-red-500 transition cursor-pointer"
            onClick={() => setShowAddTaskModal(false)}
          >
            <IoMdClose />
          </button>

          {/* Title */}
          <h2 className="text-white text-2xl font-semibold mb-4">
            Add New Task
          </h2>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Two-column grid for Title & Assigned Member */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Task Title</label>
                <input
                  type="text"
                  {...register("title", { required: "Task Title is required" })}
                  placeholder="Enter task title"
                  className={form_input}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className={labelStyle}>Assign to Member</label>
                <select
                  {...register("assigned_member", {
                    required: "Assigned Member is required",
                  })}
                  className={form_input}
                >
                  <option value="">Select Member</option>
                  <option value="Unassigned">Unassigned</option>
                  {currentTeam?.members?.length > 0 &&
                    currentTeam.members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.member_name} ({m.currentTasks}/{m.capacity})
                      </option>
                    ))}
                </select>
                {errors.assigned_member && (
                  <p className="text-red-500 text-sm">
                    {errors.assigned_member.message}
                  </p>
                )}
              </div>
            </div>

            {/* Two-column grid for Priority & Status */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className={labelStyle}>Priority</label>
                <select
                  {...register("priority", { required: "Priority is required" })}
                  className={form_input}
                >
                  <option value="">Select Priority</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                {errors.priority && (
                  <p className="text-red-500 text-sm">{errors.priority.message}</p>
                )}
              </div>

              <div>
                <label className={labelStyle}>Status</label>
                <select
                  {...register("status", { required: "Status is required" })}
                  className={form_input}
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm">{errors.status.message}</p>
                )}
              </div>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className={labelStyle}>Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Enter task description"
                className={form_input}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
            </div>

            {/* SUBMIT BUTTON */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-cyan-500 text-white py-2 rounded-md hover:bg-cyan-600 transition font-semibold cursor-pointer mt-3"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" /> Adding...
                </>
              ) : (
                <>
                  <IoMdAdd className="text-xl font-bold" /> Add Task
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
