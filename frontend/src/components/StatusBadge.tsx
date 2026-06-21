import type { IncidentStatus } from "../types/incident";

interface StatusBadgeProps {
  status: IncidentStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyle = {
    OPEN: "bg-red-100 text-red-700",
    INVESTIGATING: "bg-yellow-100 text-yellow-700",
    IN_PROGRESS: "bg-blue-100 text-blue-700",
    RESOLVED: "bg-green-100 text-green-700",
    CLOSED: "bg-slate-100 text-slate-700",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle[status]}`}>
      {status}
    </span>
  );
}

export default StatusBadge;