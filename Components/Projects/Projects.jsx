"use client";
import { useState } from "react";
import Container from "../Container";
import useAuth from "../Hooks/useAuth";
import { MdAssignmentTurnedIn } from "react-icons/md";


import { MdAddTask } from "react-icons/md";
import AddTaskModal from "./AddTaskModal";
import toast from "react-hot-toast";

export default function Projects({ teams,projects }) {
  const { user } = useAuth();
    const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  //   const [showCreatProjectModal, setShowCreatProjectModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

  //   console.log(selectedTeam);

  const allProjects = projects.filter(
    (project) => project?.teamOwner_email === user?.email
  );

    const handleTaskModal = (project) => {
      setShowAddTaskModal(true);
      setSelectedProject(project);
    };



const handleAutoReassign = async (teamId) => {
  // Show confirmation toast
  toast(
    (t) => (
      <div className="text-white">
        <p className="font-semibold mb-2">
          Are you sure you want to reassign tasks?
        </p>
        <div className="flex gap-3 mt-2">
          <button
            className="px-3 py-1 rounded bg-green-500 text-white cursor-pointer"
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_BASE_URL}/auto-reassign/${teamId}`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                  }
                );
                const data = await response.json();
                if (data.success) {
                  toast.success("Tasks reassigned successfully!");
                  console.log("Activity logs:", data.logs);
                  // Optionally, refresh tasks & team members
                } else {
                  toast.error(data.message || "No reassignment done.");
                }
              } catch (err) {
                console.error(err);
                toast.error("Something went wrong!");
              }
            }}
          >
            Yes
          </button>

          <button
            className="px-3 py-1 rounded bg-gray-500 text-white cursor-pointer"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </div>
    ),
    {
      duration: 6000,
      style: {
        background: "#1E1E1E",
        color: "#fff",
      },
    }
  );
};




  return (
    <section className="primary_bg_color       w-full min-h-screen p-6 primary_text_color">
      <Container>
        <h2 className="text-2xl font-semibold primary_text_color mb-10">
          All Projects
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-600/50">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#2a2a2a] text-gray-200">
              <tr>
                <th className="p-4 border-b border-gray-600">Sl</th>
                <th className="p-4 border-b border-gray-600">Project Name</th>
                <th className="p-4 border-b border-gray-600">Team</th>

                <th className="p-4 border-b border-gray-600 "></th>
                <th className="p-4 border-b border-gray-600  ">Action</th>
                <th className="p-4 border-b border-gray-600 "></th>
              </tr>
            </thead>

            <tbody>
              {allProjects.length > 0 ? (
                allProjects.map((project, index) => (
                  <tr
                    key={project._id}
                    className="hover:bg-[#3d3d3d] transition-colors"
                  >
                    <td className="p-4 border-b border-gray-700/50">
                      {index + 1}
                    </td>
                    <td className="p-4 border-b border-gray-700/50 capitalize">
                      {project.project_name}
                    </td>
                    <td className="p-4 border-b border-gray-700/50 capitalize">
                      {project.team_name}
                    </td>

                    <td className="p-4 border-b border-gray-700/50 text-center">
                      <button
                        onClick={() => handleTaskModal(project)}
                        className="
                   

                           bg-cyan-600 hover:bg-cyan-700 text-white text-sm 
    font-medium px-3 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer
                      "
                      >
                        <MdAddTask className="text-lg text-white" />
                        Add Task
                      </button>
                    </td>

                     <td className="p-4 border-b border-gray-700/50 text-center">
                      <button
                           onClick={
                            () => handleAutoReassign(project.teamId)}
                        className="
                          bg-transparent border border-cyan-600 hover:bg-cyan-700 text-white text-sm 
    font-medium px-3 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer
                      "
                      >
                        <MdAssignmentTurnedIn  className="text-lg text-white font-bold" />
                      Auto Reassignment
                      </button>
                    </td> 

                    <td></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-400">
                    No Projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Container>

 {showAddTaskModal && (
        <AddTaskModal
          setShowAddTaskModal={setShowAddTaskModal}
          selectedProject={selectedProject}
          teams={teams}
        />
      )}


        { /*
      {showCreatProjectModal && (
        <CreatProjectModal
          setShowCreatProjectModal={setShowCreatProjectModal}
          selectedTeam={selectedTeam}
        />
      )} */}
    </section>
  );
}
