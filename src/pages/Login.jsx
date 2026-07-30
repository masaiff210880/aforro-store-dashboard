import { useState } from 'react';
import { useNavigate } from 'react-router';
import PasswordInput from '../components/common/PasswordInput';

const DEFAULT_EMAIL = 'admin@shelfos.com';
const DEFAULT_PASSWORD = 'password123';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="flex flex-1 items-center justify-center py-6 sm:py-10">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
          {/* Header & Logo */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EFF6FF]">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 w-8"
                alt="Shelf OS Logo"
              />
            </div>
            <h1 className="text-2xl font-bold text-[#111827] sm:text-3xl">Welcome back</h1>
            <p className="mt-1.5 text-sm text-[#6B7280]">Sign in to your Shelf OS dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#374151]">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@shelfos.com"
                className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-2.5 text-sm text-[#111827] placeholder-[#9CA3AF] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#374151]">
                Password
              </label>
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                variant="light"
              />
            </div>

            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center gap-2 text-[#4B5563] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-[#D1D5DB] text-[#2563EB] focus:ring-[#2563EB]/20 cursor-pointer"
                />
                Remember me
              </label>
              <button type="button" className="font-semibold text-[#2563EB] hover:text-[#1D4ED8] cursor-pointer">
                Forgot password?
              </button>
            </div>

            {/* Demo Credentials Box */}
            <div className="rounded-xl border border-[#DBEAFE] bg-[#EFF6FF] p-3 text-xs">
              <p className="font-semibold text-[#1E3A8A] mb-1">Demo Credentials:</p>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between text-[#1E40AF]">
                <span>Email: <strong className="font-medium text-[#111827]">admin@shelfos.com</strong></span>
                <span>Password: <strong className="font-medium text-[#111827]">password123</strong></span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-11 inline-flex items-center justify-center rounded-xl bg-[#2563EB] text-sm font-semibold text-white shadow-[0_4px_14px_rgba(37,99,235,0.25)] transition hover:bg-[#1D4ED8] cursor-pointer active:scale-[0.99]"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
