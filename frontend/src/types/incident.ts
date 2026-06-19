export type IncidentType = "SERVER" | "NETWORK" | "DATABASE" | "DEPLOYMENT" | "OTHER";

export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type IncidentStatus =
  | "OPEN"
  | "INVESTIGATING"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CLOSED";

export interface Incident {
  id: number;
  title: string;
  content: string;
  type: IncidentType;
  severity: Severity;
  status: IncidentStatus;
  location: string;
  assignee: string;
  createdAt: string;
  updatedAt: string;
}