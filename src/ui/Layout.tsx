import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-baseline gap-3">
              <div className="oc-title text-lg font-semibold tracking-tight">GIS 局放图谱与动画库</div>
              <div className="hidden sm:block oc-pill px-3 py-1 text-xs text-white/60">教学模拟 · PRPD 可视化</div>
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
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>

      <footer className="mt-10 border-t border-white/10 bg-black/10">
        <div className="mx-auto max-w-6xl px-5 py-8 text-xs text-white/55">
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
          'border border-white/10 bg-white/5 hover:bg-white/10',
          isActive ? 'text-white border-white/20 bg-white/10' : 'text-white/75',
        ].join(' ')
      }
    >
      {children}
    </NavLink>
  )
}
