import ActivityLog from '@/Components/ActivityLog'
import React from 'react'
import { getActivityLog } from '../actions/getData'

export default async function page() {
     

     const activityLog = await getActivityLog();

  return (
    <div>
        <ActivityLog activityLog ={activityLog}/>
    </div>
  )
}
