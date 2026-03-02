import { defectGroups, cases } from '../data/cases'

export function QuickRefPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">PRPD 快速对照（教学速查）</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-900/80">
          这是一份站内原创的“看图思路”速查：先看对称/极性，再看分布宽窄与幅值拖尾。用于教学入门，不替代工程诊断。
        </p>
      </div>

      
      <section className="rounded-2xl border border-slate-900/10 bg-white/60 p-6">
        <div className="text-sm font-semibold">判断流程（先看什么，再看什么）</div>
        <div className="mt-3 grid gap-3 md:grid-cols-5">
          <Step title="① 对称吗？" desc="正负半周是否相似" />
          <Arrow />
          <Step title="② 偏半周吗？" desc="是否明显偏一边（极性效应）" />
          <Arrow />
          <Step title="③ 全相位吗？" desc="是否 0–360° 都铺开" />
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <Mini title="对称 + 八字/散但有规律" desc="更像悬浮" />
          <Mini title="偏半周 + 弱但密" desc="更像电晕" />
          <Mini title="全相位 + 离散 + 幅值宽" desc="更像颗粒" />
          <Mini title="对称但更散/拖尾更长" desc="空穴 vs 沿面（沿面更散）" />
        </div>
        <div className="mt-3 text-xs text-slate-900/80">
          提醒：这是教学速查。工程诊断建议结合 PRPS、示波器波形、趋势，以及超声/气体分解产物等多手段联合判断。
        </div>
      </section><div className="grid gap-6 md:grid-cols-2">
        {defectGroups.map((g) => (
          <div key={g.id} className="rounded-2xl border border-slate-900/10 bg-white/60 p-6">
            <div className="flex items-baseline justify-between">
              <div className="text-base font-semibold">{g.name}</div>
              <div className="text-xs text-slate-900/80">{g.tagline}</div>
            </div>
            <div className="mt-3 space-y-3">
              {cases
                .filter((c) => c.groupId === g.id)
                .map((c) => (
                  <div key={c.id} className="rounded-xl border border-slate-900/10 bg-white/60 p-4">
                    <div className="text-sm font-semibold">{c.title}</div>
                    <div className="mt-1 text-xs text-slate-900/80">{c.oneLiner}</div>
                    <div className="mt-3 text-xs font-semibold text-slate-900/80">识别要点：</div>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-900/80">
                      {c.recognitionPoints.slice(0, 3).map((t: string) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    <div className="mt-2 text-xs text-slate-900/80">（点进案例页可看完整 5 条要点与标注层）</div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


function Step({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-slate-900/10 bg-white/60 p-4">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs text-slate-900/80">{desc}</div>
    </div>
  )
}

function Arrow() {
  return (
    <div className="hidden items-center justify-center md:flex">
      <div className="text-slate-900/80">→</div>
    </div>
  )
}

function Mini({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-xl border border-slate-900/10 bg-white/60 p-4">
      <div className="text-xs font-semibold text-slate-900/80">{title}</div>
      <div className="mt-1 text-xs text-slate-900/80">{desc}</div>
    </div>
  )
}

