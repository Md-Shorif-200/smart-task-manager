"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaEdit, FaSpinner } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { taskUpdate } from "@/app/actions/editData";

const TaskEditModal = ({ setShowTaskEditModal, selectedTask, teams }) => {
  const currentTeam = teams?.find((team) => team._id == selectedTask.team_id);

  const router = useRouter();

  const form_input =
    "w-full pl-3 pr-3 py-3 rounded-lg border border-gray-600 bg-[#1E1E1E] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 my-1";

  const labelStyle = "text-gray-300 text-sm font-medium mt-2 mb-1";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: selectedTask?.title,
      assigned_member: selectedTask?.assigned_member?.id || "Unassigned",
      priority: selectedTask?.priority,
      status: selectedTask?.status,
      description: selectedTask?.description,
    },
  });

  useEffect(() => {
    reset({
      title: selectedTask?.title,
      assigned_member: selectedTask?.assigned_member?.id || "Unassigned",
      priority: selectedTask?.priority,
      status: selectedTask?.status,
      description: selectedTask?.description,
    });
  }, [selectedTask, reset]);


const onSubmit = async (data) => {
  try {
    const assignedMemberObject =
      data.assigned_member === "Unassigned"
        ? { id: "Unassigned", member_name: "Unassigned" }
        : currentTeam.members.find((m) => m.id === data.assigned_member);

         console.log(assignedMemberObject);
         

    const updateData = {
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      assigned_member: assignedMemberObject,
    };

    const res = await taskUpdate(selectedTask._id, updateData);

     console.log(res);
     

    if (res.success) {
      toast.success("Task Updated Successfully!");
      setShowTaskEditModal(false);
      router.refresh();
    } else {
      toast.error("Update failed!");
    }
  } catch (error) {
    toast.error("Something went wrong!");
  }
};


  return (
    <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
      <div className="flex justify-center items-start min-h-screen pt-10 sm:pt-20 px-4">
        <div className="bg-[#1E1E1E] w-full sm:w-2xl rounded-lg p-6 relative animate-scaleUp">
          {/* Close */}
          <button
            className="absolute top-7 right-3 text-white text-2xl hover:text-red-500"
            onClick={() => setShowTaskEditModal(false)}
          >
            <IoMdClose />
          </button>

          <h2 className="text-white text-2xl font-semibold mb-4">Edit Task</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Title */}
            <div>
              <label className={labelStyle}>Task Title</label>
              <input
                type="text"
                {...register("title", { required: "Task Title is required" })}
                className={form_input}
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Assigned Member */}
            <div>
              <label className={labelStyle}>Assign to Member</label>
              <select
                {...register("assigned_member", { required: true })}
                className={form_input}
              >
                <option value="Unassigned">Unassigned</option>
                {currentTeam?.members?.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.member_name} ({m.currentTasks}/{m.capacity})
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className={labelStyle}>Priority</label>
              <select {...register("priority")} className={form_input}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className={labelStyle}>Status</label>
              <select {...register("status")} className={form_input}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className={labelStyle}>Description</label>
              <textarea
                {...register("description")}
                className={form_input}
              ></textarea>
            </div>

            {/* Submit */}
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-cyan-500 text-white py-2 rounded-md hover:bg-cyan-600"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" /> Updating...
                </>
              ) : (
                <>
                  <FaEdit /> Update Task
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskEditModal;
