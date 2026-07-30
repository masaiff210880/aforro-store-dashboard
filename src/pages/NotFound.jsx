import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';

const REDIRECT_SECONDS = 5;

export default function NotFound() {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    const redirect = setTimeout(() => {
      navigate('/dashboard', { replace: true });
    }, REDIRECT_SECONDS * 1000);

    return () => {
      clearInterval(countdown);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#F8FAFC]">
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 top-0 h-96 w-96 rounded-full bg-[#2563EB]/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#3B82F6]/10 blur-3xl" />
      </div>

      {/* Brand Header */}
      <header className="relative z-10 flex shrink-0 items-center justify-between px-6 py-5 sm:px-10">
        <Link to="/dashboard" className="flex items-center gap-3">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8 w-8"
            alt="Shelf OS Logo"
          />
          <span className="text-xl font-bold tracking-tight text-[#111827]">Shelf OS</span>
        </Link>
      </header>

      {/* Main 404 Hero Container */}
      <main className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-4 py-8">
        <div className="w-full max-w-md text-center">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 sm:p-10 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
            
            {/* 404 Badge */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-[#DBEAFE] bg-[#EFF6FF] text-[#2563EB] shadow-sm">
              <span className="text-3xl font-black tracking-tight">404</span>
            </div>

            <h1 className="text-2xl font-bold text-[#111827] sm:text-3xl">Page Not Found</h1>
            <p className="mt-2 text-sm text-[#6B7280]">
              Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>

            {/* Countdown Badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#EFF6FF] bg-[#F8FAFF] px-4 py-2 text-xs font-medium text-[#4B5563]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2563EB] opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2563EB]"></span>
              </span>
              <span>
                Redirecting to Dashboard in{' '}
                <strong className="font-semibold text-[#2563EB]">{secondsLeft}s</strong>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Link
                to="/dashboard"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-[#2563EB] px-6 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(37,99,235,0.25)] transition hover:bg-[#1D4ED8] cursor-pointer"
              >
                Back to Dashboard
              </Link>
              <Link
                to="/login"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-6 text-sm font-semibold text-[#374151] transition hover:bg-[#F8FAFF] cursor-pointer"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 shrink-0 px-6 py-4 text-center text-sm text-[#6B7280] sm:px-10">
        &copy; {new Date().getFullYear()} Shelf OS. All rights reserved.
      </footer>
    </div>
  );
}
