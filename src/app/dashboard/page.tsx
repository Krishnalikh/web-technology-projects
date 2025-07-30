'use client'

import { Card, CardContent } from "@/components/ui/Cards"
import { DollarSign, Users, TrendingUp, Activity, BarChart3, MapPin, Globe2, MonitorSmartphone, Wallet } from "lucide-react"
import { LineChart, BarChart, PieChart } from "@/components/charts"
import { DataTable } from "@/components/table/DataTable"
import { useTheme } from "next-themes"
import { useLiveMetrics } from "@/lib/hooks/useLiveMetrics"
import { FadeIn } from "@/components/ui/FadeIn"
import GeoHeatmap from "@/components/charts/GeoHeatMap"

export default function DashboardPage() {
  const { theme } = useTheme()
  const liveRevenue = useLiveMetrics()

  const metrics = [
    { title: "Revenue", value: liveRevenue, icon: DollarSign },
    { title: "Users", value: "5,302", icon: Users },
    { title: "Conversions", value: "1,246", icon: TrendingUp },
    { title: "Growth", value: "12.5%", icon: Activity },
    { title: "CTR", value: "4.8%", icon: BarChart3 },
    { title: "CPC", value: "$0.25", icon: DollarSign },
    { title: "CPM", value: "$5.20", icon: DollarSign },
    { title: "ROAS", value: "3.5x", icon: TrendingUp },
  ]

  return (
    <div className="p-6 space-y-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight text-center text-primary animate-fade-in">
        📊 ADmyBRAND Insights Dashboard
      </h1>

      {/* Metric Cards */}
      <FadeIn>
        <div className="flex justify-center">
          <div className="flex gap-6 overflow-x-auto pb-2">
            {metrics.map((item) => (
              <Card
                key={item.title}
                className="min-w-[200px] flex-shrink-0 shadow-md border hover:shadow-xl transition-transform transform hover:scale-105 duration-300"
              >
                <CardContent className="flex flex-col items-center gap-3 p-6 text-center">
                  <item.icon className="text-blue-600 dark:text-blue-400 w-8 h-8" />
                  <div className="text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wide">
                    {item.title}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{item.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Charts */}
      <FadeIn>
        <div className="flex justify-center">
          <div className="flex gap-6 overflow-x-auto pb-2">
            <Card className="min-w-[350px] shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  📈 Weekly Revenue Trend
                </h2>
                <div className="h-[180px]"><LineChart /></div>
              </CardContent>
            </Card>

            <Card className="min-w-[350px] shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  📊 Revenue Distribution
                </h2>
                <div className="h-[180px]"><BarChart /></div>
              </CardContent>
            </Card>

            <Card className="min-w-[350px] shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  🥧 Revenue Share
                </h2>
                <div className="h-[180px]"><PieChart /></div>
              </CardContent>
            </Card>
          </div>
        </div>
      </FadeIn>

      {/* Geographic Map Section */}
      {/* Geographic Heatmap Section */}
<FadeIn>
  <div className="max-w-5xl mx-auto">
    <Card className="shadow-md hover:shadow-xl transition">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">🌍 Ad Performance by Region</h2>
        </div>
        <div className="w-full h-[300px] rounded-md">
          <GeoHeatmap />
        </div>
      </CardContent>
    </Card>
  </div>
</FadeIn>


      {/* Audience Analytics Section */}
      {/* Audience Analytics Section */}
<FadeIn>
  <div className="max-w-7xl mx-auto">
    <Card className="shadow-md hover:shadow-xl transition">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Globe2 className="text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">🎯 Audience Analytics</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {/* Age Group */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl p-5 w-[230px] hover:scale-105 transition shadow-lg hover:shadow-pink-500/50">
            <div className="flex items-center justify-between mb-2">
              <span className="uppercase text-xs tracking-wider">Age 18–24</span>
              <Users className="w-5 h-5" />
            </div>
            <div className="text-3xl font-bold">1,245</div>
            <p className="text-xs mt-1 text-pink-100">Highly active on mobile ads</p>
          </div>

          <div className="bg-gradient-to-br from-indigo-500 to-blue-500 text-white rounded-xl p-5 w-[230px] hover:scale-105 transition shadow-lg hover:shadow-blue-500/50">
            <div className="flex items-center justify-between mb-2">
              <span className="uppercase text-xs tracking-wider">Age 25–34</span>
              <Users className="w-5 h-5" />
            </div>
            <div className="text-3xl font-bold">1,980</div>
            <p className="text-xs mt-1 text-blue-100">Top performing engagement</p>
          </div>

          {/* Gender */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white rounded-xl p-5 w-[230px] hover:scale-105 transition shadow-lg hover:shadow-emerald-500/50">
            <div className="flex items-center justify-between mb-2">
              <span className="uppercase text-xs tracking-wider">Gender</span>
              <Users className="w-5 h-5" />
            </div>
            <div className="text-xl font-semibold">60% Male / 40% Female</div>
            <p className="text-xs mt-1 text-emerald-100">Male-skewed tech audience</p>
          </div>

          {/* Devices */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-xl p-5 w-[230px] hover:scale-105 transition shadow-lg hover:shadow-orange-500/50">
            <div className="flex items-center justify-between mb-2">
              <span className="uppercase text-xs tracking-wider">Devices</span>
              <MonitorSmartphone className="w-5 h-5" />
            </div>
            <div className="text-lg font-bold">75% Mobile, 20% Desktop</div>
            <p className="text-xs mt-1 text-yellow-100">Mostly Android & iOS</p>
          </div>
        </div>

        {/* Audience Rating */}
        <div className="mt-6 text-center">
          <p className="text-sm uppercase text-gray-500 dark:text-gray-300">Audience Rating</p>
          <div className="flex justify-center gap-1 mt-1 text-yellow-400 text-xl drop-shadow-md animate-pulse">
            {[...Array(5)].map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">Rated 4.9 by recent campaign surveys</p>
        </div>
      </CardContent>
    </Card>
  </div>
</FadeIn>


      {/* Revenue & Payout Section */}
<FadeIn>
  <div className="max-w-7xl mx-auto">
    <Card className="shadow-md hover:shadow-xl transition">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Wallet className="text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">💰 Payout Summary</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {/* Total Revenue */}
          <div className="bg-gradient-to-br from-green-400 to-lime-500 text-white rounded-xl p-5 w-[250px] hover:scale-105 transition shadow-lg hover:shadow-lime-500/50">
            <div className="text-sm uppercase tracking-wider mb-1">Total Revenue</div>
            <div className="text-3xl font-bold">$23,450</div>
            <p className="text-xs text-lime-100 mt-1">Across all campaigns</p>
          </div>

          {/* Paid */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl p-5 w-[250px] hover:scale-105 transition shadow-lg hover:shadow-indigo-500/50">
            <div className="text-sm uppercase tracking-wider mb-1">Paid</div>
            <div className="text-2xl font-semibold">$18,000</div>
            <p className="text-xs text-indigo-100">Last paid: Jul 20, 2025</p>
            <span className="text-[10px] bg-white/20 rounded px-2 py-0.5 mt-2 inline-block">PayPal</span>
          </div>

          {/* Pending */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-xl p-5 w-[250px] hover:scale-105 transition shadow-lg hover:shadow-orange-400/50">
            <div className="text-sm uppercase tracking-wider mb-1">Pending</div>
            <div className="text-2xl font-semibold">$5,450</div>
            <p className="text-xs text-orange-100">Next payout: Aug 5, 2025</p>
            <span className="text-[10px] bg-white/20 rounded px-2 py-0.5 mt-2 inline-block">Scheduled</span>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</FadeIn>



      {/* Data Table */}
      <FadeIn>
        <div className="mt-10 max-w-5xl mx-auto w-full">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
            📋 Detailed Performance Metrics
          </h2>
          <div className="rounded-xl border shadow-md overflow-hidden">
            <div className="bg-gray-100 dark:bg-zinc-800 px-4 py-3 border-b">
              <p className="text-sm font-medium tracking-wider uppercase text-gray-700 dark:text-gray-300">
                Performance Table
              </p>
            </div>
            <div className="overflow-auto max-h-[400px]">
              <DataTable />
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  )
}