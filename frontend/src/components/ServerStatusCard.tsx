interface ServerStatusCardProps {
  title: string;
  value: number;
  unit: string;
  color: "blue" | "green" | "purple";
}

const colorStyles = {
  blue: "from-blue-500 to-cyan-400",
  green: "from-emerald-500 to-teal-400",
  purple: "from-violet-500 to-fuchsia-400",
};

function ServerStatusCard({ title, value, unit, color }: ServerStatusCardProps) {
  return (
    <div
      className={`rounded-2xl bg-gradient-to-br ${colorStyles[color]} p-6 text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl`}
    >
      <p className="text-sm font-medium text-white/80">{title}</p>

      <div className="mt-4 flex items-end justify-between">
        <p className="text-4xl font-bold">
          {value}
          {unit}
        </p>

        <div className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
          NORMAL
        </div>
      </div>

      <div className="mt-5 h-2 rounded-full bg-white/30">
        <div
          className="h-2 rounded-full bg-white"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default ServerStatusCard;