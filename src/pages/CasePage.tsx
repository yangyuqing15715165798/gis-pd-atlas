import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { casesById } from '../data/cases'
import { PrpdChart } from '../viz/PrpdChart'
import { generatePrpdPoints } from '../viz/prpd'

export function CasePage() {
  const { caseId } = useParams()
  const c = caseId ? casesById[caseId] : undefined
  const [showMarks, setShowMarks] = useState(true)

  const points = useMemo(() => {
    if (!c) return []
    return generatePrpdPoints({ seed: c.seed, profile: c.profile, n: c.sim.n, noise: c.sim.noise })
  }, [c])

  if (!c) {
    return (
      <div className="space-y-4">
        <div className="text-lg font-semibold">未找到该案例</div>
        <Link className="text-sm text-blue-200 hover:underline" to="/defects">
          返回缺陷类型
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <header className="oc-panel p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="oc-pill inline-flex items-center gap-2 px-3 py-1 text-xs text-slate-900/80">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-300/80" />
              案例 · 标准样例
            </div>
            <h1 className="oc-title mt-4 text-3xl font-semibold leading-tight">{c.title}</h1>
            <p className="mt-3 max-w-4xl text-sm text-slate-900/80">{c.oneLiner}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link className="oc-btn" to="/defects">
              ← 返回缺陷类型
            </Link>
            <Link className="oc-btn" to="/quickref">
              速查
            </Link>
            <Link className="oc-btn" to="/build">
              生成过程
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Stat label="点数 n" value={String(c.sim.n)} />
          <Stat label="噪声 noise" value={String(c.sim.noise)} />
          <Stat label="关键" value={c.lookFors[0] ?? '—'} />
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 oc-panel p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold">PRPD（教学模拟）</div>
              <div className="mt-1 text-xs text-slate-900/80">相位 0–360° · 幅值 0–1</div>
            </div>

            <label className="oc-pill flex items-center gap-2 px-3 py-1 text-xs text-slate-900/80">
              <input type="checkbox" checked={showMarks} onChange={(e) => setShowMarks(e.target.checked)} />
              标注层
            </label>
          </div>

          <div className="mt-3 h-[460px]">
            <PrpdChart points={points} marks={c.marks} showMarks={showMarks} />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <MiniBlock title="3 句话讲明白" tone="blue">
              <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-900/80">
                {c.threeLines.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            </MiniBlock>

            <MiniBlock title="你该看哪里（3 个点）" tone="aqua">
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-900/80">
                {c.lookFors.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </MiniBlock>
          </div>
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <div className="oc-panel p-6">
            <div className="text-sm font-semibold">识别要点（5 条）</div>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-900/80">
              {c.recognitionPoints.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ol>
          </div>

          <div className="oc-panel--subtle p-6">
            <div className="text-sm font-semibold">容易搞混</div>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-900/80">
              {c.pitfalls.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-900/10 bg-gradient-to-br from-white/10 to-white/5 p-6">
            <div className="text-sm font-semibold">机理解释</div>
            <p className="mt-3 text-sm leading-relaxed text-slate-900/80">{c.explain}</p>
          </div>
        </aside>
      </section>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-900/10 bg-white/60 p-4">
      <div className="text-xs text-slate-900/80">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-900/80">{value}</div>
    </div>
  )
}

function MiniBlock({
  title,
  children,
  tone,
}: {
  title: string
  children: React.ReactNode
  tone: 'blue' | 'aqua'
}) {
  const bar = tone === 'blue' ? 'bg-blue-400/60' : 'bg-emerald-300/70'
  return (
    <div className="rounded-2xl border border-slate-900/10 bg-white/60 p-5">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">{title}</div>
        <div className={`h-1.5 w-10 rounded-full ${bar}`} />
      </div>
      <div className="mt-3">{children}</div>
    </div>
  )
}

