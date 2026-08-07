import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  HiChartBar,
  HiLightBulb,
  HiCpuChip,
  HiCog6Tooth,
  HiClipboardDocumentList,
} from 'react-icons/hi2'
import { useLanguage } from '../i18n/LanguageContext'

const icons = [HiChartBar, HiLightBulb, HiCpuChip, HiCog6Tooth, HiClipboardDocumentList]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function Services() {
  const { t } = useLanguage()
  const services = t.services.items.map((item, i) => ({ ...item, icon: icons[i] }))
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" className="py-24 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-900/10 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#00d2ff] text-xs font-semibold tracking-widest uppercase">{t.services.eyebrow}</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-white tracking-tight">
            {t.services.title}
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
            {t.services.subtitle}
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((svc, i) => {
            const Icon = svc.icon
            const isLast = i === services.length - 1
            return (
              <motion.div
                key={svc.title}
                variants={cardVariant}
                className={`group relative p-7 rounded-2xl border border-white/5 bg-white/2 hover:border-[#00d2ff]/20 hover:bg-[#00d2ff]/3 transition-all duration-300 cursor-default ${
                  isLast ? 'md:col-start-auto lg:col-start-2' : ''
                }`}
                style={{ background: 'rgba(255,255,255,0.025)' }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse at top left, rgba(0,210,255,0.05), transparent 60%)' }}
                />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-[#00d2ff]/10 border border-[#00d2ff]/20 flex items-center justify-center mb-5 group-hover:bg-[#00d2ff]/15 transition-colors duration-300">
                    <Icon className="text-[#00d2ff]" size={22} />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#00d2ff] transition-colors duration-300">
                    {svc.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    {svc.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {svc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs font-medium text-slate-400 border border-white/5 bg-white/3"
                        style={{ background: 'rgba(255,255,255,0.04)' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-500 text-sm">
            {t.services.notSure}{' '}
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[#00d2ff] hover:underline cursor-pointer"
            >
              {t.services.talkGoals}
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
