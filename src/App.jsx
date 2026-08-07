import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Demos from './components/Demos'
import About from './components/About'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './index.css'

export default function App() {
  return (
    <div className="min-h-screen bg-[#07091a] text-white">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Demos />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
