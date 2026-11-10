import { useEffect, useRef, useState } from 'react'
import { skills } from '../data/skills'

const placements = [
  [15, 12], [29, 7], [43, 5], [57, 5], [71, 7], [85, 12],
  [8, 28], [18, 40], [8, 52], [18, 64], [8, 76], [20, 88],
  [92, 28], [82, 40], [92, 52], [82, 64], [92, 76], [80, 88],
  [33, 98], [50, 98], [67, 98],
]
const mobilePlacements = [
  [22, 8], [50, 8], [78, 8], [22, 20], [50, 20], [78, 20],
  [8, 32], [8, 43], [8, 54], [8, 65], [8, 76], [8, 87],
  [92, 32], [92, 43], [92, 54], [92, 65], [92, 76], [92, 87],
  [22, 97], [50, 97], [78, 97],
]

export default function SkillsBag() {
  const [visible, setVisible] = useState(false)
  const scene = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 })
    observer.observe(scene.current)
    return () => observer.disconnect()
  }, [])


  return (
    <section id="skills" className="section skills-section" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="bag-eyebrow">Skills</h2>
      <p className="skills-intro">The languages and tools I carry with me.</p>
      <div ref={scene} className={`bag-scene ${visible ? 'is-floating' : ''}`} role="group" aria-label="Skills around my red bag">
        <div className="bag-center">
          <img className="red-bag" src="/images/red-bag.png" alt="Adithi’s red leather shoulder bag with gold hardware" width="1126" height="1380" />
          <p className="bag-title"><span>What’s in</span>my bag?</p>
        </div>
        {skills.map((skill, index) => <div className="bag-skill-position" key={skill.icon} style={{ '--x': `${placements[index][0]}%`, '--y': `${placements[index][1]}%`, '--mobile-x': `${mobilePlacements[index][0]}%`, '--mobile-y': `${mobilePlacements[index][1]}%`, '--delay': `${-index * 0.47}s`, '--duration': `${4 + index % 4 * 0.6}s` }}>
          <div className="bag-skill">
            <img src={`/skills/${skill.icon}.svg`} alt="" width="48" height="48" draggable="false" />
            <span>{skill.name}</span>
          </div>
        </div>)}
      </div>

    </section>
  )
}
