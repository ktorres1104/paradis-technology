import { motion } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi2'
import { useLanguage } from '../i18n/LanguageContext'

export default function FAQ() {
  const { t } = useLanguage()

  return (
    <section id="faq" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00d2ff]/3 blur-3xl rounded-full" />
      </div>

      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#00d2ff] text-xs font-semibold tracking-widest uppercase">{t.faq.eyebrow}</span>
          <h2 className="mt-3 text-4xl md:text-5xl font-black text-white tracking-tight">
            {t.faq.title}
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
            {t.faq.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-3"
        >
          {t.faq.items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-white/5 px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-white font-semibold">
                {item.q}
                <HiChevronDown className="flex-shrink-0 text-[#00d2ff] transition-transform duration-200 group-open:rotate-180" size={18} />
              </summary>
              <p className="mt-3 text-slate-400 text-sm leading-relaxed">{item.a}</p>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
