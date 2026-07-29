import { BsFileText } from 'react-icons/bs';
import { HiArrowUp, HiArrowDown } from 'react-icons/hi2';
import StatusBadge from './common/StatusBadge';

function ProductCell({ product }) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-[#374151]">
                <BsFileText className="h-5 w-5" />
            </div>
            <p className="text-sm font-semibold text-[#111827]">{product}</p>
        </div>
    );
}

export function InventoryAdjustmentTable({ rows }) {
    return (
        <div className="overflow-hidden border-b border-[#E5E7EB] bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-[1050px] w-full border-collapse text-left text-sm">
                    <thead className="bg-[#F8FAFF]">
                        <tr className="text-[10px] uppercase tracking-[0.14em] text-[#6B7280]">
                            <th className="whitespace-nowrap px-5 py-4 font-semibold">
                                Date of adjustment
                            </th>
                            <th className="whitespace-nowrap px-5 py-4 font-semibold">Product</th>
                            <th className="whitespace-nowrap px-5 py-4 font-semibold">
                                UPC/Barcode No.
                            </th>
                            <th className="whitespace-nowrap px-5 py-4 font-semibold">Batch No.</th>
                            <th className="whitespace-nowrap px-5 py-4 font-semibold">
                                Sales Channel
                            </th>
                            <th className="whitespace-nowrap px-5 py-4 font-semibold">
                                Qty
                            </th>
                            <th className="whitespace-nowrap px-5 py-4 font-semibold">Reason</th>
                            <th className="whitespace-nowrap px-5 py-4 font-semibold">
                                Product Type
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={8} className="px-5 py-12 text-center text-[#6B7280]">
                                    <div className="flex flex-col items-center justify-center gap-1">
                                        <p className="text-sm font-semibold text-[#374151]">No adjustment records found</p>
                                        <p className="text-xs text-[#9CA3AF]">Try searching with a different product name or barcode</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            rows.map((row) => {
                                const rawQty = row.qty || row.adjustmentQty || '-';
                                const isPositive = row.isPositive !== undefined ? row.isPositive : String(rawQty).startsWith('+');
                                const cleanQty = String(rawQty).replace(/^[+-]\s*/, '');
                                const badgeStatus = row.status || (row.type === 'Loose Item' ? 'loose' : 'packaged');

                                return (
                                    <tr key={row.id} className="border-t border-[#E5E7EB] last:border-b-0 transition hover:bg-[#F9FAFB]">
                                        <td className="whitespace-nowrap px-5 py-4 text-sm text-[#6B7280]">
                                            {row.date}
                                        </td>
                                        <td className="px-5 py-4 text-[#111827]">
                                            <ProductCell product={row.product} />
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-4 text-[#374151]">
                                            {row.barcode}
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-4 text-[#374151]">
                                            {row.batch}
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-4 text-sm text-[#374151]">
                                            {row.channel || 'Offline'}
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#111827]">
                                            <div className="inline-flex items-center gap-1.5">
                                                <span>{cleanQty}</span>
                                                {isPositive ? (
                                                    <HiArrowUp className="h-4 w-4 text-[#16A34A]" />
                                                ) : (
                                                    <HiArrowDown className="h-4 w-4 text-[#DC2626]" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-4 text-[#374151]">
                                            {row.reason}
                                        </td>
                                        <td className="whitespace-nowrap px-5 py-4">
                                            <StatusBadge status={badgeStatus} type={row.type || 'Packaged Item'} />
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
