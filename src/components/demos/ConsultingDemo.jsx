import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiAcademicCap, HiArrowRight, HiCheckCircle } from 'react-icons/hi2'

const questions = [
  {
    q: '¿Cómo manejas tus datos hoy?',
    options: ['Todo en Excel o papel', 'Tengo varias herramientas que no se hablan entre sí', 'Ya tengo dashboards, pero quiero más'],
  },
  {
    q: '¿Cuál es tu mayor dolor de cabeza operacional?',
    options: ['Tareas repetitivas que consumen tiempo', 'No sé bien qué está pasando con mis números', 'Quiero usar IA, pero no sé por dónde empezar'],
  },
  {
    q: '¿Cuántas personas hay en tu equipo?',
    options: ['Solo yo, o 1–3 personas', '4–15 personas', '16 o más'],
  },
]

const recommendations = [
  {
    title: 'Plan de Automatización',
    text: 'Con lo que nos cuentas, el mayor impacto rápido está en automatizar las tareas repetitivas — mensajes, actualizaciones, seguimiento de pedidos — para que tu equipo recupere horas cada semana.',
  },
  {
    title: 'Plan de Dashboard de Performance',
    text: 'Antes de automatizar o predecir nada, necesitas ver claro. Un dashboard centralizado te da visibilidad real de ventas, clientes y operación en un solo lugar.',
  },
  {
    title: 'Sesión de Consultoría Estratégica',
    text: 'Tiene sentido empezar con una sesión de consultoría para mapear dónde la IA rinde más en tu negocio, y definir un plan de automatización o de datos a la medida.',
  },
]

export default function ConsultingDemo() {
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
        <span className="inline-flex items-center gap-1.5 text-[#00d2ff] text-xs font-semibold tracking-widest uppercase">
          <HiAcademicCap size={14} /> Consultoría
        </span>
        <h3 className="mt-3 text-2xl md:text-3xl font-black text-white tracking-tight">
          No sabes por dónde empezar. Está bien.
        </h3>
        <p className="mt-4 text-slate-400 leading-relaxed">
          Contesta 3 preguntas rápidas y te decimos por dónde recomendamos que empieces. Así
          arranca una sesión real de consultoría: entendiendo tu contexto antes de proponer nada.
        </p>
      </div>

      <div className="lg:col-span-3 lg:order-1">
        <div className="p-6 md:p-8 rounded-2xl border border-white/8 min-h-[280px] flex flex-col justify-center" style={{ background: 'rgba(255,255,255,0.025)' }}>
          {!finished && (
            <div className="mb-5 flex gap-1.5">
              {questions.map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full ${i <= step ? 'bg-[#00d2ff]' : 'bg-white/8'}`} />
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
                <p className="text-white font-bold text-lg mb-5">{questions[step].q}</p>
                <div className="space-y-2.5">
                  {questions[step].options.map((opt, i) => (
                    <button
                      key={opt}
                      onClick={() => answer(i)}
                      className="w-full text-left px-4 py-3 rounded-xl border border-white/8 text-slate-300 text-sm hover:border-[#00d2ff]/40 hover:bg-[#00d2ff]/5 hover:text-white transition-all cursor-pointer flex items-center justify-between group"
                    >
                      {opt}
                      <HiArrowRight className="opacity-0 group-hover:opacity-100 text-[#00d2ff] transition-opacity flex-shrink-0 ml-2" size={16} />
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
                <div className="w-14 h-14 mx-auto rounded-full bg-[#00d2ff]/10 border border-[#00d2ff]/30 flex items-center justify-center mb-4">
                  <HiCheckCircle className="text-[#00d2ff]" size={26} />
                </div>
                <p className="text-xs text-[#00d2ff] font-semibold uppercase tracking-widest">Te recomendamos</p>
                <p className="mt-1.5 text-xl font-black text-white">{rec.title}</p>
                <p className="mt-3 text-slate-400 text-sm leading-relaxed max-w-md mx-auto">{rec.text}</p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-6 py-3 rounded-xl font-semibold text-[#07091a] bg-[#00d2ff] hover:bg-[#00aacc] transition-colors cursor-pointer text-sm"
                  >
                    Agenda tu llamada gratuita
                  </button>
                  <button
                    onClick={restart}
                    className="px-6 py-3 rounded-xl font-semibold text-slate-400 border border-white/8 hover:text-white hover:border-white/20 transition-colors cursor-pointer text-sm"
                  >
                    Volver a intentar
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
