import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import PalmLogo from './PalmLogo'
import { useLanguage } from '../i18n/LanguageContext'

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage()
  const links = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.demos, href: '#demos' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.process, href: '#process' },
    { label: t.nav.contact, href: '#contact' },
  ]
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNav = (href) => {
    setOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 10)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#07091a]/95 backdrop-blur-md border-b border-white/5 shadow-xl shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2 group"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          <PalmLogo size={36} />
          <span className="font-bold text-white text-lg tracking-tight">
            Paradis <span className="text-[#00d2ff]">Technology</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            aria-label="Switch language"
            className="flex items-center rounded-full border border-white/10 p-0.5 text-xs font-bold cursor-pointer"
          >
            <span className={`px-2.5 py-1 rounded-full transition-colors duration-200 ${language === 'en' ? 'bg-[#00d2ff] text-[#07091a]' : 'text-slate-400'}`}>
              EN
            </span>
            <span className={`px-2.5 py-1 rounded-full transition-colors duration-200 ${language === 'es' ? 'bg-[#00d2ff] text-[#07091a]' : 'text-slate-400'}`}>
              ES
            </span>
          </button>
          <button
            onClick={() => handleNav('#contact')}
            className="px-5 py-2 rounded-lg text-sm font-semibold bg-[#00d2ff] text-[#07091a] hover:bg-[#00aacc] transition-colors duration-200 cursor-pointer"
          >
            {t.nav.getStarted}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={toggleLanguage}
            aria-label="Switch language"
            className="flex items-center rounded-full border border-white/10 p-0.5 text-xs font-bold cursor-pointer"
          >
            <span className={`px-2 py-1 rounded-full transition-colors duration-200 ${language === 'en' ? 'bg-[#00d2ff] text-[#07091a]' : 'text-slate-400'}`}>
              EN
            </span>
            <span className={`px-2 py-1 rounded-full transition-colors duration-200 ${language === 'es' ? 'bg-[#00d2ff] text-[#07091a]' : 'text-slate-400'}`}>
              ES
            </span>
          </button>
          <button
            className="text-white p-1 cursor-pointer"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[#07091a]/98 backdrop-blur-md border-b border-white/5"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-base font-medium text-slate-300 hover:text-white transition-colors cursor-pointer py-1"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav('#contact')}
                className="mt-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#00d2ff] text-[#07091a] hover:bg-[#00aacc] transition-colors cursor-pointer w-full"
              >
                {t.nav.getStarted}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
