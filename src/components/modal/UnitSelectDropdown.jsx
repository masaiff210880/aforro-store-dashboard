import { useEffect, useRef, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi2';

export default function UnitSelectDropdown({ value, onChange, options = ['Add unit', 'Kg', 'Gram', 'Litre', 'ml'] }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen((prev) => !prev);
    };

    return (
        <div ref={ref} className="relative shrink-0">
            <button
                type="button"
                onClick={handleToggle}
                className="flex h-7 items-center justify-between gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-2.5 text-xs font-semibold text-[#374151] outline-none transition-colors cursor-pointer hover:border-[#D1D5DB] select-none"
            >
                <span>{value || 'Add unit'}</span>
                <HiChevronDown className={`h-3 w-3 text-[#6B7280] transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </button>

            {open && (
                <ul className="absolute right-0 bottom-full z-50 mb-1 min-w-[110px] overflow-hidden rounded-lg border border-[#E5E7EB] bg-white shadow-[0_12px_28px_rgba(15,23,42,0.15)] py-1">
                    {options.map((opt) => (
                        <li key={opt}>
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onChange(opt);
                                    setOpen(false);
                                }}
                                className={`flex w-full items-center justify-between px-3 py-1.5 text-left text-xs transition-colors cursor-pointer hover:bg-[#F5F6FA] select-none ${
                                    value === opt ? 'bg-[#EFF6FF] font-semibold text-[#1D4ED8]' : 'text-[#374151]'
                                }`}
                            >
                                <span>{opt}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
