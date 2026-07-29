import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';

export default function TableControlBar({
    searchQuery,
    onSearchChange,
    placeholder = 'Search Items, UPC number',
    buttonLabel = '+ Add new purchase',
    onButtonClick,
}) {
    return (
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full max-w-[520px]">
                <form 
                    onSubmit={(e) => e.preventDefault()}
                    className="relative flex items-center"
                >
                    <input
                        type="search"
                        placeholder={placeholder}
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="h-11 w-full rounded-r-full rounded-l-none border border-[#E5E7EB] border-r-0 bg-white px-5 pr-28 text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#2563EB]"
                    />
                    <button 
                        type="submit"
                        className="absolute right-0 top-1/2 -translate-y-1/2 inline-flex h-11 items-center rounded-r-xl rounded-l-none bg-[#1A56DB] px-4 text-sm font-semibold text-white shadow-none transition hover:bg-[#1D4ED8] cursor-pointer"
                    >
                        <HiOutlineMagnifyingGlass className="mr-2 h-4 w-4" />
                        Search
                    </button>
                </form>
            </div>

            <button
                type="button"
                onClick={onButtonClick}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-[#D1D5DB] bg-white px-5 text-sm font-semibold text-[#6B7280] transition hover:bg-[#F9FAFB] cursor-pointer"
            >
                {buttonLabel}
            </button>
        </div>
    );
}
