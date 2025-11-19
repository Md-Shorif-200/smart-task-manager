// "use client";
// import { useState } from "react";
// import Container from "../Container";
// import useAuth from "../Hooks/useAuth";
// import AddMemberModal from "./AddMemberModal";
// import { FaUserPlus } from "react-icons/fa";
// import { IoMdAdd } from "react-icons/io";


// export default function ActivityLog(ActivityLog) {
//   const { user } = useAuth();
  

  
//   const myActivityLog = teams.filter((activity) => team.owner_email === user?.email);

//   const hendleTeamModal = (team) => {
//     setShowAddMemberModal(true);
//     setSelectedTeam(team);
//   };

//   const handleCreatProjectModal = (team) => {
//    setShowCreatProjectModal(true);
//    setSelectedTeam(team)
//   }

//   return (
//     <section className="primary_bg_color       w-full min-h-screen p-6 primary_text_color">
//       <Container>
//         <h2 className="text-2xl font-semibold primary_text_color mb-10">
//           My Teams
//         </h2>
//         <div className="overflow-x-auto rounded-xl border border-gray-600/50">
//           <table className="w-full text-left border-collapse">
//             <thead className="bg-[#2a2a2a] text-gray-200">
//               <tr>
//                 <th className="p-4 border-b border-gray-600">Sl</th>
//                 <th className="p-4 border-b border-gray-600">Team Name</th>
//                 <th className="p-4 border-b border-gray-600">Owner Name</th>
//                 <th className="p-4 border-b border-gray-600">Owner Email</th>
//                 <th className="p-4 border-b border-gray-600 text-center">
//                   Action
//                 </th>
//                 <th className="p-4 border-b border-gray-600 text-center"></th>
//               </tr>
//             </thead>

//             <tbody>
//               {myTeams.length > 0 ? (
//                 myTeams.map((team, index) => (
//                   <tr
//                     key={team._id}
//                     className="hover:bg-[#3d3d3d] transition-colors"
//                   >
//                     <td className="p-4 border-b border-gray-700/50">
//                       {index + 1}
//                     </td>
//                     <td className="p-4 border-b border-gray-700/50 capitalize">
//                       {team.team_name}
//                     </td>
//                     <td className="p-4 border-b border-gray-700/50 capitalize">
//                       {team.owner_name}
//                     </td>
//                     <td className="p-4 border-b border-gray-700/50">
//                       {team.owner_email}
//                     </td>
//                     <td className="p-4 border-b border-gray-700/50 text-center">
//                       <button
//                         onClick={() => hendleTeamModal(team)}
//                         className="
                   

//                            bg-cyan-600 hover:bg-cyan-700 text-white text-sm 
//     font-medium px-3 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer
//                       "
//                       >
//                         <FaUserPlus className="text-lg text-white" />
//                         Add
//                       </button>
//                     </td>

//                     <td className="p-4 border-b border-gray-700/50 text-center">
//                       <button
//                            onClick={
//                             () => handleCreatProjectModal(team)}
//                         className="
//                           bg-transparent border border-cyan-600 hover:bg-cyan-700 text-white text-sm 
//     font-medium px-3 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer
//                       "
//                       >
//                         <IoMdAdd className="text-lg text-white font-bold" />
//                         Projects
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="p-6 text-center text-gray-400">
//                     No teams found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </Container>

//       {showAddMemberModal && (
//         <AddMemberModal
//           setShowAddMemberModal={setShowAddMemberModal}
//           selectedTeam={selectedTeam}
//         />
//       )}
//       {showCreatProjectModal && (
//         <CreatProjectModal
//           setShowCreatProjectModal={setShowCreatProjectModal}
//           selectedTeam={selectedTeam}
//         />
//       )}



//     </section>
//   );
// }

import React from 'react'

export default function ActivityLog() {
  return (
    <div>ActivityLog</div>
  )
}
