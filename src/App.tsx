import About from "./components/About"
import Contact from "./components/Contact"
import Hero from "./components/Hero"
import Nav from "./components/Nav"
import Projects from "./components/Projects"
import Skills from "./components/Skills"

function App() {
  return (
    <div className="bg-bg min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

export default App
