import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import SeverityBadge from "../components/SeverityBadge";
import StatusBadge from "../components/StatusBadge";
import { useEffect, useState } from "react";
import { getIncidents } from "../api/incidentApi";

function IncidentListPage() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const response = await getIncidents();
        setIncidents(response.data);
      } catch (error) {
        console.error("장애 목록 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-8 pb-12">
        <section className="mb-8 rounded-3xl bg-white/80 p-8 shadow-sm ring-1 ring-slate-200 backdrop-blur">
          <p className="mb-2 text-sm font-semibold text-blue-600">
            INCIDENT MANAGEMENT
          </p>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                장애 관리
              </h1>
              <p className="mt-3 text-slate-600">
                등록된 장애 목록을 확인하고 처리 상태를 관리합니다.
              </p>
            </div>

            <Link
              to="/incidents/new"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              장애 등록
            </Link>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                장애 목록
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                총 {incidents.length}건의 장애가 등록되어 있습니다.
              </p>
            </div>

            <Link
              to="/"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              대시보드로 이동
            </Link>
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-500">
              데이터를 불러오는 중...
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <table className="w-full border-collapse text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                      번호
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                      제목
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                      유형
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                      심각도
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                      상태
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                      담당자
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                      등록일
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {incidents.map((incident) => (
                    <tr
                      key={incident.id}
                      className="border-t border-slate-200 transition hover:bg-blue-50/60"
                    >
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {incident.id}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                        <Link
                          to={`/incidents/${incident.id}`}
                          className="hover:text-blue-600"
                        >
                          {incident.title}
                        </Link>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {incident.type}
                      </td>

                      <td className="px-6 py-4">
                        <SeverityBadge severity={incident.severity} />
                      </td>

                      <td className="px-6 py-4">
                        <StatusBadge status={incident.status} />
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {incident.assignee}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-500">
                        {incident.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default IncidentListPage;