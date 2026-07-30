import { useEffect, useRef, useState } from 'react';
import { HiOutlineArrowUpTray, HiOutlineXMark, HiOutlineTrash } from 'react-icons/hi2';
import SelectDropdown from './SelectDropdown';
import UnitSelectDropdown from './UnitSelectDropdown';
import { useToast } from '../../context/ToastContext';
import { formatBatchNumber } from '../../utils/formatters';

const initialBatchOptions = [
    { value: 'batch1', label: 'Batch 1' },
    { value: 'batch2', label: 'Batch 2' },
    { value: 'batch3', label: 'Batch 3' },
];

const itemOptions = [
    { label: 'Haldiram Bhujiya', sku: '1234567890', type: 'packaged' },
    { label: 'Basmati Rice', sku: '2345678901', type: 'loose' },
    { label: 'Organic Sugar', sku: '3456789012', type: 'packaged' },
];

export default function EditPurchaseModal({ open, onClose, initialData, selectedBatch: externalSelectedBatch, onBatchChange, onUpdatePurchase }) {
    const [itemQuery, setItemQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [itemMode, setItemMode] = useState('search');
    const [purchaseOrder, setPurchaseOrder] = useState('');
    const [quantity, setQuantity] = useState('');
    const [fileName, setFileName] = useState('purchase_invoice.pdf');
    const [showItemOptions, setShowItemOptions] = useState(false);
    const [localBatchOptions, setLocalBatchOptions] = useState(initialBatchOptions);
    const [selectedBatch, setSelectedBatch] = useState('batch1');
    const [errors, setErrors] = useState({});
    const itemDropdownRef = useRef(null);

    // Loose item fields
    const [numberOfSacks, setNumberOfSacks] = useState(0);
    const [weightPerSack, setWeightPerSack] = useState('');
    const [weightPerSackUnit, setWeightPerSackUnit] = useState('Kg');
    const [totalWeight, setTotalWeight] = useState('');

    // Dynamic batches state
    const [batches, setBatches] = useState([]);

    const { showToast } = useToast();

    const isLooseItem = selectedItem
        ? selectedItem.type === 'loose'
        : (itemQuery.toLowerCase().includes('rice') || itemQuery.toLowerCase().includes('loose') || (initialData && (initialData.type === 'Loose Item' || initialData.status === 'loose')));

    // Autofill form fields whenever modal opens or initialData changes
    useEffect(() => {
        if (!open || !initialData) return;

        const isLoose = initialData.type === 'Loose Item' || initialData.status === 'loose' || String(initialData.product).toLowerCase().includes('rice');
        const itemObj = {
            label: initialData.product || '',
            sku: initialData.barcode || '1234567890',
            type: isLoose ? 'loose' : 'packaged'
        };

        setSelectedItem(itemObj);
        setItemQuery(initialData.product || '');
        setItemMode('existing');

        const rawPriceNum = String(initialData.price || '').replace(/[^0-9.]/g, '') || '20000';
        const rawQtyNum = String(initialData.quantity || '').replace(/[^0-9]/g, '') || '10';
        const rawWeightNum = String(initialData.weight || '').replace(/[^0-9.]/g, '') || '25';
        const weightUnit = String(initialData.weight || '').toLowerCase().includes('g') && !String(initialData.weight || '').toLowerCase().includes('kg') ? 'g' : 'Kg';

        setQuantity(rawQtyNum);
        setFileName(initialData.fileName || 'purchase_invoice.pdf');
        setSelectedBatch(initialData.batch || externalSelectedBatch || 'batch1');
        setErrors({});

        if (isLoose) {
            const sacks = parseInt(rawQtyNum, 10) || 10;
            const wPerSack = rawWeightNum || '50';
            setNumberOfSacks(sacks);
            setWeightPerSack(wPerSack);
            setWeightPerSackUnit('Kg');
            setTotalWeight((sacks * parseFloat(wPerSack)).toString());

            setBatches([
                {
                    id: Date.now(),
                    batchNo: initialData.batch || 'BT-1001',
                    quantity: sacks,
                    weightPerSack: wPerSack,
                    weightPerSackUnit: 'Kg',
                    totalWeight: `${sacks * parseFloat(wPerSack)} Kg`,
                    sellingPrice: rawPriceNum,
                    sellingPriceUnit: 'Kg'
                }
            ]);
        } else {
            setNumberOfSacks(0);
            setWeightPerSack('');
            setTotalWeight('');

            setBatches([
                {
                    id: Date.now(),
                    batchNo: initialData.batch || 'BT-1002',
                    quantity: rawQtyNum,
                    sellingPrice: rawPriceNum,
                    weight: rawWeightNum || '100',
                    weightUnit: weightUnit
                }
            ]);
        }
    }, [open, initialData, externalSelectedBatch]);

    // Dynamic calculation of total weight for loose items in top fields
    useEffect(() => {
        const qty = parseInt(numberOfSacks, 10);
        const w = parseFloat(weightPerSack);
        if (!isNaN(qty) && !isNaN(w)) {
            setTotalWeight((qty * w).toString());
        } else {
            setTotalWeight('');
        }
    }, [numberOfSacks, weightPerSack]);

    // Dynamic calculation of total weight for individual batch row
    const getBatchTotalWeight = (batch) => {
        const qty = parseInt(batch.quantity, 10);
        const w = parseFloat(batch.weightPerSack);
        if (!isNaN(qty) && !isNaN(w)) {
            return `${qty * w} ${batch.weightPerSackUnit}`;
        }
        return '--/unit';
    };

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
        if (!localBatchOptions.some((option) => option.value === selectedBatch)) {
            setLocalBatchOptions((prev) => [
                ...prev,
                { value: selectedBatch, label: selectedBatch },
            ]);
        }
    }, [selectedBatch, localBatchOptions]);

    const filteredItemOptions = itemOptions.filter(
        (option) =>
            option.label.toLowerCase().includes(itemQuery.toLowerCase()) ||
            option.sku.includes(itemQuery),
    );

    const hasMatchingItem = itemOptions.some(
        (option) =>
            option.label.toLowerCase() === itemQuery.toLowerCase() || option.sku === itemQuery,
    );

    const canCreateNewItem = itemQuery.trim().length > 0 && !hasMatchingItem;

    const inputValue = selectedItem
        ? selectedItem.label
        : itemQuery;

    const handleItemInput = (value) => {
        setItemQuery(value);
        setSelectedItem(null);
        setItemMode('search');
        setShowItemOptions(true);
    };

    const handleSelectExistingItem = (option) => {
        setSelectedItem(option);
        setItemMode('existing');
        setItemQuery('');
        setShowItemOptions(false);
        setErrors((prev) => {
            const { itemQuery, ...rest } = prev;
            return rest;
        });
    };

    const handleCreateNewItem = () => {
        const query = itemQuery.trim();
        const generatedSku = 'SKU-' + Math.floor(100000 + Math.random() * 900000);
        const isLoose = query.toLowerCase().includes('rice') || query.toLowerCase().includes('loose');

        const newItem = {
            label: query,
            sku: generatedSku,
            type: isLoose ? 'loose' : 'packaged'
        };

        setSelectedItem(newItem);
        setItemMode('existing');
        setItemQuery('');
        setShowItemOptions(false);
        setErrors((prev) => {
            const { itemQuery, ...rest } = prev;
            return rest;
        });
    };

    const handleAddBatchRow = () => {
        if (isLooseItem) {
            setBatches((prev) => [
                ...prev,
                {
                    id: Date.now() + Math.random(),
                    batchNo: '',
                    quantity: 0, // default number of sacks 0
                    weightPerSack: '',
                    weightPerSackUnit: 'Kg',
                    totalWeight: '--/unit',
                    sellingPrice: '',
                    sellingPriceUnit: 'Kg',
                },
            ]);
        } else {
            setBatches((prev) => [
                ...prev,
                {
                    id: Date.now() + Math.random(),
                    batchNo: '',
                    quantity: '', // available quantity
                    sellingPrice: '', // offline selling price
                    weight: '',
                    weightUnit: 'Kg',
                },
            ]);
        }
    };

    const handleUpdateBatchRow = (index, field, value) => {
        setBatches((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
        setErrors((prev) => {
            const nextErrors = { ...prev };
            delete nextErrors[`batch_${index}_${field}`];
            return nextErrors;
        });
    };

    const handleUpdateBatchQty = (index, delta) => {
        setBatches((prev) => {
            const updated = [...prev];
            const nextQty = Math.min(999, Math.max(0, (parseInt(updated[index].quantity, 10) || 0) + delta));
            updated[index] = { ...updated[index], quantity: nextQty };
            return updated;
        });
    };

    const handleBatchQtyChange = (index, value) => {
        const parsed = parseInt(value, 10);
        setBatches((prev) => {
            const updated = [...prev];
            updated[index] = { ...updated[index], quantity: isNaN(parsed) ? '' : Math.min(999, Math.max(0, parsed)) };
            return updated;
        });
    };

    const handleDeleteBatchRow = (index) => {
        setBatches((prev) => prev.filter((_, i) => i !== index));
        setErrors((prev) => {
            const nextErrors = { ...prev };
            Object.keys(nextErrors).forEach((key) => {
                if (key.startsWith(`batch_${index}_`)) {
                    delete nextErrors[key];
                }
            });
            return nextErrors;
        });
    };

    const handleSubmit = () => {
        const nextErrors = {};

        if (!selectedItem && !itemQuery.trim()) {
            nextErrors.itemQuery = 'Select an existing item or enter a search query.';
        }

        if (fileName === 'No file chosen') {
            nextErrors.purchaseFile = 'Upload the purchase order PDF.';
        }

        if (isLooseItem) {
            if (!numberOfSacks || isNaN(parseInt(numberOfSacks, 10)) || parseInt(numberOfSacks, 10) <= 0 || parseInt(numberOfSacks, 10) > 999) {
                nextErrors.numberOfSacks = 'Number of sacks must be between 1 and 999.';
            }
            if (!weightPerSack || isNaN(parseFloat(weightPerSack)) || parseFloat(weightPerSack) <= 0) {
                nextErrors.weightPerSack = 'Weight per carton/sack must be a positive number.';
            }
        } else {
            if (batches.length === 0) {
                if (!selectedBatch) {
                    nextErrors.selectedBatch = 'Select a batch.';
                }
                if (!quantity.trim() || isNaN(parseInt(quantity, 10)) || parseInt(quantity, 10) <= 0) {
                    nextErrors.quantity = 'Quantity must be a positive integer.';
                }
            }
        }

        if (batches.length > 0) {
            batches.forEach((batch, index) => {
                if (!batch.batchNo.trim()) {
                    nextErrors[`batch_${index}_batchNo`] = 'Batch number is required.';
                }
                if (isLooseItem) {
                    if (!batch.quantity || isNaN(parseInt(batch.quantity, 10)) || parseInt(batch.quantity, 10) <= 0 || parseInt(batch.quantity, 10) > 999) {
                        nextErrors[`batch_${index}_quantity`] = 'Number of sacks must be between 1 and 999.';
                    }
                    if (!batch.weightPerSack || isNaN(parseFloat(batch.weightPerSack)) || parseFloat(batch.weightPerSack) <= 0) {
                        nextErrors[`batch_${index}_weightPerSack`] = 'Weight per carton/sack must be a positive number.';
                    }
                    if (!batch.sellingPrice || isNaN(parseFloat(batch.sellingPrice)) || parseFloat(batch.sellingPrice) <= 0) {
                        nextErrors[`batch_${index}_sellingPrice`] = 'Selling price must be a positive number.';
                    }
                } else {
                    if (!batch.quantity || isNaN(parseInt(batch.quantity, 10)) || parseInt(batch.quantity, 10) <= 0) {
                        nextErrors[`batch_${index}_quantity`] = 'Available quantity must be a positive integer.';
                    }
                    if (!batch.sellingPrice || isNaN(parseFloat(batch.sellingPrice)) || parseFloat(batch.sellingPrice) <= 0) {
                        nextErrors[`batch_${index}_sellingPrice`] = 'Selling price must be a positive number.';
                    }
                    if (!batch.weight || isNaN(parseFloat(batch.weight)) || parseFloat(batch.weight) <= 0) {
                        nextErrors[`batch_${index}_weight`] = 'Weight must be a positive number.';
                    }
                }
            });
        }

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length === 0) {
            const name = selectedItem ? selectedItem.label : itemQuery;
            const sku = selectedItem ? selectedItem.sku : (initialData ? initialData.barcode : 'SKU-' + Math.floor(100000 + Math.random() * 900000));

            let formattedPrice = '₹20,000';
            let formattedQty = quantity;
            let rawBatch = selectedBatch;
            let formattedWeight = '-';

            if (isLooseItem) {
                formattedWeight = `${weightPerSack}${weightPerSackUnit}`;
                formattedQty = `${numberOfSacks} sacks`;
                if (batches.length > 0) {
                    const firstBatch = batches[0];
                    rawBatch = firstBatch.batchNo || selectedBatch;
                    formattedPrice = `₹${parseFloat(firstBatch.sellingPrice).toLocaleString('en-IN')}/${firstBatch.sellingPriceUnit || 'Kg'}`;
                    formattedQty = `${batches.reduce((sum, b) => sum + (parseInt(b.quantity, 10) || 0), 0)} sacks`;
                    formattedWeight = getBatchTotalWeight(firstBatch);
                }
            } else {
                if (batches.length > 0) {
                    const firstBatch = batches[0];
                    rawBatch = firstBatch.batchNo || selectedBatch;
                    formattedPrice = `₹${parseFloat(firstBatch.sellingPrice).toLocaleString('en-IN')}`;
                    formattedQty = `${batches.reduce((sum, b) => sum + (parseInt(b.quantity, 10) || 0), 0)}`;
                    formattedWeight = `${firstBatch.weight}${firstBatch.weightUnit || 'g'}`;
                } else {
                    formattedQty = quantity;
                }
            }

            const updatedPurchase = {
                ...initialData,
                product: name,
                barcode: sku,
                price: formattedPrice,
                weight: formattedWeight,
                quantity: formattedQty || '1',
                batch: formatBatchNumber(rawBatch),
                type: isLooseItem ? 'Loose Item' : 'Packaged Item',
                status: isLooseItem ? 'loose' : 'packaged',
                purchaseOrder,
                fileName,
            };

            if (onUpdatePurchase) {
                onUpdatePurchase(updatedPurchase);
            }

            showToast({
                type: 'success',
                message: 'Purchase order updated successfully',
                duration: 4000
            });

            onClose();
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6">
            <div className="w-full max-w-[1150px] rounded-2xl bg-white p-6 shadow-[0_28px_80px_rgba(15,23,42,0.16)] overflow-y-auto max-h-[90vh]">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-[#111827]">Edit purchase order</h2>
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
                <div className="space-y-4">
                    {/* First Row: Item name / Upload */}
                    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-sm font-medium text-[#111827]">
                                <label>Item name/SKU number</label>
                                <span className="text-[#DC2626]">*</span>
                                <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                            </div>
                            <div className="relative" ref={itemDropdownRef}>
                                <div
                                    className={`flex items-center gap-3 rounded-lg border px-4 py-3 bg-white ${errors.itemQuery ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                                        }`}
                                >
                                    <input
                                        type="text"
                                        placeholder="Enter item name or SKU"
                                        value={inputValue}
                                        onChange={(event) => handleItemInput(event.target.value)}
                                        onFocus={() => setShowItemOptions(true)}
                                        className="w-full border-none bg-transparent text-sm text-[#111827] outline-none"
                                    />
                                    <button
                                        type="button"
                                        className="whitespace-nowrap text-sm font-semibold text-[#2563EB] cursor-pointer"
                                    >
                                        Scan Item
                                    </button>
                                </div>
                                {errors.itemQuery && (
                                    <p className="mt-2 text-sm text-[#DC2626]">{errors.itemQuery}</p>
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
                                        {canCreateNewItem && (
                                            <button
                                                type="button"
                                                onClick={handleCreateNewItem}
                                                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-[#2563EB] font-semibold transition hover:bg-[#EFF6FF] cursor-pointer"
                                            >
                                                <span>Create new item "{itemQuery.trim()}"</span>
                                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#EFF6FF] text-[#2563EB]">
                                                    +
                                                </span>
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-sm font-medium text-[#111827]">
                                <label>Upload Purchase order</label>
                                <span className="text-[#DC2626]">*</span>
                            </div>
                            <label
                                htmlFor="edit-purchase-file"
                                className={`flex h-12 items-center gap-3 rounded-lg border px-4 text-sm cursor-pointer ${errors.purchaseFile
                                        ? 'border-[#DC2626] bg-[#FEF2F2] text-[#991B1B]'
                                        : 'border-[#E5E7EB] bg-[#F8FAFF] text-[#6B7280]'
                                    }`}
                            >
                                <HiOutlineArrowUpTray className="h-5 w-5 text-[#374151]" />
                                <span>{fileName}</span>
                            </label>
                            <input
                                id="edit-purchase-file"
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                onChange={(event) => {
                                    const file = event.target.files?.[0];
                                    setFileName(file ? file.name : 'No file chosen');
                                    setErrors((prev) => {
                                        const { purchaseFile, ...rest } = prev;
                                        return rest;
                                    });
                                }}
                            />
                            <p className="text-xs text-[#6B7280]">PDF (MAX. 200mb).</p>
                            {errors.purchaseFile && (
                                <p className="text-sm text-[#DC2626]">{errors.purchaseFile}</p>
                            )}
                        </div>
                    </div>

                    {/* Loose Item dynamic fields */}
                    {isLooseItem && (
                        <>
                            <div className="grid gap-4 md:grid-cols-3 md:gap-6 pt-2">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-1.5 text-sm font-medium text-[#111827]">
                                        <label>Number of sacks</label>
                                        <span className="text-[#DC2626]">*</span>
                                        <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                                    </div>
                                    <div className="flex h-11 items-center justify-between rounded-lg border border-[#E5E7EB] bg-white overflow-hidden max-w-[150px]">
                                        <button
                                            type="button"
                                            onClick={() => setNumberOfSacks((prev) => Math.max(0, prev - 1))}
                                            className="flex h-full w-12 items-center justify-center bg-[#F3F4F6] text-[#4B5563] font-bold border-r border-[#E5E7EB] transition hover:bg-[#E5E7EB] cursor-pointer"
                                        >
                                            —
                                        </button>
                                        <input
                                            type="text"
                                            value={numberOfSacks}
                                            onChange={(e) => {
                                                const val = parseInt(e.target.value, 10);
                                                setNumberOfSacks(isNaN(val) ? '' : Math.min(999, Math.max(0, val)));
                                            }}
                                            className="w-12 text-center text-sm font-semibold text-[#111827] outline-none border-none bg-transparent"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setNumberOfSacks((prev) => Math.min(999, prev + 1))}
                                            className="flex h-full w-12 items-center justify-center bg-[#F3F4F6] text-[#2563EB] font-bold border-l border-[#E5E7EB] transition hover:bg-[#E5E7EB] cursor-pointer"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-[#9CA3AF] mt-0.5">Max 999</p>
                                    {errors.numberOfSacks && (
                                        <p className="text-sm text-[#DC2626]">{errors.numberOfSacks}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-1.5 text-sm font-medium text-[#111827]">
                                        <label>Weight per carton/sack</label>
                                        <span className="text-[#DC2626]">*</span>
                                        <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                                    </div>
                                    <div className={`flex h-11 items-center rounded-lg border bg-white pl-4 pr-2 gap-2 ${errors.weightPerSack ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                                        }`}>
                                        <input
                                            type="text"
                                            placeholder="Enter weight"
                                            value={weightPerSack}
                                            onChange={(e) => {
                                                setWeightPerSack(e.target.value);
                                                setErrors(prev => {
                                                    const { weightPerSack, ...rest } = prev;
                                                    return rest;
                                                });
                                            }}
                                            className="w-full border-none bg-transparent text-sm text-[#111827] outline-none placeholder-[#9CA3AF]"
                                        />
                                        <UnitSelectDropdown
                                            value={weightPerSackUnit}
                                            onChange={(val) => setWeightPerSackUnit(val)}
                                        />
                                    </div>
                                    {errors.weightPerSack && (
                                        <p className="text-sm text-[#DC2626]">{errors.weightPerSack}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-1.5 text-sm font-medium text-[#111827]">
                                        <label>Total weight</label>
                                        <span className="text-[#DC2626]">*</span>
                                        <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Enter weight"
                                        value={totalWeight ? `${totalWeight} ${weightPerSackUnit}` : ''}
                                        className="h-11 w-full rounded-lg border border-[#E5E7EB] px-4 text-sm text-[#111827] bg-[#F9FAFB] outline-none cursor-not-allowed"
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2 md:gap-6 pt-2">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-1.5 text-sm font-medium text-[#111827]">
                                        <label>Select Batch</label>
                                        <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                                    </div>
                                    <SelectDropdown
                                        value={selectedBatch}
                                        options={localBatchOptions}
                                        onChange={onBatchChange}
                                        placeholder="Placeholder text"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Packaged Item dynamic fields */}
                    {!isLooseItem && (
                        <div className="grid gap-4 md:grid-cols-2 md:gap-6 pt-2">
                            <div className="space-y-2">
                                <div className="flex items-center gap-1.5 text-sm font-medium text-[#111827]">
                                    <label>Select Batch</label>
                                    <span className="text-[#DC2626]">*</span>
                                    <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                                </div>
                                <SelectDropdown
                                    value={selectedBatch}
                                    options={localBatchOptions}
                                    onChange={onBatchChange}
                                    placeholder="Placeholder text"
                                />
                                {errors.selectedBatch && (
                                    <p className="text-sm text-[#DC2626]">{errors.selectedBatch}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-1.5 text-sm font-medium text-[#111827]">
                                    <label>Incoming quantity</label>
                                    <span className="text-[#DC2626]">*</span>
                                    <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter quantity"
                                    value={quantity}
                                    onChange={(event) => {
                                        setQuantity(event.target.value);
                                        setErrors((prev) => {
                                            const { quantity, ...rest } = prev;
                                            return rest;
                                        });
                                    }}
                                    className={`h-11 w-full rounded-lg border px-4 text-sm text-[#111827] outline-none ${errors.quantity ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                                        }`}
                                />
                                {errors.quantity && (
                                    <p className="text-sm text-[#DC2626]">{errors.quantity}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Add dynamic batches button */}
                <div className="mt-6 flex justify-start">
                    <button
                        type="button"
                        onClick={handleAddBatchRow}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition cursor-pointer"
                    >
                        <span className="text-lg font-bold">+</span> Add another batch
                    </button>
                </div>

                {/* Dynamic Batches Table */}
                {batches.length > 0 && (
                    <div className="mt-5 border-t border-[#E5E7EB] pt-5">
                        <div className="space-y-3">
                            {/* Header row */}
                            <div className={`grid ${isLooseItem
                                    ? 'grid-cols-[1fr_1.25fr_1.9fr_1.35fr_2.1fr_auto]'
                                    : 'grid-cols-[1.5fr_1.5fr_2fr_2.2fr_auto]'
                                } gap-3 text-xs font-semibold text-[#374151]`}>
                                <div className="flex items-center gap-1">
                                    <span>Batch no.</span>
                                    <span className="text-[#DC2626]">*</span>
                                    <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                                </div>
                                {isLooseItem ? (
                                    <>
                                        <div className="flex items-center gap-1">
                                            <span>Number of sacks</span>
                                            <span className="text-[#DC2626]">*</span>
                                            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>Weight per carton/sack</span>
                                            <span className="text-[#DC2626]">*</span>
                                            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>Total weight</span>
                                            <span className="text-[#DC2626]">*</span>
                                            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>Selling price/per unit</span>
                                            <span className="text-[#DC2626]">*</span>
                                            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-1">
                                            <span>Available quantity</span>
                                            <span className="text-[#DC2626]">*</span>
                                            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>Offline selling price</span>
                                            <span className="text-[#DC2626]">*</span>
                                            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>Weight</span>
                                            <span className="text-[#DC2626]">*</span>
                                            <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-slate-100 text-[9px] text-[#6B7280] border border-[#D1D5DB] cursor-help">?</span>
                                        </div>
                                    </>
                                )}
                                <div className="w-[104px] shrink-0"></div>
                            </div>

                            {/* Batch rows */}
                            <div className="space-y-4">
                                {batches.map((batch, index) => (
                                    <div
                                        key={batch.id}
                                        className={`grid ${isLooseItem
                                                ? 'grid-cols-[1fr_1.25fr_1.9fr_1.35fr_2.1fr_auto]'
                                                : 'grid-cols-[1.5fr_1.5fr_2fr_2.2fr_auto]'
                                            } gap-3 items-start`}
                                    >
                                        {/* Batch no. */}
                                        <div className="space-y-1">
                                            <input
                                                type="text"
                                                placeholder="Batch No"
                                                value={batch.batchNo}
                                                onChange={(e) => handleUpdateBatchRow(index, 'batchNo', e.target.value)}
                                                className={`h-11 w-full rounded-lg border px-4 text-sm text-[#111827] bg-white outline-none ${errors[`batch_${index}_batchNo`] ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                                                    }`}
                                            />
                                            {errors[`batch_${index}_batchNo`] && (
                                                <p className="text-xs text-[#DC2626]">{errors[`batch_${index}_batchNo`]}</p>
                                            )}
                                        </div>

                                        {isLooseItem ? (
                                            <>
                                                {/* Number of sacks (Loose only) */}
                                                <div className="space-y-1">
                                                    <div className={`flex h-11 items-center justify-between rounded-lg border bg-white overflow-hidden ${errors[`batch_${index}_quantity`] ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                                                        }`}>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleUpdateBatchQty(index, -1)}
                                                            className="flex h-full w-12 items-center justify-center bg-[#F8FAFC] text-[#4B5563] font-bold border-r border-[#E5E7EB] transition hover:bg-[#F1F5F9] cursor-pointer"
                                                        >
                                                            —
                                                        </button>
                                                        <input
                                                            type="text"
                                                            value={batch.quantity}
                                                            onChange={(e) => handleBatchQtyChange(index, e.target.value)}
                                                            className="w-12 text-center text-sm font-semibold text-[#111827] outline-none border-none bg-transparent"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleUpdateBatchQty(index, 1)}
                                                            className="flex h-full w-12 items-center justify-center bg-[#F8FAFC] text-[#2563EB] font-bold border-l border-[#E5E7EB] transition hover:bg-[#F1F5F9] cursor-pointer"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    {errors[`batch_${index}_quantity`] && (
                                                        <p className="text-xs text-[#DC2626]">{errors[`batch_${index}_quantity`]}</p>
                                                    )}
                                                </div>

                                                {/* Weight per carton/sack (Loose only) */}
                                                <div className="space-y-1">
                                                    <div className={`flex h-11 items-center rounded-lg border bg-white pl-4 pr-2 gap-2 ${errors[`batch_${index}_weightPerSack`] ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                                                        }`}>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter weight"
                                                            value={batch.weightPerSack}
                                                            onChange={(e) => handleUpdateBatchRow(index, 'weightPerSack', e.target.value)}
                                                            className="w-full border-none bg-transparent text-sm text-[#111827] outline-none placeholder-[#9CA3AF]"
                                                        />
                                                        <UnitSelectDropdown
                                                            value={batch.weightPerSackUnit}
                                                            onChange={(val) => handleUpdateBatchRow(index, 'weightPerSackUnit', val)}
                                                        />
                                                    </div>
                                                    {errors[`batch_${index}_weightPerSack`] && (
                                                        <p className="text-xs text-[#DC2626]">{errors[`batch_${index}_weightPerSack`]}</p>
                                                    )}
                                                </div>

                                                {/* Total weight (disabled) */}
                                                <div className="space-y-1">
                                                    <div className="flex h-11 items-center rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 text-sm text-[#374151] font-semibold cursor-not-allowed">
                                                        {getBatchTotalWeight(batch)}
                                                    </div>
                                                </div>

                                                {/* Selling price/per unit (Loose only) */}
                                                <div className="space-y-1">
                                                    <div className={`flex h-11 items-center rounded-lg border bg-white pl-4 pr-2 gap-2 ${errors[`batch_${index}_sellingPrice`] ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                                                        }`}>
                                                        <span className="text-sm text-[#9CA3AF] font-medium">₹</span>
                                                        <input
                                                            type="text"
                                                            placeholder="Placeholder text"
                                                            value={batch.sellingPrice}
                                                            onChange={(e) => handleUpdateBatchRow(index, 'sellingPrice', e.target.value)}
                                                            className="w-full border-none bg-transparent text-sm text-[#111827] outline-none placeholder-[#9CA3AF]"
                                                        />
                                                        <UnitSelectDropdown
                                                            value={batch.sellingPriceUnit}
                                                            onChange={(val) => handleUpdateBatchRow(index, 'sellingPriceUnit', val)}
                                                        />
                                                    </div>
                                                    {errors[`batch_${index}_sellingPrice`] && (
                                                        <p className="text-xs text-[#DC2626]">{errors[`batch_${index}_sellingPrice`]}</p>
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                {/* Available quantity (Packaged only) */}
                                                <div className="space-y-1">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter quantity"
                                                        value={batch.quantity}
                                                        onChange={(e) => handleUpdateBatchRow(index, 'quantity', e.target.value)}
                                                        className={`h-11 w-full rounded-lg border px-4 text-sm text-[#111827] bg-white outline-none ${errors[`batch_${index}_quantity`] ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                                                            }`}
                                                    />
                                                    {errors[`batch_${index}_quantity`] && (
                                                        <p className="text-xs text-[#DC2626]">{errors[`batch_${index}_quantity`]}</p>
                                                    )}
                                                </div>

                                                {/* Offline selling price (Packaged only) */}
                                                <div className="space-y-1">
                                                    <div className={`flex h-11 items-center rounded-lg border bg-white overflow-hidden ${errors[`batch_${index}_sellingPrice`] ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                                                        }`}>
                                                        <span className="flex h-full w-10 items-center justify-center bg-[#F8FAFC] text-sm text-[#6B7280] font-medium border-r border-[#E5E7EB]">
                                                            ₹
                                                        </span>
                                                        <input
                                                            type="text"
                                                            placeholder="Placeholder text"
                                                            value={batch.sellingPrice}
                                                            onChange={(e) => handleUpdateBatchRow(index, 'sellingPrice', e.target.value)}
                                                            className="w-full border-none bg-transparent px-3 text-sm text-[#111827] outline-none placeholder-[#9CA3AF]"
                                                        />
                                                    </div>
                                                    {errors[`batch_${index}_sellingPrice`] && (
                                                        <p className="text-xs text-[#DC2626]">{errors[`batch_${index}_sellingPrice`]}</p>
                                                    )}
                                                </div>

                                                {/* Weight (Packaged only) */}
                                                <div className="space-y-1">
                                                    <div className={`flex h-11 items-center rounded-lg border bg-white pl-4 pr-2 gap-2 ${errors[`batch_${index}_weight`] ? 'border-[#DC2626]' : 'border-[#E5E7EB]'
                                                        }`}>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter weight"
                                                            value={batch.weight}
                                                            onChange={(e) => handleUpdateBatchRow(index, 'weight', e.target.value)}
                                                            className="w-full border-none bg-transparent text-sm text-[#111827] outline-none placeholder-[#9CA3AF]"
                                                        />
                                                        <UnitSelectDropdown
                                                            value={batch.weightUnit}
                                                            onChange={(val) => handleUpdateBatchRow(index, 'weightUnit', val)}
                                                        />
                                                    </div>
                                                    {errors[`batch_${index}_weight`] && (
                                                        <p className="text-xs text-[#DC2626]">{errors[`batch_${index}_weight`]}</p>
                                                    )}
                                                </div>
                                            </>
                                        )}

                                        {/* Delete button */}
                                        <div className="flex h-11 items-center justify-center">
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteBatchRow(index)}
                                                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#C80036] px-5 text-sm font-semibold text-white transition hover:bg-[#A0002B] cursor-pointer whitespace-nowrap"
                                            >
                                                <HiOutlineTrash className="h-4 w-4" />
                                                <span>Delete</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer Buttons */}
                <div className="mt-6 flex justify-end">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="inline-flex h-12 items-center justify-center rounded-lg bg-[#2563EB] px-6 text-sm font-semibold text-white transition hover:bg-[#1D4ED8] cursor-pointer"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
