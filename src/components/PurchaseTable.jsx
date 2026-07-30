import { useEffect, useRef, useState } from 'react';
import { BsFileText } from 'react-icons/bs';
import {
    HiEllipsisVertical,
    HiOutlineDocumentText,
    HiOutlinePencil,
    HiOutlineTrash,
} from 'react-icons/hi2';
import { NavLink } from 'react-router';
import StatusBadge from './common/StatusBadge';

function ProductCell({ product }) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-[#374151]">
                <BsFileText className="h-5 w-5" />
            </div>
            <p className="text-sm text-[#111827]">{product}</p>
        </div>
    );
}

function ActionMenu({ row, onEdit, onDelete }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#475569] transition hover:bg-[#F8FAFF] hover:text-[#111827] cursor-pointer"
                title="Actions"
            >
                <HiEllipsisVertical className="h-5 w-5" />
            </button>

            {isOpen && (
                <div className="absolute right-0 z-30 mt-1 w-36 origin-top-right rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg ring-1 ring-black/5 animate-fadeIn">
                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            setIsOpen(false);
                            onEdit(row);
                        }}
                        className="flex w-full items-center px-4 py-2 text-xs font-medium text-[#374151] hover:bg-[#F3F4F6] hover:text-[#111827] transition cursor-pointer"
                    >
                        <HiOutlinePencil className="mr-2.5 h-4 w-4 text-[#2563EB]" />
                        Edit
                    </button>
                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation();
                            setIsOpen(false);
                            onDelete(row);
                        }}
                        className="flex w-full items-center px-4 py-2 text-xs font-medium text-[#DC2626] hover:bg-red-50 transition cursor-pointer"
                    >
                        <HiOutlineTrash className="mr-2.5 h-4 w-4 text-[#DC2626]" />
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export function PurchaseTable({ rows, onEdit, onDelete, onRowClick }) {
    return (
        <div className="overflow-hidden border-b border-[#E5E7EB] bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="min-w-[1150px] w-full border-collapse text-left text-sm">
                    <thead className="bg-[#F8FAFF]">
                        <tr className="text-xs font-semibold text-[#475569]">
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
                            <th className="whitespace-nowrap px-5 py-4 font-semibold">Documents</th>
                            <th className="whitespace-nowrap px-5 py-4 font-semibold text-right">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.length === 0 ? (
                            <tr>
                                <td colSpan={10} className="px-5 py-12 text-center text-[#6B7280]">
                                    <div className="flex flex-col items-center justify-center gap-1">
                                        <p className="text-sm font-semibold text-[#374151]">
                                            No matching items found
                                        </p>
                                        <p className="text-xs text-[#9CA3AF]">
                                            Try searching with a different product name or barcode
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className={`border-t border-[#E5E7EB] last:border-b-0 transition hover:bg-[#F9FAFF] ${onRowClick ? 'cursor-pointer' : ''}`}
                                    onClick={() => onRowClick?.(row)}
                                >
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
                                            onClick={(event) => event.stopPropagation()}
                                            className="inline-flex h-9 items-center whitespace-nowrap rounded-xl border border-[#E5E7EB] bg-white px-3 text-[11px] font-medium text-[#374151] transition hover:bg-[#F8FAFF]"
                                        >
                                            View Documents
                                            <HiOutlineDocumentText className="ml-2 h-4 w-4" />
                                        </NavLink>
                                    </td>
                                    <td className="whitespace-nowrap px-5 py-4 text-right">
                                        <ActionMenu row={row} onEdit={onEdit} onDelete={onDelete} />
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
