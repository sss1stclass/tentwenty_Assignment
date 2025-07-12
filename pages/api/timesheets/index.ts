import { NextApiRequest, NextApiResponse } from "next";
import { timesheets } from "@/mock/timesheets";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.status(200).json(timesheets);
  }
  res.status(405).end();
}
