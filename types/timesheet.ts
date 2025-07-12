// types/timesheet.ts
export type TimesheetStatus = "COMPLETED" | "INCOMPLETE" | "MISSING";

export interface TimesheetEntry {
  id: number;
  week: number;
  dateRange: string;
  status: TimesheetStatus;
  actionLabel: "View" | "Update" | "Create";
}
export interface Timesheet {
  id: number;
  week: number;
  dateRange: string;
  status: "COMPLETED" | "INCOMPLETE" | "MISSING";
  actionLabel: "View" | "Update" | "Create";
}
export interface Task {
  id: string;
  name: string;
  hours: number;
  project: string;
  date: string; 
}


export interface WeekMeta {
  id: number;
  dateRange: string;
}