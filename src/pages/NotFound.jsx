import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'

const REDIRECT_SECONDS = 5

export default function NotFound() {
  const navigate = useNavigate()
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS)

  useEffect(() => {
    const countdown = setInterval(() => {
      setSecondsLeft((prev) => Math.max(prev - 1, 0))
    }, 1000)

    const redirect = setTimeout(() => {
      navigate('/login', { replace: true })
    }, REDIRECT_SECONDS * 1000)

    return () => {
      clearInterval(countdown)
      clearTimeout(redirect)
    }
  }, [navigate])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
          <span className="text-2xl font-bold">404</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Page Not Found</h1>
        <p className="mt-2 max-w-sm text-slate-500">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <p className="mt-4 text-sm text-slate-400">
          Redirecting to Login in{' '}
          <span className="font-semibold text-indigo-600">{secondsLeft}</span> second
          {secondsLeft !== 1 ? 's' : ''}...
        </p>
        <Link
          to="/login"
          className="mt-6 inline-flex rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Go to Login
        </Link>
      </div>
    </div>
  )
}
