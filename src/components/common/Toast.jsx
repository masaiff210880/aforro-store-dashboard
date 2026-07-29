import { useEffect, useState } from 'react'

function ToastItem({ id, type, message, onDismiss }) {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const enterTimer = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(enterTimer)
  }, [])

  const handleDismiss = () => {
    setLeaving(true)
    setTimeout(() => onDismiss(id), 300)
  }

  const isSuccess = type === 'success'

  return (
    <div
      role="alert"
      className={`pointer-events-auto flex w-full items-center gap-4 rounded-[20px] bg-white border border-[#E5E7EB] px-5 py-4 shadow-[0_12px_36px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out ${
        visible && !leaving
          ? 'translate-x-0 opacity-100'
          : 'translate-x-12 opacity-0'
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-lg font-semibold ${
          isSuccess 
            ? 'bg-[#E8F8F0] text-[#0F5B3C]' 
            : 'bg-red-50 text-red-700'
        }`}
        aria-hidden="true"
      >
        {isSuccess ? '✓' : '!'}
      </span>

      <p className="flex-1 text-sm font-semibold text-[#1F2937] leading-snug">{message}</p>

      <button
        type="button"
        onClick={handleDismiss}
        className="shrink-0 rounded-full p-1 text-[#9CA3AF] transition hover:bg-[#F3F4F6] hover:text-[#4B5563]"
        aria-label="Dismiss notification"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts.length) return null

  return (
    <div className="pointer-events-none fixed right-6 top-6 z-[9999] flex flex-col items-end gap-3 w-full max-w-[380px] px-4 sm:px-0">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}
