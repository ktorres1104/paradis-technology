import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiSparkles } from 'react-icons/hi2'
import useAutoTimeline from './useAutoTimeline'
import PlayerChrome from './PlayerChrome'

const BUSINESS_NAME = 'Salón Sol'

// Fixed, pre-written script. Nothing here depends on live input, so it can
// never show a broken or nonsensical exchange to a visitor.
const rawScript = [
  { role: 'bot', text: `¡Hola! Bienvenido/a a ${BUSINESS_NAME} 💇 ¿En qué puedo ayudarte hoy?`, dur: 500 },
  { role: 'user', text: 'Hola, quisiera saber qué servicios ofrecen', dur: 1500 },
  { role: 'typing', dur: 1000 },
  { role: 'bot', text: 'Claro que sí. Ofrecemos corte, color, manicura y tratamientos faciales. ¿Cuál te interesa más?', dur: 2800 },
  { role: 'user', text: 'Me interesa el corte y el color, ¿cuánto cuestan?', dur: 1700 },
  { role: 'typing', dur: 1000 },
  { role: 'bot', text: 'Un corte va desde $25, y color completo desde $65 — depende del largo del cabello. ¿Te gustaría agendar una cita?', dur: 3000 },
  { role: 'user', text: 'Sí, ¿qué días tienen disponibles esta semana?', dur: 1800 },
  { role: 'typing', dur: 1000 },
  { role: 'bot', text: 'Tenemos espacio martes, jueves y sábado. ¿Cuál te queda mejor?', dur: 2400 },
  { role: 'user', text: 'El sábado está perfecto. ¡Gracias por toda la información!', dur: 2200 },
  { role: 'typing', dur: 900 },
  { role: 'bot', text: '¡Con mucho gusto! Te dejo confirmada tu cita para el sábado. Cualquier otra pregunta, aquí estoy. 💇', dur: 3400 },
]

const starts = rawScript.reduce((acc, step, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + rawScript[i - 1].dur)
  return acc
}, [])
const FINAL_PAUSE = 2500
const TOTAL_DURATION = starts[starts.length - 1] + rawScript[rawScript.length - 1].dur + FINAL_PAUSE

export default function ChatbotDemo() {
  const { elapsed, playing, toggle, restart, progress } = useAutoTimeline(TOTAL_DURATION)
  const scrollRef = useRef(null)

  const visible = rawScript.filter((s, i) => elapsed >= starts[i] && s.role !== 'typing')
  const typingActive = rawScript.some((s, i) => s.role === 'typing' && elapsed >= starts[i] && elapsed < starts[i] + s.dur)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [visible.length, typingActive])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
      <div className="lg:col-span-2">
        <span className="inline-flex items-center gap-1.5 text-[#00d2ff] text-xs font-semibold tracking-widest uppercase">
          <HiSparkles size={14} /> Bots para negocios
        </span>
        <h3 className="mt-3 text-2xl md:text-3xl font-black text-white tracking-tight">
          Un asistente que orienta, no solo responde
        </h3>
        <p className="mt-4 text-slate-400 leading-relaxed">
          Observa cómo el bot guía a un cliente que pregunta por servicios y precios — sin dejarlo
          a medias, hasta que tiene toda la información y su cita queda confirmada.
        </p>
        <ul className="mt-6 space-y-2.5 text-sm text-slate-400">
          <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#00d2ff]" /> Sin alucinaciones — responde solo con tu data</li>
          <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#00d2ff]" /> Tú actualizas el conocimiento, sin depender de un dev</li>
          <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-[#00d2ff]" /> Voz y tono a la medida de tu marca</li>
        </ul>
      </div>

      <div className="lg:col-span-3">
        <PlayerChrome label={`Demo automático · ${BUSINESS_NAME}`} playing={playing} progress={progress} onToggle={toggle} onRestart={restart}>
          <div className="flex items-center gap-3 pb-4 mb-1 border-b border-white/5">
            <div className="w-9 h-9 rounded-full bg-[#00d2ff]/15 border border-[#00d2ff]/30 flex items-center justify-center">
              <HiSparkles className="text-[#00d2ff]" size={16} />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">{BUSINESS_NAME}</p>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Asistente virtual
              </p>
            </div>
          </div>

          <div ref={scrollRef} className="h-80 overflow-y-auto pt-3 space-y-3">
            <AnimatePresence initial={false}>
              {visible.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#00d2ff] text-[#07091a] rounded-br-sm font-medium'
                        : 'bg-white/5 text-slate-200 rounded-bl-sm border border-white/5'
                    }`}
                  >
                    {m.text}
                  </div>
                </motion.div>
              ))}
              {typingActive && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/5 border border-white/5 flex gap-1">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: `${d * 0.15}s` }} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </PlayerChrome>
      </div>
    </div>
  )
}
