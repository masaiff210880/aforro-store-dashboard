import { NavLink, useNavigate } from 'react-router'
import { getSidebarMenu } from '../data/sidebarMenu'
import { NavIcon, DabangLogo, SignOutIcon } from './icons/NavIcons'

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const menuItems = getSidebarMenu()

  const handleSignOut = () => {
    onClose?.()
    navigate('/login')
  }

  const sidebarContent = (
    <>
      <div className="flex h-16 items-center gap-3 px-5">
        <DabangLogo />
        <span className="text-xl font-bold tracking-tight text-[#202224]">Dabang</span>
      </div>

      <nav className="scrollbar-hide min-h-0 flex-1 space-y-1 overflow-y-auto px-4 py-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-[#4880FF] text-white shadow-[0_4px_12px_rgba(72,128,255,0.35)]'
                  : 'text-[#8B8D97] hover:bg-[#F5F6FA] hover:text-[#202224]'
              }`
            }
          >
            <NavIcon name={item.icon} />
            {item.name}
          </NavLink>
        ))}

        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-[#8B8D97] transition hover:bg-[#F5F6FA] hover:text-[#202224]"
        >
          <SignOutIcon />
          Sign Out
        </button>
      </nav>

      <div className="p-4">
        <div className="rounded-2xl bg-gradient-to-br from-[#4880FF] to-[#6B9AFF] p-4 text-white shadow-[0_8px_24px_rgba(72,128,255,0.35)]">
          <div className="mb-2 flex items-center gap-2">
            <DabangLogo />
            <span className="text-sm font-bold">Dabang Pro</span>
          </div>
          <p className="mb-3 text-xs leading-relaxed text-white/90">
            Get access to all features on tetumbas
          </p>
          <button
            type="button"
            className="w-full rounded-lg bg-white px-3 py-2 text-xs font-semibold text-[#4880FF] transition hover:bg-white/95"
          >
            Get Pro
          </button>
        </div>
      </div>
    </>
  )

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden h-screen w-[260px] flex-col border-r border-[#F0F0F0] bg-white lg:flex">
        {sidebarContent}
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-[#F0F0F0] bg-white transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-[#8B8D97] hover:text-[#202224]"
          aria-label="Close menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {sidebarContent}
      </aside>
    </>
  )
}
