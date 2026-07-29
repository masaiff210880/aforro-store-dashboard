import { HiOutlineHome } from 'react-icons/hi2';

export default function BreadcrumbHeader({ title }) {
    return (
        <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#F3F4F6]">
            <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280]">
                    <HiOutlineHome className="h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-[#374151]">{title}</p>
            </div>
        </div>
    );
}
