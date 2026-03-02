import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-50 border-b border-slate-900/10 bg-white/65 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-baseline gap-3">
              <div className="oc-title text-lg font-semibold tracking-tight text-slate-900/90">GIS 局放图谱与动画库</div>
              <div className="hidden sm:block oc-pill px-3 py-1 text-xs text-slate-800/70">教学模拟 · PRPD 可视化</div>
            </div>

            <nav className="flex flex-wrap items-center gap-2 text-sm">
              <TopNav to="/">首页</TopNav>
              <TopNav to="/defects">缺陷类型</TopNav>
              <TopNav to="/quickref">速查</TopNav>
              <TopNav to="/animations">动画演示</TopNav>
              <TopNav to="/build">生成过程</TopNav>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>

      <footer className="mt-10 border-t border-slate-900/10 bg-white/55">
        <div className="mx-auto max-w-6xl px-5 py-8 text-xs text-slate-700">
          <div>说明：本网站图谱与数据为教学模拟（非真实设备数据），用于解释 PRPD/局放机理与典型形态。</div>
          <div className="mt-2">合作：可定制企业内训版本、报告可视化模板、真实案例的图谱+动画包装。</div>
        </div>
      </footer>
    </div>
  )
}

function TopNav({ to, children }: { to: string; children: ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'rounded-full px-3 py-1.5 transition',
          'border border-slate-900/10 bg-white/60 hover:bg-white/85',
          isActive ? 'text-slate-900 border-slate-900/20 bg-white' : 'text-slate-700',
        ].join(' ')
      }
    >
      {children}
    </NavLink>
  )
}
