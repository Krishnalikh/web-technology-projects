// components/charts/LineChartComp.tsx
"use client"
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, PointElement, LinearScale, CategoryScale } from 'chart.js'
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale)

export default function LineChart() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "Users",
      data: [100, 400, 300, 500, 600, 900],
      fill: false,
      borderColor: "#2563eb",
      tension: 0.4
    }]
  }

  return <Line data={data} />
}
