import Dashboard from '@/Components/Dashboard/Dashboard'
import React from 'react'
import { getActivityLog, getProjects, getTasks, getTeams } from './actions/getData'

export default async function HomePage() {

    const  allProjects = await getProjects();
    const  allTasks = await getTasks();
    const  activityLog = await getActivityLog();
    const  allTeams = await getTeams();
  return (
    <div>
      <Dashboard allTasks={allTasks} allProjects={allProjects} activityLog={activityLog} allTeams={allTeams} ></Dashboard>
    </div>
  )
}
