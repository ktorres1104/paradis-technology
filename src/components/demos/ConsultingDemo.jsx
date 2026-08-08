import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiAcademicCap, HiArrowRight, HiCheckCircle } from 'react-icons/hi2'
import { useLanguage } from '../../i18n/LanguageContext'

export default function ConsultingDemo() {
  const { t } = useLanguage()
  const c = t.demos.consulting
  const questions = c.questions
  const recommendations = c.recommendations
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])

  const answer = (idx) => {
    const next = [...answers, idx]
    setAnswers(next)
    setStep(step + 1)
  }

  const restart = () => { setStep(0); setAnswers([]) }

  const rec = recommendations[answers[1]] ?? recommendations[0]
  const finished = step >= questions.length

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
      <div className="lg:col-span-2 lg:order-2">
        <span className="inline-flex items-center gap-1.5 text-[#161f5c] text-xs font-semibold tracking-widest uppercase">
          <HiAcademicCap size={14} /> {c.eyebrow}
        </span>
        <h3 className="font-display mt-3 text-2xl md:text-3xl font-bold text-[#14181a] tracking-tight">
          {c.title}
        </h3>
        <p className="mt-4 text-[#565f63] leading-relaxed">
          {c.subtitle}
        </p>
      </div>

      <div className="lg:col-span-3 lg:order-1">
        <div className="p-6 md:p-8 rounded-lg border border-[#dadfdc] bg-white min-h-[280px] flex flex-col justify-center">
          {!finished && (
            <div className="mb-5 flex gap-1.5">
              {questions.map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-[#161f5c]' : 'bg-[#dadfdc]'}`} />
              ))}
            </div>
          )}

          <>
            {!finished ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-[#14181a] font-bold text-lg mb-5">{questions[step].q}</p>
                <div className="space-y-2.5">
                  {questions[step].options.map((opt, i) => (
                    <button
                      key={opt}
                      onClick={() => answer(i)}
                      className="w-full text-left px-4 py-3 rounded-lg border border-[#dadfdc] text-[#3a3f45] text-sm hover:border-[#161f5c]/40 hover:bg-[#161f5c]/5 hover:text-[#14181a] transition-all cursor-pointer flex items-center justify-between group"
                    >
                      {opt}
                      <HiArrowRight className="opacity-0 group-hover:opacity-100 text-[#161f5c] transition-opacity flex-shrink-0 ml-2" size={16} />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-[#161f5c]/10 border border-[#161f5c]/30 flex items-center justify-center mb-4">
                  <HiCheckCircle className="text-[#161f5c]" size={26} />
                </div>
                <p className="text-xs text-[#161f5c] font-semibold uppercase tracking-widest">{c.recommendedLabel}</p>
                <p className="font-display mt-1.5 text-xl font-bold text-[#14181a]">{rec.title}</p>
                <p className="mt-3 text-[#565f63] text-sm leading-relaxed max-w-md mx-auto">{rec.text}</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-6 py-3 rounded-lg font-semibold text-[#f4f5f3] bg-[#161f5c] hover:bg-[#24339e] transition-colors cursor-pointer text-sm"
                  >
                    {c.bookCall}
                  </button>
                  <button
                    onClick={restart}
                    className="px-6 py-3 rounded-lg font-semibold text-[#565f63] border border-[#dadfdc] hover:text-[#14181a] hover:border-[#b9c1bd] transition-colors cursor-pointer text-sm"
                  >
                    {c.tryAgain}
                  </button>
                </div>
              </motion.div>
            )}
          </>
        </div>
      </div>
    </div>
  )
}
