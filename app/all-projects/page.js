
import React, { Suspense } from "react";
import Loading from "../loading";
import Projects from "@/Components/Projects/Projects";
import { getProjects, getTeams } from "../actions/getData";

export default async function Page() {

  const projects = await getProjects() 
    const teams = await getTeams();


  return (
      <Suspense fallback={<Loading />}>
      <Projects teams={teams} projects={projects} />
    </Suspense>
  );
}
