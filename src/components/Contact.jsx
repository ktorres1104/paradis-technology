import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiCheckCircle, HiEnvelope, HiPhone } from 'react-icons/hi2'
import { useLanguage } from '../i18n/LanguageContext'

const inputClass =
  'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/8 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#00d2ff]/50 focus:bg-[#00d2ff]/3 transition-all duration-200'

export default function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 900)
  }

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00d2ff]/4 blur-3xl rounded-full translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[#00d2ff] text-xs font-semibold tracking-widest uppercase">{t.contact.eyebrow}</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {t.contact.title}
            </h2>
            <p className="mt-5 text-slate-400 text-lg leading-relaxed">
              {t.contact.subtitle}
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00d2ff]/10 border border-[#00d2ff]/20 flex items-center justify-center flex-shrink-0">
                  <HiEnvelope className="text-[#00d2ff]" size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{t.contact.emailLabel}</p>
                  <a href="mailto:hello@paradisanalytics.com" className="block text-slate-300 text-sm font-medium mt-0.5 hover:text-[#00d2ff] transition-colors">hello@paradisanalytics.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#00d2ff]/10 border border-[#00d2ff]/20 flex items-center justify-center flex-shrink-0">
                  <HiPhone className="text-[#00d2ff]" size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{t.contact.phoneLabel}</p>
                  <a href="tel:+17870000000" className="block text-slate-300 text-sm font-medium mt-0.5 hover:text-[#00d2ff] transition-colors">+1 (787) 000-0000</a>
                </div>
              </div>
            </div>

            <div className="mt-10 p-5 rounded-2xl border border-[#00d2ff]/10 bg-[#00d2ff]/3">
              <p className="text-sm text-slate-300 leading-relaxed">
                <span className="text-[#00d2ff] font-semibold">{t.contact.noCommitmentBold}</span> {t.contact.noCommitmentRest}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="p-8 rounded-2xl border border-white/5" style={{ background: 'rgba(255,255,255,0.025)' }}>
              <>
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center text-center py-12 gap-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#00d2ff]/10 border border-[#00d2ff]/30 flex items-center justify-center">
                      <HiCheckCircle className="text-[#00d2ff]" size={36} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{t.contact.successTitle}</h3>
                      <p className="mt-2 text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                        {t.contact.successBody.replace('{name}', form.name.split(' ')[0])}
                      </p>
                    </div>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', service: '', message: '' }) }}
                      className="text-sm text-[#00d2ff] hover:underline cursor-pointer"
                    >
                      {t.contact.sendAnother}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <h3 className="text-white font-bold text-lg mb-6">{t.contact.formTitle}</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">{t.contact.nameLabel}</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={form.name}
                          onChange={handleChange}
                          placeholder={t.contact.namePlaceholder}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">{t.contact.emailFieldLabel}</label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={form.email}
                          onChange={handleChange}
                          placeholder={t.contact.emailPlaceholder}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">{t.contact.companyLabel}</label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder={t.contact.companyPlaceholder}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">{t.contact.serviceLabel}</label>
                      <select
                        name="service"
                        required
                        value={form.service}
                        onChange={handleChange}
                        className={`${inputClass} appearance-none`}
                        style={{ colorScheme: 'dark' }}
                      >
                        <option value="" disabled className="bg-[#07091a]">{t.contact.serviceDefault}</option>
                        {t.contact.services.map((s) => (
                          <option key={s} value={s} className="bg-[#07091a]">{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1.5">{t.contact.messageLabel}</label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={form.message}
                        onChange={handleChange}
                        placeholder={t.contact.messagePlaceholder}
                        className={`${inputClass} resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3.5 rounded-xl font-semibold text-[#07091a] bg-[#00d2ff] hover:bg-[#00aacc] disabled:opacity-70 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-[#07091a]/30 border-t-[#07091a] rounded-full animate-spin" />
                          {t.contact.sending}
                        </>
                      ) : (
                        t.contact.send
                      )}
                    </button>

                    <p className="text-xs text-slate-500 text-center">
                      {t.contact.disclaimer}
                    </p>
                  </motion.form>
                )}
              </>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
