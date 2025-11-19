"use client"
import Container from '../Container'
import Link from 'next/link';
import useAuth from '../Hooks/useAuth';

export default function Dashboard({ allTasks, allProjects, activityLog, allTeams }) {

   const {user} = useAuth();

  const totalTeams = allTeams.length;
  const totalProjects = allProjects.length;
  const totalTasks = allTasks.length;

  // Extract all members from all teams (Flatten)
  const teamMembers = allTeams.flatMap(team =>
    team.members.map(member => ({
      name: member.member_name,
      tasks: member.currentTasks,
      capacity: Number(member.capacity)
    }))
  );

  return (
    <div className='primary_bg_color w-full min-h-screen py-8'>
      <Container>
        <h1 className='text-2xl font-bold text-gray-100 mb-6'>Dashboard</h1>

        {/* ===== Top Section ===== */}
        <div className='flex flex-col lg:flex-row gap-6 mb-8'>

          {/* Left Sub-section: Total Projects & Total Tasks */}
          <div className='flex flex-col gap-6 flex-1'>
            <div className='bg-[#1E1E1E] p-6 rounded-lg'>
              <p className='text-gray-300'>Total Teams</p>
              <h2 className='text-3xl font-bold text-gray-300'>{totalTeams}</h2>
            </div>
            <div className='bg-[#1E1E1E] p-6 rounded-lg'>
              <p className='text-gray-300'>Total Projects</p>
              <h2 className='text-3xl font-bold text-gray-300'>{totalProjects}</h2>
            </div>
            <div className='bg-[#1E1E1E] p-6 rounded-lg'>
              <p className='text-gray-300'>Total Tasks</p>
              <h2 className='text-3xl font-bold text-gray-300'>{totalTasks}</h2>
            </div>
          </div>

          {/* Right Sub-section: Recent Reassignments */}
          <div className='bg-[#1E1E1E] p-6 rounded-lg flex-1'>
            <h2 className='text-2xl font-semibold text-gray-300 mb-4'>Recent Reassignments</h2>
            <ul className='space-y-2'>
              {activityLog.slice(-5).map((item, idx) => {
                const time = new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                return (
                  <li key={idx} className='text-gray-300 my-2 bg-[#1E1E1E] shadow-lg border border-gray-800 rounded-lg p-2'>
                    <span className='text-gray-400'>{time} — </span>
                    Task <span className='font-bold'>{item.taskTitle}</span> reassigned from <span className='font-bold'>{item.from}</span> to <span className='font-bold'>{item.to}</span>.
                  </li>
                )
              })}
            </ul>
          </div>

        </div>

        {/* ===== Bottom Section: Team Summary ===== */}
        <div className='bg-[#1E1E1E] p-6 rounded-lg'>
          <h2 className='text-xl font-semibold text-gray-300 mb-4'>Team Summary</h2>
          <table className='w-full text-gray-300'>
            <thead>
              <tr className='border-b border-gray-700'>
                <th className='py-2 text-left'>Member</th>
                <th className='py-2 text-left'>Assigned Tasks</th>
                <th className='py-2 text-left'>Capacity</th>
                <th className='py-2 text-left'>Status</th>
              </tr>
            </thead>

            <tbody>
              {teamMembers.map((member, idx) => (
                <tr key={idx} className='border-b border-gray-700'>
                  <td className='py-2'>{member.name}</td>
                  <td className='py-2'>{member.tasks}</td>
                  <td className='py-2'>{member.capacity}</td>
                  <td className={`py-2 font-semibold ${member.tasks > member.capacity ? 'text-red-500' : 'text-green-400'}`}>
                    {member.tasks > member.capacity ? 'Overloaded' : 'Normal'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className='mt-6 text-right'>
            <Link href={`${user ? '/all-projects' : 'log-in'}`} className='px-6 py-2 bg-cyan-500 text-white rounded-lg font-semibold hover:bg-cyan-600 transition'>
              Reassign Tasks
            </Link>
          </div>
        </div>

      </Container>
    </div>
  )
}
