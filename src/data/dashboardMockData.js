export const todaysSalesStats = [
  {
    id: 'total-sales',
    label: 'Total Sales',
    value: '$1k',
    change: '+8% from yesterday',
    bg: 'bg-[#FFE2E5]',
    iconBg: 'bg-[#FA5A7D]',
    icon: 'chart',
  },
  {
    id: 'total-order',
    label: 'Total Order',
    value: '300',
    change: '+5% from yesterday',
    bg: 'bg-[#FFF4DE]',
    iconBg: 'bg-[#FF947A]',
    icon: 'document',
  },
  {
    id: 'product-sold',
    label: 'Product Sold',
    value: '5',
    change: '+1.2% from yesterday',
    bg: 'bg-[#DCFCE7]',
    iconBg: 'bg-[#3CD856]',
    icon: 'tag',
  },
  {
    id: 'new-customers',
    label: 'New Customers',
    value: '8',
    change: '0.5% from yesterday',
    bg: 'bg-[#F3E8FF]',
    iconBg: 'bg-[#BF83FF]',
    icon: 'user-plus',
  },
]

export const visitorInsights = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [
    {
      name: 'Loyal Customers',
      color: '#A700FF',
      data: [120, 180, 150, 200, 170, 220, 190, 250, 210, 280, 260, 300],
    },
    {
      name: 'New Customers',
      color: '#EF4444',
      data: [80, 100, 90, 130, 110, 150, 140, 180, 160, 200, 190, 220],
    },
    {
      name: 'Unique Customers',
      color: '#22C55E',
      data: [60, 90, 70, 110, 95, 130, 120, 160, 140, 180, 170, 200],
    },
  ],
}

export const totalRevenue = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  online: [12, 18, 14, 22, 20, 16, 24],
  offline: [8, 12, 10, 15, 14, 11, 18],
}

export const customerSatisfaction = {
  lastMonth: 3004,
  thisMonth: 4504,
  data: [
    { x: 0, last: 30, current: 35 },
    { x: 1, last: 45, current: 50 },
    { x: 2, last: 35, current: 55 },
    { x: 3, last: 50, current: 48 },
    { x: 4, last: 42, current: 60 },
    { x: 5, last: 55, current: 65 },
    { x: 6, last: 48, current: 70 },
    { x: 7, last: 60, current: 68 },
    { x: 8, last: 52, current: 75 },
    { x: 9, last: 58, current: 80 },
    { x: 10, last: 65, current: 78 },
    { x: 11, last: 70, current: 85 },
  ],
}

export const targetVsReality = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  target: [65, 80, 70, 90, 75, 85, 95],
  reality: [55, 70, 60, 80, 65, 75, 85],
  realitySales: { label: 'Reality Sales', value: '8.823', sub: 'Global', color: '#16DBCC' },
  targetSales: { label: 'Target Sales', value: '12.122', sub: 'Commercial', color: '#FFCC00' },
}

export const topProducts = [
  { id: 1, name: 'Home Decor Range', popularity: 78, sales: 45, color: '#4880FF' },
  { id: 2, name: "Disney Princess Pink Bag 18'", popularity: 62, sales: 29, color: '#16DBCC' },
  { id: 3, name: 'Bathroom Essentials', popularity: 51, sales: 18, color: '#BF83FF' },
  { id: 4, name: 'Apple Smartwatches', popularity: 45, sales: 25, color: '#FF947A' },
]

export const volumeVsService = {
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  volume: [80, 95, 70, 110, 90, 100, 85, 105, 95, 115, 100, 120],
  services: [50, 60, 45, 70, 55, 65, 50, 70, 60, 75, 65, 80],
  volumeTotal: '1,135',
  servicesTotal: '635',
}
