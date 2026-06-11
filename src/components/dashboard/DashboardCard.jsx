export default function DashboardCard({ title, subtitle, action, children, className = '' }) {
  return (
    <section className={`rounded-[14px] bg-white p-4 shadow-[0_4px_20px_rgba(238,238,238,0.5)] sm:p-5 ${className}`}>
      {(title || action) && (
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && <h3 className="text-base font-bold text-[#05004E] sm:text-lg">{title}</h3>}
            {subtitle && <p className="mt-0.5 text-xs text-[#8B8D97] sm:text-sm">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  )
}
