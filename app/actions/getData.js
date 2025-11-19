// app/actions/getData.js
"use server";

export async function getProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-project`,{
       cache: "no-store" 
  });
  const projects = await res.json();
  return projects;
}

export async function getTeams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-teams`,{
       cache: "no-store" 
  });
  const teams = await res.json();
  return teams;
}
export async function getTasks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-all-tasks`,{
       cache: "no-store" 
  });
  const teams = await res.json();
  return teams;
}


export async function getActivityLog() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-activity-log`, {
    cache: "no-store" 
  });
  const data = await res.json();
  return data;
}

