import { motion } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi2'
import { useLanguage } from '../i18n/LanguageContext'

export default function FAQ() {
  const { t } = useLanguage()

  return (
    <section id="faq" className="py-24 px-6 relative">
      <div className="max-w-3xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-[#161f5c] text-xs font-semibold tracking-widest uppercase">{t.faq.eyebrow}</span>
          <h2 className="font-display mt-3 text-4xl md:text-5xl font-bold text-[#14181a] tracking-tight">
            {t.faq.title}
          </h2>
          <p className="mt-4 text-[#565f63] text-lg max-w-xl mx-auto">
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
              className="group rounded-lg border border-[#dadfdc] bg-white px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-[#14181a] font-semibold">
                {item.q}
                <HiChevronDown className="flex-shrink-0 text-[#161f5c] transition-transform duration-200 group-open:rotate-180" size={18} />
              </summary>
              <p className="mt-3 text-[#565f63] text-sm leading-relaxed">{item.a}</p>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
