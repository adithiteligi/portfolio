import { useEffect, useRef } from 'react'

export default function PencilGreeting({ onComplete }) {
  const text = useRef(null)
  const underline = useRef(null)
  const pencil = useRef(null)

  useEffect(() => {
    let cancelled = false
    let frame
    let finish
    async function write() {
      try { await document.fonts.load('500 36px Caveat') } catch { /* Use the same handwriting fallback as the page. */ }
      if (cancelled) return
      const box = text.current.getBBox()
      const line = underline.current
      line.setAttribute('d', `M${box.x - 1} 51 Q${box.x + box.width * .22} 54 ${box.x + box.width * .5} 51 T${box.x + box.width + 2} 52`)
      const length = line.getTotalLength()
      line.style.strokeDasharray = String(length)
      line.style.strokeDashoffset = String(length)
      const start = performance.now() + 1300
      function draw(now) {
        const progress = Math.max(0, Math.min(1, (now - start) / 850))
        line.style.strokeDashoffset = String(length * (1 - progress))
        const point = line.getPointAtLength(length * progress)
        pencil.current.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(28)`)
        pencil.current.style.opacity = now >= start && progress < 1 ? '1' : '0'
        if (progress < 1) frame = requestAnimationFrame(draw)
        else finish = setTimeout(onComplete, 180)
      }
      frame = requestAnimationFrame(draw)
    }
    write()
    return () => { cancelled = true; cancelAnimationFrame(frame); clearTimeout(finish) }
  }, [onComplete])

  return <svg className="intro-handwriting" viewBox="0 0 235 60" role="img" aria-label="hi im adithi">
    <text ref={text} className="intro-written-text" x="117.5" y="43" textAnchor="middle">hi im adithi</text>
    <path ref={underline} className="intro-underline" d="M40 51h155" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
    <g ref={pencil} className="intro-pencil" style={{ opacity: 0 }} aria-hidden="true">
      <path d="M0 0 L-3 -10 L3 -10 Z" fill="#d2a97e" /><path d="M0 0 L-1 -4 L1 -4 Z" fill="#49382f" />
      <path d="M-3 -10 V-37 H3 V-10 Z" fill="#b27155" /><path d="M0 -10 V-37" stroke="#eac4a0" strokeWidth="1.5" />
      <path d="M-3 -37 V-42 Q0 -45 3 -42 V-37Z" fill="#be8b86" /><path d="M-3 -36H3" stroke="#d7bb85" strokeWidth="2.5" />
    </g>
  </svg>
}
