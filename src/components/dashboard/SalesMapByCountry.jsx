import DashboardCard from './DashboardCard'

const regions = [
  { cx: 95, cy: 75, r: 18, fill: '#FF947A' },
  { cx: 155, cy: 55, r: 22, fill: '#EF4444' },
  { cx: 210, cy: 70, r: 16, fill: '#4880FF' },
  { cx: 250, cy: 95, r: 20, fill: '#16DBCC' },
  { cx: 175, cy: 110, r: 14, fill: '#BF83FF' },
  { cx: 130, cy: 100, r: 12, fill: '#FFCC00' },
]

export default function SalesMapByCountry() {
  return (
    <DashboardCard title="Sales Mapping by Country" className="h-full">
      <svg viewBox="0 0 320 160" className="w-full" aria-hidden="true">
        <ellipse cx="160" cy="80" rx="140" ry="60" fill="#F5F6FA" />
        <path
          d="M40 85 C70 55, 120 45, 170 55 C220 65, 260 75, 290 90 C250 110, 200 120, 150 115 C100 110, 60 100, 40 85Z"
          fill="#E8ECF4"
        />
        {regions.map((region, index) => (
          <circle key={index} cx={region.cx} cy={region.cy} r={region.r} fill={region.fill} opacity="0.85" />
        ))}
      </svg>
    </DashboardCard>
  )
}
