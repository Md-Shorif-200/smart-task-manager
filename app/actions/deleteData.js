"use server";

export async function deleteTask(taskId) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/delete-task/${taskId}`, {
      method: "DELETE",
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    return { success: false, message: error.message };
  }
}
