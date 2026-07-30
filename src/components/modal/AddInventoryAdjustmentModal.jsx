import { useEffect, useRef, useState } from 'react';
import { HiOutlineXMark } from 'react-icons/hi2';
import SelectDropdown from './SelectDropdown';
import { useToast } from '../../context/ToastContext';
import { formatBatchNumber } from '../../utils/formatters';

const batchOptions = [
    { value: 'Batch 1', label: 'Batch 1' },
    { value: 'Batch 2', label: 'Batch 2' },
    { value: 'Batch 3', label: 'Batch 3' },
];

const reasonDropdownOptions = [
    { value: 'Sales return', label: 'Sales return' },
    { value: 'Damaged goods', label: 'Damaged goods' },
    { value: 'Expired product', label: 'Expired product' },
    { value: 'Other', label: 'Other' },
];

const reasonPillOptions = [
    { id: 'sales_return', label: 'Sales return' },
    { id: 'damaged_goods', label: 'Damaged goods' },
    { id: 'expired_product', label: 'Expired product' },
    { id: 'other', label: 'Other' },
];

const itemOptions = [
    { label: 'Haldiram Bhujiya', sku: '1234567890', type: 'packaged', availableQty: '500' },
    { label: 'Basmati Rice', sku: '2345678901', type: 'loose', availableQty: '200kg' },
    { label: 'Organic Sugar', sku: '3456789012', type: 'packaged', availableQty: '150kg' },
    { label: 'Tata Salt Premium', sku: '4567890123', type: 'packaged', availableQty: '300' },
    { label: 'Fortune Wheat Atta', sku: '5678901234', type: 'loose', availableQty: '500kg' },
];

