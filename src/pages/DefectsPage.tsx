import { Link } from 'react-router-dom'
import { cases, defectGroups } from '../data/cases'

export function DefectsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">缺陷类型</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-900/80">
          第一版以教学为主：每类缺陷用 1 个“代表性示例”讲明白图谱长相 + 背后机理。数据为合成模拟。
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {defectGroups.map((g) => (
          <div key={g.id} className="rounded-2xl border border-slate-900/10 bg-white/60 p-6">
            <div className="flex items-baseline justify-between">
              <div className="text-base font-semibold">{g.name}</div>
              <div className="text-xs text-slate-900/80">{g.tagline}</div>
            </div>
            <div className="mt-3 space-y-2">
              {cases
                .filter((c) => c.groupId === g.id)
                .map((c) => (
                  <Link
                    key={c.id}
                    to={`/case/${c.id}`}
                    className="flex items-center justify-between rounded-xl border border-slate-900/10 bg-white/60 px-4 py-3 hover:bg-white/75"
                  >
                    <div>
                      <div className="text-sm font-semibold">{c.title}</div>
                      <div className="mt-1 text-xs text-slate-900/80">{c.oneLiner}</div>
                    </div>
                    <div className="text-xs text-slate-900/80">查看 →</div>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

