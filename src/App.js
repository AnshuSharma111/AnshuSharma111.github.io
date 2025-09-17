
import './App.css';
import Home from './Home';
import About from './About';
import Projects from './Projects';
import Contact from './Contact';


function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <a href="#home" className="nav-logo">Anshu Sharma</a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>
      <Home />
      <About />
      <Projects />
      <Contact />
      <footer className="footer">
        &copy; {new Date().getFullYear()} Anshu Sharma. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
