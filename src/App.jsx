import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    // Enable smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });

    // Intersection Observer for fade-in/scale-up
    const cards = document.querySelectorAll('.section > div');
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-container">
      {/* Navigation */}
      <nav className="navbar">
        <ul>
          <li><a href="#welcome">Welcome</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#education">Education</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Welcome Section */}
      <section id="welcome" className="section">
        <div className="welcome-content">
          <h1>Welcome to Adithi Math's Portfolio</h1>
          <p>Scroll down to learn more about me</p>
        </div>
        <button
          className="scroll-down-btn"
          onClick={() => {
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label="Scroll down to About Me"
        >
          <span className="arrow">↓</span>
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <h2>About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I am a data scientist and computational biologist passionate about leveraging data-driven approaches to solve complex biological problems. With experience in spatial data analysis, algorithm development, and advanced data mining, I thrive at the intersection of biology and technology. My work focuses on uncovering meaningful patterns in biomedical data to drive impactful research and innovation.
            </p>
          </div>
          <div className="about-image">
            <img src="/profile.jpg" alt="Profile" />
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section">
        <h2>Education</h2>
        <div className="education-content">
          <ul>
            <li>
              <strong>Bachelor's Degree</strong><br />
              Ohio State University
            </li>
          </ul>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section">
        <h2>Experience</h2>
        <div className="experience-content">
          <ul>
            <li>
              Detecting 100+ spatial patterns and clusters of key cell types influencing tumor progression within the tumor microenvironment of triple-negative, HER2+ breast cancer across more than 280 patient records.
            </li>
            <li>
              Effectively analyzing spatial data by developing computational algorithms and data models, leveraging Python libraries and using advanced data mining techniques.
            </li>
          </ul>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <h2>Projects</h2>
        <div className="projects-content">
          {/* Add your projects here */}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section">
        <h2>Contact Me</h2>
        <div className="contact-content">
          <p>Email: <a href="mailto:adithi.math.gs@gmail.com">adithi.math.gs@gmail.com</a></p>
          <p>LinkedIn: <a href="https://linkedin.com/in/adithimath" target="_blank" rel="noopener noreferrer">linkedin.com/in/adithimath</a></p>
          <p>GitHub: <a href="https://github.com/digit-aditi" target="_blank" rel="noopener noreferrer">github.com/digit-aditi</a></p>
        </div>
      </section>
    </div>
  )
}

export default App
