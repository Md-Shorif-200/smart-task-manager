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
