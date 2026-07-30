import { useEffect } from 'react';
import { HiOutlineExclamationTriangle, HiOutlineXMark } from 'react-icons/hi2';

export default function DeleteConfirmModal({ open, onClose, onConfirm, title, message, itemName }) {
    useEffect(() => {
        function handleEscape(event) {
            if (event.key === 'Escape') {
                onClose();
            }
        }
        if (open) {
            document.addEventListener('keydown', handleEscape);
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl transition-all">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition cursor-pointer"
                >
                    <HiOutlineXMark className="h-5 w-5" />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                        <HiOutlineExclamationTriangle className="h-7 w-7" />
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900">
                        {title || 'Are you sure you want to delete this?'}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                        {message || (itemName ? `Are you sure you want to delete "${itemName}"? This action cannot be undone.` : 'This action cannot be undone.')}
                    </p>

                    <div className="mt-6 flex w-full gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 transition cursor-pointer"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
