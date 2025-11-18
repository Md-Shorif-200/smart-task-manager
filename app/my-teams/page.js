
import MyTeams from "@/Components/Teams/MyTeams";
import React, { Suspense } from "react";
import Loading from "../loading";

export default async function Page() {
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;



  const res = await fetch(`${base_url}/get-teams`);
  const teams = await res.json(); 

  return (
      <Suspense fallback={<Loading />}>
      <MyTeams teams={teams} />
    </Suspense>
  );
}
