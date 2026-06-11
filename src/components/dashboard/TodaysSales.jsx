import { todaysSalesStats } from '../../data/dashboardMockData'
import DashboardCard from './DashboardCard'

function StatIcon({ type }) {
  const icons = {
    chart: (
      <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
        <path d="M3 14v2h14v-2H3zm2-4v2h2V10H5zm4 0v2h2V10H9zm4 0v2h2V10h-2zm4-6v8h2V4h-2z" />
      </svg>
    ),
    document: (
      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    tag: (
      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
    'user-plus': (
      <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
  }

  return icons[type] || icons.chart
}

export default function TodaysSales() {
  return (
    <DashboardCard
      title="Today's Sales"
      subtitle="Sales Summery"
      action={
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#E8E8E8] px-3 py-1.5 text-xs font-medium text-[#202224] transition hover:bg-[#F9FAFB] sm:text-sm"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Export
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 xl:grid-cols-4">
        {todaysSalesStats.map((stat) => (
          <div key={stat.id} className={`rounded-xl p-4 ${stat.bg}`}>
            <div className={`mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full ${stat.iconBg}`}>
              <StatIcon type={stat.icon} />
            </div>
            <p className="text-xl font-bold text-[#151D48] sm:text-2xl">{stat.value}</p>
            <p className="mt-1 text-xs font-semibold text-[#425166] sm:text-sm">{stat.label}</p>
            <p className="mt-0.5 text-[10px] text-[#4079ED] sm:text-xs">{stat.change}</p>
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}
