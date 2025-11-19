import AllTasks from "@/Components/Tasks/AllTasks";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/get-all-tasks`, {
    cache: "no-store"
  });

  const allTasks = await res.json();

  return <AllTasks allTasks={allTasks} />;
}
