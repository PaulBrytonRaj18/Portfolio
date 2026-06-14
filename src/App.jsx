import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Hero from './components/sections/Hero.jsx'
import About from './components/sections/About.jsx'
import WhyWorkWithMe from './components/sections/WhyWorkWithMe.jsx'
import Projects from './components/sections/Projects.jsx'
import Skills from './components/sections/Skills.jsx'
import Achievements from './components/sections/Achievements.jsx'
import Testimonials from './components/sections/Testimonials.jsx'
import Services from './components/sections/Services.jsx'
import GitHubActivity from './components/sections/GitHubActivity.jsx'
import Contact from './components/sections/Contact.jsx'
import HelpOverlay from './components/ui/HelpOverlay.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="divider" />
        <About />
        <div className="divider" />
        <WhyWorkWithMe />
        <div className="divider" />
        <Projects />
        <div className="divider" />
        <Skills />
        <div className="divider" />
        <Achievements />
        <div className="divider" />
        <Testimonials />
        <div className="divider" />
        <Services />
        <div className="divider" />
        <GitHubActivity />
        <div className="divider" />
        <Contact />
      </main>
      <Footer />
      <HelpOverlay />
    </>
  )
}
