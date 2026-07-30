import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

export default function TableControlBar({
    searchQuery,
    onSearchChange,
    placeholder = 'Search items, UPC number',
    buttonLabel = '+ Add new purchase',
    onButtonClick,
}) {
    return (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:max-w-[480px]">
                <form 
                    onSubmit={(e) => e.preventDefault()}
                    className="relative flex items-center"
                >
                    <input
                        type="search"
                        placeholder={placeholder}
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="h-10 sm:h-11 w-full rounded-l-xl border border-[#E5E7EB] border-r-0 bg-white px-4 sm:px-5 pr-28 text-xs sm:text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#1A56DB]"
                    />
                    <button 
                        type="submit"
                        className="absolute right-0 top-1/2 -translate-y-1/2 inline-flex h-10 sm:h-11 items-center rounded-r-xl bg-[#1A56DB] px-4 sm:px-5 text-xs sm:text-sm font-semibold text-white shadow-none transition hover:bg-[#1D4ED8] cursor-pointer"
                    >
                        <HiOutlineMagnifyingGlass className="mr-1.5 sm:mr-2 h-4 w-4" />
                        Search
                    </button>
                </form>
            </div>

            <button
                type="button"
                onClick={onButtonClick}
                className="w-full sm:w-auto inline-flex h-10 sm:h-11 items-center justify-center rounded-xl border border-[#D1D5DB] bg-white px-5 text-xs sm:text-sm font-semibold text-[#374151] transition hover:bg-[#F9FAFB] cursor-pointer shadow-xs"
            >
                {buttonLabel}
            </button>
        </div>
    );
}

