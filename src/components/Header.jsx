import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { getPageTitle } from '../data/sidebarMenu'

const LANGUAGES = [
  { id: 'en', code: 'US', label: 'Eng (US)' },
  { id: 'es', code: 'ES', label: 'Esp (ES)' },
  { id: 'fr', code: 'FR', label: 'Fra (FR)' },
  { id: 'de', code: 'DE', label: 'Deu (DE)' },
]

function ChevronDown({ className = '' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

export default function Header({ onMenuToggle }) {
  const location = useLocation()
  const navigate = useNavigate()

  const pageTitle = getPageTitle(location.pathname)
  const [languageOpen, setLanguageOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0])

  const languageRef = useRef(null)
  const profileRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageOpen(false)
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    setProfileOpen(false)
    navigate('/login')
  }

  return (
    <header className="z-30 shrink-0 border-b border-[#F0F0F0] bg-white px-4 py-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-3 lg:grid lg:grid-cols-[220px_minmax(0,1fr)_auto] lg:items-center lg:gap-x-6 lg:gap-y-0">
        <div className="flex items-center justify-between gap-3 lg:contents">
          <div className="flex min-w-0 items-center gap-3 lg:col-start-1 lg:row-start-1 lg:h-10 lg:w-[220px] lg:shrink-0">
            <button
              type="button"
              onClick={onMenuToggle}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[#8B8D97] hover:bg-[#F5F6FA] lg:hidden"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <h1 className="min-w-0 truncate text-xl font-bold leading-tight text-[#202224] sm:text-2xl lg:w-[168px]">
              {pageTitle}
            </h1>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-2 sm:gap-3 lg:col-start-3 lg:row-start-1 lg:min-w-[280px]">
          <div ref={languageRef} className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => {
                setLanguageOpen((open) => !open)
                setProfileOpen(false)
              }}
              className="flex h-10 min-w-[130px] items-center gap-2 rounded-full bg-[#F5F6FA] px-3 text-xs font-medium text-[#202224] transition hover:bg-[#EEF0F4]"
              aria-expanded={languageOpen}
              aria-haspopup="listbox"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4880FF] text-[8px] font-semibold text-white">
                {selectedLanguage.code}
              </span>
              <span className="truncate">{selectedLanguage.label}</span>
              <ChevronDown
                className={`ml-auto h-3.5 w-3.5 shrink-0 text-[#8B8D97] transition-transform ${languageOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {languageOpen && (
              <div
                className="absolute right-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-xl border border-[#F0F0F0] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
                role="listbox"
              >
                {LANGUAGES.map((language) => (
                  <button
                    key={language.id}
                    type="button"
                    role="option"
                    aria-selected={selectedLanguage.id === language.id}
                    onClick={() => {
                      setSelectedLanguage(language)
                      setLanguageOpen(false)
                    }}
                    className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition hover:bg-[#F5F6FA] ${
                      selectedLanguage.id === language.id
                        ? 'bg-[#4880FF]/5 font-medium text-[#4880FF]'
                        : 'text-[#202224]'
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-semibold text-white ${
                        selectedLanguage.id === language.id ? 'bg-[#4880FF]' : 'bg-[#8B8D97]'
                      }`}
                    >
                      {language.code}
                    </span>
                    {language.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF4DE] text-[#FF947A]"
            aria-label="Notifications"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FF947A]" />
          </button>

          <div ref={profileRef} className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileOpen((open) => !open)
                setLanguageOpen(false)
              }}
              className="flex h-10 max-w-[180px] items-center gap-2 rounded-xl py-1 pl-1 pr-2 transition hover:bg-[#F5F6FA] sm:max-w-[200px] sm:gap-3 sm:pr-3"
              aria-expanded={profileOpen}
              aria-haspopup="menu"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#4880FF] to-[#6B9AFF] text-sm font-semibold text-white sm:h-10 sm:w-10">
                M
              </div>
              <div className="hidden min-w-0 flex-1 text-left sm:block">
                <p className="truncate text-sm font-semibold text-[#202224]">Musfiq</p>
                <p className="truncate text-xs text-[#8B8D97]">Admin</p>
              </div>
              <ChevronDown
                className={`hidden h-3.5 w-3.5 shrink-0 text-[#8B8D97] transition-transform sm:block ${profileOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 min-w-[180px] overflow-hidden rounded-xl border border-[#F0F0F0] bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                <div className="border-b border-[#F0F0F0] px-4 py-3 sm:hidden">
                  <p className="truncate text-sm font-semibold text-[#202224]">Musfiq</p>
                  <p className="text-xs text-[#8B8D97]">Admin</p>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-[#EF4444] transition hover:bg-[#FEF2F2]"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
          </div>
        </div>

        <div className="flex min-w-0 justify-center lg:col-start-2 lg:row-start-1">
          <div className="relative w-full max-w-md">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B8D97]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="search"
              placeholder="Search here..."
              className="h-10 w-full rounded-full border border-transparent bg-[#F5F6FA] py-2.5 pl-10 pr-4 text-sm text-[#202224] placeholder:text-[#8B8D97] outline-none transition focus:border-[#4880FF]/30 focus:bg-white focus:ring-2 focus:ring-[#4880FF]/20"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
