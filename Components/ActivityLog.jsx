"use client"
import Container from "./Container";
import useAuth from "./Hooks/useAuth";


export default function ActivityLog({ activityLog }) {
  const { user } = useAuth();

  // Filter activity logs for the current user
  const myActivityLogs = activityLog.filter(
    (activity) => activity.team_owner_email === user?.email
  );

  return (
    <section className="primary_bg_color w-full min-h-screen p-6 primary_text_color">
      <Container>
        <h2 className="text-2xl font-semibold primary_text_color mb-10">
          Activity Logs
        </h2>

        {myActivityLogs.length > 0 ? (
          <ul>
            {myActivityLogs.map((item, idx) => {
              // Format the time nicely
              const time = new Date(item.time).toLocaleString();

              return (
                <li
                  key={idx}
                  className="text-gray-300 my-2 bg-[#1E1E1E] shadow-lg border border-gray-800 rounded-lg p-4"
                >
                  <span className="text-gray-400">{time} — </span>
                  Task <span className="font-bold">{item.taskTitle}</span> reassigned from{" "}
                  <span className="font-bold">{item.from}</span> to{" "}
                  <span className="font-bold">{item.to}</span>.
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-400 text-center mt-10">No activity logs found.</p>
        )}
      </Container>
    </section>
  );
}
