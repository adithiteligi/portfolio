const organizationLogos = {
  'Deloitte': '/organizations/deloitte.ico',
  'Huntington National Bank': '/organizations/huntington.ico',
  'Goldman Sachs': '/organizations/goldman-sachs.svg',
  'Nationwide Children’s Hospital Research Institute': '/organizations/nationwide-childrens.ico',
  'Big Data & Analytics Association': '/organizations/bdaa.png',
  'Indian Students Association': '/organizations/isa.jpg',
}

export default function ExperienceList({ experiences }) {
  return <section id="experience" className="section experience-section" aria-labelledby="experience-heading">
    <h2 id="experience-heading">Experience</h2>
    <div className="experience-list">
      {experiences.map(experience => <article className="experience-row" key={experience.company}>
        <div className="experience-period-column">{experience.dates}</div>
        <span className={`organization-logo${experience.company === 'Indian Students Association' ? ' organization-logo--isa' : ''}`}><img src={organizationLogos[experience.company]} alt="" width="42" height="42" /></span>
        <div className="experience-content">
          <h3 className="experience-company">{experience.company}</h3>
          <p className="experience-position">{experience.role}</p>
          <p className="experience-description">{experience.description}</p>
          <ul className="experience-tags" aria-label="Skills used">{experience.skills.map(skill => <li key={skill}>{skill}</li>)}</ul>
        </div>
      </article>)}
    </div>
  </section>
}
