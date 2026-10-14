import About from "./components/About"
import BackToTop from "./components/BackToTop"
import Certificates from "./components/Certificates"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Journey from "./components/Journey"
import Nav from "./components/Nav"
import ProfileCard from "./components/ProfileCard"
import Projects from "./components/Projects"
import ScrollProgress from "./components/ScrollProgress"
import Skills from "./components/Skills"
import Stars from "./components/Stars"

function App() {
  return (
    <div className="relative min-h-screen">
      <Stars />
      <div className="relative z-10">
        <ScrollProgress />
        <Nav />
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
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Footer />
        </div>
        <BackToTop />
      </div>
    </div>
  )
}

export default App
