import { visitorInsights } from '../../data/dashboardMockData'
import DashboardCard from './DashboardCard'

function buildPath(data, width, height, maxY) {
  const stepX = width / (data.length - 1)
  return data
    .map((value, index) => {
      const x = index * stepX
      const y = height - (value / maxY) * height
      return `${index === 0 ? 'M' : 'L'}${x},${y}`
    })
    .join(' ')
}

export default function VisitorInsights() {
  const width = 520
  const height = 180
  const maxY = 400
  const padding = { top: 10, right: 10, bottom: 30, left: 35 }
  const chartW = width - padding.left - padding.right
  const chartH = height - padding.top - padding.bottom

  return (
    <DashboardCard title="Visitor Insights" className="h-full">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[320px] w-full" aria-hidden="true">
          {[0, 100, 200, 300, 400].map((tick) => {
            const y = padding.top + chartH - (tick / maxY) * chartH
            return (
              <g key={tick}>
                <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="#F0F0F0" strokeWidth="1" />
                <text x={padding.left - 8} y={y + 4} textAnchor="end" className="fill-[#8B8D97] text-[9px]">
                  {tick}
                </text>
              </g>
            )
          })}

          <g transform={`translate(${padding.left}, ${padding.top})`}>
            {visitorInsights.series.map((series) => (
              <path
                key={series.name}
                d={buildPath(series.data, chartW, chartH, maxY)}
                fill="none"
                stroke={series.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </g>

          {visitorInsights.months.map((month, index) => {
            const x = padding.left + (index / (visitorInsights.months.length - 1)) * chartW
            return (
              <text key={month} x={x} y={height - 8} textAnchor="middle" className="fill-[#8B8D97] text-[8px]">
                {month}
              </text>
            )
          })}
        </svg>
      </div>

      <div className="mt-2 flex flex-wrap gap-4">
        {visitorInsights.series.map((series) => (
          <div key={series.name} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: series.color }} />
            <span className="text-xs text-[#8B8D97]">{series.name}</span>
          </div>
        ))}
      </div>
    </DashboardCard>
  )
}
