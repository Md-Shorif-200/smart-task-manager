// app/actions/getData.js
"use server";

export async function getProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-project`);
  const projects = await res.json();
  return projects;
}

export async function getTeams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-teams`);
  const teams = await res.json();
  return teams;
}
export async function getTasks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-all-tasks`);
  const teams = await res.json();
  return teams;
}


export async function getActivityLog() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-activity-log`, {
    cache: "no-store" // always fetch fresh data
  });
  const data = await res.json();
  return data;
}

