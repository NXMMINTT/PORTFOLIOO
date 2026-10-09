import { useCallback, useEffect, useRef, useState } from 'react'
import { posters, reel, reelCats } from '../data/profile.js'

const AUTO = 4500
const pad = (n) => String(n).padStart(2, '0')

// SHOW REEL — การ์ดเลื่อนได้: ลากเมาส์ / ปัดนิ้ว / ลูกศร / คีย์บอร์ด + เลื่อนเองอัตโนมัติ
// คลิกการ์ดเพื่อเปิดวิดีโอใน Google Drive
export default function Showreel() {
  const [cat, setCat] = useState('all')
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [dragging, setDragging] = useState(false)
  const trackRef = useRef(null)
  const drag = useRef(null)
  const snapTimer = useRef(null)
  const list = cat === 'all' ? reel : reel.filter((p) => p.cat === cat)
  const count = (key) => (key === 'all' ? reel.length : reel.filter((p) => p.cat === key).length)

  const scrollToCard = useCallback((i, smooth = true) => {
    const track = trackRef.current
    const card = track?.children[i]
    if (!card) return
    const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0
    track.scrollTo({ left: card.offsetLeft - pad, behavior: smooth ? 'smooth' : 'auto' })
  }, [])

  const go = (i) => scrollToCard(Math.max(0, Math.min(list.length - 1, i)))

  // หาการ์ดที่อยู่ใกล้ขอบซ้ายที่สุด = การ์ดที่ active
  const nearest = () => {
    const track = trackRef.current
    const pad = parseFloat(getComputedStyle(track).paddingLeft) || 0
    const x = track.scrollLeft + pad
    let best = 0
    let dist = Infinity
    ;[...track.children].forEach((c, i) => {
      const d = Math.abs(c.offsetLeft - x)
      if (d < dist) { dist = d; best = i }
    })
    // เลื่อนสุดขวาแล้วให้การ์ดสุดท้าย active
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) best = list.length - 1
    return best
  }
  const onScroll = () => setActive(nearest())

  // เลื่อนเองอัตโนมัติ (วนกลับไปการ์ดแรก)
  useEffect(() => {
    if (paused || dragging || list.length < 2) return
    const t = setTimeout(() => scrollToCard(active + 1 >= list.length ? 0 : active + 1), AUTO)
    return () => clearTimeout(t)
  }, [active, paused, dragging, list.length, scrollToCard])

  // เปลี่ยนหมวด → กลับไปการ์ดแรก
  useEffect(() => {
    setActive(0)
    scrollToCard(0, false)
  }, [cat, scrollToCard])

  // ลากด้วยเมาส์ (ทัชสกรีนใช้การเลื่อนปกติของเบราว์เซอร์)
  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    e.preventDefault()
    clearTimeout(snapTimer.current)
    trackRef.current.style.scrollSnapType = 'none'
    drag.current = { x: e.clientX, left: trackRef.current.scrollLeft, start: nearest(), moved: false }
    setDragging(true)
  }
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d || d.done !== undefined) return
    const dx = e.clientX - d.x
    d.dx = dx
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true
      trackRef.current.setPointerCapture?.(e.pointerId)
    }
    trackRef.current.scrollLeft = d.left - dx
  }
  const endDrag = (e) => {
    const d = drag.current
    if (!d || d.done !== undefined) return
    if (e && d.dx === undefined && e.clientX !== undefined) d.dx = e.clientX - d.x
    // ลากเกิน 40px = เลื่อนอย่างน้อย 1 การ์ดตามทิศที่ลาก
    let target = nearest()
    if ((d.dx || 0) < -40 && target <= d.start) target = d.start + 1
    if ((d.dx || 0) > 40 && target >= d.start) target = d.start - 1
    target = Math.max(0, Math.min(list.length - 1, target))
    drag.current = { ...d, done: d.moved }
    setDragging(false)
    scrollToCard(target)
    setTimeout(() => { drag.current = null }, 0)
    // เปิด snap กลับหลังเลื่อนเสร็จ (ถ้าเปิดทันที เบราว์เซอร์จะตัดการเลื่อนแบบ smooth)
    snapTimer.current = setTimeout(() => {
      if (trackRef.current) trackRef.current.style.scrollSnapType = ''
    }, 600)
  }
  // ถ้าเพิ่งลาก ไม่ให้คลิกเปิดลิงก์
  const onClickCapture = (e) => {
    if (drag.current?.done) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(active + 1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(active - 1) }
  }

  return (
    <section
      className="popular"
      id="showreel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="pop-bg" aria-hidden="true">
        {posters.concat(posters).slice(0, 12).map((p, i) => (
          <img key={i} src={p.image} alt="" loading="lazy" />
        ))}
      </div>

      <header className="block-head pop-head">
        <span className="block-no">03 —</span>
        <h2>SHOW<br />REEL</h2>
        <p className="block-sub">วิดีโอที่ตัดต่อและผลิต<br />ลากหรือปัดเพื่อเลื่อน · คลิกเพื่อดูใน Google Drive</p>
      </header>

      <div className="pop-bar-top">
        <nav className="pop-tabs" aria-label="หมวดผลงาน">
          {reelCats.map((c) => (
            <button key={c.key} className={cat === c.key ? 'active' : ''} onClick={() => setCat(c.key)}>
              {c.label} <sup>{count(c.key)}</sup>
            </button>
          ))}
        </nav>
        <div className="pop-arrows">
          <button onClick={() => go(active - 1)} disabled={active === 0} aria-label="ก่อนหน้า">‹</button>
          <button onClick={() => go(active + 1)} disabled={active === list.length - 1} aria-label="ถัดไป">›</button>
        </div>
      </div>

      <div
        ref={trackRef}
        className={`pop-track ${dragging ? 'dragging' : ''}`}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        onKeyDown={onKey}
        tabIndex={0}
        aria-roledescription="carousel"
      >
        {list.map((p, i) => {
          const Tag = p.link ? 'a' : 'div'
          return (
            <div className="pop-slot" key={p.image}>
            <Tag
              className={`pop-card ${i === active ? 'active' : ''}`}
              {...(p.link ? { href: p.link, target: '_blank', rel: 'noreferrer' } : {})}
              draggable={false}
            >
              <img src={p.image} alt={p.title} draggable={false} />
              <span className="pop-chip">{p.client || reelCats.find((c) => c.key === p.cat)?.label}</span>
              <div className="pop-info">
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
              <svg className="pop-mark" viewBox="0 0 16 20" aria-hidden="true">
                <path d="M2 1h12v18l-6-4.5L2 19z" />
              </svg>
            </Tag>
            </div>
          )
        })}
      </div>

      <div className="pop-count">
        <span>{pad(active + 1)} / {pad(list.length)}</span>
        <div className="pop-bar"><i style={{ width: `${((active + 1) / list.length) * 100}%` }} /></div>
      </div>
    </section>
  )
}
