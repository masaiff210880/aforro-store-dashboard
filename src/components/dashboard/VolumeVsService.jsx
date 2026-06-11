import { volumeVsService } from '../../data/dashboardMockData'
import DashboardCard from './DashboardCard'

export default function VolumeVsService() {
  const maxVal = Math.max(...volumeVsService.volume.map((v, i) => v + volumeVsService.services[i]))
  const barWidth = 16
  const gap = 8
  const chartHeight = 140
  const chartWidth = volumeVsService.months.length * (barWidth + gap)

  return (
    <DashboardCard title="Volume vs Service Level" className="h-full">
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 10}`} className="min-w-[240px] w-full" aria-hidden="true">
          {volumeVsService.months.map((_, index) => {
            const x = index * (barWidth + gap)
            const volumeH = (volumeVsService.volume[index] / maxVal) * chartHeight
            const serviceH = (volumeVsService.services[index] / maxVal) * chartHeight

            return (
              <g key={index}>
                <rect
                  x={x}
                  y={chartHeight - volumeH - serviceH}
                  width={barWidth}
                  height={volumeH}
                  rx="3"
                  fill="#4880FF"
                />
                <rect
                  x={x}
                  y={chartHeight - serviceH}
                  width={barWidth}
                  height={serviceH}
                  rx="3"
                  fill="#16DBCC"
                />
              </g>
            )
          })}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#4880FF]" />
          <span className="text-xs text-[#8B8D97]">
            Volume <span className="font-semibold text-[#202224]">{volumeVsService.volumeTotal}</span>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#16DBCC]" />
          <span className="text-xs text-[#8B8D97]">
            Services <span className="font-semibold text-[#202224]">{volumeVsService.servicesTotal}</span>
          </span>
        </div>
      </div>
    </DashboardCard>
  )
}
