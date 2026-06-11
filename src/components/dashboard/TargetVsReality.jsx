import { targetVsReality } from '../../data/dashboardMockData'
import DashboardCard from './DashboardCard'

export default function TargetVsReality() {
  const maxVal = 100
  const barWidth = 18
  const gap = 8
  const groupWidth = barWidth * 2 + gap
  const chartHeight = 130
  const chartWidth = targetVsReality.months.length * (groupWidth + 12)

  return (
    <DashboardCard title="Target vs Reality" className="h-full">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 20}`} className="min-w-[240px] w-full" aria-hidden="true">
          {targetVsReality.months.map((month, index) => {
            const x = index * (groupWidth + 12) + 8
            const realityH = (targetVsReality.reality[index] / maxVal) * chartHeight
            const targetH = (targetVsReality.target[index] / maxVal) * chartHeight

            return (
              <g key={month}>
                <rect
                  x={x}
                  y={chartHeight - realityH}
                  width={barWidth}
                  height={realityH}
                  rx="4"
                  fill="#16DBCC"
                />
                <rect
                  x={x + barWidth + gap}
                  y={chartHeight - targetH}
                  width={barWidth}
                  height={targetH}
                  rx="4"
                  fill="#FFCC00"
                />
              </g>
            )
          })}
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-xl bg-[#E6F8F6] px-3 py-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#16DBCC] text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-[#8B8D97]">{targetVsReality.realitySales.label}</p>
            <p className="text-sm font-bold text-[#202224]">
              {targetVsReality.realitySales.value}{' '}
              <span className="text-xs font-normal text-[#8B8D97]">{targetVsReality.realitySales.sub}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-[#FFF8E5] px-3 py-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFCC00] text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-[#8B8D97]">{targetVsReality.targetSales.label}</p>
            <p className="text-sm font-bold text-[#202224]">
              {targetVsReality.targetSales.value}{' '}
              <span className="text-xs font-normal text-[#8B8D97]">{targetVsReality.targetSales.sub}</span>
            </p>
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}
