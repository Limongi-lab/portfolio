import About from "./components/About"
import BackgroundDecor from "./components/BackgroundDecor"
import BackToTop from "./components/BackToTop"
import Certificates from "./components/Certificates"
import Contact from "./components/Contact"
import Hero from "./components/Hero"
import Nav from "./components/Nav"
import Projects from "./components/Projects"
import ScrollProgress from "./components/ScrollProgress"
import Skills from "./components/Skills"

function App() {
  return (
    <div className="relative min-h-screen">
      <BackgroundDecor />
      <div className="relative z-10">
        <ScrollProgress />
        <Nav />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certificates />
          <Contact />
        </main>
        <BackToTop />
      </div>
    </div>
  )
}

export default App
