import { useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../components/common/Button'
import PasswordInput from '../components/common/PasswordInput'

const DEFAULT_EMAIL = 'admin@dabang.com'
const DEFAULT_PASSWORD = 'password123'

const inputClassName =
  'w-full rounded-xl border border-[#E8E8E8] bg-white px-4 py-2.5 text-sm text-[#202224] placeholder-[#8B8D97] outline-none transition focus:border-[#4880FF] focus:ring-2 focus:ring-[#4880FF]/20'

export default function Login() {
  const navigate = useNavigate()
  const [form] = useState({
    email: DEFAULT_EMAIL,
    password: DEFAULT_PASSWORD,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="flex flex-1 items-center justify-center py-6">
      <div className="w-full max-w-md">
        <div className="rounded-[14px] border border-[#F0F0F0] bg-white p-6 shadow-[0_4px_20px_rgba(238,238,238,0.5)] sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-[#202224] sm:text-3xl">Welcome back</h1>
            <p className="mt-2 text-sm text-[#8B8D97]">Sign in to your Dabang dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#202224]">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                readOnly
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#202224]">
                Password
              </label>
              <PasswordInput
                id="password"
                value={form.password}
                onChange={() => {}}
                readOnly
                variant="light"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#8B8D97]">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-[#E8E8E8] text-[#4880FF] focus:ring-[#4880FF]/20"
                />
                Remember me
              </label>
              <button type="button" className="font-medium text-[#4880FF] hover:text-[#3a6fe0]">
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              className="bg-[#4880FF] shadow-[0_4px_12px_rgba(72,128,255,0.35)] hover:bg-[#3a6fe0] hover:from-[#3a6fe0] hover:to-[#3a6fe0]"
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
