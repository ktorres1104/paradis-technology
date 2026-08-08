import { motion } from 'framer-motion'
import {
  HiArrowPathRoundedSquare, HiChatBubbleLeftRight, HiCpuChip, HiCircleStack,
  HiSparkles, HiCheckCircle, HiShoppingBag, HiClipboardDocumentList, HiBellAlert,
} from 'react-icons/hi2'
import useAutoTimeline from './useAutoTimeline'
import PlayerChrome from './PlayerChrome'
import { useLanguage } from '../../i18n/LanguageContext'

// Two example flows shown back to back, to give a sense of range rather than
// a single fixed use case. Icons are positional and paired with translated
// node text by index.
const flowIcons = [
  [HiChatBubbleLeftRight, HiCpuChip, HiCircleStack, HiSparkles, HiCheckCircle],
  [HiShoppingBag, HiCircleStack, HiClipboardDocumentList, HiBellAlert, HiCheckCircle],
]

const STEP_MS = 700
const HOLD_MS = 1600
const NODES_COUNT = flowIcons[0].length
const FLOW_DURATION = STEP_MS * NODES_COUNT + HOLD_MS
const TOTAL_DURATION = FLOW_DURATION * flowIcons.length

export default function AutomationDemo() {
  const { t } = useLanguage()
  const a = t.demos.automation
  const flows = a.flows.map((f, fi) => ({
    ...f,
    nodes: f.nodes.map((n, ni) => ({ ...n, icon: flowIcons[fi][ni] })),
  }))

  const { elapsed, playing, toggle, restart, progress } = useAutoTimeline(TOTAL_DURATION)

  const flowIndex = Math.min(Math.floor(elapsed / FLOW_DURATION), flows.length - 1)
  const localElapsed = elapsed - flowIndex * FLOW_DURATION
  const runningPhaseEnd = STEP_MS * NODES_COUNT
  const active = localElapsed < runningPhaseEnd ? Math.min(Math.floor(localElapsed / STEP_MS), NODES_COUNT - 1) : -1
  const done = localElapsed >= runningPhaseEnd
  const flow = flows[flowIndex]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
      <div className="lg:col-span-2">
        <span className="inline-flex items-center gap-1.5 text-[#161f5c] text-xs font-semibold tracking-widest uppercase">
          <HiArrowPathRoundedSquare size={14} /> {a.eyebrow}
        </span>
        <h3 className="font-display mt-3 text-2xl md:text-3xl font-bold text-[#14181a] tracking-tight">
          {a.title}
        </h3>
        <p className="mt-4 text-[#565f63] leading-relaxed">
          {a.subtitle}
        </p>
      </div>

      <div className="lg:col-span-3">
        <PlayerChrome label={a.demoLabel.replace('{name}', flow.name)} playing={playing} progress={progress} onToggle={toggle} onRestart={restart}>
          <div className="relative rounded-lg -m-2 p-2" style={{ backgroundImage: 'radial-gradient(rgba(20,24,26,0.06) 1px, transparent 1px)', backgroundSize: '18px 18px' }}>
            <div className="hidden md:block absolute top-9 left-9 right-9 h-px bg-[#dadfdc]">
              {active >= 0 && (
                <motion.div
                  className="absolute top-0 w-2.5 h-2.5 rounded-full bg-[#161f5c] -translate-y-1/2 -translate-x-1/2"
                  style={{ boxShadow: '0 0 8px 2px rgba(22,31,92,0.6)' }}
                  animate={{ left: `${(active / (NODES_COUNT - 1)) * 100}%` }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-2">
              {flow.nodes.map((n, i) => {
                const Icon = n.icon
                const isActive = active === i
                const isPast = active > i || done
                return (
                  <div key={n.title} className="flex md:flex-col items-center gap-3 md:gap-3 md:text-center relative">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.15 : 1,
                        borderColor: isActive || isPast ? 'rgba(22,31,92,0.6)' : 'rgba(20,24,26,0.12)',
                        backgroundColor: isActive || isPast ? 'rgba(22,31,92,0.12)' : 'rgba(20,24,26,0.02)',
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-14 h-14 flex-shrink-0 rounded-lg border flex items-center justify-center relative z-10"
                    >
                      <Icon className={isActive || isPast ? 'text-[#161f5c]' : 'text-[#75797d]'} size={22} />
                      {isActive && (
                        <motion.span
                          className="absolute inset-0 rounded-lg border-2 border-[#161f5c]"
                          initial={{ opacity: 0.6, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.4 }}
                          transition={{ duration: 0.7, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                    <div className="md:mt-1">
                      <p className={`text-xs md:text-sm font-bold ${isActive ? 'text-[#161f5c]' : 'text-[#14181a]'}`}>{n.title}</p>
                      <p className="text-[11px] text-[#75797d] mt-0.5 leading-snug max-w-[130px] md:mx-auto">{n.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-[#dadfdc] text-center">
            {done ? (
              <p className="text-sm text-emerald-600 font-semibold flex items-center justify-center gap-1.5">
                <HiCheckCircle size={16} /> {a.doneText}
              </p>
            ) : (
              <p className="text-sm text-[#75797d]">{a.runningText}</p>
            )}
          </div>
        </PlayerChrome>
      </div>
    </div>
  )
}
