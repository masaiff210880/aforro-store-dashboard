import { useMemo } from 'react';
import {
    HiOutlineArrowLeft,
    HiOutlineCube,
    HiOutlineCalendar,
    HiOutlineQrCode,
    HiOutlineTag,
    HiOutlineScale,
    HiOutlineDocumentText,
    HiArrowUp,
    HiArrowDown,
    HiOutlineBuildingStorefront,
} from 'react-icons/hi2';
import { Link, useLocation, useParams } from 'react-router';
import BreadcrumbHeader from '../components/common/BreadcrumbHeader';
import StatusBadge from '../components/common/StatusBadge';
import { inventoryAdjustmentRows } from '../data/inventoryAdjustmentMockData';

export default function InventoryDetails() {
    const { id } = useParams();
    const location = useLocation();
    const stateAdjustment = location.state?.adjustment;

    const adjustment = useMemo(() => {
        if (stateAdjustment && stateAdjustment.id === id) {
            return stateAdjustment;
        }

        return inventoryAdjustmentRows.find((row) => row.id === id);
    }, [id, stateAdjustment]);

    if (!adjustment) {
        return (
            <div className="w-full h-full bg-[#F9FAFB] p-0">
                <BreadcrumbHeader title="Inventory Adjustment Details" />
                <div className="rounded-lg bg-white p-6 text-center">
                    <p className="text-base font-semibold text-[#111827]">Adjustment Record Not Found</p>
                    <p className="mt-2 text-xs text-[#6B7280]">
                        The inventory adjustment record for ID <span className="font-mono text-[#2563EB]">{id}</span> could not be located.
                    </p>
                    <Link
                        to="/inventory/inventory-adjustment"
                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#1D4ED8]"
                    >
                        <HiOutlineArrowLeft className="h-4 w-4" />
                        Return to Adjustment List
                    </Link>
                </div>
            </div>
        );
    }

    const rawQty = adjustment.qty || adjustment.adjustmentQty || '-';
    const isPositive = adjustment.isPositive !== undefined 
        ? adjustment.isPositive 
        : String(rawQty).startsWith('+');
    const cleanQty = String(rawQty).replace(/^[+-]\s*/, '');
    const badgeStatus = adjustment.status || (adjustment.type === 'Loose Item' ? 'loose' : 'packaged');

    return (
        <div className="w-full h-full bg-[#F9FAFB] min-h-screen p-0">
            <div className="p-0 space-y-3">
                {/* Header Toolbar */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg px-4 py-3">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/inventory/inventory-adjustment"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-[#374151] transition hover:bg-gray-200"
                            title="Back to adjustments"
                        >
                            <HiOutlineArrowLeft className="h-4 w-4" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-base font-bold text-[#111827]">Adjustment Details</h1>
                                <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#475569]">
                                    #{adjustment.id}
                                </span>
                                <StatusBadge status={badgeStatus} type={adjustment.type || 'Packaged Item'} />
                            </div>
                            <p className="text-xs text-[#6B7280] mt-0.5">
                                Stock adjustment record and item specification details
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            to="/inventory/inventory-adjustment"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-[#374151] transition hover:bg-gray-200"
                        >
                            Back to Adjustments List
                        </Link>
                    </div>
                </div>

                {/* Compact Grid Summary Metrics - Clean, borderless & shadowless */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Metric 1: Item & Barcode */}
                    <div className="rounded-lg bg-white p-3.5 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                                Item & Barcode
                            </span>
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 text-[#2563EB]">
                                <HiOutlineCube className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-2.5">
                            <p className="text-sm font-bold text-[#111827] truncate" title={adjustment.product}>
                                {adjustment.product}
                            </p>
                            <div className="mt-1 flex items-center gap-1.5 text-xs text-[#475569]">
                                <HiOutlineQrCode className="h-3.5 w-3.5 text-[#9CA3AF]" />
                                <span className="font-mono font-medium">{adjustment.barcode || '-'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Metric 2: Date & Channel */}
                    <div className="rounded-lg bg-white p-3.5 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                                Date & Channel
                            </span>
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                                <HiOutlineCalendar className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-2.5">
                            <p className="text-sm font-bold text-[#111827]">{adjustment.date}</p>
                            <div className="mt-1 flex items-center gap-1 text-xs text-[#475569]">
                                <HiOutlineBuildingStorefront className="h-3.5 w-3.5 text-[#9CA3AF]" />
                                <span>{adjustment.channel || 'Offline'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Metric 3: Adjustment Quantity */}
                    <div className="rounded-lg bg-white p-3.5 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                                Quantity Change
                            </span>
                            <div className={`flex h-7 w-7 items-center justify-center rounded-md ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                <HiOutlineScale className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-2.5">
                            <div className="flex items-center gap-1.5">
                                <span className="text-sm font-bold text-[#111827]">{cleanQty}</span>
                                {isPositive ? (
                                    <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                                        <HiArrowUp className="h-3.5 w-3.5" /> Added
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                                        <HiArrowDown className="h-3.5 w-3.5" /> Reduced
                                    </span>
                                )}
                            </div>
                            <div className="mt-1 text-xs text-[#475569]">
                                Batch: <span className="font-mono font-medium text-[#111827]">{adjustment.batch || '-'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Metric 4: Reason */}
                    <div className="rounded-lg bg-white p-3.5 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                                Adjustment Reason
                            </span>
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-50 text-purple-600">
                                <HiOutlineDocumentText className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-2.5">
                            <p className="text-sm font-bold text-[#111827]">{adjustment.reason || 'Manual Adjustment'}</p>
                            <div className="mt-1 flex items-center gap-1 text-xs text-[#475569]">
                                <HiOutlineTag className="h-3.5 w-3.5 text-[#9CA3AF]" />
                                <span>{adjustment.type || 'Packaged Item'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Batches & Details Breakdown Table */}
                <div className="rounded-lg bg-white overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-[#F8FAFF]">
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm font-bold text-[#111827]">Adjustment Record Specification</h2>
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-[#2563EB]">
                                1 Record
                            </span>
                        </div>
                        <p className="text-xs text-[#6B7280]">
                            Audit details for stock count adjustment
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="bg-slate-50/70 text-[#475569] font-semibold uppercase tracking-wider text-[11px]">
                                    <th className="px-4 py-2.5 w-12 text-center">#</th>
                                    <th className="px-4 py-2.5">Batch Number</th>
                                    <th className="px-4 py-2.5">Product Name</th>
                                    <th className="px-4 py-2.5">Quantity Adjusted</th>
                                    <th className="px-4 py-2.5">Reason</th>
                                    <th className="px-4 py-2.5">Channel</th>
                                    <th className="px-4 py-2.5 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                <tr className="hover:bg-[#F9FAFF] transition">
                                    <td className="px-4 py-3 text-center text-[#9CA3AF] font-medium">
                                        1
                                    </td>
                                    <td className="px-4 py-3 font-medium text-[#111827]">
                                        <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 font-mono text-xs font-semibold text-[#1E293B]">
                                            {adjustment.batch || 'BT-1001'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-[#111827] font-semibold">
                                        {adjustment.product}
                                    </td>
                                    <td className="px-4 py-3 font-bold text-[#111827]">
                                        <div className="inline-flex items-center gap-1.5">
                                            <span>{cleanQty}</span>
                                            {isPositive ? (
                                                <HiArrowUp className="h-4 w-4 text-[#16A34A]" />
                                            ) : (
                                                <HiArrowDown className="h-4 w-4 text-[#DC2626]" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-[#374151]">
                                        {adjustment.reason || 'Manual Adjustment'}
                                    </td>
                                    <td className="px-4 py-3 text-[#374151]">
                                        {adjustment.channel || 'Offline'}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                            Adjusted
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
