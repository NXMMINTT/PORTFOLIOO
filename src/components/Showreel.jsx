import { Fragment, useEffect, useRef, useState } from 'react'
import { reel, reelCats } from '../data/profile.js'

const PREVIEW = 8 // จำนวนการ์ดที่โชว์ก่อนกด "ดูทั้งหมด" (โหมดตาราง)
const AUTO = 4000 // เลื่อนเองทุกกี่ ms (โหมดเลื่อนดู)
const pad = (n) => String(n).padStart(2, '0')
const format = (v) => (v.wide ? 'แนวนอน 16:9' : 'แนวตั้ง 9:16')
const canPlay = (v) => Boolean(v.id || v.tiktok)
// เล่นในหน้าเว็บ: คลิปที่มีลิงก์ TikTok ใช้ตัวเล่นของ TikTok ไม่งั้นใช้ตัวเล่นของ Google Drive
const tiktokId = (url) => url.match(/video\/(\d+)/)?.[1]
const embedSrc = (v) => v.tiktok
  ? `https://www.tiktok.com/player/v1/${tiktokId(v.tiktok)}?autoplay=1&rel=0`
  : `https://drive.google.com/file/d/${v.id}/preview`

// SHOW REEL — 2 มุมมอง: "เลื่อนดู" (แถวการ์ดเลื่อนเอง ลาก/ปัดได้) และ "ตาราง" (เห็นทุกชิ้น)
// กดการ์ดแล้วเล่นวิดีโอในหน้าเว็บ (ไม่ต้องออกไป Google Drive)
export default function Showreel() {
  const [cat, setCat] = useState('all')
  const [all, setAll] = useState(false)
  const [open, setOpen] = useState(-1)
  const [view, setView] = useState('slide')
  const [hover, setHover] = useState(false)
  const [progress, setProgress] = useState(0)
  const track = useRef(null)
  const drag = useRef(null)

  // "ทั้งหมด" เรียงตามลำดับหมวดในแถบ (Short Film → AI Video → โฆษณา → TikTok) ในหมวดยังเรียงงานเด่นขึ้นก่อน
  const order = reelCats.map((c) => c.key)
  const list = cat === 'all'
    ? [...reel].sort((a, b) => order.indexOf(a.cat) - order.indexOf(b.cat))
    : reel.filter((p) => p.cat === cat)
  const shown = view === 'slide' || all ? list : list.slice(0, PREVIEW)
  const count = (key) => (key === 'all' ? reel.length : reel.filter((p) => p.cat === key).length)
  const catLabel = (key) => reelCats.find((c) => c.key === key)?.label

  const pick = (key) => { setCat(key); setAll(false); track.current?.scrollTo({ left: 0 }) }

  // ----- โหมดเลื่อนดู -----
  const cardW = () => track.current.querySelector('li:not(.rl-divider)')?.getBoundingClientRect().width + 20 || 300
  const slide = (dir) => {
    const t = track.current
    if (!t) return
    const atEnd = t.scrollLeft + t.clientWidth >= t.scrollWidth - 4
    if (dir > 0 && atEnd) t.scrollTo({ left: 0, behavior: 'smooth' })
    else t.scrollBy({ left: dir * cardW(), behavior: 'smooth' })
  }
  const onScroll = () => {
    const t = track.current
    setProgress(t.scrollWidth > t.clientWidth ? t.scrollLeft / (t.scrollWidth - t.clientWidth) : 1)
  }
  // เลื่อนเองช้า ๆ — หยุดเมื่อชี้เมาส์ ลากอยู่ หรือเปิดวิดีโอ
  useEffect(() => {
    if (view !== 'slide' || hover || open >= 0) return
    const t = setInterval(() => slide(1), AUTO)
    return () => clearInterval(t)
  }, [view, hover, open, cat])
  // ลากด้วยเมาส์ (มือถือใช้การปัดปกติ)
  const onDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false }
  }
  const onMove = (e) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true
      track.current.classList.add('dragging')
    }
    if (d.moved) track.current.scrollLeft = d.left - dx
  }
  const onUp = () => {
    const d = drag.current
    if (!d) return
    track.current.classList.remove('dragging')
    // ลากแล้วปล่อย ไม่นับเป็นการกดเปิดวิดีโอ
    if (d.moved) setTimeout(() => { drag.current = null }, 0)
    else drag.current = null
  }
  const onClickCapture = (e) => {
    if (drag.current?.moved) { e.preventDefault(); e.stopPropagation() }
  }

  // หน้าต่างเล่นวิดีโอ: Esc ปิด, ←/→ ไปเรื่องก่อน/ถัดไป (ข้ามเรื่องที่ไม่มีไฟล์)
  const playable = list.map((p, i) => (canPlay(p) ? i : -1)).filter((i) => i >= 0)
  const step = (dir) => {
    const at = playable.indexOf(open)
    setOpen(playable[(at + dir + playable.length) % playable.length])
  }
  useEffect(() => {
    if (open < 0) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(-1)
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  })

  const v = list[open]

  return (
    <section className="block showreel" id="showreel">
      <header className="block-head">
        <span className="block-no">03 —</span>
        <h2>SHOW<br />REEL</h2>
        <p className="block-sub">วิดีโอที่ตัดต่อและผลิต {reel.length} ชิ้น<br />กดการ์ดเพื่อเล่นวิดีโอได้เลย</p>
      </header>

      <div className="rl-bar">
        <nav className="rl-tabs" aria-label="หมวดผลงาน">
          {reelCats.map((c) => (
            <button key={c.key} className={cat === c.key ? 'active' : ''} onClick={() => pick(c.key)}>
              {c.label} <sup>{count(c.key)}</sup>
            </button>
          ))}
        </nav>
        <div className="rl-tools">
          {view === 'slide' && (
            <span className="rl-arrows">
              <button onClick={() => slide(-1)} aria-label="เลื่อนไปทางซ้าย">‹</button>
              <button onClick={() => slide(1)} aria-label="เลื่อนไปทางขวา">›</button>
            </span>
          )}
          <span className="rl-view" role="group" aria-label="มุมมอง">
            <button className={view === 'slide' ? 'active' : ''} onClick={() => setView('slide')}>⇆ เลื่อนดู</button>
            <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}>▦ ตาราง</button>
          </span>
        </div>
      </div>

      <ul
        ref={track}
        className={view === 'slide' ? 'rl-track' : 'rl-grid'}
        key={view}
        onScroll={view === 'slide' ? onScroll : undefined}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setHover(false); onUp() }}
        onPointerDown={view === 'slide' ? onDown : undefined}
        onPointerMove={view === 'slide' ? onMove : undefined}
        onPointerUp={view === 'slide' ? onUp : undefined}
        onClickCapture={view === 'slide' ? onClickCapture : undefined}
      >
        {shown.map((p, i) => (
          <Fragment key={p.image}>
            {/* หมวด "ทั้งหมด": ขึ้นหัวบทใหม่ทุกครั้งที่เปลี่ยนหมวด ให้รู้ว่าเป็นอีกหัวข้อ */}
            {cat === 'all' && p.cat !== shown[i - 1]?.cat && (
              <li className="rl-divider" aria-hidden="true">
                <small>CH.{pad(order.indexOf(p.cat))}</small>
                <strong>{catLabel(p.cat)}</strong>
                <span>{count(p.cat)} ชิ้น</span>
              </li>
            )}
            <li>
              <button
                className={`rl-card ${canPlay(p) ? '' : 'no-video'}`}
                onClick={() => canPlay(p) && setOpen(i)}
                aria-label={canPlay(p) ? `เล่นวิดีโอ ${p.title}` : p.title}
              >
                <span className="rl-thumb">
                  <img src={p.image} alt="" loading="lazy" draggable={false} />
                  <span className="rl-chip">{catLabel(p.cat)}</span>
                  {canPlay(p) ? <span className="rl-play" aria-hidden="true">▶</span> : <span className="rl-cinema">ฉายในโรงภาพยนตร์</span>}
                </span>
                <span className="rl-info">
                  <strong>{p.title}</strong>
                  <small>{p.desc}</small>
                  <span className="rl-meta">
                    {p.client && p.client !== 'Short Film' && <em>{p.client}</em>}
                    {canPlay(p) && <em>{format(p)}</em>}
                  </span>
                </span>
              </button>
            </li>
          </Fragment>
        ))}
      </ul>

      {view === 'slide' && (
        <div className="rl-progress" aria-hidden="true"><i style={{ width: `${Math.max(8, progress * 100)}%` }} /></div>
      )}

      {view === 'grid' && list.length > PREVIEW && (
        <div className="rl-more">
          <button onClick={() => setAll(!all)}>
            {all ? 'ย่อกลับ ↑' : `ดูทั้งหมด (${list.length}) ↓`}
          </button>
        </div>
      )}

      {v && (
        <div className="rl-modal" onClick={() => setOpen(-1)} role="dialog" aria-label={v.title}>
          <button className="lb-close" aria-label="ปิด">✕</button>
          {playable.length > 1 && (
            <button className="lb-nav l" onClick={(e) => { e.stopPropagation(); step(-1) }} aria-label="ก่อนหน้า">‹</button>
          )}
          <figure className={v.wide ? 'wide' : 'tall'} onClick={(e) => e.stopPropagation()}>
            <div className="rl-frame">
              <iframe
                key={v.tiktok || v.id}
                src={embedSrc(v)}
                title={v.title}
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
            <figcaption>
              <span className="rl-chip">{catLabel(v.cat)}</span>
              <strong>{v.title}</strong>
              <small>{v.client && `${v.client} · `}{format(v)} · {pad(playable.indexOf(open) + 1)} / {pad(playable.length)}</small>
              <a href={v.link} target="_blank" rel="noreferrer">{v.tiktok ? 'เปิดใน TikTok ↗' : 'เปิดใน Google Drive ↗'}</a>
            </figcaption>
          </figure>
          {playable.length > 1 && (
            <button className="lb-nav r" onClick={(e) => { e.stopPropagation(); step(1) }} aria-label="ถัดไป">›</button>
          )}
        </div>
      )}
    </section>
  )
}
