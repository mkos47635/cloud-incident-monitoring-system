import type { Severity } from "../types/incident";

interface SeverityBadgeProps {
  severity: Severity;
}

function SeverityBadge({ severity }: SeverityBadgeProps) {
  const severityStyle = {
    LOW: "bg-slate-100 text-slate-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    HIGH: "bg-orange-100 text-orange-700",
    CRITICAL: "bg-red-100 text-red-700",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${severityStyle[severity]}`}>
      {severity}
    </span>
  );
}

export default SeverityBadge;