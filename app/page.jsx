import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import WhyWorkWithMe from '../components/sections/WhyWorkWithMe';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';
import Achievements from '../components/sections/Achievements';
import Testimonials from '../components/sections/Testimonials';
import Services from '../components/sections/Services';
import GitHubActivity from '../components/sections/GitHubActivity';
import Contact from '../components/sections/Contact';

export default function Page() {
  return (
    <>
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
    </>
  );
}
