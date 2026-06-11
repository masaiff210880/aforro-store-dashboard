import { useMemo, useState } from 'react'
import UserTableHeader from './UserTableHeader'
import { useGetUsersQuery } from '../../redux-toolkit/service'
import { useDebounce } from '../../hooks/useDebounce'
import LoadingSpinner from '../common/LoadingSpinner'
import ErrorMessage from '../common/ErrorMessage'

const COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'companyName', label: 'Company Name' },
  { key: 'city', label: 'City' },
]

const AVATAR_COLORS = [
  'from-[#4880FF] to-[#6B9AFF]',
  'from-[#00B69B] to-[#34D399]',
  'from-[#FF947A] to-[#FB7185]',
  'from-[#8B5CF6] to-[#A78BFA]',
  'from-[#F59E0B] to-[#FBBF24]',
]

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function mapApiUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    companyName: user.company?.name ?? '',
    city: user.address?.city ?? '',
  }
}

function UserAvatar({ name, index }) {
  const colorClass = AVATAR_COLORS[index % AVATAR_COLORS.length]

  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${colorClass} text-xs font-semibold text-white`}
    >
      {getInitials(name)}
    </div>
  )
}

export default function UserTable() {
  const [search, setSearch] = useState('')
  const [cityFilter, setCityFilter] = useState('all')
  const [sortOrder, setSortOrder] = useState('az')
  const debouncedSearch = useDebounce(search, 300)

  const searchQuery = debouncedSearch.trim()
  const { data, isLoading, isFetching, error } = useGetUsersQuery({
    q: searchQuery || undefined,
  })

  const users = useMemo(() => (data ?? []).map(mapApiUser), [data])

  const cityOptions = useMemo(() => {
    const cities = [...new Set(users.map((user) => user.city).filter(Boolean))].sort()

    return [
      { value: 'all', label: 'All Cities' },
      ...cities.map((city) => ({ value: city, label: city })),
    ]
  }, [users])

  const displayUsers = useMemo(() => {
    const filtered =
      cityFilter === 'all' ? users : users.filter((user) => user.city === cityFilter)

    return [...filtered].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
      return sortOrder === 'za' ? -comparison : comparison
    })
  }, [users, cityFilter, sortOrder])

  const showSpinner = isLoading || isFetching
  const showError = Boolean(error) && !showSpinner

  return (
    <div className="overflow-hidden rounded-[14px] bg-white shadow-[0_4px_20px_rgba(238,238,238,0.5)]">
      <UserTableHeader
        search={search}
        onSearchChange={setSearch}
        cityFilter={cityFilter}
        cityOptions={cityOptions}
        onCityFilterChange={setCityFilter}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        totalCount={users.length}
        filteredCount={displayUsers.length}
      />

      <div className="scrollbar-hide overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse">
          <thead>
            <tr className="border-b border-[#F0F0F0] bg-[#FAFBFC]">
              {COLUMNS.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wide text-[#8B8D97] sm:px-6"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F0F0F0]">
            {showError ? (
              <tr>
                <td colSpan={COLUMNS.length} className="px-6 py-8">
                  <ErrorMessage error={error} title="Unable to load users" />
                </td>
              </tr>
            ) : showSpinner ? (
              <tr>
                <td colSpan={COLUMNS.length}>
                  <LoadingSpinner isLoading text="Loading users..." />
                </td>
              </tr>
            ) : displayUsers.length > 0 ? (
              displayUsers.map((user, index) => (
                <tr key={user.id} className="transition hover:bg-[#F8F9FB]">
                  <td className="px-4 py-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <UserAvatar name={user.name} index={index} />
                      <span className="text-sm font-medium text-[#202224]">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-[#5A5C66] sm:px-6">{user.email}</td>
                  <td className="px-4 py-4 text-sm font-medium text-[#202224] sm:px-6">
                    {user.companyName}
                  </td>
                  <td className="px-4 py-4 sm:px-6">
                    <span className="inline-flex rounded-full bg-[#F5F6FA] px-3 py-1 text-xs font-medium text-[#5A5C66]">
                      {user.city}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={COLUMNS.length} className="px-6 py-16 text-center">
                  <div className="mx-auto max-w-sm">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F6FA] text-[#8B8D97]">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-[#202224]">No users found</p>
                    <p className="mt-1 text-sm text-[#8B8D97]">
                      Try adjusting your search or filter to find what you are looking for.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
