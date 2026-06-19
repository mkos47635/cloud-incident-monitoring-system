import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function IncidentCreatePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />

      <main className="mx-auto max-w-6xl px-8 pb-12">
        <section className="mb-8 rounded-3xl bg-white/80 p-8 shadow-sm ring-1 ring-slate-200 backdrop-blur">
          <p className="mb-2 text-sm font-semibold text-blue-600">
            CREATE INCIDENT
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            장애 등록
          </h1>

          <p className="mt-3 text-slate-600">
            수동으로 장애 정보를 등록합니다.
          </p>
        </section>

        <section className="rounded-2xl bg-white p-8 shadow-md ring-1 ring-slate-200">
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                제목
              </label>
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                placeholder="예: CPU 사용률 임계치 초과"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                내용
              </label>
              <textarea
                className="h-36 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                placeholder="장애 내용을 입력하세요."
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  유형
                </label>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white">
                  <option>SERVER</option>
                  <option>NETWORK</option>
                  <option>DATABASE</option>
                  <option>DEPLOYMENT</option>
                  <option>OTHER</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  심각도
                </label>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white">
                  <option>LOW</option>
                  <option>MEDIUM</option>
                  <option>HIGH</option>
                  <option>CRITICAL</option>
                </select>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  발생 위치
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                  placeholder="예: EC2-WEB-01"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  담당자
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white"
                  placeholder="예: 박성원"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
              <Link
                to="/incidents"
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                취소
              </Link>

              <button className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
                등록
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default IncidentCreatePage;