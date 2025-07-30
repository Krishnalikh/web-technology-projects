'use client'

import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts/core'
import { VisualMapComponent, TooltipComponent, GeoComponent } from 'echarts/components'
import { MapChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([VisualMapComponent, TooltipComponent, GeoComponent, MapChart, CanvasRenderer])

export default function GeoHeatmap() {
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Dynamically load world.json from public folder
    fetch('/maps/world.json')
      .then(res => res.json())
      .then(geoJson => {
        echarts.registerMap('world', geoJson)
        setMapLoaded(true)
      })
      .catch(err => {
        console.error('Failed to load world map:', err)
      })
  }, [])

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}<br/>Ad Views: {c}"
    },
    visualMap: {
      min: 0,
      max: 1000,
      left: "left",
      top: "bottom",
      text: ["High", "Low"],
      inRange: {
        color: ["#e0f3f8", "#74add1", "#4575b4"]
      },
      calculable: true
    },
    geo: {
      map: "world",
      roam: true,
      silent: false,
      itemStyle: {
        normal: {
          areaColor: "#d1d5db",
          borderColor: "#ffffff"
        },
        emphasis: {
          areaColor: "#60a5fa"
        }
      }
    },
    series: [
      {
        type: "map",
        map: "world",
        roam: true,
        data: [
          { name: "United States", value: 800 },
          { name: "India", value: 750 },
          { name: "Germany", value: 300 },
          { name: "Brazil", value: 400 },
          { name: "China", value: 950 },
          { name: "Russia", value: 200 },
        ]
      }
    ]
  }

  if (!mapLoaded) {
    return <div className="text-center text-gray-600 dark:text-gray-400">🌍 Loading Geo Data...</div>
  }

  return <ReactECharts option={option} style={{ height: "300px", width: "100%" }} />
}
