import { useEffect, useState } from "react"
import About from "./components/About"
import BackToTop from "./components/BackToTop"
import Certificates from "./components/Certificates"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Journey from "./components/Journey"
import Nav from "./components/Nav"
import NetworkMode from "./components/network/NetworkMode"
import ProfileCard from "./components/ProfileCard"
import Projects from "./components/Projects"
import ScrollProgress from "./components/ScrollProgress"
import Skills from "./components/Skills"
import Stars from "./components/Stars"
import type { Mode } from "./components/ModeSwitch"
import LangProvider from "./i18n/LangProvider"

function initialMode(): Mode {
  const stored = localStorage.getItem("mode")
  if (stored === "classic" || stored === "network") return stored
  return window.innerWidth >= 1024 ? "network" : "classic"
}

function App() {
  const [mode, setMode] = useState<Mode>(initialMode)

  useEffect(() => {
    localStorage.setItem("mode", mode)
    window.scrollTo({ top: 0 })
  }, [mode])

  return (
    <LangProvider>
      <div className="relative min-h-screen">
        <Stars />
        <div className="relative z-10">
          <ScrollProgress />
          <Nav mode={mode} onModeChange={setMode} />
          {mode === "network" ? (
            <NetworkMode />
          ) : (
            <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-24 lg:pt-0 grid lg:grid-cols-[300px_1fr] gap-x-16">
              <div className="lg:py-28">
                <div className="lg:sticky lg:top-28 max-w-sm mx-auto lg:max-w-none">
                  <ProfileCard />
                </div>
              </div>
              <main className="content-col min-w-0 max-w-3xl">
                <Hero />
                <About />
                <Skills />
                <Projects />
                <Journey />
                <Certificates />
                <Contact />
              </main>
            </div>
          )}
          <div className="max-w-6xl mx-auto px-6 lg:px-10">
            <Footer />
          </div>
          <BackToTop />
        </div>
      </div>
    </LangProvider>
  )
}

export default App
