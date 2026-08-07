import { HiPlay, HiPause, HiArrowPath } from 'react-icons/hi2'
import { useLanguage } from '../../i18n/LanguageContext'

export default function PlayerChrome({ label, children, playing, progress, onToggle, onRestart }) {
  const { t } = useLanguage()
  const p = t.demos.player
  return (
    <div className="rounded-2xl border border-white/8 overflow-hidden" style={{ background: 'rgba(255,255,255,0.025)' }}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
        </div>
        <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full bg-rose-400 ${playing ? 'animate-pulse' : ''}`} />
          {label}
        </span>
        <div className="w-12" aria-hidden="true" />
      </div>

      <div className="p-5 md:p-6">{children}</div>

      <div className="px-4 py-3 border-t border-white/5 flex items-center gap-3">
        <button
          onClick={onToggle}
          aria-label={playing ? p.pause : p.play}
          className="w-7 h-7 flex-shrink-0 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          {playing ? <HiPause size={12} /> : <HiPlay size={12} className="ml-0.5" />}
        </button>
        <div className="flex-1 h-1 rounded-full bg-white/8 overflow-hidden">
          <div className="h-full bg-[#00d2ff] transition-[width] duration-100 ease-linear" style={{ width: `${progress}%` }} />
        </div>
        <button
          onClick={onRestart}
          aria-label={p.restart}
          className="w-7 h-7 flex-shrink-0 rounded-full bg-white/8 hover:bg-white/15 flex items-center justify-center text-white transition-colors cursor-pointer"
        >
          <HiArrowPath size={12} />
        </button>
      </div>
    </div>
  )
}
