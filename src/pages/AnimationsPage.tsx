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
        <p className="mt-2 max-w-3xl text-sm text-slate-900/80">
          用可控参数“现场生成”一张 PRPD 点云：观察相位窗口、对称性、分散程度与噪声的影响。
        </p>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-slate-900/10 bg-white/60 p-5">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">PRPD（实时生成）</div>
            <div className="text-xs text-slate-900/80">教学模拟</div>
          </div>
          <div className="mt-3 h-[520px]">
            <PrpdChart points={points} />
          </div>
        </div>

        <div className="space-y-5 rounded-2xl border border-slate-900/10 bg-white/60 p-5">
          <Control label="缺陷原型">
            <select
              value={profile}
              onChange={(e) => setProfile(e.target.value as PrpdProfile)}
              className="w-full rounded-lg border border-slate-900/10 bg-white/80 px-3 py-2 text-sm"
            >
              <option value="corona">电晕放电</option>
              <option value="floatingClassic">悬浮放电（示例·更像）</option>
              <option value="particle">自由颗粒放电</option>
              <option value="internalVoid">空穴放电</option>
              <option value="surface">沿面放电</option>
              <option value="protrusion">尖端/毛刺</option>
              <option value="multiSource">多源叠加</option>
              <option value="noise">噪声/干扰</option>
              <option value="floatingIn">悬浮放电（内八字·可选）</option>
              <option value="floatingOut">悬浮放电（外八字·可选）</option>
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

          <div className="rounded-xl border border-slate-900/10 bg-white/60 p-4 text-sm text-slate-900/80">
            <div className="font-semibold">快速判断思路（教学）</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-900/80">
              <li>先看：有没有明显的“窗口”和“对称”。</li>
              <li>再看：是否偏一边半周（电晕的极性效应）。</li>
              <li>最后看：是否全相位铺开（颗粒/噪声更常见）。</li>
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
      <div className="mb-2 text-xs font-medium text-slate-900/80">{label}</div>
      {children}
    </div>
  )
}


