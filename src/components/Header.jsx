import { useState } from 'react';
import { useLocation } from 'react-router';
import { getPageTitle } from '../data/sidebarMenu';

function SearchIcon() {
    return (
        <svg
            className="h-4 w-4 text-[#9CA3AF]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
        </svg>
    );
}

function BellIcon() {
    return (
        <svg
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0119 9.75v-.7V9a6 6 0 10-12 0v.75a8.967 8.967 0 01-2.312 6.022 23.848 23.848 0 005.454 1.31m5.714 0a3 3 0 11-5.714 0"
            />
        </svg>
    );
}

export default function Header({ onMenuToggle }) {
    const location = useLocation();
    const pageTitle = getPageTitle(location.pathname);
    const [storeActive, setStoreActive] = useState(false);

    return (
        <header className="z-30 shrink-0 border-b border-[#E5E7EB] bg-white px-5 py-4 shadow-sm">
            <div className="mx-auto flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex flex-1 items-center gap-4 min-w-0">
                    <h1 className="min-w-0 text-lg font-semibold tracking-tight text-[#111827]">
                        {pageTitle}
                    </h1>

                    <div className="relative w-full max-w-[420px]">
                        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                            <SearchIcon />
                        </span>
                        <input
                            type="search"
                            placeholder="Search"
                            className="h-11 w-full rounded-full border border-[#E5E7EB] bg-[#F8FAFF] py-2.5 pl-12 pr-4 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#93C5FD] focus:ring-2 focus:ring-[#BFDBFE]"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setStoreActive((prev) => !prev)}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-[#111827]"
                    >
                        <span
                            className={`inline-flex h-6 w-11 items-center rounded-full p-0.5 ${storeActive ? 'bg-[#DCFEED]' : 'bg-[#E5E7EB]'}`}
                        >
                            <span
                                className={`h-4 w-4 rounded-full ${storeActive ? 'bg-[#16A34A]' : 'bg-[#2563EB]'} ${storeActive ? 'translate-x-6' : 'translate-x-1'} transition-all`}
                            />
                        </span>
                        {storeActive ? 'Store active' : 'Store inactive'}
                    </button>

                    <button
                        type="button"
                        className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-transparent text-[#111827]"
                        aria-label="Notifications"
                    >
                        <BellIcon />
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#EF4444]" />
                    </button>

                    <div className="flex min-w-[220px] items-center gap-3 rounded-full px-3 py-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2563EB] text-sm font-semibold text-white">
                            J
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#111827]">
                                Jese Leos
                            </p>
                            <p className="truncate text-xs text-[#6B7280]">name@flowbite.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
