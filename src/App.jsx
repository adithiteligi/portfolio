import { useEffect, useState } from 'react'
import './App.css'

function App() {
  // Typewriter effect for welcome-title
  const staticPrefix = 'Data ';
  const dynamicWords = ['Student', 'Scientist', 'Analyst', 'Engineer'];
  const [typedTitle, setTypedTitle] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Cursor glow state
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    let timeout;
    const currentWord = dynamicWords[wordIndex];
    if (!isDeleting) {
      // Typing
      if (charIndex < currentWord.length) {
        setTypedTitle(staticPrefix + currentWord.slice(0, charIndex + 1));
        timeout = setTimeout(() => setCharIndex(charIndex + 1), 70);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => setIsDeleting(true), 1200);
      }
    } else {
      // Deleting
      if (charIndex > 0) {
        setTypedTitle(staticPrefix + currentWord.slice(0, charIndex - 1));
        timeout = setTimeout(() => setCharIndex(charIndex - 1), 40);
      } else {
        // Move to next word
        setIsDeleting(false);
        setWordIndex((wordIndex + 1) % dynamicWords.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

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

  // Cursor glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      // Card edge glow effect
      document.querySelectorAll('.timeline-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--glow-x', `${x}px`);
        card.style.setProperty('--glow-y', `${y}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Cursor Glow */}
      <div
        className="cursor-glow"
        style={{ left: cursorPos.x - 80, top: cursorPos.y - 80 }}
      ></div>
      <div className="bubble-bg">
        <div className="bubble bubble1"></div>
        <div className="bubble bubble2"></div>
        <div className="bubble bubble3"></div>
      </div>
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
          <div className="welcome-hero">
            <div className="welcome-left">
              <h1><span className="welcome-name">Adithi Math</span></h1>
              <h2 className="welcome-title">{typedTitle}<span className="typewriter-cursor">|</span></h2>
              <p className="welcome-intro"> Hello! My name is Adithi Math and I am a Data Analytics student at the Ohio State University.</p>
              <div className="welcome-socials">
                <a href="https://github.com/digit-aditi" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
                <a href="https://linkedin.com/in/adithimath" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fa-brands fa-linkedin"></i></a>
              </div>
              <a href="#contact" className="welcome-btn">Contact Me</a>
            </div>
            <div className="welcome-right">
              <img src="/removeBG.png" alt="Adithi Math" className="welcome-img" />
            </div>
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
              As a Data Analytics student, I love exploring new domains in the field of data analytics. I have dabbled into areas of healthcare analytics, financial technology, and machine learning operations. My passion is using data to uncover insights and drive impactful solutions across industries. 
              Outside of academics, I love to travel, listen to music, and spend time with friends and family. I was gifted a record player for my 15th birthday and love to collect vinyls!
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
          <div className="education-card">
            <div className="education-title"><strong>The Ohio State University, College of Arts & Sciences</strong></div>
            <div className="education-major"><strong>Major in Data Analytics with a Specialization in Computational Analytics</strong></div>
            <div className="education-minor">Minor in Business</div>
            <div className="education-grad">Graduating Spring 2027</div>
            <div className="education-coursework"><strong>Coursework:</strong> Object Oriented Programming, Data Structures & Algorithms, Linear Regression Modeling, Linear Algebra</div>
          </div>
          <div className="education-involvement-row">
            <div className="education-involvement-card">
              <div className="education-involvement-title"><strong>Business Builders</strong></div>
              <div className="education-involvement-role">Founding Cohort Member</div>
              <div className="education-involvement-blurb">Selected as 1 of 45 for the founding cohort, shaping the entrepreneurship experience at OSU and collaborating on innovative business solutions.</div>
            </div>
            <div className="education-involvement-card">
              <div className="education-involvement-title"><strong>Indian Students Association</strong></div>
              <div className="education-involvement-role">Secretary</div>
              <div className="education-involvement-blurb">Secretary and main contact for 3,000 members, helping organize large cultural events and coordinate with student orgs and faculty.</div>
            </div>
            <div className="education-involvement-card">
              <div className="education-involvement-title"><strong>Big Data & Analytics Association</strong></div>
              <div className="education-involvement-role">Corporate Relations Director, Marketing Director</div>
              <div className="education-involvement-blurb">Led analytics projects, expanded sponsorships, organized tech talks, and boosted engagement through content creation and social media management.</div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="section">
          <h2>Experience</h2>
          <div className="timeline-container">
            <div className="timeline">
              {/* Huntington National Bank */}
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-header">
                    <strong>Huntington National Bank</strong> <span className="timeline-date">May 2025 – August 2025</span>
                  </div>
                  <div className="timeline-role">Incoming Machine Learning Operations Intern</div>
                  <div className="timeline-blurb">Designed and deployed scalable machine learning solutions, building data pipelines and automating model monitoring for real-time financial applications.</div>
                </div>
              </div>
              {/* Goldman Sachs */}
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-header">
                    <strong>Goldman Sachs Emerging Leaders Series</strong> <span className="timeline-date">October 2024 – Present</span>
                  </div>
                  <div className="timeline-role">Engineering Emerging Leader</div>
                  <div className="timeline-blurb">Selected for a 5-month Agile-based program focused on technical development, mentorship, and building a full-stack web app for mutual fund investment analysis.</div>
                </div>
              </div>
              {/* Nationwide Children's Hospital Research Institute */}
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-header">
                    <strong>Nationwide Children's Hospital Research Institute</strong> <span className="timeline-date">May 2024 – Present</span>
                  </div>
                  <div className="timeline-role">Data Analytics Research Intern</div>
                  <div className="timeline-blurb">Analyzed spatial data and developed computational models to uncover tumor progression patterns in breast cancer using advanced Python and data mining techniques.</div>
                </div>
              </div>
              {/* OSU Libraries */}
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-header">
                    <strong>OSU Libraries</strong> <span className="timeline-date">March 2024 – January 2025</span>
                  </div>
                  <div className="timeline-role">Data Analytics Intern</div>
                  <div className="timeline-blurb">Enhanced archive accessibility and optimized user navigation by creating interactive data visualizations and streamlining workflows for cataloging datasets.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="section">
          <h2>Projects</h2>
          <div className="projects-content">
            <div className="project-card-row">
              <a className="project-card" href="https://github.com/adithiteligi/Goldman-Technical-Project" target="_blank" rel="noopener noreferrer">
                <div className="project-title">Goldman Mutual Fund Investment Calculator</div>
                <div className="project-desc">Estimate potential returns on mutual fund investments by selecting a fund, entering an amount, and choosing a duration.</div>
                <div className="project-link">@github.com/adithiteligi/Goldman-Technical-Project</div>
              </a>
              <a className="project-card" href="https://github.com/arjunnarang24/STAT-3302" target="_blank" rel="noopener noreferrer">
                <div className="project-title">Data Analysis Report – Predicting Animal Adoption at Long Beach Animal Shelter</div>
                <div className="project-desc">Analyzed 29,000+ animal shelter records to model and predict adoption likelihood using logistic regression.</div>
                <div className="project-link">@github.com/arjunnarang24/STAT-3302</div>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <div className="contact-content">
            <div className="contact-icons-row">
              <div className="contact-icon-card" onClick={() => {navigator.clipboard.writeText('adithi.math@gmail.com'); window.open('mailto:adithi.math@gmail.com');}} tabIndex={0} title="Copy email & open mail">
                <img src="/image.png" alt="Email" className="contact-img-icon" />
                <div className="contact-info">adithi.math@gmail.com</div>
              </div>
              <a className="contact-icon-card" href="https://linkedin.com/in/adithimath" target="_blank" rel="noopener noreferrer" tabIndex={0} title="Open LinkedIn">
                <img src="/image copy 2.png" alt="LinkedIn" className="contact-img-icon" />
                <div className="contact-info">@https://linkedin.com/in/adithimath</div>
              </a>
              <a className="contact-icon-card" href="https://github.com/adithiteligi" target="_blank" rel="noopener noreferrer" tabIndex={0} title="Open GitHub">
                <img src="/Image-removebg-preview-2.png" alt="GitHub" className="contact-img-icon" />
                <div className="contact-info">@https://github.com/adithiteligi</div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default App
