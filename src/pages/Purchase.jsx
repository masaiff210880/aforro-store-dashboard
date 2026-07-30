import { useState } from 'react';
import BreadcrumbHeader from '../components/common/BreadcrumbHeader';
import TableControlBar from '../components/common/TableControlBar';
import { PurchaseTable } from '../components/PurchaseTable';
import AddPurchaseModal from '../components/modal/AddPurchaseModal';
import EditPurchaseModal from '../components/modal/EditPurchaseModal';
import DeleteConfirmModal from '../components/modal/DeleteConfirmModal';
import { purchaseRows } from '../data/purchaseMockData';
import { useToast } from '../context/ToastContext';

export default function Purchase() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPurchase, setEditingPurchase] = useState(null);
    const [deletingPurchase, setDeletingPurchase] = useState(null);
    const [selectedBatch, setSelectedBatch] = useState('batch1');
    const [rows, setRows] = useState(purchaseRows);
    const [searchQuery, setSearchQuery] = useState('');

    const { showToast } = useToast();

    const handleAddPurchase = (newPurchase) => {
        setRows((prev) => [newPurchase, ...prev]);
    };

    const handleUpdatePurchase = (updatedPurchase) => {
        setRows((prev) =>
            prev.map((item) => (item.id === updatedPurchase.id ? updatedPurchase : item))
        );
        setEditingPurchase(null);
    };

    const handleConfirmDelete = () => {
        if (!deletingPurchase) return;
        const targetId = deletingPurchase.id;
        const targetName = deletingPurchase.product;

        setRows((prev) => prev.filter((item) => item.id !== targetId));
        setDeletingPurchase(null);

        showToast({
            type: 'success',
            message: `Purchase "${targetName}" removed successfully`,
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
            (row.price && row.price.toLowerCase().includes(q)) ||
            (row.quantity && row.quantity.toLowerCase().includes(q)) ||
            (row.weight && row.weight.toLowerCase().includes(q)) ||
            (row.type && row.type.toLowerCase().includes(q))
        );
    });

    return (
        <div className="w-full h-full">
            <section className="bg-white">
                <BreadcrumbHeader title="Purchase" />

                <div className="py-4">
                    <div className="px-5 sm:px-6">
                        <TableControlBar
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            placeholder="Search Items, UPC number"
                            buttonLabel="+ Add new purchase"
                            onButtonClick={() => setIsModalOpen(true)}
                        />
                    </div>

                    <PurchaseTable
                        rows={filteredRows}
                        onEdit={(row) => setEditingPurchase(row)}
                        onDelete={(row) => setDeletingPurchase(row)}
                    />
                </div>
            </section>

            {/* Add Purchase Modal */}
            <AddPurchaseModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedBatch={selectedBatch}
                onBatchChange={setSelectedBatch}
                onAddPurchase={handleAddPurchase}
            />

            {/* Edit Purchase Modal */}
            <EditPurchaseModal
                open={Boolean(editingPurchase)}
                onClose={() => setEditingPurchase(null)}
                initialData={editingPurchase}
                selectedBatch={selectedBatch}
                onBatchChange={setSelectedBatch}
                onUpdatePurchase={handleUpdatePurchase}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                open={Boolean(deletingPurchase)}
                onClose={() => setDeletingPurchase(null)}
                onConfirm={handleConfirmDelete}
                title="Are you sure you want to delete this purchase?"
                itemName={deletingPurchase?.product}
            />
        </div>
    );
}
