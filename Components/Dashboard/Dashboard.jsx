"use client";
import Container from "../Container";
import Link from "next/link";
import useAuth from "../Hooks/useAuth";
import { RiShareForward2Line } from "react-icons/ri";

export default function Dashboard({
  allTasks,
  allProjects,
  activityLog,
  allTeams,
}) {
  const { user } = useAuth();

  // Filter all data by user email
  const myTeams =
    allTeams?.filter((team) => team.owner_email === user?.email) || [];
  const myProjects =
    allProjects?.filter((project) => project.owner_email === user?.email) || [];
  const myTasks =
    allTasks?.filter((task) => task.owner_email === user?.email) || [];
  const myActivityLog =
    activityLog?.filter((log) => log.team_owner_email === user?.email) || [];

  const totalTeams = myTeams.length;
  const totalProjects = myProjects.length;
  const totalTasks = myTasks.length;

  // Extract all members from user's teams (Flatten)
  const teamMembers =
    myTeams?.flatMap((team) =>
      (team?.members || []).map((member) => ({
        name: member.member_name,
        tasks: member.currentTasks,
        capacity: Number(member.capacity),
      }))
    ) || [];

  return (
    <div className="primary_bg_color w-full min-h-screen py-8">
      <Container>
        {/* ===== Top Section ===== */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Left Sub-section: Total Projects & Total Tasks */}
          <div className="flex flex-col gap-6 flex-1">
            <div className="bg-[#1E1E1E] p-6 rounded-lg">
              <p className="text-gray-300">Total Teams</p>
              <h2 className="text-3xl font-bold text-gray-300">
                {user ? totalTeams : 0}
              </h2>
            </div>
            <div className="bg-[#1E1E1E] p-6 rounded-lg">
              <p className="text-gray-300">Total Projects</p>
              <h2 className="text-3xl font-bold text-gray-300">
                {user ? totalProjects : 0}
              </h2>
            </div>
            <div className="bg-[#1E1E1E] p-6 rounded-lg">
              <p className="text-gray-300">Total Tasks</p>
              <h2 className="text-3xl font-bold text-gray-300">
                {user ? totalTasks : 0}
              </h2>
            </div>
          </div>

          {/* Right Sub-section: Recent Reassignments */}
          <div className="bg-[#1E1E1E] p-6 rounded-lg flex-1">
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
              Recent Reassignments
            </h2>
            {user ? (
              <>
                {myActivityLog.length > 0 ? (
                  <ul className="space-y-2">
                    {myActivityLog.slice(-5).map((item, idx) => {
                      const time = new Date(item.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      });
                      return (
                        <li
                          key={idx}
                          className="text-gray-300 my-2 bg-[#1E1E1E] shadow-lg border border-gray-800 rounded-lg p-2"
                        >
                          <span className="text-gray-400">{time} — </span>
                          Task{" "}
                          <span className="font-bold">
                            {item.taskTitle}
                          </span>{" "}
                          reassigned from{" "}
                          <span className="font-bold">{item.from}</span> to{" "}
                          <span className="font-bold">{item.to}</span>.
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-gray-400 italic">
                    No recent task reassignments found.
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="text-gray-400 italic">
                  No recent task reassignments found.
                </p>
              </>
            )}

            <div
              className={`${
                myActivityLog.length == 3 ? "flex justify-end mt-4" : "hidden"
              }`}
            >
              <Link
                href="/activity-log"
                className="text-cyan-400 font-semibold flex justify-center items-center gap-2 hover:text-cyan-500"
              >
                <RiShareForward2Line className="text-cyan-400 text-lg" />
                See More
              </Link>
            </div>
          </div>
        </div>

        {/* ===== Bottom Section: Team Summary ===== */}
        <div className="bg-[#1E1E1E] p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">
            Team Summary
          </h2>
          {user ? (
            <>
              {teamMembers.length > 0 ? (
                <table className="w-full text-gray-300">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-2 text-left">Member</th>
                      <th className="py-2 text-left">Assigned Tasks</th>
                      <th className="py-2 text-left">Capacity</th>
                      <th className="py-2 text-left">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {teamMembers.map((member, idx) => (
                      <tr key={idx} className="border-b border-gray-700">
                        <td className="py-2">{member.name}</td>
                        <td className="py-2">{member.tasks}</td>
                        <td className="py-2">{member.capacity}</td>
                        <td
                          className={`py-2 font-semibold ${
                            member.tasks > member.capacity
                              ? "text-red-500"
                              : "text-green-400"
                          }`}
                        >
                          {member.tasks > member.capacity
                            ? "Overloaded"
                            : "Normal"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-400 italic">
                  No team members found for your teams.
                </p>
              )}
            </>
          ) : (
            <>
              <p className="text-gray-400 italic">
                No team members found for your teams.
              </p>
            </>
          )}

          <div
            className={`${
              teamMembers.length > 0 ? "mt-6 text-right" : "hidden"
            }`}
          >
            <Link
              href={`${user ? "/all-projects" : "log-in"}`}
              className="px-6 py-2 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition"
            >
              Reassign Tasks
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
