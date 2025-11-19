import AllTasks from '@/Components/Tasks/AllTasks'
import { getTasks, getTeams } from '../actions/getData'


export default  async function page() {
      const allTasks = await getTasks()
      const teams = await getTeams();
  return (
    <div>
         <AllTasks allTasks={allTasks} teams={teams}/>
    </div>
  )
}
