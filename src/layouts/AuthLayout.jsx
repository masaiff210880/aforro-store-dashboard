import { Outlet, Link } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-[#F8FAFC]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#2563EB]/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#3B82F6]/10 blur-3xl" />
      </div>

      <header className="relative z-10 flex shrink-0 items-center px-6 py-5 sm:px-10">
        <Link to="/login" className="flex items-center gap-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 w-8"
            alt="Shelf OS Logo"
          />
          <span className="text-xl font-bold tracking-tight text-[#111827]">Shelf OS</span>
        </Link>
      </header>

      <main className="relative z-10 flex min-h-0 flex-1 flex-col overflow-y-auto px-4 sm:px-6">
        <Outlet />
      </main>

      <footer className="relative z-10 shrink-0 px-6 py-4 text-center text-sm text-[#6B7280] sm:px-10">
        &copy; {new Date().getFullYear()} Shelf OS. All rights reserved.
      </footer>
    </div>
  );
}
