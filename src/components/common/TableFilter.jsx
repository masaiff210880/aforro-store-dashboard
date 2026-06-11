import { useEffect, useRef, useState } from 'react'

function ChevronDown({ className = '' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export default function TableFilter({
  label = 'Filter',
  value,
  options,
  onChange,
  className = '',
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const selectedOption = options.find((option) => option.value === value) ?? options[0]

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ref} className={`relative shrink-0 ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((isOpen) => !isOpen)}
        className="flex h-8 min-w-[120px] items-center justify-between gap-2 rounded-lg border border-[#F0F0F0] bg-white px-3 text-xs font-medium text-[#202224] transition hover:bg-[#F5F6FA]"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="flex items-center gap-2 truncate">
          <svg
            className="h-4 w-4 shrink-0 text-[#8B8D97]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
            />
          </svg>
          <span className="truncate">
            {label}: {selectedOption.label}
          </span>
        </span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-[#8B8D97] transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-2 min-w-full overflow-hidden rounded-xl border border-[#F0F0F0] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
        >
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={value === option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className={`flex w-full items-center px-4 py-2.5 text-left text-sm transition hover:bg-[#F5F6FA] ${
                  value === option.value ? 'bg-[#4880FF]/5 font-medium text-[#4880FF]' : 'text-[#202224]'
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
