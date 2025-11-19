
import MyTeams from "@/Components/Teams/MyTeams";
import React, { Suspense } from "react";
import Loading from "../loading";
import { getTeams } from "../actions/getData";

export default async function Page() {




  const teams = await getTeams();

  return (
      <Suspense fallback={<Loading />}>
      <MyTeams teams={teams} />
    </Suspense>
  );
}
