import { useCallback, useEffect, useState } from 'react'
import { profile, reel, works } from './data/profile.js'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import MoviePoster from './components/MoviePoster.jsx'
import Journey from './components/Journey.jsx'
import Poster from './components/Poster.jsx'
import PosterGallery from './components/PosterGallery.jsx'
import Showreel, { embedSrc } from './components/Showreel.jsx'
import StickyNav from './components/StickyNav.jsx'
import TvHero from './components/TvHero.jsx'
import useReveal from './components/useReveal.js'

const INTERVAL = 5000
const pad = (n) => String(n).padStart(2, '0')

export default function App() {
  const [dark, setDark] = useState(true)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hover, setHover] = useState(false)
  const [watch, setWatch] = useState(false)
  const n = works.length

  const go = useCallback((i) => setIndex(((i % n) + n) % n), [n])
  const next = () => go(index + 1)
  const prev = () => go(index - 1)

  // สไลด์อัตโนมัติ
  useEffect(() => {
    if (!playing || hover) return
    const t = setTimeout(() => go(index + 1), INTERVAL)
    return () => clearTimeout(t)
  }, [index, playing, hover, go])

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  const lowerRef = useReveal()
  const w = works[index]
  // วิดีโอของผลงานเด่น = คลิปใน SHOW REEL ที่ใช้รูปปกเดียวกัน — เล่นในหน้าเว็บ ไม่ต้องออกไปข้างนอก
  const video = reel.find((v) => v.image === w.image && (v.id || v.tiktok || v.ig || v.fb || v.yt))

  // หน้าต่างเล่นวิดีโอ: Esc ปิด และหยุดสไลด์ระหว่างดู
  useEffect(() => {
    if (!watch) return
    const onKey = (e) => e.key === 'Escape' && setWatch(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [watch])

  return (
    <div className="page">
      <StickyNav />
      <TvHero />

      {/* ส่วนที่เหลืออยู่ในกรอบตรงกลาง — มีแค่หน้าทีวีด้านบนที่เต็มจอ */}
      <div className="wrap">

      <About dark={dark} onToggleTheme={() => setDark(!dark)} />

      <Journey />

      {/* ---------------- FEATURED WORKS ---------------- */}
      <section
        id="works"
        className="block works reveal"
        ref={lowerRef}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <header className="block-head">
          <span className="block-no">02 —</span>
          <h2>FILMO<br />GRAPHY</h2>
          <p className="block-sub">ผลงานเด่น<br />stories in the spotlight</p>
        </header>

        <div className="works-grid">
        <MoviePoster index={index} onSelect={go} />

        <div className="dispatch">
          <div className="now" key={index}>
            <span className="now-no">N°{pad(index + 1)}</span>
            <h3>{w.title}</h3>
            <p className="now-en">{w.titleEn}</p>
            <p className="now-meta">{w.type} · {w.year} · {w.duration}</p>
            <p className="now-role">{w.role}</p>
            {video
              ? <button className="link" onClick={() => { setWatch(true); setPlaying(false) }}>▶ รับชมวิดีโอ</button>
              : w.link && <a href={w.link} target="_blank" rel="noreferrer" className="link">▶ รับชมวิดีโอ</a>}
          </div>

          <div className="thumbs">
            {works.map((work, i) => (
              <button
                key={work.titleEn}
                className={`thumb ${i === index ? 'active' : ''}`}
                onClick={() => go(i)}
                aria-label={work.title}
              >
                <Poster work={work} small />
              </button>
            ))}
          </div>

          <div className="controls">
            <button className="ctl-text" onClick={() => setPlaying(!playing)}>
              {playing ? 'Pause' : 'Play'}
            </button>
            <button className="ctl-outline" onClick={prev}>Previous</button>
            <button className="ctl-dark" onClick={next}>Next</button>
          </div>
        </div>
        </div>
      </section>

      {watch && video && (
        <div className="rl-modal" onClick={() => setWatch(false)} role="dialog" aria-label={video.title}>
          <button className="lb-close" aria-label="ปิด">✕</button>
          <figure className={video.wide ? 'wide' : 'tall'} onClick={(e) => e.stopPropagation()}>
            <div className="rl-frame">
              <iframe src={embedSrc(video)} title={video.title} allow="autoplay; fullscreen" allowFullScreen />
            </div>
            <figcaption>
              <strong>{w.title}</strong>
              <small>{w.type} · {w.year} · {w.duration}</small>
            </figcaption>
          </figure>
        </div>
      )}

      <Showreel />
      <PosterGallery />

      {/* ---------------- FOOTER ---------------- */}
      <Contact />

      <footer className="footer">
        <div className="footer-word" aria-hidden="true">{profile.footerWord}</div>
        <small className="copy">© {new Date().getFullYear()} {profile.name} — Video Editor</small>
      </footer>
      </div>
    </div>
  )
}
