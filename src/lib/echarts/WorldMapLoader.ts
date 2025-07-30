import * as echarts from 'echarts/core'
import { GeoComponent, TooltipComponent, VisualMapComponent } from 'echarts/components'
import { ScatterChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

// Load map
import worldGeoJSON from './world.json'

echarts.use([
  GeoComponent,
  TooltipComponent,
  VisualMapComponent,
  ScatterChart,
  CanvasRenderer,
])

echarts.registerMap('world', worldGeoJSON as any)
