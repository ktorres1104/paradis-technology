import { motion } from 'framer-motion'
import { HiCheckCircle } from 'react-icons/hi2'
import { HiLocationMarker } from 'react-icons/hi'
import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[#161f5c] text-xs font-semibold tracking-widest uppercase">{t.about.eyebrow}</span>
            <h2 className="font-display mt-3 text-4xl md:text-5xl font-bold text-[#14181a] tracking-tight leading-tight">
              {t.about.title}
            </h2>
            <p className="mt-6 text-[#565f63] leading-relaxed">
              {t.about.p1}
            </p>
            <p className="mt-4 text-[#565f63] leading-relaxed">
              {t.about.p2}
            </p>

            <div className="mt-8 flex items-center gap-3 px-5 py-3.5 rounded-lg border border-[#161f5c]/15 bg-[#161f5c]/5 w-fit">
              <HiLocationMarker className="text-[#161f5c] flex-shrink-0" size={20} />
              <span className="text-sm text-[#3a3f45] font-medium">{t.about.badge}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <div className="p-6 rounded-lg border border-[#dadfdc] bg-white">
              <h3 className="font-display text-[#14181a] font-bold text-lg mb-5">{t.about.differentTitle}</h3>
              <ul className="space-y-3.5">
                {t.about.differentiators.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <HiCheckCircle className="text-[#161f5c] flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-[#3a3f45] text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 p-8 md:p-10 rounded-lg border border-[#dadfdc] bg-white"
        >
          <h3 className="font-display text-[#14181a] font-bold text-xl mb-5">{t.about.founderHeading}</h3>
          <div className="space-y-4 max-w-3xl">
            {t.about.founderParagraphs.map((p) => (
              <p key={p} className="text-[#565f63] leading-relaxed">{p}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
