import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiChatBubbleLeftRight, HiPresentationChartBar, HiArrowPathRoundedSquare, HiAcademicCap } from 'react-icons/hi2'
import ChatbotDemo from './demos/ChatbotDemo'
import DashboardDemo from './demos/DashboardDemo'
import AutomationDemo from './demos/AutomationDemo'
import ConsultingDemo from './demos/ConsultingDemo'
import { useLanguage } from '../i18n/LanguageContext'

const tabMeta = [
  { id: 'bots', icon: HiChatBubbleLeftRight, Component: ChatbotDemo },
  { id: 'dashboard', icon: HiPresentationChartBar, Component: DashboardDemo },
  { id: 'automation', icon: HiArrowPathRoundedSquare, Component: AutomationDemo },
  { id: 'consulting', icon: HiAcademicCap, Component: ConsultingDemo },
]

export default function Demos() {
  const { t } = useLanguage()
  const tabs = tabMeta.map((m) => ({ ...m, label: t.demos.tabs[m.id] }))
  const [active, setActive] = useState('bots')
  const ActiveComponent = tabs.find((tab) => tab.id === active).Component

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

        <div className="flex justify-center mb-10">
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
          >
            <ActiveComponent />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
