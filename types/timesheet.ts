// types/timesheet.ts
export type TimesheetStatus = "COMPLETED" | "INCOMPLETE" | "MISSING";

export interface TimesheetEntry {
  id: number;
  week: number;
  dateRange: string;
  status: TimesheetStatus;
  actionLabel: "View" | "Update" | "Create";
}
