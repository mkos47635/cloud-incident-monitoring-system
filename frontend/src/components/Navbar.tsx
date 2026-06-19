import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="mb-6 w-full border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-8">
        <Link to="/" className="text-lg font-bold text-slate-900">
          CIMS
        </Link>

        <nav className="flex gap-5 text-sm font-semibold text-slate-600">
          <Link to="/" className="hover:text-blue-600">
            대시보드
          </Link>
          <Link to="/incidents" className="hover:text-blue-600">
            장애 관리
          </Link>
          <Link to="/incidents/new" className="hover:text-blue-600">
            장애 등록
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;