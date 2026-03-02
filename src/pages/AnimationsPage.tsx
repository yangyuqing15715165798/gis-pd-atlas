import { useMemo, useState } from 'react'
import { PrpdChart } from '../viz/PrpdChart'
import { generatePrpdPoints } from '../viz/prpd'
import type { PrpdProfile } from '../viz/prpd'

export function AnimationsPage() {
  const [profile, setProfile] = useState<PrpdProfile>('internalVoid')
  const [noise, setNoise] = useState(0.08)
  const [n, setN] = useState(5000)

  const points = useMemo(() => {
    return generatePrpdPoints({ seed: 42, profile, n, noise })
  }, [profile, n, noise])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">动画演示：PRPD 点是怎么来的</h1>
        <p className="mt-2 max-w-3xl text-sm text-white/70">
          这里不是播放视频，而是用可控参数“现场生成”一张 PRPD 点云：让你直观看到相位窗口、强弱分布、噪声比例改变后，图谱会怎么变。
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">PRPD（实时生成）</div>
            <div className="text-xs text-white/50">教学模拟</div>
          </div>
          <div className="mt-3 h-[520px]">
            <PrpdChart points={points} />
          </div>
        </div>

        <div className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-5">
          <Control label="缺陷原型">
            <select
              value={profile}
              onChange={(e) => setProfile(e.target.value as PrpdProfile)}
              className="w-full rounded-lg border border-white/10 bg-ink-900 px-3 py-2 text-sm"
            >
              <option value="internalVoid">内部放电（示例）</option>
              <option value="surface">沿面放电（示例）</option>
              <option value="floating">悬浮电位（示例）</option>
              <option value="particle">颗粒运动（示例）</option>
              <option value="protrusion">尖端/毛刺（示例）</option>
              <option value="intermittent">间歇性放电（示例）</option>
              <option value="multiSource">多源叠加（示例）</option>
              <option value="noise">噪声/干扰（示例）</option>
            </select>
          </Control>

          <Control label={`点数量：${n}`}>
            <input
              type="range"
              min={1000}
              max={12000}
              step={500}
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              className="w-full"
            />
          </Control>

          <Control label={`噪声比例：${noise.toFixed(2)}`}>
            <input
              type="range"
              min={0}
              max={0.35}
              step={0.01}
              value={noise}
              onChange={(e) => setNoise(Number(e.target.value))}
              className="w-full"
            />
          </Control>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">
            <div className="font-semibold">怎么理解这张图？</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/75">
              <li>横轴：相位（0–360°），可以理解为交流电“转到哪里了”。</li>
              <li>纵轴：放电幅值（教学归一化 0–1）。</li>
              <li>点越密：发生得越频繁；点越高：放电越强。</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

function Control({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-medium text-white/70">{label}</div>
      {children}
    </div>
  )
}
