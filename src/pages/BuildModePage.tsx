import { useEffect, useMemo, useRef, useState } from 'react'
import { PrpdChart } from '../viz/PrpdChart'
import type { PrpdProfile } from '../viz/prpd'
import { initStream, stepStream, type StreamState } from '../viz/prpdStream'

export function BuildModePage() {
  const [profile, setProfile] = useState<PrpdProfile>('internalVoid')
  const [noise, setNoise] = useState(0.08)
  const [n, setN] = useState(6000)
  const [batch, setBatch] = useState(160)
  const [fps, setFps] = useState(30)
  const [playing, setPlaying] = useState(false)
  const [compare, setCompare] = useState(true)

  const [state, setState] = useState<StreamState>(() => initStream({ seed: 42, profile, n, noise }))

  useEffect(() => {
    setState(initStream({ seed: 42, profile, n, noise }))
    setPlaying(false)
  }, [profile, n, noise])

  const progress = useMemo(() => {
    return state.all.length ? state.cursor / state.all.length : 0
  }, [state])

  const timer = useRef<number | null>(null)
  useEffect(() => {
    if (!playing) {
      if (timer.current) window.clearInterval(timer.current)
      timer.current = null
      return
    }

    timer.current = window.setInterval(() => {
      setState((s) => {
        if (s.cursor >= s.all.length) return s
        return stepStream(s, batch)
      })
    }, Math.max(10, Math.floor(1000 / fps)))

    return () => {
      if (timer.current) window.clearInterval(timer.current)
      timer.current = null
    }
  }, [playing, batch, fps])

  useEffect(() => {
    if (state.cursor >= state.all.length && state.all.length > 0) {
      setPlaying(false)
    }
  }, [state.cursor, state.all.length])

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">生成过程模式：点云如何“长出来”</h1>
          <p className="mt-2 max-w-3xl text-sm text-white/70">
            选择一个缺陷原型后，图谱会从 0 点开始，按时间批量累积。你会看到：点越积越多，最后形成我们熟悉的 PRPD 形态。
          </p>
        </div>
        <label className="flex items-center gap-2 text-sm text-white/70">
          <input type="checkbox" checked={compare} onChange={(e) => setCompare(e.target.checked)} />
          对比模式（右侧显示最终形态）
        </label>
      </div>

      <section className={compare ? 'grid gap-6 xl:grid-cols-2' : 'grid gap-6'}>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-semibold">PRPD（累积生成）</div>
            <div className="text-xs text-white/55">进度：{Math.round(progress * 100)}%</div>
          </div>
          <div className="mt-3 h-[520px]">
            <PrpdChart points={state.shown} overlayPoints={state.recent} />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              className="rounded-xl bg-blue-500/80 px-4 py-2 text-sm font-semibold hover:bg-blue-500 disabled:opacity-50"
              onClick={() => setPlaying((v) => !v)}
              disabled={state.cursor >= state.all.length}
            >
              {playing ? '暂停' : '播放'}
            </button>
            <button
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
              onClick={() => {
                setPlaying(false)
                setState(initStream({ seed: 42, profile, n, noise }))
              }}
            >
              重置
            </button>
            <button
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10 disabled:opacity-50"
              onClick={() => setState((s) => stepStream(s, batch))}
              disabled={state.cursor >= state.all.length}
            >
              单步 +{batch}
            </button>

            <div className="ml-auto h-2 w-full max-w-[320px] overflow-hidden rounded-full bg-white/10">
              <div className="h-full bg-emerald-300/70" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>
        </div>

        {compare ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">最终形态（静态）</div>
              <div className="text-xs text-white/55">同一参数 · 全量点云</div>
            </div>
            <div className="mt-3 h-[520px]">
              <PrpdChart points={state.all} />
            </div>
            <div className="mt-3 text-xs text-white/60">
              教学建议：先看左边“怎么长出来”，再对照右边“最后长成什么样”。当你看到右边的形态稳定后，再回到左边观察密度是如何累积的。
            </div>
          </div>
        ) : null}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-5 lg:col-span-2">
          <div className="grid gap-4 md:grid-cols-2">
            <Control label="缺陷原型">
              <select
                value={profile}
                onChange={(e) => setProfile(e.target.value as PrpdProfile)}
                className="w-full rounded-lg border border-white/10 bg-ink-900 px-3 py-2 text-sm"
              >
                <option value="internalVoid">内部放电</option>
                <option value="surface">沿面放电</option>
                <option value="floating">悬浮电位</option>
                <option value="particle">颗粒运动</option>
                <option value="protrusion">尖端/毛刺</option>
                <option value="intermittent">间歇性放电</option>
                <option value="multiSource">多源叠加</option>
                <option value="noise">噪声/干扰</option>
              </select>
            </Control>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">
              <div className="font-semibold">教学提示</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/75">
                <li>先用小点数（2000～6000）看“形状”，再加点数看“密度”。</li>
                <li>噪声比例变大，图谱会更“糊”，但相位窗口仍可能隐约存在。</li>
                <li>多源叠加会出现两种笔触：一团云 + 一层雾。</li>
              </ul>
            </div>
          </div>

          <Control label={`点数量：${n}`}>
            <input type="range" min={2000} max={20000} step={500} value={n} onChange={(e) => setN(Number(e.target.value))} className="w-full" />
          </Control>

          <Control label={`噪声比例：${noise.toFixed(2)}`}>
            <input type="range" min={0} max={0.35} step={0.01} value={noise} onChange={(e) => setNoise(Number(e.target.value))} className="w-full" />
          </Control>

          <div className="grid gap-4 md:grid-cols-2">
            <Control label={`每帧新增点数：${batch}`}>
              <input type="range" min={40} max={800} step={20} value={batch} onChange={(e) => setBatch(Number(e.target.value))} className="w-full" />
            </Control>

            <Control label={`播放速度（FPS）：${fps}`}>
              <input type="range" min={5} max={60} step={1} value={fps} onChange={(e) => setFps(Number(e.target.value))} className="w-full" />
            </Control>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="text-sm font-semibold">怎么看懂“长出来”的过程？</div>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-white/75">
            <li>先看右侧最终形态，记住它的“指纹”。</li>
            <li>再看左侧累积：窗口先出现，密度后变厚。</li>
            <li>注意新增点（蓝色）主要落在哪些相位与幅值范围。</li>
          </ol>
          <div className="text-xs text-white/60">
            注：该模式为教学模拟，并不代表真实设备的绝对幅值/统计分布。
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
