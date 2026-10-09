import { profile, works } from '../data/profile.js'
import Poster from './Poster.jsx'

const pad = (n) => String(n).padStart(2, '0')

// โปสเตอร์หนังโรง (one-sheet) — รูปเป็นสไลด์โชว์ผลงาน พร้อมชื่อเรื่องและเครดิตแบบโปสเตอร์จริง
export default function MoviePoster({ index, onSelect }) {
  const w = works[index]
  return (
    <article className="one-sheet">
      <div className="os-media">
        {works.map((work, i) => (
          <div key={work.titleEn} className={`os-slide ${i === index ? 'active' : ''}`}>
            <Poster work={work} />
          </div>
        ))}
      </div>
      <div className="os-shade" />

      <p className="os-top">
        <span>{profile.handle.toUpperCase()} PRESENTS</span>
        <span>{pad(index + 1)} / {pad(works.length)}</span>
      </p>

      <div className="os-bottom" key={index}>
        <p className="os-tagline">“{w.description}”</p>
        <h3 className="os-title">{w.title}</h3>
        <p className="os-en">{w.titleEn}</p>
        <p className="os-billing">
          {w.type} · {w.role}<br />
          EDITED BY {profile.nameEn} · {w.duration}
        </p>
        <p className="os-date">NOW SHOWING · {w.year}</p>
      </div>

      <div className="os-dots">
        {works.map((work, i) => (
          <button
            key={work.titleEn}
            className={i === index ? 'active' : ''}
            onClick={() => onSelect(i)}
            aria-label={work.title}
          />
        ))}
      </div>
    </article>
  )
}
