import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiCheckCircle, HiEnvelope, HiPhone } from 'react-icons/hi2'
import { useLanguage } from '../i18n/LanguageContext'

const inputClass =
  'w-full px-4 py-3 rounded-lg bg-white border border-[#dadfdc] text-[#14181a] placeholder-[#9a9ea3] text-sm focus:outline-none focus:border-[#161f5c]/50 focus:bg-[#161f5c]/3 transition-all duration-200'

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
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[#161f5c] text-xs font-semibold tracking-widest uppercase">{t.contact.eyebrow}</span>
            <h2 className="font-display mt-3 text-4xl md:text-5xl font-bold text-[#14181a] tracking-tight leading-tight">
              {t.contact.title}
            </h2>
            <p className="mt-5 text-[#565f63] text-lg leading-relaxed">
              {t.contact.subtitle}
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#161f5c]/10 border border-[#161f5c]/20 flex items-center justify-center flex-shrink-0">
                  <HiEnvelope className="text-[#161f5c]" size={18} />
                </div>
                <div>
                  <p className="text-xs text-[#75797d] font-medium uppercase tracking-wider">{t.contact.emailLabel}</p>
                  <a href="mailto:hello@paradisanalytics.com" className="block text-[#3a3f45] text-sm font-medium mt-0.5 hover:text-[#161f5c] transition-colors">hello@paradisanalytics.com</a>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#161f5c]/10 border border-[#161f5c]/20 flex items-center justify-center flex-shrink-0">
                  <HiPhone className="text-[#161f5c]" size={18} />
                </div>
                <div>
                  <p className="text-xs text-[#75797d] font-medium uppercase tracking-wider">{t.contact.phoneLabel}</p>
                  <a href="tel:+17870000000" className="block text-[#3a3f45] text-sm font-medium mt-0.5 hover:text-[#161f5c] transition-colors">+1 (787) 000-0000</a>
                </div>
              </div>
            </div>

            <div className="mt-10 p-5 rounded-lg border border-[#161f5c]/10 bg-[#161f5c]/3">
              <p className="text-sm text-[#3a3f45] leading-relaxed">
                <span className="text-[#161f5c] font-semibold">{t.contact.noCommitmentBold}</span> {t.contact.noCommitmentRest}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="p-8 rounded-lg border border-[#dadfdc] bg-white">
              <>
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center text-center py-12 gap-5"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#161f5c]/10 border border-[#161f5c]/30 flex items-center justify-center">
                      <HiCheckCircle className="text-[#161f5c]" size={36} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-[#14181a]">{t.contact.successTitle}</h3>
                      <p className="mt-2 text-[#565f63] text-sm leading-relaxed max-w-xs mx-auto">
                        {t.contact.successBody.replace('{name}', form.name.split(' ')[0])}
                      </p>
                    </div>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', service: '', message: '' }) }}
                      className="text-sm text-[#161f5c] hover:underline cursor-pointer"
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
                    <h3 className="font-display text-[#14181a] font-bold text-lg mb-6">{t.contact.formTitle}</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-[#565f63] mb-1.5">{t.contact.nameLabel}</label>
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
                        <label className="block text-xs font-medium text-[#565f63] mb-1.5">{t.contact.emailFieldLabel}</label>
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
                      <label className="block text-xs font-medium text-[#565f63] mb-1.5">{t.contact.companyLabel}</label>
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
                      <label className="block text-xs font-medium text-[#565f63] mb-1.5">{t.contact.serviceLabel}</label>
                      <select
                        name="service"
                        required
                        value={form.service}
                        onChange={handleChange}
                        className={`${inputClass} appearance-none`}
                        style={{ colorScheme: 'light' }}
                      >
                        <option value="" disabled className="bg-[#f4f5f3]">{t.contact.serviceDefault}</option>
                        {t.contact.services.map((s) => (
                          <option key={s} value={s} className="bg-[#f4f5f3]">{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#565f63] mb-1.5">{t.contact.messageLabel}</label>
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
                      className="w-full py-3.5 rounded-lg font-semibold text-[#f4f5f3] bg-[#161f5c] hover:bg-[#24339e] disabled:opacity-70 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-[#f4f5f3]/30 border-t-[#f4f5f3] rounded-full animate-spin" />
                          {t.contact.sending}
                        </>
                      ) : (
                        t.contact.send
                      )}
                    </button>

                    <p className="text-xs text-[#75797d] text-center">
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
