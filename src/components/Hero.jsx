import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { HiArrowRight, HiChevronDown } from 'react-icons/hi'

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

const stats = [
  { value: 50, suffix: '+', label: 'Businesses Served' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
  { value: 120, suffix: '+', label: 'Projects Completed' },
  { value: 5, suffix: 'M+', label: 'Data Points Processed Daily' },
]

function StatCard({ value, suffix, label, animate }) {
  const count = useCountUp(value, 2200, animate)
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-3xl md:text-4xl font-black text-white">
        {count}<span className="text-[#00d2ff]">{suffix}</span>
      </span>
      <span className="text-xs md:text-sm text-slate-400 font-medium text-center">{label}</span>
    </div>
  )
}

export default function Hero() {
  const [animateStats, setAnimateStats] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimateStats(true) },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

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
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1a2040 1px, transparent 1px),
            linear-gradient(to bottom, #1a2040 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#00d2ff]/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-indigo-600/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d2ff]/20 bg-[#00d2ff]/5 text-[#00d2ff] text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff] animate-pulse" />
              Data & AI Consulting · Puerto Rico
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight"
          >
            Turning Data Into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] to-[#6e8efb]">
              Decisions
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-lg md:text-xl text-slate-400 leading-relaxed"
          >
            We help small and medium businesses in Puerto Rico unlock the power of AI and data—without the complexity. Practical solutions, real results.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[#07091a] bg-[#00d2ff] hover:bg-[#00aacc] transition-all duration-200 shadow-lg shadow-[#00d2ff]/20 cursor-pointer"
            >
              Start Your Journey
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-200 cursor-pointer"
            >
              View Services
            </button>
          </motion.div>

          <motion.div
            ref={statsRef}
            variants={item}
            className="mt-12 w-full max-w-2xl grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 px-8 rounded-2xl border border-white/5 bg-white/2"
            style={{ background: 'rgba(255,255,255,0.02)' }}
          >
            {stats.map((s) => (
              <StatCard key={s.label} {...s} animate={animateStats} />
            ))}
          </motion.div>
        </motion.div>
      </div>

      <button
        onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 hover:text-slate-300 transition-colors animate-bounce cursor-pointer"
      >
        <HiChevronDown size={28} />
      </button>
    </section>
  )
}
