import { useState } from 'react';
import { useLocation } from 'react-router';
import {
    HiBars3,
    HiOutlineBell,
    HiOutlineMagnifyingGlass,
    HiEllipsisVertical,
    HiXMark,
    HiOutlineCheckCircle,
    HiOutlineArrowRightOnRectangle,
} from 'react-icons/hi2';
import { getPageTitle } from '../data/sidebarMenu';

export default function Header({ onMenuToggle }) {
    const location = useLocation();
    const pageTitle = getPageTitle(location.pathname);
    const [storeActive, setStoreActive] = useState(false);
    const [showMobileCanvas, setShowMobileCanvas] = useState(false);

    return (
        <header className="z-30 shrink-0 border-b border-[#E5E7EB] bg-white px-4 py-3 sm:px-6 sm:py-4 shadow-sm">
            <div className="mx-auto flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                
                {/* Left / Top Section: Title & Search */}
                <div className="flex flex-col gap-3 lg:flex-1 lg:flex-row lg:items-center lg:gap-4 min-w-0">
                    
                    {/* Top Bar on Mobile: Hamburger Menu + Page Title Label + Mobile Quick Actions */}
                    <div className="flex items-center justify-between gap-3 lg:justify-start min-w-0">
                        <div className="flex items-center gap-3 min-w-0">
                            {/* Mobile Sidebar Hamburger Toggle */}
                            <button
                                type="button"
                                onClick={onMenuToggle}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#F8FAFF] text-[#374151] transition hover:bg-[#EFF6FF] hover:text-[#2563EB] lg:hidden cursor-pointer shrink-0"
                                aria-label="Toggle navigation sidebar"
                            >
                                <HiBars3 className="h-6 w-6" />
                            </button>

                            {/* Page Label / Title */}
                            <h1 className="truncate text-lg sm:text-xl font-bold tracking-tight text-[#111827]">
                                {pageTitle}
                            </h1>
                        </div>

                        {/* Mobile Right Controls: Notification Bell + Options Canvas Toggle */}
                        <div className="flex items-center gap-2 lg:hidden shrink-0">
                            <button
                                type="button"
                                className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#F8FAFF] text-[#374151] transition hover:bg-slate-100 cursor-pointer"
                                aria-label="Notifications"
                            >
                                <HiOutlineBell className="h-5 w-5" />
                                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#EF4444]" />
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowMobileCanvas((prev) => !prev)}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#2563EB] bg-[#2563EB] text-white shadow-sm transition hover:bg-[#1D4ED8] cursor-pointer"
                                aria-label="Toggle options canvas"
                            >
                                <HiEllipsisVertical className="h-6 w-6" />
                            </button>
                        </div>
                    </div>

                    {/* Search Input Box: Placed below Title Label on Mobile, Inline on Desktop */}
                    <div className="w-full lg:max-w-[320px]">
                        <div className="relative w-full">
                            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                                <HiOutlineMagnifyingGlass className="h-4 w-4" />
                            </span>
                            <input
                                type="search"
                                placeholder="Search"
                                className="h-10 sm:h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#F8FAFF] py-2 pl-11 pr-4 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side Desktop Controls */}
                <div className="hidden lg:flex lg:items-center lg:gap-3 shrink-0">
                    <button
                        type="button"
                        onClick={() => setStoreActive((prev) => !prev)}
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[#111827] cursor-pointer select-none"
                    >
                        <span
                            className={`inline-flex h-6 w-11 items-center rounded-full p-0.5 transition-colors ${storeActive ? 'bg-[#DCFEED]' : 'bg-[#E5E7EB]'}`}
                        >
                            <span
                                className={`h-4 w-4 rounded-full ${storeActive ? 'bg-[#16A34A] translate-x-6' : 'bg-[#2563EB] translate-x-1'} transition-transform`}
                            />
                        </span>
                        {storeActive ? 'Store active' : 'Store inactive'}
                    </button>

                    <button
                        type="button"
                        className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-transparent text-[#111827] hover:bg-slate-100 transition cursor-pointer"
                        aria-label="Notifications"
                    >
                        <HiOutlineBell className="h-5 w-5" />
                        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#EF4444]" />
                    </button>

                    <div className="flex min-w-[200px] items-center gap-3 rounded-full border border-[#F3F4F6] bg-[#F8FAFF] px-3 py-1.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2563EB] text-sm font-semibold text-white">
                            J
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-[#111827]">
                                Jese Leos
                            </p>
                            <p className="truncate text-[11px] text-[#6B7280]">name@flowbite.com</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Options & Account Offcanvas Canvas */}
            {showMobileCanvas && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs lg:hidden transition-opacity">
                    <div className="w-full max-w-xs bg-white p-5 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
                        <div>
                            {/* Canvas Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                                <h3 className="text-base font-bold text-[#111827]">Options & Account</h3>
                                <button
                                    type="button"
                                    onClick={() => setShowMobileCanvas(false)}
                                    className="rounded-lg p-1 text-[#6B7280] hover:bg-slate-100 hover:text-[#111827] cursor-pointer"
                                >
                                    <HiXMark className="h-6 w-6" />
                                </button>
                            </div>

                            {/* User Info Card */}
                            <div className="my-5 flex items-center gap-3 rounded-xl bg-[#F8FAFF] p-3 border border-[#E5E7EB]">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2563EB] text-base font-bold text-white shadow-sm">
                                    J
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-bold text-[#111827]">Jese Leos</p>
                                    <p className="truncate text-xs text-[#6B7280]">name@flowbite.com</p>
                                </div>
                            </div>

                            {/* Store Status Toggle */}
                            <div className="mb-4 flex items-center justify-between rounded-xl border border-[#E5E7EB] p-3">
                                <div>
                                    <p className="text-xs font-medium text-[#6B7280]">Store Status</p>
                                    <p className="text-sm font-semibold text-[#111827]">
                                        {storeActive ? 'Active Online' : 'Inactive Offline'}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setStoreActive((prev) => !prev)}
                                    className="cursor-pointer"
                                >
                                    <span
                                        className={`inline-flex h-6 w-11 items-center rounded-full p-0.5 transition-colors ${storeActive ? 'bg-[#DCFEED]' : 'bg-[#E5E7EB]'}`}
                                    >
                                        <span
                                            className={`h-4 w-4 rounded-full ${storeActive ? 'bg-[#16A34A] translate-x-6' : 'bg-[#2563EB] translate-x-1'} transition-transform`}
                                        />
                                    </span>
                                </button>
                            </div>

                            {/* Quick Actions List */}
                            <div className="space-y-2">
                                <button
                                    type="button"
                                    onClick={() => setShowMobileCanvas(false)}
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-[#374151] hover:bg-[#F8FAFF] hover:text-[#2563EB] transition cursor-pointer"
                                >
                                    <HiOutlineCheckCircle className="h-5 w-5 text-[#2563EB]" />
                                    <span>Store Settings</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowMobileCanvas(false)}
                                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-[#374151] hover:bg-[#F8FAFF] hover:text-[#2563EB] transition cursor-pointer"
                                >
                                    <HiOutlineBell className="h-5 w-5 text-[#2563EB]" />
                                    <span>Notifications Center</span>
                                </button>
                            </div>
                        </div>

                        {/* Sign Out Button in Canvas */}
                        <div className="pt-4 border-t border-[#E5E7EB]">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowMobileCanvas(false);
                                    window.location.href = '/login';
                                }}
                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#FCA5A5] bg-[#FEF2F2] py-2.5 text-xs font-semibold text-[#DC2626] hover:bg-[#FEE2E2] transition cursor-pointer"
                            >
                                <HiOutlineArrowRightOnRectangle className="h-4 w-4" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
