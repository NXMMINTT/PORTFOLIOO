import { useEffect, useState } from 'react'
import { contact, profile, works } from '../data/profile.js'
import { navLinks } from './navLinks.js'
import Poster from './Poster.jsx'

// ไทม์โค้ดเดินแบบกล้องกำลังอัด (25 fps) นับจากตอนเปิดหน้า
function Timecode() {
  const [frames, setFrames] = useState(0)
  useEffect(() => {
    const start = performance.now()
    const t = setInterval(() => setFrames(Math.floor(((performance.now() - start) / 1000) * 25)), 40)
    return () => clearInterval(t)
  }, [])
  const p = (n) => String(n).padStart(2, '0')
  const s = Math.floor(frames / 25)
  return (
    <p className="tv-tc" aria-hidden="true">
      <b>REC</b> {p(Math.floor(s / 3600))}:{p(Math.floor(s / 60) % 60)}:{p(s % 60)}:{p(frames % 25)}
    </p>
  )
}

// หน้าแรก: ทีวีย้อนยุคบนแท่นโชว์ — คลิกที่จอ/ปุ่มทีวีเพื่อเปลี่ยนช่อง (วนดูผลงาน)
export default function TvHero() {
  const [channel, setChannel] = useState(0) // 0 = หน้าชื่อ, 1..n = ผลงาน
  const [noise, setNoise] = useState(false)

  const zap = () => {
    setNoise(true)
    setTimeout(() => {
      setChannel((c) => (c + 1) % (works.length + 1))
      setNoise(false)
    }, 280)
  }

  const first = profile.nameEn.split(' ')[0]
  const half = Math.ceil(first.length / 2)
  const initials = profile.nameEn.split(' ').map((w) => w[0]).join('')
  const work = works[channel - 1]

  return (
    <section className="tvhero" id="top">
      <header className="tv-bar">
        <a href="#top" className="tv-brand">
          <span className="brand-stick" aria-hidden="true" />
          <span className="brand-board">VIDEO EDITOR<br />PORTFOLIO</span>
        </a>
        <Timecode />
        <nav className="tv-nav">
          {navLinks.map(([href, label], i) => (
            <a key={href} href={href}><small>{String(i + 1).padStart(2, '0')}</small>{label}</a>
          ))}
        </nav>
        <a href="#contact" className="tv-cta">ติดต่องาน</a>
      </header>

      <div className="tv-left">
        <p className="iam">
          <span className="q">“</span> I AM<br />
          {first.slice(0, half)}&nbsp;&nbsp;<b>{first.slice(half)}</b> <span className="q">”</span>
        </p>
        <p className="seek">ตำแหน่งที่สนใจ:<br /><b>{profile.position}</b></p>
        <div className="tv-contact">
          <a href={`tel:${contact.phone.replace(/[\s-]/g, '')}`}>
            <span className="tc-ico" aria-hidden="true">☎</span>
            <span><small>TEL</small>{contact.phone}</span>
          </a>
          <a href={`mailto:${contact.email}`}>
            <span className="tc-ico" aria-hidden="true">✉</span>
            <span><small>E-MAIL</small>{contact.email}</span>
          </a>
        </div>
      </div>

      <div className="stage">
        <div className="polaroid-sm p-work" aria-hidden="true">
          <div className="p-img">
            {profile.snapPhoto ? <img src={profile.snapPhoto} alt="" /> : <Poster work={works[0]} small />}
          </div>
        </div>
        <div className="polaroid-sm p-me">
          <div className="p-img p-face">
            {profile.heroPhoto ? <img src={profile.heroPhoto} alt={profile.name} /> : <span>{initials}</span>}
          </div>
        </div>

        <div className="tv">
          <span className="antenna a1" />
          <span className="antenna a2" />
          <div className="tv-body">
            <button className={`tv-screen ${noise ? 'noise' : ''}`} onClick={zap} aria-label="เปลี่ยนช่อง">
              {channel === 0 || !work ? (
                <div className="ch-title">
                  <span className="ch-port">Portfolio</span>
                  <span className="ch-name">@{profile.name}</span>
                </div>
              ) : (
                <div className="ch-work">
                  <Poster work={work} />
                  <span className="ch-label">CH {String(channel).padStart(2, '0')} · {work.title}</span>
                </div>
              )}
              <span className="scan" />
            </button>
            <div className="tv-panel">
              <button className="dial" onClick={zap} aria-label="เปลี่ยนช่อง" />
              <span className="dial small" />
              <span className="grill" />
            </div>
          </div>
          <span className="leg l" />
          <span className="leg r" />
        </div>

        <div className="note">ยินดีต้อนรับ<br /><small>คลิกจอทีวีเพื่อเปลี่ยนช่อง</small></div>

        <div className="popcorn" aria-hidden="true">
          <div className="pop-top">{Array.from({ length: 7 }, (_, i) => <i key={i} />)}</div>
          <div className="pop-bucket" />
        </div>

        <svg className="reel" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="46" />
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <circle key={a} cx={50 + Math.cos((a * Math.PI) / 180) * 26} cy={50 + Math.sin((a * Math.PI) / 180) * 26} r="10" className="hole" />
          ))}
          <circle cx="50" cy="50" r="6" className="hole" />
        </svg>

        <div className="pedestal" />
      </div>

      <div className="tv-right">
        <p className="collect">
          <span className="box">ตัดต่อ</span> VIDEO<br />
          <span className="box">ผลงาน</span> WORK<br />
          COLLECTION
        </p>
        <p className="keep">Keep Rolling</p>
        <svg className="flower" viewBox="0 0 40 40" aria-hidden="true">
          <path d="M20 4c4 0 6 5 4 9 4-2 9 0 9 4s-5 6-9 4c2 4 0 9-4 9s-6-5-4-9c-4 2-9 0-9-4s5-6 9-4c-2-4 0-9 4-9z" />
        </svg>
      </div>
    </section>
  )
}
