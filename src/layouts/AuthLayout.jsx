import { Outlet, Link } from 'react-router'
import { DabangLogo } from '../components/icons/NavIcons'

export default function AuthLayout() {
  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#F5F6FA]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#4880FF]/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#16DBCC]/10 blur-3xl" />
      </div>

      <header className="relative z-10 flex shrink-0 items-center px-6 py-5 sm:px-10">
        <Link to="/login" className="flex items-center gap-3">
          <DabangLogo />
          <span className="text-xl font-bold text-[#202224]">Dabang</span>
        </Link>
      </header>

      <main className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden px-4 sm:px-6">
        <Outlet />
      </main>

      <footer className="relative z-10 shrink-0 px-6 py-4 text-center text-sm text-[#8B8D97] sm:px-10">
        &copy; {new Date().getFullYear()} Dabang. All rights reserved.
      </footer>
    </div>
  )
}
