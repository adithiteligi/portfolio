import { useCallback, useState } from 'react'
import './App.css'
import VinylShelf from './components/VinylShelf'
import SkillsBag from './components/SkillsBag'
import SiteNavigation from './components/SiteNavigation'
import NowPage from './components/NowPage'
import ExperienceList from './components/ExperienceList'
import SiteFooter from './components/SiteFooter'
import PortfolioIntro, { shouldShowIntro } from './components/PortfolioIntro'

const experiences = [
  {
    company: 'Deloitte', dates: 'June 2026 – August 2026',
    role: 'Data & AI Solutions Engineer Intern',
    description: 'Helped teams find the right people and projects by connecting internal knowledge with AI-powered search.',
    skills: ['Python', 'FastAPI', 'FalkorDB', 'LLMs'],
  },
  {
    company: 'Huntington National Bank', dates: 'May 2025 – August 2025',
    role: 'Machine Learning Operations Intern',
    description: 'Made day-to-day machine learning work smoother by automating data pipelines, testing, and security reporting.',
    skills: ['Python', 'Azure DevOps', 'CI/CD', 'n8n'],
  },
  {
    company: 'Goldman Sachs', dates: 'October 2024 – January 2025',
    role: 'Engineering Emerging Leader Intern',
    description: 'Worked with a team to build an app that helps people explore how mutual fund investments could grow over time.',
    skills: ['Full-stack development', 'APIs', 'Team collaboration'],
  },
  {
    company: 'Nationwide Children’s Hospital Research Institute', dates: 'May 2024 – May 2025',
    role: 'Data Analytics Research Intern',
    description: 'Worked with spatial datasets and created visualizations during a data analytics internship at the research institute.',
    skills: ['Python', 'Spatial analytics', 'Data visualization'],
  },
  {
    company: 'Big Data & Analytics Association', dates: 'November 2025 – Present',
    role: 'President',
    description: 'Bring students and industry together through technical programs, events, and sponsorships at Ohio State.',
    skills: ['Leadership', 'Community building', 'Event planning'],
  },
  {
    company: 'Indian Students Association', dates: 'August 2023 – May 2025',
    role: 'Secretary',
    description: 'Helped organize cultural events and kept students, campus organizations, and faculty connected.',
    skills: ['Leadership', 'Communication', 'Event planning'],
  },
]
function App() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro)
  const finishIntro = useCallback(() => setShowIntro(false), [])
  const page = window.location.pathname.replace(/\/+$/, '')
  if (page === '/now') return <div className="portfolio-container"><SiteNavigation page="now" /><NowPage /><SiteFooter /></div>
  if (page === '/records') return <div className="portfolio-container"><SiteNavigation page="records" /><main className="records-page"><a className="records-back-link" href="/#about">← Back to my journal</a><VinylShelf /></main><SiteFooter /></div>
  return (
    <>
      {showIntro && <PortfolioIntro onComplete={finishIntro} />}
      <div className="portfolio-container" inert={showIntro ? true : undefined}>
        <SiteNavigation />

        {/* Welcome Section */}
        <section id="welcome" className="section welcome-opening" aria-labelledby="welcome-heading">
          <img
            src="/illustrations/adithi-doodle.png"
            alt="A simple black-ink doodle of a girl with shoulder-length hair and a bow necklace."
            className="welcome-illustration"
            width="1254"
            height="1254"
            fetchPriority="high"
          />
          <h1 id="welcome-heading">Adithi Math</h1>
          <p className="welcome-intro">Data Analytics student at The Ohio State University.</p>
          <div className="welcome-actions">
            <a href="#about">Get to know me <span aria-hidden="true">↓</span></a>
            <span className="welcome-divider" aria-hidden="true">/</span>
            <a href="/now/">What I’m up to <span aria-hidden="true">↗</span></a>
          </div>
          <div className="welcome-socials">
            <button className="intro-replay" type="button" onClick={() => setShowIntro(true)}>Replay intro</button>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section">
          <h2>About Me</h2>
          <div className="notebook">
            <div className="notebook-page photo-page">
              <figure className="notebook-photo">
                <span className="photo-tape" aria-hidden="true" />
                <img src="/profile.jpg" alt="Adithi Math" />
              </figure>
              <span className="page-number">01</span>
            </div>
            <div className="notebook-binding" aria-hidden="true">
              {Array.from({ length: 12 }, (_, i) => <span key={i} />)}
            </div>
            <div className="notebook-page writing-page">
              <span className="page-label">a few things about me</span>
              <h3>hi, I’m Adithi!</h3>
              <p>I’m studying Data Analytics at Ohio State, and I’m interested in finding patterns in data and building products people use. <a className="journal-link" href="#experience">My experience</a> so far spans healthcare, banking, and consulting, where I’ve built data tools and AI-powered software that help people make sense of information and leverage it to make better decisions.</p>
              <p>At Ohio State, I’m President of the Big Data &amp; Analytics Association, where I’ve led efforts to help students build on their classroom learning through technical programs, hands-on projects, and events that connect them with industry professionals.</p>
              <p>Writing is another big part of my life. I love writing poems, short stories, essays, and plenty of journal entries, and I bring that storytelling perspective to my work. Beyond the technical details, I think about how the pieces connect, what matters, and how to communicate it clearly so people can make informed decisions.</p>
              <p>I also love traveling, going to concerts, and spending time with friends and family. I’ve been collecting vinyl ever since I got a record player for my 15th birthday. You can browse a few favorites on <a className="journal-link" href="/records/">my record shelf</a>.</p>
              <p>For a little more about life lately, here’s <a className="journal-link" href="/now/">what I’m up to now</a>.</p>
              <span className="notebook-signature">Thanks for stopping by ♡</span>
              <span className="page-number">02</span>
            </div>
            <img className="journal-mascot" src="/illustrations/adithi-peeking.png" alt="" aria-hidden="true" width="170" height="170" />
          </div>
        </section>

        <ExperienceList experiences={experiences} />

        {/* Projects Section */}
        <section id="projects" className="section">
          <h2>Projects</h2>
          <div className="projects-content">
            <div className="project-card-row">
              <a className="project-card" href="https://github.com/adithiteligi/Financial-Milestones-App" target="_blank" rel="noopener noreferrer">
                <div className="project-title">Money Milestones</div>
                <div className="project-desc">A financial planning app that helps students and young professionals break college costs and homeownership goals into visual roadmaps and track their progress.</div>
                <div className="project-link">View project ↗</div>
              </a>
              <a className="project-card" href="https://github.com/adithiteligi/Adithi_Sprint0MonoGameProject" target="_blank" rel="noopener noreferrer">
                <div className="project-title">MonoGame — Dog &amp; Tennis Ball</div>
                <div className="project-desc">An interactive MonoGame demo with a keyboard-controlled dog and a mouse-controlled tennis ball, featuring movement, sprite animation, and bouncing.</div>
                <div className="project-link">View project ↗</div>
              </a>
              <a className="project-card" href="https://github.com/vickynguyen356-web/3902TeamUnoProject" target="_blank" rel="noopener noreferrer">
                <div className="project-title">Team Uno — Mario Game</div>
                <div className="project-desc">An ongoing team project in C# and MonoGame, recreating Mario’s movement, animated characters, enemies, and scrolling levels.</div>
                <div className="project-link">View project ↗</div>
              </a>
              <a className="project-card" href="https://github.com/adithiteligi/Goldman-Technical-Project" target="_blank" rel="noopener noreferrer">
                <div className="project-title">Goldman Mutual Fund Investment Calculator</div>
                <div className="project-desc">Estimate potential returns on mutual fund investments by selecting a fund, entering an amount, and choosing a duration.</div>
                <div className="project-link">View project ↗</div>
              </a>
              <a className="project-card" href="https://github.com/arjunnarang24/STAT-3302" target="_blank" rel="noopener noreferrer">
                <div className="project-title">Data Analysis Report – Predicting Animal Adoption at Long Beach Animal Shelter</div>
                <div className="project-desc">Analyzed 29,000+ animal shelter records to model and predict adoption likelihood using logistic regression.</div>
                <div className="project-link">View project ↗</div>
              </a>
            </div>
          </div>
        </section>

        <SkillsBag />
        <div className="bottom-discoveries">
        <a className="record-shelf-reminder" href="/records/">
          <span className="tiny-record" aria-hidden="true" /><span>My record shelf <span aria-hidden="true">↗</span></span>
        </a>
        <a className="notes-reminder" href="/now/"><svg viewBox="0 0 60 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 6h35l-2 51H12Z M19 5v54M25 19h15M25 27h13M25 35h15M25 43h9" /></svg><span>Notes <span aria-hidden="true">↗</span></span></a>
        </div>
        <SiteFooter />


      </div>
    </>
  )
}

export default App
