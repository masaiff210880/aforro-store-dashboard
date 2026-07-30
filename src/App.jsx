import { Navigate, Route, Routes } from 'react-router';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';
import CreditNotes from './pages/CreditNotes';
import Dashboard from './pages/Dashboard';
import Discrepancies from './pages/Discrepancies';
import InventoryAdjustment from './pages/InventoryAdjustment';
import InventoryDetails from './pages/InventoryDetails';
import Login from './pages/Login';
import MyInventory from './pages/MyInventory';
import NotFound from './pages/NotFound';
import OfflineCreditNotes from './pages/OfflineCreditNotes';
import OnlineOrders from './pages/OnlineOrders';
import OrderHistory from './pages/OrderHistory';
import POSBilling from './pages/POSBilling';
import Purchase from './pages/Purchase';
import PurchaseDetails from './pages/PurchaseDetails';
import ReturnPage from './pages/ReturnPage';
import ReturnReplacement from './pages/ReturnReplacement';
import Settings from './pages/Settings';
import SettlementPayout from './pages/SettlementPayout';
import TransactionHistory from './pages/TransactionHistory';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/inventory/purchase" replace />} />

            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/inventory/my-inventory" element={<MyInventory />} />
                <Route path="/inventory/purchase" element={<Purchase />} />
                <Route path="/inventory/purchase/:id" element={<PurchaseDetails />} />
                <Route path="/inventory/inventory-adjustment" element={<InventoryAdjustment />} />
                <Route path="/inventory/inventory-adjustment/:id" element={<InventoryDetails />} />
                <Route path="/online-orders" element={<OnlineOrders />} />
                <Route path="/settlement-payout" element={<SettlementPayout />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/credit-notes" element={<CreditNotes />} />
                <Route path="/return-replacement" element={<ReturnReplacement />} />
                <Route path="/pos-billing" element={<POSBilling />} />
                <Route path="/transaction-history" element={<TransactionHistory />} />
                <Route path="/offline-credit-notes" element={<OfflineCreditNotes />} />
                <Route path="/return" element={<ReturnPage />} />
                <Route path="/discrepancies" element={<Discrepancies />} />
                <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
