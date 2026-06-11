import { customerSatisfaction } from '../../data/dashboardMockData'
import DashboardCard from './DashboardCard'

function buildAreaPath(points, key, width, height, maxVal) {
  const stepX = width / (points.length - 1)
  const line = points
    .map((point, index) => {
      const x = index * stepX
      const y = height - (point[key] / maxVal) * height
      return `${index === 0 ? 'M' : 'L'}${x},${y}`
    })
    .join(' ')

  const lastX = (points.length - 1) * stepX
  return `${line} L${lastX},${height} L0,${height} Z`
}

export default function CustomerSatisfaction() {
  const width = 280
  const height = 120
  const maxVal = 100

  return (
    <DashboardCard title="Customer Satisfaction" className="h-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" aria-hidden="true">
        <path
          d={buildAreaPath(customerSatisfaction.data, 'last', width, height, maxVal)}
          fill="rgba(72, 128, 255, 0.35)"
        />
        <path
          d={buildAreaPath(customerSatisfaction.data, 'current', width, height, maxVal)}
          fill="rgba(22, 219, 204, 0.35)"
        />
      </svg>

      <div className="mt-3 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#4880FF]" />
          <span className="text-xs text-[#8B8D97]">
            Last Month <span className="font-semibold text-[#202224]">${customerSatisfaction.lastMonth.toLocaleString()}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#16DBCC]" />
          <span className="text-xs text-[#8B8D97]">
            This Month <span className="font-semibold text-[#202224]">${customerSatisfaction.thisMonth.toLocaleString()}</span>
          </span>
        </div>
      </div>
    </DashboardCard>
  )
}
