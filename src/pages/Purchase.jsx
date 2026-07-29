import { useState } from 'react';
import BreadcrumbHeader from '../components/common/BreadcrumbHeader';
import TableControlBar from '../components/common/TableControlBar';
import { PurchaseTable } from '../components/PurchaseTable';
import AddPurchaseModal from '../components/modal/AddPurchaseModal';
import { purchaseRows } from '../data/purchaseMockData';

export default function Purchase() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBatch, setSelectedBatch] = useState('batch1');
    const [rows, setRows] = useState(purchaseRows);
    const [searchQuery, setSearchQuery] = useState('');

    const handleAddPurchase = (newPurchase) => {
        setRows((prev) => [newPurchase, ...prev]);
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

                    <PurchaseTable rows={filteredRows} />
                </div>
            </section>

            <AddPurchaseModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                selectedBatch={selectedBatch}
                onBatchChange={setSelectedBatch}
                onAddPurchase={handleAddPurchase}
            />
        </div>
    );
}
