import { motion } from 'framer-motion'
import { HiCheckCircle } from 'react-icons/hi2'
import { HiLocationMarker } from 'react-icons/hi'

const differentiators = [
  'No data science degree required—we speak your language',
  'Solutions built for businesses with $1M–$5M revenue',
  'Puerto Rico–based team that understands the local market',
  'Practical AI, not hype—real tools that actually work',
  'Ongoing partnership, not a one-time project',
]

export default function About() {
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
            <span className="text-[#00d2ff] text-xs font-semibold tracking-widest uppercase">Who We Are</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Your Local AI &amp; Data Partner
            </h2>
            <p className="mt-6 text-slate-400 text-lg leading-relaxed">
              Paradis Technology was founded with one mission: make the power of data and artificial intelligence accessible to every business in Puerto Rico—not just the big corporations.
            </p>
            <p className="mt-4 text-slate-400 leading-relaxed">
              Most small businesses know they should be using data. They just don't know where to start. We bridge that gap with practical, affordable solutions that fit where you are today and grow with you tomorrow.
            </p>

            <div className="mt-8 flex items-center gap-3 px-5 py-3.5 rounded-xl border border-[#00d2ff]/15 bg-[#00d2ff]/5 w-fit">
              <HiLocationMarker className="text-[#00d2ff] flex-shrink-0" size={20} />
              <span className="text-sm text-slate-300 font-medium">Proudly serving businesses across Puerto Rico</span>
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
              <h3 className="text-white font-bold text-lg mb-5">What Makes Us Different</h3>
              <ul className="space-y-3.5">
                {differentiators.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <HiCheckCircle className="text-[#00d2ff] flex-shrink-0 mt-0.5" size={20} />
                    <span className="text-slate-300 text-sm leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-white/5 text-center" style={{ background: 'rgba(255,255,255,0.025)' }}>
                <p className="text-3xl font-black text-white">
                  3<span className="text-[#00d2ff]">+</span>
                </p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Years of experience</p>
              </div>
              <div className="p-5 rounded-2xl border border-white/5 text-center" style={{ background: 'rgba(255,255,255,0.025)' }}>
                <p className="text-3xl font-black text-white">
                  10<span className="text-[#00d2ff]">+</span>
                </p>
                <p className="text-xs text-slate-400 mt-1 font-medium">Industries served</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
