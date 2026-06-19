import type { Severity } from "../types/incident";

interface SeverityBadgeProps {
  severity: Severity;
}

const severityStyle = {
  LOW: "bg-slate-100 text-slate-700",
  MEDIUM: "bg-amber-100 text-amber-700",
  HIGH: "bg-orange-100 text-orange-700",
  CRITICAL: "bg-rose-100 text-rose-700",
};

function SeverityBadge({ severity }: SeverityBadgeProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${severityStyle[severity]}`}
    >
      {severity}
    </span>
  );
}

export default SeverityBadge;