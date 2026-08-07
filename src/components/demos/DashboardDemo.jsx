import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { HiPresentationChartBar, HiArrowTrendingUp, HiArrowTrendingDown, HiCheckCircle } from 'react-icons/hi2'
import useAutoTimeline from './useAutoTimeline'
import PlayerChrome from './PlayerChrome'

const datasets = {
  '7D': {
    kpis: { revenue: 8420, orders: 312, avgTicket: 27, retention: 64 },
    deltas: { revenue: 4.2, orders: 2.1, avgTicket: -1.4, retention: 1.8 },
    bars: [
      { label: 'Lun', value: 980 }, { label: 'Mar', value: 1120 }, { label: 'Mié', value: 890 },
      { label: 'Jue', value: 1340 }, { label: 'Vie', value: 1780 }, { label: 'Sáb', value: 1620 },
      { label: 'Dom', value: 690 },
    ],
  },
  '30D': {
    kpis: { revenue: 34900, orders: 1284, avgTicket: 27, retention: 58 },
    deltas: { revenue: 11.6, orders: 8.4, avgTicket: 2.3, retention: -0.9 },
    bars: [
      { label: 'S1', value: 7200 }, { label: 'S2', value: 8100 }, { label: 'S3', value: 9400 },
      { label: 'S4', value: 10200 },
    ],
  },
  '90D': {
    kpis: { revenue: 101300, orders: 3760, avgTicket: 27, retention: 61 },
    deltas: { revenue: 18.9, orders: 15.2, avgTicket: 0.6, retention: 5.4 },
    bars: [
      { label: 'Mes 1', value: 29800 }, { label: 'Mes 2', value: 33100 }, { label: 'Mes 3', value: 38400 },
    ],
  },
}

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

function KpiCard({ label, value, prefix = '', suffix = '', delta }) {
  const count = useCountUp(value)
  const positive = delta >= 0
  return (
    <div className="p-4 rounded-xl border border-white/5" style={{ background: 'rgba(255,255,255,0.03)' }}>
      <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{label}</p>
      <p className="mt-1.5 text-2xl font-black text-white">
        {prefix}{count.toLocaleString()}{suffix}
      </p>
      <p className={`mt-1 text-xs font-semibold flex items-center gap-1 ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>
        {positive ? <HiArrowTrendingUp size={12} /> : <HiArrowTrendingDown size={12} />}
        {Math.abs(delta)}% vs. periodo anterior
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
              className="w-full max-w-[28px] rounded-t-md bg-gradient-to-t from-[#00d2ff]/40 to-[#00d2ff]"
            />
            <span className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-semibold text-white bg-[#07091a] border border-white/10 px-1.5 py-0.5 rounded">
              ${b.value.toLocaleString()}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-medium">{b.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function DashboardDemo() {
  const { elapsed, playing, toggle, restart, progress } = useAutoTimeline(TOTAL_DURATION)
  const activeIndex = Math.min(Math.floor(elapsed / HOLD_MS), PERIOD_ORDER.length - 1)
  const period = PERIOD_ORDER[activeIndex]
  const data = datasets[period]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
      <div className="lg:col-span-2 lg:order-2">
        <span className="inline-flex items-center gap-1.5 text-[#00d2ff] text-xs font-semibold tracking-widest uppercase">
          <HiPresentationChartBar size={14} /> Dashboards de performance
        </span>
        <h3 className="mt-3 text-2xl md:text-3xl font-black text-white tracking-tight">
          Tu negocio, en una sola vista
        </h3>
        <p className="mt-4 text-slate-400 leading-relaxed">
          Ventas, análisis de performance y estado general del negocio — todo en una sola vista.
          Observa cómo se actualizan las métricas entre 7, 30 y 90 días.
        </p>
      </div>

      <div className="lg:col-span-3 lg:order-1">
        <PlayerChrome label="Demo automático · Dashboard" playing={playing} progress={progress} onToggle={toggle} onRestart={restart}>
          <div className="flex items-center justify-between mb-5">
            <p className="text-white font-bold text-sm">Performance General</p>
            <div className="flex gap-1 p-1 rounded-lg bg-white/5 border border-white/5">
              {PERIOD_ORDER.map((p) => (
                <span
                  key={p}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                    period === p ? 'bg-[#00d2ff] text-[#07091a]' : 'text-slate-500'
                  }`}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <KpiCard label="Ingresos" value={data.kpis.revenue} prefix="$" delta={data.deltas.revenue} />
            <KpiCard label="Órdenes" value={data.kpis.orders} delta={data.deltas.orders} />
            <KpiCard label="Ticket Prom." value={data.kpis.avgTicket} prefix="$" delta={data.deltas.avgTicket} />
            <KpiCard label="Retención" value={data.kpis.retention} suffix="%" delta={data.deltas.retention} />
          </div>

          <BarChart bars={data.bars} />

          <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-x-5 gap-y-2">
            {['Inventario sincronizado', 'Bot respondiendo en <2 min', 'Reportes al día'].map((s) => (
              <span key={s} className="flex items-center gap-1.5 text-xs text-slate-400">
                <HiCheckCircle className="text-emerald-400" size={14} /> {s}
              </span>
            ))}
          </div>
        </PlayerChrome>
      </div>
    </div>
  )
}
