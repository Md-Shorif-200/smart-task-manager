"use server";

export async function taskUpdate(taskId, data) {
  try {
    const base_url = process.env.NEXT_PUBLIC_BASE_URL;

    const res = await fetch(`${base_url}/update-task/${taskId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    return { success: false, message: error.message };
  }
}
