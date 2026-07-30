import { useState } from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="h-screen overflow-hidden bg-[#F5F6FA]">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex h-screen flex-col lg:ml-[285px]">
                <Header onMenuToggle={() => setSidebarOpen(true)} />

                <main className="min-h-0 flex-1 overflow-y-auto px-0 py-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
