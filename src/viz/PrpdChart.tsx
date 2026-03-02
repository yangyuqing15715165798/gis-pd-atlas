import ReactECharts from 'echarts-for-react'
import type { CaseMark } from '../data/cases'
import type { PrpdPoint } from './prpd'

export function PrpdChart({
  points,
  marks,
  showMarks = true,
}: {
  points: PrpdPoint[]
  marks?: CaseMark[]
  showMarks?: boolean
}) {
  const data = points.map((p) => [p.phaseDeg, p.amp])

  const markAreaData =
    showMarks && marks?.length
      ? marks.map((m, idx) => {
          const colorPalette = [
            'rgba(62,112,255,0.18)',
            'rgba(0,255,208,0.14)',
            'rgba(255,184,0,0.14)',
          ]
          const fill = colorPalette[idx % colorPalette.length]
          return [
            {
              name: m.label,
              xAxis: m.phase[0],
              yAxis: m.amp[0],
              itemStyle: { color: fill },
              label: {
                show: true,
                color: 'rgba(255,255,255,0.85)',
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
        markArea: markAreaData.length
          ? {
              silent: true,
              itemStyle: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.10)' },
              data: markAreaData,
            }
          : undefined,
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
