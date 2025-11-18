"use server";

export async function creatTeam(previousState, formData) {
  try {
    const { team_name, owner_name, owner_email, description } =
      Object.fromEntries(formData.entries());

    console.log(team_name, owner_name, owner_email, description);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/creat-teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ team_name, owner_name, owner_email, description }),
    });

    return { success: true, data: await res.json() };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Server error" };
  }
}
