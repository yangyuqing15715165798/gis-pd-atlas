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
        <Link className="text-sm text-blue-300 hover:underline" to="/defects">
          返回缺陷类型
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{c.title}</h1>
          <p className="mt-2 text-sm text-white/70">{c.oneLiner}</p>
        </div>
        <Link className="text-sm text-blue-300 hover:underline" to="/defects">
          ← 返回缺陷类型
        </Link>
      </div>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-sm font-semibold">PRPD（教学模拟）</div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-xs text-white/60">
                <input type="checkbox" checked={showMarks} onChange={(e) => setShowMarks(e.target.checked)} />
                显示标注层（关键区域）
              </label>
              <div className="text-xs text-white/50">相位 0–360° · 幅值 0–1</div>
            </div>
          </div>
          <div className="mt-3 h-[420px]">
            <PrpdChart points={points} marks={c.marks} showMarks={showMarks} />
          </div>
          <div className="mt-3 text-xs text-white/55">固定样例参数：n={c.sim.n} · noise={c.sim.noise}</div>
        </div>

        <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div>
            <div className="text-sm font-semibold">3 句话讲明白</div>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-white/75">
              {c.threeLines.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ol>
          </div>

          <div>
            <div className="text-sm font-semibold">你该看哪里（3 个点）</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/75">
              {c.lookFors.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-sm font-semibold">容易搞混</div>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/75">
              {c.pitfalls.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>

          <Link
            to="/build"
            className="block rounded-xl bg-emerald-400/15 px-4 py-3 text-sm font-semibold text-emerald-200 hover:bg-emerald-400/20"
          >
            去看：点云如何“长出来”（生成过程） →
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold">识别要点（5 条）</div>
        <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-white/75">
          {c.recognitionPoints.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ol>
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="text-sm font-semibold">为什么会这样（机理解释）</div>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-white/75">{c.explain}</p>
      </section>
    </div>
  )
}
