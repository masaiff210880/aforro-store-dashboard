import { useState } from 'react';
import BreadcrumbHeader from '../components/common/BreadcrumbHeader';
import TableControlBar from '../components/common/TableControlBar';
import { InventoryAdjustmentTable } from '../components/InventoryAdjustmentTable';
import AddInventoryAdjustmentModal from '../components/modal/AddInventoryAdjustmentModal';
import { inventoryAdjustmentRows } from '../data/inventoryAdjustmentMockData';

export default function InventoryAdjustment() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rows, setRows] = useState(inventoryAdjustmentRows);
    const [searchQuery, setSearchQuery] = useState('');

    const handleAddAdjustment = (newAdjustment) => {
        setRows((prev) => [newAdjustment, ...prev]);
    };

    const filteredRows = rows.filter((row) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase().trim();
        return (
            (row.product && row.product.toLowerCase().includes(q)) ||
            (row.barcode && row.barcode.toLowerCase().includes(q)) ||
            (row.batch && row.batch.toLowerCase().includes(q)) ||
            (row.reason && row.reason.toLowerCase().includes(q)) ||
            (row.channel && row.channel.toLowerCase().includes(q)) ||
            (row.qty && row.qty.toLowerCase().includes(q)) ||
            (row.adjustmentQty && row.adjustmentQty.toLowerCase().includes(q))
        );
    });

    return (
        <div className="w-full h-full">
            <section className="bg-white">
                <BreadcrumbHeader title="Inventory adjustment" />

                <div className="py-4">
                    <div className="px-5 sm:px-6">
                        <TableControlBar
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            placeholder="Search Items, UPC number"
                            buttonLabel="+ Add new adjustment"
                            onButtonClick={() => setIsModalOpen(true)}
                        />
                    </div>

                    <InventoryAdjustmentTable rows={filteredRows} />
                </div>
            </section>

            <AddInventoryAdjustmentModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddAdjustment={handleAddAdjustment}
            />
        </div>
    );
}
