import SearchInput from '../common/SearchInput'
import TableFilter from '../common/TableFilter'

const SORT_OPTIONS = [
  { value: 'az', label: 'Name (A–Z)' },
  { value: 'za', label: 'Name (Z–A)' },
]

export default function UserTableHeader({
  search,
  onSearchChange,
  cityFilter,
  cityOptions,
  onCityFilterChange,
  sortOrder,
  onSortOrderChange,
  totalCount,
  filteredCount,
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-[#F0F0F0] px-4 py-4 sm:px-6 sm:py-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-[#202224] sm:text-lg">All Users</h3>
          <p className="mt-0.5 text-xs text-[#8B8D97] sm:text-sm">
            Showing {filteredCount} of {totalCount} users
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={search}
          onChange={onSearchChange}
          placeholder="Search users..."
          className="w-full sm:w-[220px]"
        />
        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <TableFilter
            label="Sort"
            value={sortOrder}
            options={SORT_OPTIONS}
            onChange={onSortOrderChange}
          />
          <TableFilter
            label="City"
            value={cityFilter}
            options={cityOptions}
            onChange={onCityFilterChange}
          />
        </div>
      </div>
    </div>
  )
}
