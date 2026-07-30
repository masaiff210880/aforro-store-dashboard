import { useMemo } from 'react';
import {
    HiOutlineArrowLeft,
    HiOutlineArrowDownTray,
    HiOutlineDocumentText,
    HiOutlineCube,
    HiOutlineCalendar,
    HiOutlineQrCode,
    HiOutlineTag,
    HiOutlineScale,
    HiOutlineBanknotes,
} from 'react-icons/hi2';
import { Link, useLocation, useParams } from 'react-router';
import BreadcrumbHeader from '../components/common/BreadcrumbHeader';
import StatusBadge from '../components/common/StatusBadge';
import { purchaseRows } from '../data/purchaseMockData';

export default function PurchaseDetails() {
    const { id } = useParams();
    const location = useLocation();
    const statePurchase = location.state?.purchase;

    const purchase = useMemo(() => {
        if (statePurchase && statePurchase.id === id) {
            return statePurchase;
        }

        return purchaseRows.find((row) => row.id === id);
    }, [id, statePurchase]);

    const batchList = useMemo(() => {
        if (!purchase) return [];
        if (Array.isArray(purchase.batches) && purchase.batches.length > 0) {
            return purchase.batches.map((batch, index) => {
                const batchNo = batch.batchNo || (typeof purchase.batch === 'string' && purchase.batch.includes(',') ? purchase.batch.split(',')[index]?.trim() : purchase.batch) || `BT-${1000 + index + 1}`;
                
                const qty = batch.quantity !== undefined && batch.quantity !== '' 
                    ? (typeof batch.quantity === 'number' || !isNaN(batch.quantity) ? `${batch.quantity}${purchase.type === 'Loose Item' ? ' sacks' : ''}` : batch.quantity)
                    : purchase.quantity;

                let weight = '-';
                if (batch.weight) {
                    weight = batch.weightUnit ? `${batch.weight}${batch.weightUnit}` : batch.weight;
                } else if (batch.weightPerSack) {
                    weight = `${batch.weightPerSack}${batch.weightPerSackUnit || 'Kg'}/sack`;
                } else if (batch.totalWeight && batch.totalWeight !== '--/unit') {
                    weight = batch.totalWeight;
                } else if (purchase.weight) {
                    weight = purchase.weight;
                }

                let price = '-';
                if (batch.sellingPrice) {
                    const num = typeof batch.sellingPrice === 'number' ? batch.sellingPrice : parseFloat(batch.sellingPrice);
                    if (!isNaN(num)) {
                        price = `₹${num.toLocaleString('en-IN')}${batch.sellingPriceUnit ? `/${batch.sellingPriceUnit}` : ''}`;
                    } else {
                        price = String(batch.sellingPrice).startsWith('₹') ? batch.sellingPrice : `₹${batch.sellingPrice}`;
                    }
                } else if (purchase.price) {
                    price = purchase.price;
                }

                return {
                    id: batch.id || `batch-${index}`,
                    batchNo,
                    quantity: qty,
                    weight,
                    price,
                };
            });
        }

        return [
            {
                id: 'batch-0',
                batchNo: purchase.batch || 'BT-1001',
                quantity: purchase.quantity || '1',
                weight: purchase.weight || '-',
                price: purchase.price || '-',
            },
        ];
    }, [purchase]);

    if (!purchase) {
        return (
            <div className="w-full h-full bg-[#F9FAFB] p-0">
                <BreadcrumbHeader title="Purchase Details" />
                <div className="rounded-lg bg-white p-6 text-center">
                    <p className="text-base font-semibold text-[#111827]">Purchase Record Not Found</p>
                    <p className="mt-2 text-xs text-[#6B7280]">
                        The purchase record for ID <span className="font-mono text-[#2563EB]">{id}</span> could not be located.
                    </p>
                    <Link
                        to="/inventory/purchase"
                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#1D4ED8]"
                    >
                        <HiOutlineArrowLeft className="h-4 w-4" />
                        Return to Purchase List
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-[#F9FAFB] min-h-screen p-0">
            <div className="p-0 space-y-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white rounded-lg px-4 py-3">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/inventory/purchase"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-[#374151] transition hover:bg-gray-200"
                            title="Back to purchases"
                        >
                            <HiOutlineArrowLeft className="h-4 w-4" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-base font-bold text-[#111827]">Purchase Details</h1>
                                <span className="rounded bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-[#475569]">
                                    #{purchase.id}
                                </span>
                                <StatusBadge status={purchase.status} type={purchase.type} />
                            </div>
                            <p className="text-xs text-[#6B7280] mt-0.5">
                                Complete order information and batch breakdown
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Link
                            to="/inventory/purchase"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-[#374151] transition hover:bg-gray-200"
                        >
                            Back to Purchase List
                        </Link>
                        <button
                            type="button"
                            onClick={() => alert(`Downloading invoice: ${purchase.fileName || 'purchase_invoice.pdf'}`)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[#1D4ED8] cursor-pointer"
                        >
                            <HiOutlineArrowDownTray className="h-4 w-4" />
                            Download Invoice
                        </button>
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
                            <p className="text-sm font-bold text-[#111827] truncate" title={purchase.product}>
                                {purchase.product}
                            </p>
                            <div className="mt-1 flex items-center gap-1.5 text-xs text-[#475569]">
                                <HiOutlineQrCode className="h-3.5 w-3.5 text-[#9CA3AF]" />
                                <span className="font-mono font-medium">{purchase.barcode || '-'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-3.5 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                                Date & Type
                            </span>
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                                <HiOutlineCalendar className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-2.5">
                            <p className="text-sm font-bold text-[#111827]">{purchase.date}</p>
                            <div className="mt-1 flex items-center gap-1 text-xs text-[#475569]">
                                <HiOutlineTag className="h-3.5 w-3.5 text-[#9CA3AF]" />
                                <span>{purchase.type || 'Standard'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-3.5 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                                Quantity & Weight
                            </span>
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-50 text-purple-600">
                                <HiOutlineScale className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-2.5">
                            <p className="text-sm font-bold text-[#111827]">{purchase.quantity}</p>
                            <div className="mt-1 text-xs text-[#475569]">
                                Weight: <span className="font-semibold text-[#111827]">{purchase.weight}</span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-3.5 flex flex-col justify-between">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
                                Purchase Price
                            </span>
                            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-amber-50 text-amber-600">
                                <HiOutlineBanknotes className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="mt-2.5">
                            <p className="text-sm font-bold text-[#111827]">{purchase.price}</p>
                            <div className="mt-1 flex items-center gap-1 text-xs text-[#2563EB] font-medium">
                                <HiOutlineDocumentText className="h-3.5 w-3.5" />
                                <span className="truncate max-w-[140px]" title={purchase.fileName || 'purchase_invoice.pdf'}>
                                    {purchase.fileName || 'purchase_invoice.pdf'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg bg-white overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-[#F8FAFF]">
                        <div className="flex items-center gap-2">
                            <h2 className="text-sm font-bold text-[#111827]">Batch Details</h2>
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-[#2563EB]">
                                {batchList.length} {batchList.length === 1 ? 'Batch' : 'Batches'}
                            </span>
                        </div>
                        <p className="text-xs text-[#6B7280]">
                            Showing mapped batches for this purchase entry
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="bg-slate-50/70 text-[#475569] font-semibold uppercase tracking-wider text-[11px]">
                                    <th className="px-4 py-2.5 w-12 text-center">#</th>
                                    <th className="px-4 py-2.5">Batch Number</th>
                                    <th className="px-4 py-2.5">Quantity</th>
                                    <th className="px-4 py-2.5">Weight / Specification</th>
                                    <th className="px-4 py-2.5">Selling Price</th>
                                    <th className="px-4 py-2.5 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {batchList.map((batch, index) => (
                                    <tr key={batch.id || index} className="hover:bg-[#F9FAFF] transition">
                                        <td className="px-4 py-3 text-center text-[#9CA3AF] font-medium">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-[#111827]">
                                            <span className="inline-flex items-center rounded bg-slate-100 px-2 py-0.5 font-mono text-xs font-semibold text-[#1E293B]">
                                                {batch.batchNo}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-[#374151] font-semibold">
                                            {batch.quantity}
                                        </td>
                                        <td className="px-4 py-3 text-[#374151]">
                                            {batch.weight}
                                        </td>
                                        <td className="px-4 py-3 text-[#111827] font-semibold">
                                            {batch.price}
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                                In Stock
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-slate-50/60 font-semibold text-[#374151]">
                                    <td colSpan={2} className="px-4 py-2.5 text-xs">
                                        Total ({batchList.length} {batchList.length === 1 ? 'batch' : 'batches'})
                                    </td>
                                    <td className="px-4 py-2.5 text-xs font-bold text-[#111827]">
                                        {purchase.quantity}
                                    </td>
                                    <td className="px-4 py-2.5 text-xs text-[#475569]">
                                        {purchase.weight}
                                    </td>
                                    <td className="px-4 py-2.5 text-xs font-bold text-[#111827]">
                                        {purchase.price}
                                    </td>
                                    <td className="px-4 py-2.5 text-right text-xs text-[#6B7280]">
                                        Verified
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
