import { useCallback, useEffect, useRef, useState } from 'react'
import PencilGreeting from './PencilGreeting'

const INTRO_KEY = 'adithi-portfolio-intro-v3'

export function shouldShowIntro() {
  if (!['/', '/index.html'].includes(window.location.pathname)) return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.location.hash && window.location.hash !== '#welcome') return false
  try { return sessionStorage.getItem(INTRO_KEY) !== 'seen' } catch { return true }
}

export default function PortfolioIntro({ onComplete }) {
  const dialog = useRef(null)
  const portrait = useRef(null)
  const sharedPortrait = useRef(null)
  const beginMorph = useRef(() => {})
  const writingComplete = useCallback(() => beginMorph.current(), [])
  const [morphing, setMorphing] = useState(false)
  const complete = useCallback(() => {
    try { sessionStorage.setItem(INTRO_KEY, 'seen') } catch { /* Storage may be unavailable. */ }
    onComplete()
  }, [onComplete])

  useEffect(() => {
    const element = dialog.current
    element.showModal()
    window.scrollTo({ top: 0, behavior: 'instant' })
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    let animation
    let morphStarted = false
    let timer
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const respectMotion = () => { if (preference.matches) complete() }
    preference.addEventListener('change', respectMotion)

    function morph() {
      const destination = document.querySelector('.welcome-illustration')
      if (!destination || preference.matches) { complete(); return }
      morphStarted = true
      const from = portrait.current.getBoundingClientRect()
      const to = destination.getBoundingClientRect()
      const shared = sharedPortrait.current
      Object.assign(shared.style, { left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px`, visibility: 'visible' })
      setMorphing(true)
      animation = shared.animate([
        { left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px` },
        { left: `${to.left}px`, top: `${to.top}px`, width: `${to.width}px`, height: `${to.height}px` },
      ], { duration: 950, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' })
      animation.finished.then(complete).catch(() => {})
    }
    beginMorph.current = morph
    timer = setTimeout(complete, 10000)
    const resized = () => { if (morphStarted) complete() }
    window.addEventListener('resize', resized)
    if (preference.matches) complete()
    return () => {
      clearTimeout(timer)
      beginMorph.current = () => {}
      animation?.cancel()
      preference.removeEventListener('change', respectMotion)
      window.removeEventListener('resize', resized)
      document.body.style.overflow = previous
      element.close()
    }
  }, [complete])

  return (
    <dialog ref={dialog} className={`portfolio-intro ${morphing ? 'intro-morphing' : ''}`} aria-labelledby="intro-title" onCancel={event => { event.preventDefault(); complete() }}>
      <h2 id="intro-title" className="intro-screenreader-title">hi im adithi</h2>
      <button className="intro-skip" type="button" onClick={complete} autoFocus>Skip intro ↗</button>
      <div className="intro-stage">
        <div className="intro-book" aria-hidden="true">
          <div className="intro-page">
            <img ref={portrait} className="intro-portrait" src="/illustrations/adithi-doodle.png" alt="" width="88" height="88" />
            <PencilGreeting onComplete={writingComplete} />
          </div>
          <div className="intro-cover">
            <div className="intro-cover-front"><div className="intro-cover-label"><span>Adithi Math</span><small>Portfolio</small></div></div>
            <div className="intro-cover-back"><span className="intro-inside-pocket" /></div>
          </div>
        </div>
        <p className="intro-caption">A few pages about me.</p>
        <button type="button" className="intro-enter" onClick={complete}>Enter portfolio <span aria-hidden="true">→</span></button>
      </div>
      <img ref={sharedPortrait} className="intro-shared-portrait" src="/illustrations/adithi-doodle.png" alt="" aria-hidden="true" />
    </dialog>
  )
}
