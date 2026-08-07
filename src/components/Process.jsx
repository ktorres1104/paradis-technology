import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { HiMagnifyingGlass, HiMap, HiWrenchScrewdriver, HiRocketLaunch } from 'react-icons/hi2'
import { useLanguage } from '../i18n/LanguageContext'

const icons = [HiMagnifyingGlass, HiMap, HiWrenchScrewdriver, HiRocketLaunch]

export default function Process() {
  const { t } = useLanguage()
  const steps = t.process.steps.map((s, i) => ({ ...s, step: String(i + 1).padStart(2, '0'), icon: icons[i] }))
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="process" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-900/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#00d2ff] text-xs font-semibold tracking-widest uppercase">{t.process.eyebrow}</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-white tracking-tight">
            {t.process.title}
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
            {t.process.subtitle}
          </p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#00d2ff]/20 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#00d2ff]/10 border border-[#00d2ff]/25 flex items-center justify-center">
                      <Icon className="text-[#00d2ff]" size={26} />
                    </div>
                    <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#07091a] border border-[#00d2ff]/40 text-[10px] font-bold text-[#00d2ff] flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="text-white font-bold text-lg mb-3">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-[#07091a] bg-[#00d2ff] hover:bg-[#00aacc] transition-colors duration-200 shadow-lg shadow-[#00d2ff]/20 cursor-pointer"
          >
            {t.process.cta}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
