import { motion } from 'framer-motion'
import { HiArrowRight, HiChevronDown } from 'react-icons/hi'
import { useLanguage } from '../i18n/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#161f5c]/20 bg-[#161f5c]/5 text-[#161f5c] text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#161f5c] animate-pulse" />
              {t.hero.badge}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-5xl md:text-7xl font-bold text-[#14181a] tracking-tight leading-tight"
          >
            {t.hero.titleStart}{' '}
            <span className="text-[#161f5c]">
              {t.hero.titleHighlight}
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-lg md:text-xl text-[#565f63] leading-relaxed"
          >
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-[#f4f5f3] bg-[#161f5c] hover:bg-[#24339e] transition-all duration-200 shadow-lg shadow-[#161f5c]/20 cursor-pointer"
            >
              {t.hero.ctaPrimary}
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-[#14181a] border border-[#dadfdc] hover:border-[#b9c1bd] hover:bg-white transition-all duration-200 cursor-pointer"
            >
              {t.hero.ctaSecondary}
            </button>
          </motion.div>
        </motion.div>
      </div>

      <button
        onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#75797d] hover:text-[#3a3f45] transition-colors animate-bounce cursor-pointer"
      >
        <HiChevronDown size={28} />
      </button>
    </section>
  )
}
