// mock/timesheets.ts
import { TimesheetEntry } from "@/types/timesheet";

export const timesheets: TimesheetEntry[] = [
  {
    id: 1,
    week: 1,
    dateRange: "1 - 5 January, 2024",
    status: "COMPLETED",
    actionLabel: "View",
  },
  {
    id: 2,
    week: 2,
    dateRange: "8 - 12 January, 2024",
    status: "COMPLETED",
    actionLabel: "View",
  },
  {
    id: 3,
    week: 3,
    dateRange: "15 - 19 January, 2024",
    status: "INCOMPLETE",
    actionLabel: "Update",
  },
  {
    id: 4,
    week: 4,
    dateRange: "22 - 26 January, 2024",
    status: "COMPLETED",
    actionLabel: "View",
  },
  {
    id: 5,
    week: 5,
    dateRange: "28 January - 1 February, 2024",
    status: "MISSING",
    actionLabel: "Create",
  },
];
