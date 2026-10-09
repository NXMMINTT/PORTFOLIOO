import { clientLogos } from '../data/profile.js'

// แถบโลโก้ลูกค้าเลื่อนวน 2 แถว (สวนทางกัน) — ชี้เมาส์เพื่อหยุดและดูโลโก้เป็นสี
export default function LogoMarquee() {
  const rows = [clientLogos, [...clientLogos].reverse()]
  return (
    <div className="logo-marquee" aria-label="ลูกค้าและแบรนด์ที่เคยร่วมงาน">
      <p className="logo-label">ลูกค้า & แบรนด์ที่เคยร่วมงาน</p>
      {rows.map((row, r) => (
        <div key={r} className={`logo-row ${r ? 'reverse' : ''}`}>
          <div className="logo-track">
            {[0, 1].map((k) => (
              <div key={k} className="logo-set" aria-hidden={k === 1}>
                {row.map((c) => (
                  <div key={c.img} className="logo-tile" title={c.name}>
                    <img src={c.image} alt={k === 0 ? c.name : ''} loading="lazy" draggable={false} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
