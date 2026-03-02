import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="space-y-10">
      <section className="oc-panel p-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="oc-pill inline-flex items-center gap-2 px-3 py-1 text-xs text-slate-900/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80" />
              标准样例已固化 · 可教学复用
            </div>
            <h1 className="oc-title mt-4 text-4xl font-semibold leading-tight">把 GIS 局放（PD）图谱讲明白</h1>
            <p className="mt-4 max-w-3xl text-slate-900/80">
              用“图谱 + 标注 + 生成过程 + 速查流程”帮助新人理解 PRPD：点从哪里来、为什么会聚成这样的形状、如何快速区分典型缺陷。
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link className="oc-btn oc-btn--primary" to="/defects">
              从缺陷类型开始
            </Link>
            <Link className="oc-btn" to="/quickref">
              先看速查流程
            </Link>
            <Link className="oc-btn" to="/build">
              看点云怎么长出来
            </Link>
          </div>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-3">
          <Feature title="机理对齐" desc="按参考资料与图谱特征校准：电晕/悬浮/颗粒/空穴/沿面。" />
          <Feature title="标注层" desc="每个案例提供关键区域标注，适合讲解与对照记忆。" />
          <Feature title="生成过程" desc="播放/暂停累积生成，新增点高亮，对照最终形态。" />
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <QuickLink to="/case/corona" title="电晕放电" tip="偏一边半周（极性效应）" />
        <QuickLink to="/case/floating" title="悬浮放电" tip="正负半周对称，幅值偏大" />
        <QuickLink to="/case/particle" title="自由颗粒" tip="全相位铺开，离散且幅值宽" />
      </section>

      <section className="oc-panel--subtle p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="oc-title text-2xl font-semibold">一分钟教学提示</h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-900/80">
              先看对称，再看极性偏置，再看是否全相位覆盖——这三个问题通常能把方向锁定到 80%。
            </p>
          </div>
          <Link className="oc-btn" to="/quickref">
            打开速查 →
          </Link>
        </div>
      </section>
    </div>
  )
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-slate-900/10 bg-white/60 p-5">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-slate-900/80">{desc}</div>
    </div>
  )
}

function QuickLink({ to, title, tip }: { to: string; title: string; tip: string }) {
  return (
    <Link to={to} className="oc-panel--subtle p-6 hover:bg-white/60">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs text-slate-900/80">{tip}</div>
      <div className="mt-4 text-xs text-slate-900/80">查看案例 →</div>
    </Link>
  )
}

