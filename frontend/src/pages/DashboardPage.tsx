import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ServerStatusCard from "../components/ServerStatusCard";
import { useEffect, useState } from "react";
import { getIncidents } from "../api/incidentApi";
import { getDashboard } from "../api/dashboardApi";
import type { Dashboard } from "../types/dashboard";
import type { Incident } from "../types/incident";

function DashboardPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incidentResponse, dashboardResponse] = await Promise.all([
          getIncidents(),
          getDashboard(),
        ]);

        setIncidents(incidentResponse.data);
        setDashboard(dashboardResponse.data);
      } catch (error) {
        console.error("데이터 조회 실패", error);
      }
    };

    // 최초 조회
    fetchData();

    // 5초마다 갱신
    const interval = setInterval(fetchData, 5000);

    // 페이지 벗어나면 정리
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-8 pb-12">
        <section className="mb-8 rounded-3xl bg-white/80 p-8 shadow-sm ring-1 ring-slate-200 backdrop-blur">
          <p className="mb-2 text-sm font-semibold text-blue-600">
            CLOUD MONITORING
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Cloud Incident Monitoring System
          </h1>

          <p className="mt-3 text-slate-600">
            서버 자원 사용률과 장애 현황을 한눈에 확인합니다.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
              API Connected
            </span>

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Spring Boot + MySQL
            </span>

            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">
              Incident Count: {incidents.length}
            </span>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <ServerStatusCard
            title="CPU Usage"
            value={dashboard?.cpuUsage ?? 0}
            unit="%"
            color="blue"
          />

          <ServerStatusCard
            title="Memory Usage"
            value={dashboard?.memoryUsage ?? 0}
            unit="%"
            color="green"
          />

          <ServerStatusCard
            title="Disk Usage"
            value={dashboard?.diskUsage ?? 0}
            unit="%"
            color="purple"
          />
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
            <p className="text-sm font-medium text-slate-500">미해결 장애</p>
            <p className="mt-3 text-4xl font-bold text-slate-900">
              {dashboard?.unresolvedCount ?? 0}건
            </p>
            <p className="mt-2 text-sm text-slate-500">
              현재 처리 중인 장애 건수입니다.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
            <p className="text-sm font-medium text-slate-500">HIGH 이상 장애</p>
            <p className="mt-3 text-4xl font-bold text-rose-600">
              {dashboard?.highSeverityCount ?? 0}건
            </p>
            <p className="mt-2 text-sm text-slate-500">
              우선 확인이 필요한 장애입니다.
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">최근 장애</h2>
              <p className="mt-1 text-sm text-slate-500">
                최근 등록된 장애 목록입니다.
              </p>
            </div>

            <Link
              to="/incidents"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              장애 관리
            </Link>
          </div>

          <div className="space-y-3">
            {incidents.map((incident) => (
              <Link
                key={incident.id}
                to={`/incidents/${incident.id}`}
                className="block rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-slate-900">{incident.title}</p>

                  <p className="text-sm font-medium text-slate-500">
                    {incident.status} / {incident.severity}
                  </p>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {incident.location} · {incident.assignee}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;