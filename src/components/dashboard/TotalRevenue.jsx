import { totalRevenue } from '../../data/dashboardMockData'
import DashboardCard from './DashboardCard'

export default function TotalRevenue() {
  const maxVal = Math.max(...totalRevenue.online, ...totalRevenue.offline)
  const barWidth = 14
  const gap = 6
  const groupWidth = barWidth * 2 + gap
  const chartHeight = 160
  const chartWidth = totalRevenue.days.length * (groupWidth + 16)

  return (
    <DashboardCard title="Total Revenue" className="h-full">
      <div className="mb-3 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#4880FF]" />
          <span className="text-xs text-[#8B8D97]">Online Sales</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#16DBCC]" />
          <span className="text-xs text-[#8B8D97]">Offline Sales</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 40}`} className="min-w-[280px] w-full" aria-hidden="true">
          {totalRevenue.days.map((day, index) => {
            const x = index * (groupWidth + 16) + 10
            const onlineH = (totalRevenue.online[index] / maxVal) * chartHeight
            const offlineH = (totalRevenue.offline[index] / maxVal) * chartHeight

            return (
              <g key={day}>
                <rect
                  x={x}
                  y={chartHeight - onlineH}
                  width={barWidth}
                  height={onlineH}
                  rx="4"
                  fill="#4880FF"
                />
                <rect
                  x={x + barWidth + gap}
                  y={chartHeight - offlineH}
                  width={barWidth}
                  height={offlineH}
                  rx="4"
                  fill="#16DBCC"
                />
                <text
                  x={x + groupWidth / 2}
                  y={chartHeight + 22}
                  textAnchor="middle"
                  className="fill-[#8B8D97] text-[8px]"
                >
                  {day.slice(0, 3)}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </DashboardCard>
  )
}
