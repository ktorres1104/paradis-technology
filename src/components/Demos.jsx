import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiChatBubbleLeftRight, HiPresentationChartBar, HiArrowPathRoundedSquare, HiAcademicCap } from 'react-icons/hi2'
import ChatbotDemo from './demos/ChatbotDemo'
import DashboardDemo from './demos/DashboardDemo'
import AutomationDemo from './demos/AutomationDemo'
import ConsultingDemo from './demos/ConsultingDemo'

const tabs = [
  { id: 'bots', label: 'Bots', icon: HiChatBubbleLeftRight, Component: ChatbotDemo },
  { id: 'dashboard', label: 'Dashboard', icon: HiPresentationChartBar, Component: DashboardDemo },
  { id: 'automation', label: 'Automatización', icon: HiArrowPathRoundedSquare, Component: AutomationDemo },
  { id: 'consulting', label: 'Consultoría', icon: HiAcademicCap, Component: ConsultingDemo },
]

export default function Demos() {
  const [active, setActive] = useState('bots')
  const ActiveComponent = tabs.find((t) => t.id === active).Component

  return (
    <section id="demos" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[#00d2ff]/3 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#00d2ff] text-xs font-semibold tracking-widest uppercase">Pruébalo tú mismo</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-white tracking-tight">
            Nuestras Herramientas en Acción
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
            Los primeros tres se reproducen solos, como una grabación. El último es interactivo —
            contesta y recibe tu recomendación.
          </p>
        </motion.div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex flex-wrap justify-center gap-1.5 p-1.5 rounded-2xl border border-white/8" style={{ background: 'rgba(255,255,255,0.02)' }}>
            {tabs.map((t) => {
              const Icon = t.icon
              const isActive = active === t.id
              return (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive ? 'bg-[#00d2ff] text-[#07091a]' : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} />
                  {t.label}
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
          className="p-6 md:p-10 rounded-3xl border border-white/5"
          style={{ background: 'rgba(255,255,255,0.015)' }}
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
