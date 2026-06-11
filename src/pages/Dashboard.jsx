import TodaysSales from '../components/dashboard/TodaysSales'
import VisitorInsights from '../components/dashboard/VisitorInsights'
import TotalRevenue from '../components/dashboard/TotalRevenue'
import CustomerSatisfaction from '../components/dashboard/CustomerSatisfaction'
import TargetVsReality from '../components/dashboard/TargetVsReality'
import TopProducts from '../components/dashboard/TopProducts'
import SalesMapByCountry from '../components/dashboard/SalesMapByCountry'
import VolumeVsService from '../components/dashboard/VolumeVsService'

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-4 sm:space-y-5">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-12 xl:gap-5">
        <div className="xl:col-span-7">
          <TodaysSales />
        </div>
        <div className="xl:col-span-5">
          <VisitorInsights />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12 xl:gap-5">
        <div className="md:col-span-2 xl:col-span-5">
          <TotalRevenue />
        </div>
        <div className="xl:col-span-3">
          <CustomerSatisfaction />
        </div>
        <div className="xl:col-span-4">
          <TargetVsReality />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-12 xl:gap-5">
        <div className="md:col-span-2 xl:col-span-5">
          <TopProducts />
        </div>
        <div className="xl:col-span-3">
          <SalesMapByCountry />
        </div>
        <div className="xl:col-span-4">
          <VolumeVsService />
        </div>
      </div>
    </div>
  )
}
