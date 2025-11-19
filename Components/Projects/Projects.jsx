"use client";
import { useState } from "react";
import Container from "../Container";
import useAuth from "../Hooks/useAuth";

import { FaUserPlus } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

import { MdAddTask } from "react-icons/md";
import AddTaskModal from "./AddTaskModal";

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

  //   const handleCreatProjectModal = (team) => {
  //    setShowCreatProjectModal(true);
  //    setSelectedTeam(team)
  //   }

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

                <th className="p-4 border-b border-gray-600 ">Action</th>
                {/* <th className="p-4 border-b border-gray-600 text-center"></th> */}
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

                    {/* <td className="p-4 border-b border-gray-700/50 text-center">
                      <button
                           onClick={
                            () => handleCreatProjectModal(team)}
                        className="
                          bg-transparent border border-cyan-600 hover:bg-cyan-700 text-white text-sm 
    font-medium px-3 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer
                      "
                      >
                        <IoMdAdd className="text-lg text-white font-bold" />
                        Projects
                      </button>
                    </td> */}
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
