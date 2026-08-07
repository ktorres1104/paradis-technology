import { motion } from 'framer-motion'
import { HiCheckCircle } from 'react-icons/hi2'
import { HiLocationMarker } from 'react-icons/hi'
import { useLanguage } from '../i18n/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#00d2ff]/3 blur-3xl rounded-full -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[#00d2ff] text-xs font-semibold tracking-widest uppercase">{t.about.eyebrow}</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {t.about.title}
            </h2>
            <p className="mt-6 text-slate-400 text-lg leading-relaxed">
              {t.about.p1}
            </p>
            <p className="mt-4 text-slate-400 leading-relaxed">
              {t.about.p2}
            </p>

            <div className="mt-8 flex items-center gap-3 px-5 py-3.5 rounded-xl border border-[#00d2ff]/15 bg-[#00d2ff]/5 w-fit">
              <HiLocationMarker className="text-[#00d2ff] flex-shrink-0" size={20} />
              <span className="text-sm text-slate-300 font-medium">{t.about.badge}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <div className="p-6 rounded-2xl border border-white/5" style={{ background: 'rgba(255,255,255,0.025)' }}>
              <h3 className="text-white font-bold text-lg mb-5">{t.about.differentTitle}</h3>
              <ul className="space-y-3.5">
                {t.about.differentiators.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <HiCheckCircle className="text-[#00d2ff] flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-slate-300 text-sm leading-relaxed">{point}</span>
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
          className="mt-8 p-8 md:p-10 rounded-2xl border border-white/5"
          style={{ background: 'rgba(255,255,255,0.025)' }}
        >
          <h3 className="text-white font-bold text-xl mb-5">{t.about.founderHeading}</h3>
          <div className="space-y-4 max-w-3xl">
            {t.about.founderParagraphs.map((p) => (
              <p key={p} className="text-slate-400 leading-relaxed">{p}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
