import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getServers } from "../api/serverApi";
import type { Server } from "../types/server";

function ServerStatusPage() {
  const [servers, setServers] = useState<Server[]>([]);

  useEffect(() => {
    const fetchServers = async () => {
      const response = await getServers();
      setServers(response.data);
    };

    fetchServers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-8 pb-12">
        <section className="mb-8 rounded-3xl bg-white/80 p-8 shadow-sm ring-1 ring-slate-200 backdrop-blur">
          <p className="mb-2 text-sm font-semibold text-blue-600">
            SERVER STATUS
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            서버 상태
          </h1>

          <p className="mt-3 text-slate-600">
            등록된 서버의 CPU, Memory, Disk 사용률을 확인합니다.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {servers.map((server) => (
            <div
              key={server.id}
              className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {server.name}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {server.ipAddress}
                  </p>
                </div>

                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {server.status}
                </span>
              </div>

              <div className="space-y-4">
                <Metric label="CPU" value={server.cpuUsage} />
                <Metric label="Memory" value={server.memoryUsage} />
                <Metric label="Disk" value={server.diskUsage} />
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

interface MetricProps {
  label: string;
  value: number;
}

function Metric({ label, value }: MetricProps) {
  const getColor = () => {
    if (value >= 70) {
      return {
        bar: "bg-red-500",
        text: "text-red-600",
      };
    }

    if (value >= 45) {
      return {
        bar: "bg-yellow-500",
        text: "text-yellow-600",
      };
    }

    return {
      bar: "bg-green-500",
      text: "text-green-600",
    };
  };

  const color = getColor();

  return (
    <div>
      <div className="mb-2 flex justify-between text-sm font-medium text-slate-600">
        <span>{label}</span>

        <span className={color.text}>
          {value}%
        </span>
      </div>

      <div className="h-2 rounded-full bg-slate-100">
        <div
          className={`h-2 rounded-full transition-all ${color.bar}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default ServerStatusPage;