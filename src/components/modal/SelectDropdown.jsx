import { useEffect, useRef, useState } from 'react';

function ChevronDown({ className = '' }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
    );
}

export default function SelectDropdown({ value, options, onChange, placeholder = 'Select' }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const selectedOption = options.find((option) => option.value === value);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                className="flex h-12 w-full items-center justify-between gap-3 rounded-2xl border border-[#E5E7EB] bg-white px-4 text-sm text-[#111827] shadow-sm"
            >
                <span
                    className={`truncate ${selectedOption ? 'text-[#111827]' : 'text-[#9CA3AF]'}`}
                >
                    {selectedOption?.label ?? placeholder}
                </span>
                <ChevronDown
                    className={`h-4 w-4 text-[#6B7280] transition ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {open && (
                <ul className="absolute left-0 right-0 z-20 mt-2 max-h-64 overflow-auto rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
                    {options.map((option) => (
                        <li key={option.value}>
                            <button
                                type="button"
                                onClick={() => {
                                    onChange(option.value);
                                    setOpen(false);
                                }}
                                className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition hover:bg-[#F5F6FA] ${
                                    value === option.value
                                        ? 'bg-[#EFF6FF] font-semibold text-[#1D4ED8]'
                                        : 'text-[#111827]'
                                }`}
                            >
                                <span>{option.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
