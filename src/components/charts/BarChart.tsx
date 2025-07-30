"use client"

import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js"

ChartJS.register(BarElement, CategoryScale, LinearScale)

// Changed from named export to default export here:
export default function BarChart() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [{
      label: "Revenue",
      data: [3000, 4000, 2000, 5000, 7000],
      backgroundColor: "#10b981"
    }]
  }

  return <Bar data={data} />
}
