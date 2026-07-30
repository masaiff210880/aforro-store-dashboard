import { HiOutlineCube, HiOutlineShoppingBag } from 'react-icons/hi2';

export default function StatusBadge({ status, type }) {
    const isPackaged = status === 'packaged' || (type && type.toLowerCase().includes('packaged'));
    const classes = isPackaged
        ? 'border border-[#E17100] text-[#E17100] bg-transparent'
        : 'border border-[#615FFF] text-[#615FFF] bg-transparent';
    const label = type || (isPackaged ? 'Packaged Item' : 'Loose Item');

    return (
        <span
            className={`inline-flex h-8 items-center gap-2 whitespace-nowrap rounded-lg px-3.5 text-xs font-semibold ${classes}`}
        >
            {isPackaged ? (
                <HiOutlineShoppingBag className="h-4 w-4 shrink-0" />
            ) : (
                <HiOutlineCube className="h-4 w-4 shrink-0" />
            )}
            <span className="whitespace-nowrap">{label}</span>
        </span>
    );
}


