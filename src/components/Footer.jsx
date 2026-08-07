import { HiArrowUpRight } from 'react-icons/hi2'
import PalmLogo from './PalmLogo'
import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const links = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.demos, href: '#demos' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.process, href: '#process' },
    { label: t.nav.contact, href: '#contact' },
  ]

  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <PalmLogo size={32} />
              <span className="font-bold text-white text-base tracking-tight">
                Paradis <span className="text-[#00d2ff]">Technology</span>
              </span>
            </div>
            <p className="mt-2 text-slate-500 text-sm max-w-xs">
              {t.footer.tagline}
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div>
            <button
              onClick={() => handleNav('#contact')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#00d2ff]/10 border border-[#00d2ff]/20 text-[#00d2ff] hover:bg-[#00d2ff]/15 transition-colors cursor-pointer"
            >
              {t.nav.getStarted}
              <HiArrowUpRight size={14} />
            </button>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Paradis Technology. {t.footer.rights}
          </p>
          <p className="text-xs text-slate-600">
            {t.footer.location}
          </p>
        </div>
      </div>
    </footer>
  )
}
