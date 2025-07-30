// components/charts/PieChartComp.tsx
"use client"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
ChartJS.register(ArcElement, Tooltip, Legend)

export default function PieChart() {
  const data = {
    labels: ["Organic", "Referral", "Ads"],
    datasets: [{
      label: "Traffic Sources",
      data: [50, 30, 20],
      backgroundColor: ["#3b82f6", "#f59e0b", "#ef4444"]
    }]
  }

  return <Pie data={data} />
}
