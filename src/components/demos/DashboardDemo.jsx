import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { HiPresentationChartBar, HiArrowTrendingUp, HiArrowTrendingDown, HiCheckCircle } from 'react-icons/hi2'
import useAutoTimeline from './useAutoTimeline'
import PlayerChrome from './PlayerChrome'
import { useLanguage } from '../../i18n/LanguageContext'

// Each period holds for HOLD_MS before the "recording" advances to the next.
const PERIOD_ORDER = ['7D', '30D', '90D']
const HOLD_MS = 4200
const TOTAL_DURATION = PERIOD_ORDER.length * HOLD_MS

function useCountUp(target, duration = 900) {
  const [count, setCount] = useState(target)
  const prev = useRef(target)
  useEffect(() => {
    const from = prev.current
    let startTime = null
    let raf
    const step = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(from + (target - from) * eased))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    prev.current = target
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return count
}

function KpiCard({ label, value, prefix = '', suffix = '', delta, vsLabel }) {
  const count = useCountUp(value)
  const positive = delta >= 0
  return (
    <div className="p-4 rounded-lg border border-[#dadfdc] bg-[#f4f5f3]">
      <p className="text-xs text-[#75797d] font-medium uppercase tracking-wider">{label}</p>
      <p className="mt-1.5 text-2xl font-black text-[#14181a]">
        {prefix}{count.toLocaleString()}{suffix}
      </p>
      <p className={`mt-1 text-xs font-semibold flex items-center gap-1 ${positive ? 'text-emerald-600' : 'text-rose-600'}`}>
        {positive ? <HiArrowTrendingUp size={12} /> : <HiArrowTrendingDown size={12} />}
        {Math.abs(delta)}% {vsLabel}
      </p>
    </div>
  )
}

function BarChart({ bars }) {
  const max = Math.max(...bars.map((b) => b.value))
  return (
    <div className="flex items-end justify-between gap-2 h-40 px-1">
      {bars.map((b, i) => (
        <div key={b.label} className="flex-1 flex flex-col items-center gap-2 group">
          <div className="relative w-full flex items-end justify-center" style={{ height: '128px' }}>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${(b.value / max) * 100}%` }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-[28px] rounded-t-md bg-gradient-to-t from-[#161f5c]/40 to-[#161f5c]"
            />
            <span className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-semibold text-[#14181a] bg-[#f4f5f3] border border-[#dadfdc] px-1.5 py-0.5 rounded">
              ${b.value.toLocaleString()}
            </span>
          </div>
          <span className="text-[10px] text-[#75797d] font-medium">{b.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function DashboardDemo() {
  const { t } = useLanguage()
  const d = t.demos.dashboard
  const { elapsed, playing, toggle, restart, progress } = useAutoTimeline(TOTAL_DURATION)
  const activeIndex = Math.min(Math.floor(elapsed / HOLD_MS), PERIOD_ORDER.length - 1)
  const period = PERIOD_ORDER[activeIndex]
  const data = d.datasets[period]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
      <div className="lg:col-span-2 lg:order-2">
        <span className="inline-flex items-center gap-1.5 text-[#161f5c] text-xs font-semibold tracking-widest uppercase">
          <HiPresentationChartBar size={14} /> {d.eyebrow}
        </span>
        <h3 className="font-display mt-3 text-2xl md:text-3xl font-bold text-[#14181a] tracking-tight">
          {d.title}
        </h3>
        <p className="mt-4 text-[#565f63] leading-relaxed">
          {d.subtitle}
        </p>
      </div>

      <div className="lg:col-span-3 lg:order-1">
        <PlayerChrome label={d.demoLabel} playing={playing} progress={progress} onToggle={toggle} onRestart={restart}>
          <div className="flex items-center justify-between mb-5">
            <p className="text-[#14181a] font-bold text-sm">{d.panelTitle}</p>
            <div className="flex gap-1 p-1 rounded-lg bg-white border border-[#dadfdc]">
              {PERIOD_ORDER.map((p) => (
                <span
                  key={p}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    period === p ? 'bg-[#161f5c] text-[#f4f5f3]' : 'text-[#75797d]'
                  }`}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <KpiCard label={d.kpis.revenue} value={data.kpis.revenue} prefix="$" delta={data.deltas.revenue} vsLabel={d.vsLabel} />
            <KpiCard label={d.kpis.orders} value={data.kpis.orders} delta={data.deltas.orders} vsLabel={d.vsLabel} />
            <KpiCard label={d.kpis.avgTicket} value={data.kpis.avgTicket} prefix="$" delta={data.deltas.avgTicket} vsLabel={d.vsLabel} />
            <KpiCard label={d.kpis.retention} value={data.kpis.retention} suffix="%" delta={data.deltas.retention} vsLabel={d.vsLabel} />
          </div>

          <BarChart bars={data.bars} />

          <div className="mt-6 pt-4 border-t border-[#dadfdc] flex flex-wrap gap-x-5 gap-y-2">
            {d.checklist.map((s) => (
              <span key={s} className="flex items-center gap-1.5 text-xs text-[#565f63]">
                <HiCheckCircle className="text-emerald-600" size={14} /> {s}
              </span>
            ))}
          </div>
        </PlayerChrome>
      </div>
    </div>
  )
}
