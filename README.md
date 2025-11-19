# SMART TASK — Smart Task Manager Web App

SMART TASK is a task and project management web application that helps teams assign, track, and balance work. It includes capacity-aware assignment, an auto-reassignment feature, activity logging, and a dashboard for quick oversight.

**Live:** https://smart-task-iota.vercel.app/  
**Server repository:** https://github.com/Md-Shorif-200/smart-task-server

---

## Features

- User registration and login.  
- Create and manage multiple teams.  
- Add team members (name, role, capacity 0–5).  
- Create projects and link a project to a team.  
- Create tasks under projects with: title, description, assignee, priority (Low/Medium/High), status (Pending/In Progress/Done).  
- Show member load as `currentTasks / capacity` when assigning.  
- Warn when assigning to an overloaded member with option to confirm.  
- Auto-assign (pick member with least load).  
- Reassign Tasks button to automatically redistribute Low/Medium tasks from overloaded members to those with free capacity; High priority tasks remain with their current assignee.  
- Activity log records every reassignment with timestamp and details.  
- Dashboard shows totals, team summary, recent reassignments and recent logs.

---

## Tech Stack

**Frontend**
- React (Next.js)  
- Tailwind CSS 
- react-hot-toast  
- react-icons 

**Backend**
- Node.js + Express  
- MongoDB 
- Firebase Auth 



