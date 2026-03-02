import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-semibold tracking-tight">把 GIS 局放（PD）图谱讲明白</h1>
        <p className="mt-4 max-w-3xl text-white/75">
          这里用“图谱 + 动画 + 人话解释”帮助新人快速理解 PRPD 这类局放图谱：点是怎么来的、为什么会聚成这样的形状、不同缺陷的典型特征是什么。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="rounded-xl bg-blue-500/80 px-4 py-2 text-sm font-medium hover:bg-blue-500" to="/defects">
            从缺陷类型开始
          </Link>
          <Link className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10" to="/animations">
            3 分钟搞懂 PRPD（动画）
          </Link>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <Card title="按缺陷对照" desc="内部放电、沿面放电、悬浮电位、颗粒运动… 每类都有图谱与解释。" />
        <Card title="看哪里最关键" desc="每个案例只强调 3 个特征点：相位窗口、对称性、密度与强弱。" />
        <Card title="动画讲机理" desc="用可调参数的模拟点云，解释“点从哪里来、为什么会这样聚”。" />
      </section>

      <section className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8">
        <h2 className="text-xl font-semibold">快速入口</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <QuickLink to="/case/internal-void" title="内部放电（示例）" tip="最经典的 PRPD 入门" />
          <QuickLink to="/case/floating" title="悬浮电位（示例）" tip="像金属小片没接地" />
          <QuickLink to="/case/particle" title="颗粒运动（示例）" tip="放电点会漂移" />
        </div>
      </section>
    </div>
  )
}

function Card({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="text-base font-semibold">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-white/70">{desc}</div>
    </div>
  )
}

function QuickLink({ to, title, tip }: { to: string; title: string; tip: string }) {
  return (
    <Link to={to} className="rounded-xl border border-white/10 bg-white/5 p-4 hover:bg-white/10">
      <div className="text-sm font-semibold">{title}</div>
      <div className="mt-1 text-xs text-white/60">{tip}</div>
    </Link>
  )
}
