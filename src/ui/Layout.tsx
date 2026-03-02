import type { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-full">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <div className="flex items-baseline gap-3">
            <div className="text-lg font-semibold tracking-wide">GIS 局放图谱与动画库</div>
            <div className="text-xs text-white/55">教学模拟 · PRPD 可视化</div>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <TopNav to="/">首页</TopNav>
            <TopNav to="/defects">缺陷类型</TopNav>
            <TopNav to="/animations">动画演示</TopNav>
            <TopNav to="/build">生成过程</TopNav>
            <TopNav to="/quickref">速查</TopNav>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>

      <footer className="border-t border-white/10 bg-ink-950/60">
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
          'rounded-md px-3 py-1.5 transition',
          isActive ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white',
        ].join(' ')
      }
    >
      {children}
    </NavLink>
  )
}
