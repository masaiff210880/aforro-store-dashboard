import { useState } from 'react';
import BreadcrumbHeader from '../components/common/BreadcrumbHeader';
import TableControlBar from '../components/common/TableControlBar';
import { InventoryAdjustmentTable } from '../components/InventoryAdjustmentTable';
import AddInventoryAdjustmentModal from '../components/modal/AddInventoryAdjustmentModal';
import EditInventoryAdjustmentModal from '../components/modal/EditInventoryAdjustmentModal';
import DeleteConfirmModal from '../components/modal/DeleteConfirmModal';
import { inventoryAdjustmentRows } from '../data/inventoryAdjustmentMockData';
import { useToast } from '../context/ToastContext';

export default function InventoryAdjustment() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAdjustment, setEditingAdjustment] = useState(null);
    const [deletingAdjustment, setDeletingAdjustment] = useState(null);
    const [rows, setRows] = useState(inventoryAdjustmentRows);
    const [searchQuery, setSearchQuery] = useState('');

    const { showToast } = useToast();

    const handleAddAdjustment = (newAdjustment) => {
        setRows((prev) => [newAdjustment, ...prev]);
    };

    const handleUpdateAdjustment = (updatedAdjustment) => {
        setRows((prev) =>
            prev.map((item) => (item.id === updatedAdjustment.id ? updatedAdjustment : item))
        );
        setEditingAdjustment(null);
    };

    const handleConfirmDelete = () => {
        if (!deletingAdjustment) return;
        const targetId = deletingAdjustment.id;
        const targetName = deletingAdjustment.product;

        setRows((prev) => prev.filter((item) => item.id !== targetId));
        setDeletingAdjustment(null);

        showToast({
            type: 'success',
            message: `Inventory adjustment for "${targetName}" deleted successfully`,
            duration: 4000,
        });
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

                    <InventoryAdjustmentTable
                        rows={filteredRows}
                        onEdit={(row) => setEditingAdjustment(row)}
                        onDelete={(row) => setDeletingAdjustment(row)}
                    />
                </div>
            </section>

            {/* Add Adjustment Modal */}
            <AddInventoryAdjustmentModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddAdjustment={handleAddAdjustment}
            />

            {/* Edit Adjustment Modal */}
            <EditInventoryAdjustmentModal
                open={Boolean(editingAdjustment)}
                onClose={() => setEditingAdjustment(null)}
                initialData={editingAdjustment}
                onUpdateAdjustment={handleUpdateAdjustment}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                open={Boolean(deletingAdjustment)}
                onClose={() => setDeletingAdjustment(null)}
                onConfirm={handleConfirmDelete}
                title="Are you sure you want to delete this adjustment?"
                itemName={deletingAdjustment?.product}
            />
        </div>
    );
}
