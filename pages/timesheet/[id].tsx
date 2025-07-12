

"use client";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Task {
  id: string;
  name: string;
  hours: number;
  project: string;
  date: string; 
}

interface WeekMeta {
  id: number;
  dateRange: string;
}

export default function TimesheetDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [tasks, setTasks] = useState<Task[]>([]);
  const [week, setWeek] = useState<WeekMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTasks = async () => {
      try {
        const res = await fetch(`/api/timesheets/${id}`);
        const data = await res.json();

        setTasks(data.tasks || []);
        setWeek(data.week || null);
      } catch (err) {
        console.error("Error fetching tasks", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [id]);

  if (loading) return <div className="p-6">Loading timesheet...</div>;

  const totalHours = Array.isArray(tasks)
    ? tasks.reduce((sum, t) => sum + (t.hours || 0), 0)
    : 0;

  const progress = totalHours ? Math.min((totalHours / 40) * 100, 100) : 0;

  const groupedByDate = tasks?.reduce((acc: Record<string, Task[]>, task) => {
    const date = new Date(task.date);
    const label = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }); // e.g. Jan 21
    if (!acc[label]) acc[label] = [];
    acc[label].push(task);
    return acc;
  }, {});

  const dayLabels = Object.keys(groupedByDate);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <div className="mb-4">
          <h1 className="text-xl font-bold">This week’s timesheet</h1>
          <p className="text-sm text-gray-500">{week?.dateRange}</p>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm font-medium mb-1">
            <span>{totalHours || 0} / 40 hrs</span>
            <span>{!isNaN(progress) ? Math.round(progress) : 0}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-orange-500 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {dayLabels.map((dayLabel) => (
          <div key={dayLabel} className="mb-6">
            <p className="font-semibold text-sm text-gray-700 mb-2">{dayLabel}</p>
            {groupedByDate[dayLabel].map((task) => (
              <div
                key={task.id}
                className="flex justify-between items-center border rounded px-3 py-2 mb-2 bg-gray-50 hover:shadow-sm transition"
              >
                <div>{task.name}</div>
                <div className="flex gap-3 items-center text-sm text-gray-600">
                  <span>{task.hours} hrs</span>
                  <span className="bg-gray-200 text-xs px-2 py-0.5 rounded">
                    {task.project}
                  </span>
                  <button
                    className="text-gray-400 hover:text-gray-700 text-lg leading-none"
                    title="Edit/Delete"
                    onClick={() => alert("Options")}
                  >
                    ⋮
                  </button>
                </div>
              </div>
            ))}
            <button
              className="w-full text-blue-600 border border-blue-300 border-dashed rounded py-2 text-sm hover:bg-blue-50"
              onClick={() => alert(`Add new task for ${dayLabel}`)}
            >
              + Add new task
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
