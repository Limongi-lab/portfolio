import { useEffect, useState } from "react"
import About from "./components/About"
import BackToTop from "./components/BackToTop"
import Certificates from "./components/Certificates"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Journey from "./components/Journey"
import type { Mode } from "./components/ModeSwitch"
import Nav from "./components/Nav"
import NetworkMode from "./components/network/NetworkMode"
import ProfileCard from "./components/ProfileCard"
import Projects from "./components/Projects"
import ScrollProgress from "./components/ScrollProgress"
import Skills from "./components/Skills"
import Stars from "./components/Stars"
import LangProvider from "./i18n/LangProvider"

function App() {
  const [mode, setMode] = useState<Mode>("classic")

  useEffect(() => {
    window.scrollTo({ top: 0 })
    document.body.style.overflow = mode === "network" ? "hidden" : ""
  }, [mode])

  return (
    <LangProvider>
      <div className="relative min-h-screen">
        <Stars />
        <div className="relative z-10">
          <Nav mode={mode} onModeChange={setMode} />
          {mode === "network" ? (
            <NetworkMode onClassic={() => setMode("classic")} />
          ) : (
            <>
              <ScrollProgress />
              <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-24 lg:pt-0 grid lg:grid-cols-[300px_1fr] gap-x-16">
                <div className="lg:py-28">
                  <div className="lg:sticky lg:top-28 max-w-sm mx-auto lg:max-w-none">
                    <ProfileCard />
                  </div>
                </div>
                <main className="content-col min-w-0 max-w-3xl">
                  <Hero onNetwork={() => setMode("network")} />
                  <About />
                  <Skills />
                  <Projects />
                  <Journey />
                  <Certificates />
                  <Contact />
                </main>
              </div>
              <div className="max-w-6xl mx-auto px-6 lg:px-10">
                <Footer />
              </div>
              <BackToTop />
            </>
          )}
        </div>
      </div>
    </LangProvider>
  )
}

export default App