export default function AddInventoryAdjustmentModal({ open, onClose, onAddAdjustment }) {
    const [itemQuery, setItemQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedBatch, setSelectedBatch] = useState('Batch 1');
    const [adjustedQuantity, setAdjustedQuantity] = useState('1');
    const [dropdownReason, setDropdownReason] = useState('Sales return');
    const [radioReason, setRadioReason] = useState('Sales return');
    const [otherReason, setOtherReason] = useState('');
    const [showItemOptions, setShowItemOptions] = useState(false);
    const [errors, setErrors] = useState({});
    const itemDropdownRef = useRef(null);

    const { showToast } = useToast();

    useEffect(() => {
        function handleEscape(event) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        function handleClickOutside(event) {
            if (itemDropdownRef.current && !itemDropdownRef.current.contains(event.target)) {
                setShowItemOptions(false);
            }
        }

        if (open) {
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [open, onClose]);

    useEffect(() => {
        if (!open) return;
        setItemQuery('');
        setSelectedItem(null);
        setSelectedBatch('Batch 1');
        setAdjustedQuantity('1');
        setDropdownReason('Sales return');
        setRadioReason('Sales return');
        setOtherReason('');
        setShowItemOptions(false);
        setErrors({});
    }, [open]);

    const filteredItemOptions = itemOptions.filter(
        (option) =>
            option.label.toLowerCase().includes(itemQuery.toLowerCase()) ||
            option.sku.includes(itemQuery),
    );

    const inputValue = selectedItem ? selectedItem.label : itemQuery;

    const handleItemInput = (value) => {
        setItemQuery(value);
        setSelectedItem(null);
        setShowItemOptions(true);
    };

    const handleSelectExistingItem = (option) => {
        setSelectedItem(option);
        setItemQuery('');
        setShowItemOptions(false);
        setErrors((prev) => {
            const { itemQuery, ...rest } = prev;
            return rest;
        });
    };

    const handleSubmit = () => {
        const nextErrors = {};

        if (!selectedItem && !itemQuery.trim()) {
            nextErrors.itemQuery = 'Select an item or enter a search query.';
        }

        if (!adjustedQuantity.trim() || isNaN(parseInt(adjustedQuantity, 10)) || parseInt(adjustedQuantity, 10) <= 0) {
            nextErrors.adjustedQuantity = 'Adjusted quantity must be a positive number.';
        }

        let finalReason = dropdownReason;
        if (dropdownReason === 'Other') {
            if (radioReason === 'Other') {
                if (!otherReason.trim()) {
                    nextErrors.otherReason = 'Please specify the reason for adjustment.';
                } else {
                    finalReason = otherReason.trim();
                }
            } else {
                finalReason = radioReason;
            }
        }

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length === 0) {
            const name = selectedItem ? selectedItem.label : itemQuery;
            const sku = selectedItem ? selectedItem.sku : 'SKU-' + Math.floor(100000 + Math.random() * 900000);
            const formattedQty = `${adjustedQuantity} ${selectedItem && selectedItem.type === 'loose' ? 'Sacks' : 'Units'}`;

            const newAdjustment = {
                id: 'adj-' + Date.now(),
                date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                product: name,
                barcode: sku,
                batch: formatBatchNumber(selectedBatch),
                channel: 'Offline',
                qty: formattedQty,
                adjustmentQty: formattedQty,
                reason: finalReason,
                type: selectedItem ? (selectedItem.type === 'loose' ? 'Loose Item' : 'Packaged Item') : 'Packaged Item',
                status: selectedItem ? selectedItem.type : 'packaged',
            };

            if (onAddAdjustment) {
                onAddAdjustment(newAdjustment);
            }

            showToast({
                type: 'success',
                message: 'Inventory adjustment added successfully',
                duration: 4000,
            });

            onClose();
        }
    };

    if (!open) return null;

    const availableQuantityDisplay = selectedItem ? selectedItem.availableQty : '-';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6">
            <div className="w-full max-w-[800px] rounded-2xl bg-white p-6 sm:p-8 shadow-[0_28px_80px_rgba(15,23,42,0.16)] overflow-y-auto max-h-[90vh]">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-[#111827]">Inventory adjustment</h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] text-[#6B7280] transition hover:bg-[#F5F6FA] cursor-pointer"
                    >
                        <HiOutlineXMark className="h-5 w-5" />
                    </button>
                </div>

                {/* Form fields layout */}
                <div className="space-y-5">
                    {/* Row 1: Item name/SKU number & Select Batch */}
                    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                        {/* Item Name / SKU */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-sm font-medium text-[#111827]">
                                <label>Item name/SKU number</label>
                                <span className="text-[#DC2626]">*</span>
                                <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                            </div>
                            <div className="relative" ref={itemDropdownRef}>
                                <div
                                    className={`flex h-12 items-center gap-3 rounded-lg border px-4 bg-white ${
                                        errors.itemQuery ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                                    }`}
                                >
                                    <input
                                        type="text"
                                        placeholder="Search for item"
                                        value={inputValue}
                                        onChange={(event) => handleItemInput(event.target.value)}
                                        onFocus={() => setShowItemOptions(true)}
                                        className="w-full border-none bg-transparent text-sm text-[#111827] outline-none placeholder-[#9CA3AF]"
                                    />
                                    <button
                                        type="button"
                                        className="whitespace-nowrap text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] cursor-pointer"
                                    >
                                        Scan Item
                                    </button>
                                </div>
                                {errors.itemQuery && (
                                    <p className="mt-1 text-xs text-[#DC2626]">{errors.itemQuery}</p>
                                )}
                                {showItemOptions && (
                                    <div className="absolute inset-x-0 top-full z-20 mt-2 rounded-lg border border-[#E5E7EB] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
                                        {filteredItemOptions.map((option) => (
                                            <button
                                                key={option.sku}
                                                type="button"
                                                onClick={() => handleSelectExistingItem(option)}
                                                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-[#111827] transition hover:bg-[#F5F6FA] cursor-pointer"
                                            >
                                                <span>{option.label}</span>
                                                <span className="text-xs text-[#6B7280]">
                                                    SKU: {option.sku}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Select Batch */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-sm font-medium text-[#111827]">
                                <label>Select Batch</label>
                                <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                            </div>
                            <SelectDropdown
                                value={selectedBatch}
                                options={batchOptions}
                                onChange={setSelectedBatch}
                                placeholder="Batch 1"
                            />
                        </div>
                    </div>

                    {/* Row 2: Available quantity & Adjusted quantity */}
                    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                        {/* Available quantity (Read-only) */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-sm font-medium text-[#111827]">
                                <label>Available quantity</label>
                            </div>
                            <input
                                type="text"
                                value={availableQuantityDisplay}
                                disabled
                                className="h-12 w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-sm font-semibold text-[#111827] outline-none cursor-not-allowed"
                            />
                        </div>

                        {/* Adjusted quantity */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-sm font-medium text-[#111827]">
                                <label>Adjusted quantity</label>
                                <span className="text-[#DC2626]">*</span>
                                <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                            </div>
                            <input
                                type="text"
                                placeholder="1"
                                value={adjustedQuantity}
                                onChange={(e) => {
                                    setAdjustedQuantity(e.target.value);
                                    setErrors((prev) => {
                                        const { adjustedQuantity, ...rest } = prev;
                                        return rest;
                                    });
                                }}
                                className={`h-12 w-full rounded-lg border px-4 text-sm text-[#111827] outline-none placeholder-[#9CA3AF] ${
                                    errors.adjustedQuantity ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                                }`}
                            />
                            {errors.adjustedQuantity && (
                                <p className="text-xs text-[#DC2626]">{errors.adjustedQuantity}</p>
                            )}
                        </div>
                    </div>

                    {/* Row 3: Reason for adjustment Dropdown */}
                    <div className="grid gap-4 md:grid-cols-2 md:gap-6 pt-1">
                        <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-sm font-medium text-[#111827]">
                                <label>Reason for adjustment</label>
                                <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                            </div>
                            <SelectDropdown
                                value={dropdownReason}
                                options={reasonDropdownOptions}
                                onChange={(val) => {
                                    setDropdownReason(val);
                                    if (val === 'Other') {
                                        setRadioReason('Sales return');
                                    }
                                }}
                                placeholder="Select reason"
                            />
                        </div>
                    </div>

                    {/* Conditional Row 4: Radio pill cards visible ONLY when dropdownReason === 'Other' */}
                    {dropdownReason === 'Other' && (
                        <div className="space-y-3 pt-2 transition-all">
                            <div className="flex items-center gap-1.5 text-sm font-medium text-[#111827]">
                                <label>Reason for adjustment</label>
                                <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                            </div>

                            {/* Radio Cards Group */}
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                {reasonPillOptions.map((option) => {
                                    const isSelected = radioReason === option.label;
                                    return (
                                        <button
                                            key={option.id}
                                            type="button"
                                            onClick={() => {
                                                setRadioReason(option.label);
                                                setErrors((prev) => {
                                                    const { otherReason, ...rest } = prev;
                                                    return rest;
                                                });
                                            }}
                                            className={`flex h-12 items-center gap-2.5 rounded-lg border px-4 text-sm transition cursor-pointer ${
                                                isSelected
                                                    ? 'border-[#2563EB] bg-[#F8FAFF] text-[#111827] font-medium'
                                                    : 'border-[#E5E7EB] bg-white text-[#374151] hover:border-[#D1D5DB]'
                                            }`}
                                        >
                                            <span
                                                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                                                    isSelected
                                                        ? 'border-[#2563EB] bg-white'
                                                        : 'border-[#D1D5DB] bg-white'
                                                }`}
                                            >
                                                {isSelected && (
                                                    <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                                                )}
                                            </span>
                                            <span className="truncate">{option.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Sub-Conditional Input: Visible ONLY when radioReason === 'Other' */}
                            {radioReason === 'Other' && (
                                <div className="space-y-2 pt-2 transition-all">
                                    <input
                                        type="text"
                                        placeholder="Specify reason here"
                                        value={otherReason}
                                        onChange={(e) => {
                                            setOtherReason(e.target.value);
                                            setErrors((prev) => {
                                                const { otherReason, ...rest } = prev;
                                                return rest;
                                            });
                                        }}
                                        className={`h-12 w-full rounded-lg border px-5 text-sm text-[#111827] bg-[#F9FAFB] outline-none placeholder-[#9CA3AF] focus:bg-white focus:border-[#2563EB] ${
                                            errors.otherReason ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                                        }`}
                                    />
                                    {errors.otherReason && (
                                        <p className="text-xs text-[#DC2626]">{errors.otherReason}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="mt-8 flex justify-end">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex h-12 items-center justify-center rounded-lg bg-[#2563EB] px-8 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] cursor-pointer"
                    >
                        Add adjustment
                    </button>
                </div>
            </div>
        </div>
    );
}
