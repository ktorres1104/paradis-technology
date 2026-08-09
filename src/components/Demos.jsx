import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  HiChatBubbleLeftRight, HiPresentationChartBar, HiArrowPathRoundedSquare, HiAcademicCap,
  HiChevronLeft, HiChevronRight,
} from 'react-icons/hi2'
import ChatbotDemo from './demos/ChatbotDemo'
import DashboardDemo from './demos/DashboardDemo'
import AutomationDemo from './demos/AutomationDemo'
import ConsultingDemo from './demos/ConsultingDemo'
import { useLanguage } from '../i18n/LanguageContext'

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  )
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [breakpoint])
  return isMobile
}

const tabMeta = [
  { id: 'bots', icon: HiChatBubbleLeftRight, Component: ChatbotDemo },
  { id: 'dashboard', icon: HiPresentationChartBar, Component: DashboardDemo },
  { id: 'automation', icon: HiArrowPathRoundedSquare, Component: AutomationDemo },
  { id: 'consulting', icon: HiAcademicCap, Component: ConsultingDemo },
]

export default function Demos() {
  const { t } = useLanguage()
  const isMobile = useIsMobile()
  const tabs = tabMeta.map((m) => ({ ...m, label: t.demos.tabs[m.id] }))
  const [active, setActive] = useState('bots')
  const activeIndex = tabs.findIndex((tab) => tab.id === active)
  const ActiveComponent = tabs[activeIndex].Component

  const goToIndex = (index) => {
    const wrapped = ((index % tabs.length) + tabs.length) % tabs.length
    setActive(tabs[wrapped].id)
  }
  const goNext = () => goToIndex(activeIndex + 1)
  const goPrev = () => goToIndex(activeIndex - 1)

  const SWIPE_THRESHOLD = 60
  const handleDragEnd = (_, info) => {
    if (info.offset.x < -SWIPE_THRESHOLD) goNext()
    else if (info.offset.x > SWIPE_THRESHOLD) goPrev()
  }

  return (
    <section id="demos" className="py-24 px-6 relative bg-[#eef0ef]">
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#161f5c] text-xs font-semibold tracking-widest uppercase">{t.demos.eyebrow}</span>
          <h2 className="font-display mt-3 text-4xl md:text-5xl font-bold text-[#14181a] tracking-tight">
            {t.demos.title}
          </h2>
          <p className="mt-4 text-[#565f63] text-lg max-w-xl mx-auto">
            {t.demos.subtitle}
          </p>
        </motion.div>

        <div className="hidden md:flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-lg border border-[#dadfdc] bg-white">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = active === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive ? 'bg-[#161f5c] text-[#f4f5f3]' : 'text-[#565f63] hover:text-[#14181a] hover:bg-white'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Mobile carousel controls: arrows + dots. Swipe is handled on the content card below. */}
        <div className="flex md:hidden flex-col items-center gap-3 mb-8">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={goPrev}
              aria-label={t.demos.prevTool}
              className="w-9 h-9 flex-shrink-0 rounded-full border border-[#dadfdc] bg-white flex items-center justify-center text-[#14181a] active:bg-[#e2e3ee] transition-colors cursor-pointer"
            >
              <HiChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2 min-w-[140px] justify-center">
              {(() => {
                const Icon = tabs[activeIndex].icon
                return <Icon className="text-[#161f5c] flex-shrink-0" size={16} />
              })()}
              <span className="text-sm font-semibold text-[#14181a]">{tabs[activeIndex].label}</span>
            </div>

            <button
              onClick={goNext}
              aria-label={t.demos.nextTool}
              className="w-9 h-9 flex-shrink-0 rounded-full border border-[#dadfdc] bg-white flex items-center justify-center text-[#14181a] active:bg-[#e2e3ee] transition-colors cursor-pointer"
            >
              <HiChevronRight size={18} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => goToIndex(i)}
                aria-label={tab.label}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex ? 'w-6 bg-[#161f5c]' : 'w-1.5 bg-[#dadfdc]'
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-6 md:p-10 rounded-xl border border-[#dadfdc] bg-white"
        >
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            drag={isMobile ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="touch-pan-y"
          >
            <ActiveComponent />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
