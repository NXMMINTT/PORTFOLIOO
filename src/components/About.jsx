import { lazy, Suspense } from 'react'
import { profile, programs, skillGroups } from '../data/profile.js'

// three.js หนัก — โหลดแยกไฟล์ หน้าเว็บส่วนอื่นจะได้ขึ้นเร็ว
const Lanyard3D = lazy(() => import('./Lanyard3D.jsx'))
import Socials from './Socials.jsx'

// ไอคอนย่อของโปรแกรม (Dv, Pr, ...) — ชิปอื่นใช้จุดสีแดงแทน
const shortOf = Object.fromEntries(programs.map((p) => [p.name, p.short]))

// ABOUT ME — บัตรห้อยสายคล้องด้านซ้าย, แนะนำตัว + การ์ดทักษะด้านขวา
export default function About({ dark, onToggleTheme }) {
  return (
    <section className="about-me" id="profile">
      <button className="pill-switch" onClick={onToggleTheme} aria-label="สลับธีมสว่าง/มืด">
        <span>VIDEO</span>
        <span className={`knob ${dark ? 'on' : ''}`} />
        <span>EDITOR</span>
      </button>

      <div className="ab-card">
        <Suspense fallback={<div className="lanyard3d" />}>
          <Lanyard3D />
        </Suspense>
        <p className="lanyard3d-label">✦ ลองลากป้ายเล่นดูสิ ✦</p>
      </div>

      <div className="ab-body">
        <h2 className="ab-title">ABOUT ME</h2>
        {/* แนะนำตัวซ้าย + ช่อง YouTube/TikTok แนวตั้งในที่ว่างด้านขวา */}
        <div className="ab-intro">
          <div>
            <p className="ab-lead">{profile.about}</p>
            <p className="ab-note">{profile.additional}</p>
          </div>
          <Socials />
        </div>

        <h3 className="ab-label">ทักษะ <span aria-hidden="true">▾</span></h3>
        <div className="ab-grid">
          {skillGroups.map((g) => (
            <article key={g.title} className="ab-group">
              <header>
                <h4>{g.title}</h4>
                <small>{g.sub}</small>
              </header>
              {g.items[0]?.tools ? (
                // แยกเป็นหัวข้อย่อยต่อทักษะ แล้วเครื่องมือเป็นชิปของตัวเอง
                g.items.map((item) => (
                  <div key={item.name} className="ab-sub">
                    <h5><i className="ab-dot" />{item.name}</h5>
                    <ul className="ab-chips">
                      {item.tools.map((t) => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                ))
              ) : (
                <ul className="ab-chips">
                  {g.items.map((item) => (
                    <li key={item}>
                      {shortOf[item] ? <b className="ab-ico">{shortOf[item]}</b> : <i className="ab-dot" />}
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        <p className="ab-sticky"> พร้อมรับงาน!</p>
      </div>
    </section>
  )
}
