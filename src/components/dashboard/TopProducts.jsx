import { topProducts } from '../../data/dashboardMockData'
import DashboardCard from './DashboardCard'

export default function TopProducts() {
  return (
    <DashboardCard title="Top Products" className="h-full">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead>
            <tr className="border-b border-[#F1F1F1] text-xs text-[#8B8D97]">
              <th className="pb-3 pr-3 font-medium">#</th>
              <th className="pb-3 pr-3 font-medium">Name</th>
              <th className="pb-3 pr-3 font-medium">Popularity</th>
              <th className="pb-3 font-medium">Sales</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product) => (
              <tr key={product.id} className="border-b border-[#F8F8F8] last:border-0">
                <td className="py-3.5 pr-3 text-[#8B8D97]">{String(product.id).padStart(2, '0')}</td>
                <td className="max-w-[140px] truncate py-3.5 pr-3 font-medium text-[#202224] sm:max-w-none">
                  {product.name}
                </td>
                <td className="py-3.5 pr-3">
                  <div className="h-2 w-full max-w-[120px] overflow-hidden rounded-full bg-[#F1F1F1]">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${product.popularity}%`, backgroundColor: product.color }}
                    />
                  </div>
                </td>
                <td className="py-3.5">
                  <span
                    className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
                    style={{ backgroundColor: product.color }}
                  >
                    {product.sales}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardCard>
  )
}
