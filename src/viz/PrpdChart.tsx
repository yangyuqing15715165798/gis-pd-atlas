import ReactECharts from 'echarts-for-react'
import type { PrpdPoint } from './prpd'

export function PrpdChart({ points }: { points: PrpdPoint[] }) {
  const data = points.map((p) => [p.phaseDeg, p.amp])

  const option = {
    backgroundColor: 'transparent',
    grid: { left: 42, right: 16, top: 22, bottom: 34 },
    xAxis: {
      type: 'value',
      min: 0,
      max: 360,
      name: '相位 (°)',
      nameTextStyle: { color: 'rgba(255,255,255,0.55)' },
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.18)' } },
      axisLabel: { color: 'rgba(255,255,255,0.55)' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 1,
      name: '幅值 (归一化)',
      nameTextStyle: { color: 'rgba(255,255,255,0.55)' },
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.18)' } },
      axisLabel: { color: 'rgba(255,255,255,0.55)' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(10,16,32,0.92)',
      borderColor: 'rgba(255,255,255,0.12)',
      textStyle: { color: 'rgba(255,255,255,0.9)' },
      formatter: (p: any) => `相位：${p.value[0].toFixed(1)}°<br/>幅值：${p.value[1].toFixed(2)}`,
    },
    series: [
      {
        type: 'scatter',
        symbolSize: 2.6,
        data,
        itemStyle: { color: 'rgba(0, 255, 208, 0.55)' },
        large: true,
        largeThreshold: 2000,
      },
    ],
  }

  return (
    <ReactECharts
      option={option as any}
      style={{ height: '100%', width: '100%' }}
      opts={{ renderer: 'canvas' }}
      notMerge
      lazyUpdate
    />
  )
}
