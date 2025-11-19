"use client";

import Container from "../Container";
import useAuth from "../Hooks/useAuth";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { deleteTask } from "@/app/actions/deleteData";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import TaskEditModal from "./TaskEditModal";

export default function AllTasks({ allTasks, teams }) {
  const { user } = useAuth();
  const router = useRouter();

  const [showTaskEditModal, setShowTaskEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Filter state for team only
  const [filterTeam, setFilterTeam] = useState("");

  // Filtered tasks based on team
  const myTasks = useMemo(() => {
    return allTasks
      .filter((task) => task.team_owner_email === user?.email)
      .filter((task) => {
        const teamName = task.team_name || "";
        return filterTeam ? teamName === filterTeam : true;
      });
  }, [allTasks, user?.email, filterTeam]);

  const handleDeleteTask = (taskId) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span>Are you sure you want to delete this task?</span>
          <div className="flex gap-2 justify-end">
            <button
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              onClick={async () => {
                toast.dismiss(t.id);
                const result = await deleteTask(taskId);
                if (result.acknowledged && result.deletedCount > 0) {
                  toast.success("Task deleted successfully!");
                  router.refresh();
                } else {
                  toast.error("Failed to delete!");
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const handleEditModal = (task) => {
    setShowTaskEditModal(true);
    setSelectedTask(task);
  };

  // Unique teams for dropdown
  const teamOptions = Array.from(
    new Set(
      allTasks
        .filter((task) => task.team_owner_email === user?.email)
        .map((task) => task.team_name)
    )
  );

  // Reset filter
  const resetFilter = () => setFilterTeam("");

  return (
    <section className="primary_bg_color w-full min-h-screen p-6 primary_text_color">
      <Container>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold primary_text_color">
            All Tasks
          </h2>

          {/* Filter dropdown - positioned right */}
          <div className="flex items-center gap-4">
            <select
              value={filterTeam}
              onChange={(e) => setFilterTeam(e.target.value)}
              className="p-2 border border-gray-600 rounded-lg bg-[#1a1a1a] text-white"
            >
              <option value="">Filter By Teams</option>
              {teamOptions.map((team) => (
         
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>

            <button
              onClick={resetFilter}
              className="px-3 py-2 bg-cyan-600 text-white rounded-md hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-600/50">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#2a2a2a] text-gray-200">
              <tr>
                <th className="p-4 border-b border-gray-600">Sl</th>
                <th className="p-4 border-b border-gray-600">Team Name</th>
                <th className="p-4 border-b border-gray-600">Task Title</th>
                <th className="p-4 border-b border-gray-600">Assigned Member</th>
                <th className="p-4 border-b border-gray-600">Priority</th>
                <th className="p-4 border-b border-gray-600">Status</th>
                <th className="p-4 border-b border-gray-600 text-center">Action</th>
                <th className="p-4 border-b border-gray-600"></th>
              </tr>
            </thead>

            <tbody>
              {myTasks.length > 0 ? (
                myTasks.map((task, index) => (
                  <tr
                    key={task._id}
                    className="hover:bg-[#3d3d3d] transition-colors"
                  >
                    <td className="p-4 border-b border-gray-700/50">{index + 1}</td>
                    <td className="p-4 border-b border-gray-700/50">{task.team_name}</td>
                    <td className="p-4 border-b border-gray-700/50">{task.title}</td>
                    <td className="p-4 border-b border-gray-700/50">
                      {task.assigned_member.member_name
                        ? task.assigned_member.member_name
                        : task.assigned_member}
                    </td>
                    <td className="border-b border-gray-700/50">
                      <span
                        className={`px-2 py-1 rounded-full text-white text-sm font-semibold
                        ${task.priority === "Low" ? "bg-green-500" : ""}
                        ${task.priority === "Medium" ? "bg-yellow-500" : ""}
                        ${task.priority === "High" ? "bg-red-500" : ""}`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="p-4 border-b border-gray-700/50">
                      <span
                        className={`px-2 py-1 rounded-full text-white text-sm font-semibold
                        ${task.status === "Pending" ? "bg-gray-500" : ""}
                        ${task.status === "In Progress" ? "bg-blue-500" : ""}
                        ${task.status === "Done" ? "bg-green-600" : ""}`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="p-4 border-b border-gray-700/50 text-center">
                      <button
                        onClick={() => handleEditModal(task)}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium px-3 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <FaEdit className="text-lg text-white" /> Edit
                      </button>
                    </td>
                    <td className="p-4 border-b border-gray-700/50 text-center">
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="bg-transparent border border-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium px-3 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <MdDelete className="text-lg text-white font-bold" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="p-6 text-center text-gray-400">
                    No Tasks found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Container>

      {showTaskEditModal && (
        <TaskEditModal
          setShowTaskEditModal={setShowTaskEditModal}
          selectedTask={selectedTask}
          teams={teams}
        />
      )}
    </section>
  );
}
