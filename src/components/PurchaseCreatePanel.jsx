import { HiOutlineHome } from 'react-icons/hi2';

export default function PurchaseCreatePanel() {
    return (
        <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center">
                <div className="flex h-14 w-14 items-center justify-center text-slate-500">
                    <HiOutlineHome className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-slate-500">Purchase</p>
                </div>
            </div>
        </div>
    );
}
