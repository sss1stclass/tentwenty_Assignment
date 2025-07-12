
import { NextApiRequest, NextApiResponse } from "next";
import { allTasks } from "@/mock/tasks";
import { timesheets } from "@/mock/timesheets";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "GET") {
    const tasks = allTasks[id as string] || [];
    const week = timesheets.find((w) => w.id === Number(id)) || null;
    return res.status(200).json({ tasks, week });
  }

  res.status(405).end();
}
