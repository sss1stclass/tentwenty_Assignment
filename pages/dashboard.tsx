"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Timesheet } from "@/types/timesheet";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const res = await fetch("/api/timesheets");
        const data = await res.json();
        setTimesheets(data);
      } catch (err) {
        console.error("Failed to load timesheets", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTimesheets();
  }, []);

  if (status === "loading" || loading) return <div className="p-6">Loading...</div>;
  if (!session) {
    router.push("/login");
    return null;
  }

  const statusColor: Record<string, string> = {
    COMPLETED: "bg-green-100 text-green-700",
    INCOMPLETE: "bg-yellow-100 text-yellow-700",
    MISSING: "bg-pink-100 text-pink-700",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">Ticktock</div>
        <nav className="text-sm text-gray-600">Timesheets</nav>
        <div className="text-sm text-gray-700 font-medium">
          {session.user?.name || "User"} ▼
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="bg-white rounded-md shadow p-6">
          <h1 className="text-lg font-semibold mb-4">Your Timesheets</h1>
          <table className="w-full text-sm text-left border-separate border-spacing-y-2">
            <thead className="text-gray-500">
              <tr>
                <th className="py-2">WEEK #</th>
                <th className="py-2">DATE</th>
                <th className="py-2">STATUS</th>
                <th className="py-2">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {timesheets.map((entry) => (
                <tr
                  key={entry.id}
                  className="bg-gray-50 hover:bg-gray-100 transition rounded"
                >
                  <td className="py-3 px-2 border-b-1">{entry.week}</td>
                  <td className="px-2 border-b-1">{entry.dateRange}</td>
                  <td className="px-2 border-b-1">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${statusColor[entry.status]}`}
                    >
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-2 border-b-1">
                    <button
                      className="text-blue-600 hover:underline text-sm"
                      onClick={() => router.push(`/timesheet/${entry.id}`)}
                    >
                      {entry.actionLabel}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <footer className="text-center text-xs text-gray-400 mt-10">
          © 2024 tentwenty. All rights reserved.
        </footer>
      </main>
    </div>
  );
}
