import { posters, profile, programs, skillGroups, videos } from '../data/profile.js'
import IdCard from './IdCard.jsx'

// ไอคอนย่อของโปรแกรม (Dv, Pr, ...) — ชิปอื่นใช้จุดสีแดงแทน
const shortOf = Object.fromEntries(programs.map((p) => [p.name, p.short]))

// ABOUT ME — บัตรห้อยสายคล้องด้านซ้าย, แนะนำตัว + การ์ดทักษะด้านขวา
export default function About({ dark, onToggleTheme }) {
  const facts = [
    profile.nickname,
    `${profile.age} ปี`,
    profile.status,
    `${videos.length} วิดีโอ`,
    `${posters.length} โปสเตอร์`,
  ]

  return (
    <section className="about-me" id="profile">
      <button className="pill-switch" onClick={onToggleTheme} aria-label="สลับธีมสว่าง/มืด">
        <span>VIDEO</span>
        <span className={`knob ${dark ? 'on' : ''}`} />
        <span>EDITOR</span>
      </button>

      <div className="ab-card">
        <IdCard />
      </div>

      <div className="ab-body">
        <h2 className="ab-title">ABOUT ME</h2>
        <p className="ab-lead">{profile.about}</p>
        <p className="ab-note">{profile.additional}</p>
        <ul className="ab-facts">
          {facts.map((f) => <li key={f}>{f}</li>)}
        </ul>

        <h3 className="ab-label">ทักษะ <span aria-hidden="true">▾</span></h3>
        <div className="ab-grid">
          {skillGroups.map((g) => (
            <article key={g.title} className="ab-group">
              <header>
                <h4>{g.title}</h4>
                <small>{g.sub}</small>
              </header>
              <ul className="ab-chips">
                {g.items.map((item) => (
                  <li key={item}>
                    {shortOf[item] ? <b className="ab-ico">{shortOf[item]}</b> : <i className="ab-dot" />}
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="ab-sticky">📌 พร้อมรับงานใหม่!</p>
      </div>
    </section>
  )
}
