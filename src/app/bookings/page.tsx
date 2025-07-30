'use client'

import { useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { motion } from 'framer-motion'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend)

type Booking = {
  id: number
  customerName: string
  adType: string
  bookedAt: string
  duration: number
  status: 'Completed' | 'Pending'
  progress: number // 0-100 for pending
}

const bookingsData: Booking[] = [
  { id: 1, customerName: 'Alice Johnson', adType: 'Commercial Ads', bookedAt: '2025-06-01', duration: 10, status: 'Completed', progress: 100 },
  { id: 2, customerName: 'Bob Smith', adType: 'Educational Ads', bookedAt: '2025-06-05', duration: 5, status: 'Pending', progress: 40 },
  { id: 3, customerName: 'Carol White', adType: 'Video Ads', bookedAt: '2025-06-03', duration: 8, status: 'Completed', progress: 100 },
  { id: 4, customerName: 'David Green', adType: 'Banner Ads', bookedAt: '2025-06-07', duration: 4, status: 'Pending', progress: 20 },
  { id: 5, customerName: 'Eva Black', adType: 'Social Media Ads', bookedAt: '2025-06-02', duration: 12, status: 'Completed', progress: 100 },
  { id: 6, customerName: 'Frank Lee', adType: 'Popup Ads', bookedAt: '2025-06-09', duration: 6, status: 'Pending', progress: 55 },
]

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<'completed' | 'pending'>('completed')

  // Split bookings by status
  const completed = bookingsData.filter(b => b.status === 'Completed')
  const pending = bookingsData.filter(b => b.status === 'Pending')

  // Prepare chart data for completed bookings - total durations by ad type
  const completedAdTypeTotals: Record<string, number> = {}
  completed.forEach(b => {
    completedAdTypeTotals[b.adType] = (completedAdTypeTotals[b.adType] || 0) + b.duration
  })

  const completedChartData = {
    labels: Object.keys(completedAdTypeTotals),
    datasets: [
      {
        label: 'Total Hours Booked',
        data: Object.values(completedAdTypeTotals),
        backgroundColor: 'rgba(37, 99, 235, 0.7)', // blue
      }
    ],
  }

  // Pending progress data
  const pendingProgressData = {
    labels: pending.map(b => b.customerName),
    datasets: [
      {
        label: 'Progress %',
        data: pending.map(b => b.progress),
        backgroundColor: 'rgba(16, 185, 129, 0.7)', // green
      }
    ],
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-extrabold text-center mb-8">📋 Bookings Dashboard</h1>

      {/* Tabs */}
      <div className="flex justify-center gap-8 mb-8">
        <button
          className={`px-6 py-2 rounded-md font-semibold transition ${
            activeTab === 'completed'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-zinc-700'
          }`}
          onClick={() => setActiveTab('completed')}
        >
          Completed Bookings
        </button>
        <button
          className={`px-6 py-2 rounded-md font-semibold transition ${
            activeTab === 'pending'
              ? 'bg-green-600 text-white shadow-lg'
              : 'bg-gray-200 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-zinc-700'
          }`}
          onClick={() => setActiveTab('pending')}
        >
          Pending Bookings
        </button>
      </div>

      {/* Content */}
      {activeTab === 'completed' ? (
        <motion.div
          key="completed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Completed Bookings History</h2>

          {/* Completed Bookings Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-zinc-700 shadow-md">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left rounded-tl-lg">Customer</th>
                  <th className="px-6 py-3 text-left">Ad Type</th>
                  <th className="px-6 py-3 text-left">Booked Date</th>
                  <th className="px-6 py-3 text-right rounded-tr-lg">Duration (hrs)</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-700">
                {completed.map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-blue-50 dark:hover:bg-blue-900 transition cursor-pointer"
                  >
                    <td className="px-6 py-4">{b.customerName}</td>
                    <td className="px-6 py-4">{b.adType}</td>
                    <td className="px-6 py-4">{b.bookedAt}</td>
                    <td className="px-6 py-4 text-right font-semibold">{b.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Completed Summary Chart */}
          <div className="max-w-3xl mx-auto mt-8">
            <Bar data={completedChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="pending"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Pending Bookings</h2>

          {/* Pending Bookings Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-300 dark:border-zinc-700 shadow-md">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left rounded-tl-lg">Customer</th>
                  <th className="px-6 py-3 text-left">Ad Type</th>
                  <th className="px-6 py-3 text-left">Booked Date</th>
                  <th className="px-6 py-3 text-right">Duration (hrs)</th>
                  <th className="px-6 py-3 text-right rounded-tr-lg">Progress %</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-700">
                {pending.map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-green-50 dark:hover:bg-green-900 transition cursor-pointer"
                  >
                    <td className="px-6 py-4">{b.customerName}</td>
                    <td className="px-6 py-4">{b.adType}</td>
                    <td className="px-6 py-4">{b.bookedAt}</td>
                    <td className="px-6 py-4 text-right">{b.duration}</td>
                    <td className="px-6 py-4 text-right font-semibold">{b.progress}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pending Progress Chart */}
          <div className="max-w-3xl mx-auto mt-8">
            <Bar
              data={pendingProgressData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  y: {
                    min: 0,
                    max: 100,
                    ticks: { stepSize: 10 },
                    title: { display: true, text: 'Progress (%)' }
                  }
                }
              }}
            />
          </div>
        </motion.div>
      )}
    </div>
  )
}
