import { useEffect, useState } from 'react'

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/adithiteligi', path: 'M9 19c-4.3 1.3-4.3-2.2-6-2.7m12 5v-3.5c0-1 .1-1.4-.5-2 3.1-.3 6.4-1.5 6.4-7a5.4 5.4 0 0 0-1.5-3.8c.2-.9.2-2-.1-3 0 0-1.2-.4-3.9 1.4a13.6 13.6 0 0 0-7 0C4.7 1.6 3.5 2 3.5 2c-.4 1-.4 2.1-.1 3A5.4 5.4 0 0 0 2 8.8c0 5.5 3.3 6.7 6.4 7-.5.5-.7 1.1-.7 2.1V22' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/adithimath', filled: true, path: 'M4 8h3v12H4zM5.5 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM10 8h3v1.6c.8-1.3 2-1.9 3.7-1.9 3 0 4.3 1.7 4.3 5.1V20h-3v-6.4c0-1.9-.6-3-2.2-3-1.8 0-2.8 1.2-2.8 3.3V20h-3z' },
  { name: 'Email Adithi', href: 'mailto:adithi.math@gmail.com', path: 'M3 5h18v14H3zM3 5l9 8 9-8' },
]

export default function SiteNavigation({ page = 'home' }) {
  const [active, setActive] = useState(() => page === 'now' ? 'now' : page === 'records' || ['#about', '#experience', '#projects', '#skills'].includes(window.location.hash) ? 'about' : 'home')
  useEffect(() => {
    if (page !== 'home') return
    let frame
    const update = () => {
      const about = document.getElementById('about')
      if (about) setActive(about.getBoundingClientRect().top <= window.innerHeight * 0.4 ? 'about' : 'home')
    }
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('hashchange', schedule)
    window.addEventListener('resize', schedule)
    schedule()
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('hashchange', schedule); window.removeEventListener('resize', schedule) }
  }, [page])
  return <nav className="navbar" aria-label="Main navigation"><div className="navbar-inner">
    <ul>
      <li><a href="/#welcome" aria-current={active === 'home' ? 'page' : undefined}>Home</a></li>
      <li><a href="/#about" aria-current={active === 'about' ? 'location' : undefined}>About</a></li>
      <li><a href="/now/" aria-current={active === 'now' ? 'page' : undefined}>Now</a></li>
    </ul>
    <div className="header-socials" aria-label="Contact links">{socialLinks.map(link => <a key={link.name} href={link.href} aria-label={link.name} title={link.name === 'Email Adithi' ? 'adithi.math@gmail.com' : link.name} target={link.href.startsWith('https:') ? '_blank' : undefined} rel={link.href.startsWith('https:') ? 'noopener noreferrer' : undefined}>
      <svg viewBox="0 0 24 24" fill={link.filled ? 'currentColor' : 'none'} stroke={link.filled ? 'none' : 'currentColor'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={link.path} /></svg>
    </a>)}</div>
  </div></nav>
}
