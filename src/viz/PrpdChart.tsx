import ReactECharts from 'echarts-for-react'
import type { CaseMark } from '../data/cases'
import type { PrpdPoint } from './prpd'

export function PrpdChart({
  points,
  overlayPoints,
  marks,
  showMarks = true,
}: {
  points: PrpdPoint[]
  overlayPoints?: PrpdPoint[]
  marks?: CaseMark[]
  showMarks?: boolean
}) {
  const data = points.map((p) => [p.phaseDeg, p.amp])
  const overlay = overlayPoints?.map((p) => [p.phaseDeg, p.amp]) ?? []

  const markAreaData =
    showMarks && marks?.length
      ? marks.map((m, idx) => {
          const colorPalette = ['rgba(47,107,255,0.16)', 'rgba(14,165,164,0.12)', 'rgba(180,83,9,0.12)']
          const fill = colorPalette[idx % colorPalette.length]
          return [
            {
              name: m.label,
              xAxis: m.phase[0],
              yAxis: m.amp[0],
              itemStyle: { color: fill },
              label: {
                show: true,
                color: 'rgba(15,23,42,0.82)',
                fontSize: 11,
                formatter: m.label,
              },
            },
            {
              xAxis: m.phase[1],
              yAxis: m.amp[1],
            },
          ]
        })
      : []

  const option = {
    backgroundColor: 'transparent',
    grid: { left: 44, right: 16, top: 22, bottom: 34 },
    xAxis: {
      type: 'value',
      min: 0,
      max: 360,
      name: '相位 (°)',
      nameTextStyle: { color: 'rgba(15,23,42,0.55)' },
      axisLine: { lineStyle: { color: 'rgba(15,23,42,0.20)' } },
      axisLabel: { color: 'rgba(15,23,42,0.55)' },
      splitLine: { lineStyle: { color: 'rgba(15,23,42,0.10)' } },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 1,
      name: '幅值 (归一化)',
      nameTextStyle: { color: 'rgba(15,23,42,0.55)' },
      axisLine: { lineStyle: { color: 'rgba(15,23,42,0.20)' } },
      axisLabel: { color: 'rgba(15,23,42,0.55)' },
      splitLine: { lineStyle: { color: 'rgba(15,23,42,0.10)' } },
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255,255,255,0.96)',
      borderColor: 'rgba(15,23,42,0.12)',
      textStyle: { color: 'rgba(15,23,42,0.92)' },
      formatter: (p: any) => `相位：${p.value[0].toFixed(1)}°<br/>幅值：${p.value[1].toFixed(2)}`,
    },
    series: [
      {
        type: 'scatter',
        symbolSize: 2.6,
        data,
        itemStyle: { color: 'rgba(14,165,164,0.55)' },
        large: true,
        largeThreshold: 2000,
        markArea: markAreaData.length
          ? {
              silent: true,
              itemStyle: { borderWidth: 1, borderColor: 'rgba(15,23,42,0.10)' },
              data: markAreaData,
            }
          : undefined,
      },
      ...(overlay.length
        ? [
            {
              type: 'scatter',
              symbolSize: 4.2,
              data: overlay,
              itemStyle: { color: 'rgba(47,107,255,0.95)' },
              silent: true,
            },
          ]
        : []),
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
