import type { IncidentStatus } from "../types/incident";

interface StatusBadgeProps {
  status: IncidentStatus;
}

const statusStyle = {
  OPEN: "bg-rose-100 text-rose-700",
  INVESTIGATING: "bg-amber-100 text-amber-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  RESOLVED: "bg-emerald-100 text-emerald-700",
  CLOSED: "bg-slate-100 text-slate-700",
};

function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[status]}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;