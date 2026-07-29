import { BsFileText } from 'react-icons/bs';
import { HiOutlineDocumentText } from 'react-icons/hi2';
import { NavLink } from 'react-router';
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

export function PurchaseTable({ rows }) {
    return (
        <div className="overflow-hidden border-b border-[#E5E7EB] bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-[1100px] w-full border-collapse text-left text-sm">
                    <thead className="bg-[#F8FAFF]">
                        <tr className="text-[10px] uppercase tracking-[0.14em] text-[#6B7280]">
                            <th className="whitespace-nowrap px-5 py-4 font-semibold">
                                Date of purchase
                            </th>
                            <th className="whitespace-nowrap px-5 py-4 font-semibold">Product</th>
                            <th className="whitespace-nowrap px-5 py-4 font-semibold">
                                UPC/Barcode No.
                            </th>
                            <th className="whitespace-nowrap px-5 py-4 font-semibold">Price</th>
                            <th className="whitespace-nowrap px-5 py-4 font-semibold">Weight</th>
                            <th className="whitespace-nowrap px-5 py-4 font-semibold">Quantity</th>
                            <th className="whitespace-nowrap px-5 py-4 font-semibold">Batch No.</th>
                            <th className="whitespace-nowrap px-5 py-4 font-semibold">
                                Product Type
                            </th>
                            <th className="whitespace-nowrap px-5 py-4 font-semibold" />
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="px-5 py-12 text-center text-[#6B7280]">
                                    <div className="flex flex-col items-center justify-center gap-1">
                                        <p className="text-sm font-semibold text-[#374151]">No matching items found</p>
                                        <p className="text-xs text-[#9CA3AF]">Try searching with a different product name or barcode</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            rows.map((row) => (
                                <tr key={row.id} className="border-t border-[#E5E7EB] last:border-b-0 transition hover:bg-[#F9FAFF]">
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
                                        {row.price}
                                    </td>
                                    <td className="whitespace-nowrap px-5 py-4 text-[#374151]">
                                        {row.weight}
                                    </td>
                                    <td className="whitespace-nowrap px-5 py-4 text-[#374151]">
                                        {row.quantity}
                                    </td>
                                    <td className="whitespace-nowrap px-5 py-4 text-[#374151]">
                                        {row.batch}
                                    </td>
                                    <td className="px-5 py-4">
                                        <StatusBadge status={row.status} type={row.type} />
                                    </td>
                                    <td className="px-5 py-4">
                                        <NavLink
                                            to="#"
                                            className="inline-flex h-10 items-center whitespace-nowrap rounded-xl border border-[#E5E7EB] bg-white px-4 text-[11px] font-medium text-[#374151] transition hover:bg-[#F8FAFF]"
                                        >
                                            View Documents
                                            <HiOutlineDocumentText className="ml-2 h-4 w-4" />
                                        </NavLink>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
