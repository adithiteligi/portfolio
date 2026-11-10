import { nowUpdates } from '../data/now'

function readableDate(date) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${date}T12:00:00Z`))
}

export default function NowPage() {
  return <main className="now-page" id="now">
    <header className="now-header">
      <p className="now-eyebrow">A running update</p>
      <h1>Now</h1>
      <p className="now-dek">A little of what I’m up to.</p>
      <p className="now-updated">Last updated <time dateTime={nowUpdates[0].date}>{readableDate(nowUpdates[0].date)}</time></p>
    </header>
    <div className="now-layout">
      <aside className="now-index" aria-label="Update archive">
        <h2>Notes</h2>
        <ol>{nowUpdates.map(update => <li key={update.id}><a href={`#${update.id}`}><time dateTime={update.date}>{readableDate(update.date)}</time><span>{update.title}</span></a></li>)}</ol>
      </aside>
      <div className="now-entries">{nowUpdates.map((update, index) => <article className="now-entry" id={update.id} key={update.id}>
        <p className="now-entry-number">Note {String(nowUpdates.length - index).padStart(2, '0')}</p>
        <time dateTime={update.date}>{readableDate(update.date)}</time>
        <h2>{update.title}</h2>
        {update.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        <a className="now-back-link" href="/#about">Back to my journal <span aria-hidden="true">↗</span></a>
      </article>)}</div>
    </div>
  </main>
}
