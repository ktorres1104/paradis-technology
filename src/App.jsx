import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Demos from './components/Demos'
import About from './components/About'
import Process from './components/Process'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { LanguageProvider } from './i18n/LanguageContext'
import './index.css'

export default function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#f4f5f3] text-[#14181a]">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <Demos />
          <About />
          <Process />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}
