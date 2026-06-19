import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SeverityBadge from "../components/SeverityBadge";
import StatusBadge from "../components/StatusBadge";
import { incidents } from "../mock/incidents";

function IncidentDetailPage() {
  const { id } = useParams();

  const incident = incidents.find((incident) => incident.id === Number(id));

  if (!incident) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Navbar />

        <main className="mx-auto max-w-6xl px-8 pb-12">
          <div className="rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-200">
            <p className="text-slate-700">장애 정보를 찾을 수 없습니다.</p>

            <Link
              to="/incidents"
              className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              장애 목록으로 돌아가기
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const actionLogs = [
    {
      id: 1,
      content: "CPU 사용률 확인",
      writer: "박성원",
      createdAt: "2026-06-19 15:25",
    },
    {
      id: 2,
      content: "불필요한 프로세스 종료",
      writer: "박성원",
      createdAt: "2026-06-19 15:35",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-8 pb-12">
        <section className="mb-8 rounded-3xl bg-white/80 p-8 shadow-sm ring-1 ring-slate-200 backdrop-blur">
          <p className="mb-2 text-sm font-semibold text-blue-600">
            INCIDENT DETAIL
          </p>

          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                {incident.title}
              </h1>

              <p className="mt-3 text-slate-600">
                등록일: {incident.createdAt}
              </p>
            </div>

            <div className="flex gap-2">
              <SeverityBadge severity={incident.severity} />
              <StatusBadge status={incident.status} />
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
            <p className="text-sm font-medium text-slate-500">유형</p>
            <p className="mt-3 text-xl font-bold text-slate-900">
              {incident.type}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
            <p className="text-sm font-medium text-slate-500">발생 위치</p>
            <p className="mt-3 text-xl font-bold text-slate-900">
              {incident.location}
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-slate-200">
            <p className="text-sm font-medium text-slate-500">담당자</p>
            <p className="mt-3 text-xl font-bold text-slate-900">
              {incident.assignee}
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-200">
          <h2 className="text-xl font-bold text-slate-900">장애 내용</h2>

          <p className="mt-4 leading-7 text-slate-700">
            {incident.content}
          </p>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <p className="text-sm text-slate-500">
              마지막 수정일: {incident.updatedAt}
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-200">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">조치 내역</h2>
              <p className="mt-1 text-sm text-slate-500">
                장애 처리 과정에서 수행한 작업을 기록합니다.
              </p>
            </div>

            <Link
              to="/incidents"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              목록으로 돌아가기
            </Link>
          </div>

          <div className="space-y-4">
            {actionLogs.map((log) => (
              <div
                key={log.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <p className="font-semibold text-slate-900">{log.content}</p>

                <p className="mt-1 text-sm text-slate-500">
                  {log.writer} · {log.createdAt}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <textarea
              className="h-24 w-full resize-none bg-transparent text-slate-700 outline-none"
              placeholder="조치 내용을 입력하세요."
            />

            <div className="mt-4 flex justify-end">
              <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                조치 내역 추가
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default IncidentDetailPage;