import { motion } from 'framer-motion'
import {
  HiArrowPathRoundedSquare, HiChatBubbleLeftRight, HiCpuChip, HiCircleStack,
  HiSparkles, HiCheckCircle, HiShoppingBag, HiClipboardDocumentList, HiBellAlert,
} from 'react-icons/hi2'
import useAutoTimeline from './useAutoTimeline'
import PlayerChrome from './PlayerChrome'

// Two example flows shown back to back, to give a sense of range rather than
// a single fixed use case.
const flows = [
  {
    name: 'Bot de WhatsApp → CRM',
    nodes: [
      { icon: HiChatBubbleLeftRight, title: 'Mensaje recibido', desc: 'Llega por WhatsApp o Instagram' },
      { icon: HiCpuChip, title: 'Clasifica intención', desc: 'La IA entiende qué necesita el cliente' },
      { icon: HiCircleStack, title: 'Consulta el sistema', desc: 'Revisa inventario, calendario o CRM' },
      { icon: HiSparkles, title: 'Genera respuesta', desc: 'Redacta con el tono de tu marca' },
      { icon: HiCheckCircle, title: 'Actualiza y responde', desc: 'Guarda el registro y contesta al cliente' },
    ],
  },
  {
    name: 'Nueva orden → Reporte diario',
    nodes: [
      { icon: HiShoppingBag, title: 'Nueva orden', desc: 'Se registra en la tienda o el POS' },
      { icon: HiCircleStack, title: 'Verifica inventario', desc: 'Descuenta unidades automáticamente' },
      { icon: HiClipboardDocumentList, title: 'Actualiza hoja de cálculo', desc: 'Google Sheets siempre al día' },
      { icon: HiBellAlert, title: 'Notifica al equipo', desc: 'Avisa si algo está por agotarse' },
      { icon: HiCheckCircle, title: 'Genera reporte diario', desc: 'Resumen automático cada noche' },
    ],
  },
]

const STEP_MS = 700
const HOLD_MS = 1600
const NODES_COUNT = flows[0].nodes.length
const FLOW_DURATION = STEP_MS * NODES_COUNT + HOLD_MS
const TOTAL_DURATION = FLOW_DURATION * flows.length

export default function AutomationDemo() {
  const { elapsed, playing, toggle, restart, progress } = useAutoTimeline(TOTAL_DURATION)

  const flowIndex = Math.min(Math.floor(elapsed / FLOW_DURATION), flows.length - 1)
  const localElapsed = elapsed - flowIndex * FLOW_DURATION
  const runningPhaseEnd = STEP_MS * NODES_COUNT
  const active = localElapsed < runningPhaseEnd ? Math.min(Math.floor(localElapsed / STEP_MS), NODES_COUNT - 1) : -1
  const done = localElapsed >= runningPhaseEnd
  const flow = flows[flowIndex]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
      <div className="lg:col-span-2">
        <span className="inline-flex items-center gap-1.5 text-[#00d2ff] text-xs font-semibold tracking-widest uppercase">
          <HiArrowPathRoundedSquare size={14} /> Automatizaciones n8n
        </span>
        <h3 className="mt-3 text-2xl md:text-3xl font-black text-white tracking-tight">
          Conecta tus herramientas, sin fricción
        </h3>
        <p className="mt-4 text-slate-400 leading-relaxed">
          Observa cómo viaja la información paso a paso. Estos son dos ejemplos del tipo de flujo
          que construimos con n8n para conectar WhatsApp, tu inventario, tu CRM y la IA — sin que
          tengas que tocar código.
        </p>
      </div>

      <div className="lg:col-span-3">
        <PlayerChrome label={`Demo automático · ${flow.name}`} playing={playing} progress={progress} onToggle={toggle} onRestart={restart}>
          <div className="relative rounded-xl -m-2 p-2" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)', backgroundSize: '18px 18px' }}>
            <div className="hidden md:block absolute top-9 left-9 right-9 h-px bg-white/10">
              {active >= 0 && (
                <motion.div
                  className="absolute top-0 w-2.5 h-2.5 rounded-full bg-[#00d2ff] -translate-y-1/2 -translate-x-1/2"
                  style={{ boxShadow: '0 0 8px 2px rgba(0,210,255,0.6)' }}
                  animate={{ left: `${(active / (NODES_COUNT - 1)) * 100}%` }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-2">
              {flow.nodes.map((n, i) => {
                const Icon = n.icon
                const isActive = active === i
                const isPast = active > i || done
                return (
                  <div key={n.title} className="flex md:flex-col items-center gap-3 md:gap-3 md:text-center relative">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.15 : 1,
                        borderColor: isActive || isPast ? 'rgba(0,210,255,0.6)' : 'rgba(255,255,255,0.08)',
                        backgroundColor: isActive || isPast ? 'rgba(0,210,255,0.12)' : 'rgba(255,255,255,0.03)',
                      }}
                      transition={{ duration: 0.3 }}
                      className="w-14 h-14 flex-shrink-0 rounded-2xl border flex items-center justify-center relative z-10"
                    >
                      <Icon className={isActive || isPast ? 'text-[#00d2ff]' : 'text-slate-500'} size={22} />
                      {isActive && (
                        <motion.span
                          className="absolute inset-0 rounded-2xl border-2 border-[#00d2ff]"
                          initial={{ opacity: 0.6, scale: 1 }}
                          animate={{ opacity: 0, scale: 1.4 }}
                          transition={{ duration: 0.7, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                    <div className="md:mt-1">
                      <p className={`text-xs md:text-sm font-bold ${isActive ? 'text-[#00d2ff]' : 'text-white'}`}>{n.title}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug max-w-[130px] md:mx-auto">{n.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/5 text-center">
            {done ? (
              <p className="text-sm text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
                <HiCheckCircle size={16} /> Automatización completada, sin intervención manual
              </p>
            ) : (
              <p className="text-sm text-slate-500">Este flujo corre solo, 24/7, sin que nadie lo tenga que operar manualmente.</p>
            )}
          </div>
        </PlayerChrome>
      </div>
    </div>
  )
}
