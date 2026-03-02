import { defectGroups, cases } from '../data/cases'

export function QuickRefPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">PRPD 快速对照（教学速查）</h1>
        <p className="mt-2 max-w-3xl text-sm text-white/70">
          这是一份站内原创的“看图思路”速查：先看对称/极性，再看分布宽窄与幅值拖尾。用于教学入门，不替代工程诊断。
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {defectGroups.map((g) => (
          <div key={g.id} className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-baseline justify-between">
              <div className="text-base font-semibold">{g.name}</div>
              <div className="text-xs text-white/55">{g.tagline}</div>
            </div>
            <div className="mt-3 space-y-3">
              {cases
                .filter((c) => c.groupId === g.id)
                .map((c) => (
                  <div key={c.id} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-sm font-semibold">{c.title}</div>
                    <div className="mt-1 text-xs text-white/60">{c.oneLiner}</div>
                    <div className="mt-3 text-xs font-semibold text-white/70">识别要点：</div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/75">
                      {c.recognitionPoints.slice(0, 3).map((t: string) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    <div className="mt-2 text-xs text-white/55">（点进案例页可看完整 5 条要点与标注层）</div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

