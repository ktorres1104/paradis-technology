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
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#161f5c] text-xs font-semibold tracking-widest uppercase">{t.services.eyebrow}</span>
          <h2 className="font-display mt-3 text-4xl md:text-5xl font-bold text-[#14181a] tracking-tight">
            {t.services.title}
          </h2>
          <p className="mt-4 text-[#565f63] text-lg max-w-xl mx-auto">
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
                className={`group relative p-7 rounded-lg border border-[#dadfdc] bg-white hover:border-[#161f5c]/30 transition-all duration-300 cursor-default ${
                  isLast ? 'md:col-start-auto lg:col-start-2' : ''
                }`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-[#161f5c]/10 border border-[#161f5c]/20 flex items-center justify-center mb-5 group-hover:bg-[#161f5c]/15 transition-colors duration-300">
                    <Icon className="text-[#161f5c]" size={22} />
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#14181a] mb-3 group-hover:text-[#161f5c] transition-colors duration-300">
                    {svc.title}
                  </h3>
                  <p className="text-[#565f63] text-sm leading-relaxed mb-5">
                    {svc.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {svc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md text-xs font-medium text-[#565f63] border border-[#dadfdc] bg-[#e2e3ee]"
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
          <p className="text-[#75797d] text-sm">
            {t.services.notSure}{' '}
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-[#161f5c] hover:underline cursor-pointer"
            >
              {t.services.talkGoals}
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
