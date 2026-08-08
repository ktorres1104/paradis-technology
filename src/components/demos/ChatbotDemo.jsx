import { useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiSparkles } from 'react-icons/hi2'
import useAutoTimeline from './useAutoTimeline'
import PlayerChrome from './PlayerChrome'
import { useLanguage } from '../../i18n/LanguageContext'

const FINAL_PAUSE = 2500

export default function ChatbotDemo() {
  const { t } = useLanguage()
  const c = t.demos.chatbot
  const rawScript = c.script

  const starts = useMemo(
    () =>
      rawScript.reduce((acc, step, i) => {
        acc.push(i === 0 ? 0 : acc[i - 1] + rawScript[i - 1].dur)
        return acc
      }, []),
    [rawScript]
  )
  const TOTAL_DURATION = starts[starts.length - 1] + rawScript[rawScript.length - 1].dur + FINAL_PAUSE

  const { elapsed, playing, toggle, restart, progress } = useAutoTimeline(TOTAL_DURATION)
  const scrollRef = useRef(null)

  const visible = rawScript.filter((s, i) => elapsed >= starts[i] && s.role !== 'typing')
  const typingActive = rawScript.some((s, i) => s.role === 'typing' && elapsed >= starts[i] && elapsed < starts[i] + s.dur)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [visible.length, typingActive])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
      <div className="lg:col-span-2">
        <span className="inline-flex items-center gap-1.5 text-[#161f5c] text-xs font-semibold tracking-widest uppercase">
          <HiSparkles size={14} /> {c.eyebrow}
        </span>
        <h3 className="font-display mt-3 text-2xl md:text-3xl font-bold text-[#14181a] tracking-tight">
          {c.title}
        </h3>
        <p className="mt-4 text-[#565f63] leading-relaxed">
          {c.subtitle}
        </p>
        <ul className="mt-6 space-y-2.5 text-sm text-[#565f63]">
          {c.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#161f5c]" /> {b}</li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-3">
        <PlayerChrome label={c.demoLabel.replace('{name}', c.businessName)} playing={playing} progress={progress} onToggle={toggle} onRestart={restart}>
          <div className="flex items-center gap-3 pb-4 mb-1 border-b border-[#dadfdc]">
            <div className="w-9 h-9 rounded-full bg-[#161f5c]/15 border border-[#161f5c]/30 flex items-center justify-center">
              <HiSparkles className="text-[#161f5c]" size={16} />
            </div>
            <div>
              <p className="text-[#14181a] text-sm font-semibold">{c.businessName}</p>
              <p className="text-xs text-[#75797d] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> {c.assistantLabel}
              </p>
            </div>
          </div>

          <div ref={scrollRef} className="h-80 overflow-y-auto pt-3 space-y-3">
            <AnimatePresence initial={false}>
              {visible.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-lg text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#161f5c] text-[#f4f5f3] rounded-br-sm font-medium'
                        : 'bg-[#f4f5f3] text-[#3a3f45] rounded-bl-sm border border-[#dadfdc]'
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typingActive && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-start">
                  <div className="px-4 py-3 rounded-lg rounded-bl-sm bg-[#f4f5f3] border border-[#dadfdc] flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full bg-[#75797d] animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </PlayerChrome>
      </div>
    </div>
  )
}
