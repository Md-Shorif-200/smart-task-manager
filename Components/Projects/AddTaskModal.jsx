"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { IoMdClose, IoMdAdd } from "react-icons/io";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const base_url = process.env.NEXT_PUBLIC_BASE_URL;

const AddTaskModal = ({ setShowAddTaskModal, selectedProject, teams }) => {
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

  const submitTask = async (taskData) => {
    try {
      const res = await fetch(`${base_url}/create-task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      const result = await res.json();

      if (result.success && result.insertedId) {
        toast.success(
          `Task created successfully for ${
            taskData.assigned_member?.member_name || "Unassigned"
          }!`
        );
        reset();
        setShowAddTaskModal(false);
        router.refresh();
        router.push("/all-task");
      } else {
        toast.error("Failed to add task!");
        reset();
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
      reset();
    }
  };

  const onSubmit = (data) => {
    const selectedMember = currentTeam.members.find(
      (m) => m?.id === data?.assigned_member
    );

    const taskData = {
      project_id: selectedProject?._id,
      team_id: currentTeam._id,
      team_name: currentTeam.team_name,
      team_owner: currentTeam.owner_name,
      team_owner_email: currentTeam.owner_email,
      title: data.title,
      assigned_member: selectedMember
        ? { id: selectedMember.id, member_name: selectedMember.member_name }
        : null,
      priority: data.priority,
      status: data.status,
      description: data.description,
    };

    // If selected member exceeds capacity, show confirmation toast
    if (selectedMember && selectedMember.currentTasks >= selectedMember.capacity) {
      toast(
        (t) => (
          <div className="flex flex-col gap-2">
            <p className="text-white">
               {selectedMember.member_name} has {selectedMember.currentTasks} tasks but capacity is {selectedMember.capacity}. cancel to choose another.
            </p>
            <div className="flex gap-2">
              <button
                className="bg-green-500 px-3 py-1 rounded text-white hover:bg-green-600"
                onClick={() => {
                  submitTask(taskData);
                  toast.dismiss(t.id);
                }}
              >
                Assign Anyway
              </button>
              <button
                className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
                onClick={() => toast.dismiss(t.id)}
              >
                Cancel
              </button>
            </div>
          </div>
        ),
        { duration: 5000, style: { background: "#333" } }
      );
    } else {
      submitTask(taskData); // normal submit if capacity not exceeded
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
          <h2 className="text-white text-2xl font-semibold mb-4">Add New Task</h2>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                  {currentTeam?.members?.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.member_name} ({m.currentTasks}/{m.capacity})
                    </option>
                  ))}
                </select>
                {errors.assigned_member && (
                  <p className="text-red-500 text-sm">{errors.assigned_member.message}</p>
                )}
              </div>
            </div>

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

            <div>
              <label className={labelStyle}>Description</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                placeholder="Enter task description"
                className={form_input}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
            </div>

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
