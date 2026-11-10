import { useRef, useState } from 'react'
import LastListened from './LastListened'
import { records } from '../data/records'

function Cover({ record }) {
  return <img className="album-art" src={record.cover} alt={`${record.title} album cover`} width="600" height="600" />
}

export default function VinylShelf() {
  const [selected, setSelected] = useState(null)
  const buttons = useRef([])
  const record = selected === null ? null : records[selected]
  const racks = [records.slice(0, 6), records.slice(6)]

  function select(index, focus = false) {
    const next = (index + records.length) % records.length
    setSelected(next)
    if (focus) buttons.current[next]?.focus({ preventScroll: true })
    const button = buttons.current[next]
    const rack = button?.parentElement
    if (rack && rack.scrollWidth > rack.clientWidth) {
      rack.scrollTo({ left: button.offsetLeft - rack.clientWidth / 2 + button.offsetWidth / 2, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
    }
  }

  function navigate(event, index) {
    let next
    if (event.key === 'ArrowRight') next = index + 1
    if (event.key === 'ArrowLeft') next = index - 1
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = records.length - 1
    if (next !== undefined) {
      event.preventDefault()
      select(next, true)
    }
  }

  function putBack() {
    buttons.current[selected]?.focus({ preventScroll: true })
    setSelected(null)
  }

  return (
    <section id="records" className="section vinyl-section" aria-labelledby="records-heading">
      <div className="vinyl-heading">
        <h2 id="records-heading">My record shelf</h2>
        <LastListened />
      </div>
      <p className="shelf-caption">tap to see my favorites</p>
      <div className="record-cabinet">
        {racks.map((rack, row) => (
          <div className="wooden-rack" role="group" aria-label={`Record shelf ${row + 1}`} key={row}>
            {rack.map((item, column) => {
              const index = row * 6 + column
              return (
                <button type="button" className="shelf-album" key={item.id} aria-label={`${item.title}, ${item.artist}`} aria-expanded={selected === index} aria-controls="record-detail" ref={element => { buttons.current[index] = element }} onClick={() => select(index)} onKeyDown={event => navigate(event, index)}>
                  <Cover record={item} />
                  <span className="shelf-album-label">{item.title}</span>
                </button>
              )
            })}
          </div>
        ))}
      </div>
      <div id="record-detail" className="record-detail-slot">
        {record && <div className="record-detail" role="region" aria-labelledby="selected-album-title" key={record.id}>
          <button className="record-put-back" type="button" onClick={putBack} aria-label="Put record back on the shelf">×</button>
          <div className="record-display" aria-hidden="true">
            <div className="vinyl-disc" style={{ '--disc-label': record.color }}></div>
            <div className="selected-sleeve"><Cover record={record} /></div>
          </div>
          <div className="record-copy">
            <h3 id="selected-album-title">{record.title}</h3>
            <p className="record-artist">{record.artist}</p>
            <p className="record-release">Released {record.year}</p>
            <h4>Favorites on this record</h4>
            <ul className="record-favorites">{record.favorites.map((track, index) => <li key={track}><span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>{track}</li>)}</ul>
          </div>
        </div>}
      </div>
    </section>
  )
}
