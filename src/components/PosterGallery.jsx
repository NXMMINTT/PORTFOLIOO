import { useEffect, useRef, useState } from 'react'
import { posters } from '../data/profile.js'
import useReveal from './useReveal.js'

const STEP = 360 // ระยะห่างการ์ด (px) — ใช้คำนวณตอนลากด้วย
const AUTO = 4000

// ระยะห่างแบบวนรอบ: ให้การ์ดอยู่ในช่วง -n/2 .. n/2 จากการ์ดกลาง
const wrapOffset = (i, active, n) => {
  let d = (i - active) % n
  if (d > n / 2) d -= n
  if (d < -n / 2) d += n
  return d
}

// AI POSTERS — การ์ดแบบ coverflow: ลาก / ปัด / « » / ←→ / คลิกการ์ดข้าง + เลื่อนเองอัตโนมัติ
// คลิกการ์ดกลางเพื่อดูภาพใหญ่ (lightbox: ←/→ เลื่อน, Esc ปิด)
export default function PosterGallery() {
  const n = posters.length
  const [active, setActive] = useState(0)
  const [dragPx, setDragPx] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [paused, setPaused] = useState(false)
  const [open, setOpen] = useState(-1)
  const drag = useRef(null)
  const lastDrag = useRef(0)
  const ref = useReveal()

  const go = (step) => setActive((a) => (a + step + n) % n)

  // เลื่อนเองอัตโนมัติ (หยุดเมื่อชี้เมาส์ ลาก หรือเปิดภาพใหญ่)
  useEffect(() => {
    if (paused || dragging || open >= 0) return
    const t = setTimeout(() => go(1), AUTO)
    return () => clearTimeout(t)
  }, [active, paused, dragging, open])

  // lightbox
  useEffect(() => {
    if (open < 0) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(-1)
      if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % n)
      if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + n) % n)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, n])

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    drag.current = { x: e.clientX, y: e.clientY, moved: false }
  }
  const onPointerMove = (e) => {
    const d = drag.current
    if (!d) return
    const dx = e.clientX - d.x
    // ทัชสกรีน: ถ้าเลื่อนแนวตั้งมากกว่า ปล่อยให้หน้าเว็บเลื่อนตามปกติ
    if (!d.moved && Math.abs(e.clientY - d.y) > Math.abs(dx)) return
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true
      setDragging(true)
      e.currentTarget.setPointerCapture?.(e.pointerId)
    }
    if (d.moved) setDragPx(dx)
  }
  const onPointerUp = () => {
    const d = drag.current
    drag.current = null
    if (!d?.moved) return
    const steps = Math.round(-dragPx / STEP) || (Math.abs(dragPx) > 50 ? (dragPx < 0 ? 1 : -1) : 0)
    setDragging(false)
    setDragPx(0)
    go(steps)
    lastDrag.current = Date.now()
  }

  const onCardClick = (i, off) => {
    if (Date.now() - lastDrag.current < 250) return // เพิ่งลากเสร็จ → ไม่นับเป็นคลิก
    if (off !== 0) go(off)
    else setOpen(i)
  }

  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
    if (e.key === 'Enter') setOpen(active)
  }

  return (
    <section className="neon block reveal" id="posters" ref={ref}>
      <header className="block-head">
        <span className="block-no">04 —</span>
        <h2>AI<br />POSTERS</h2>
        <p className="block-sub">โปสเตอร์ที่สร้างด้วย AI<br />ลาก ปัด หรือกด ←/→ · คลิกเพื่อดูภาพใหญ่</p>
      </header>

      <div className="neon-nav">
        <button onClick={() => go(-1)} aria-label="ก่อนหน้า">«</button>
        <span>{String(active + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
        <button onClick={() => go(1)} aria-label="ถัดไป">»</button>
      </div>

      <div
        className={`neon-stage ${dragging ? 'dragging' : ''}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onKeyDown={onKey}
        tabIndex={0}
        aria-roledescription="carousel"
      >
        {posters.map((p, i) => {
          const off = wrapOffset(i, active, n)
          const pos = off + dragPx / STEP
          const abs = Math.abs(pos)
          const style = {
            transform: `translate(-50%, -50%) translateX(${pos * STEP}px) scale(${Math.max(0.55, 1 - abs * 0.14)})`,
            opacity: abs > 3.2 ? 0 : Math.max(0.15, 1 - abs * 0.3),
            zIndex: 100 - Math.round(abs * 10),
          }
          return (
            <button
              key={p.img}
              className={`neon-card ${off === 0 ? 'active' : ''}`}
              style={style}
              onClick={() => onCardClick(i, off)}
              tabIndex={off === 0 ? 0 : -1}
              aria-label={off === 0 ? `ดู ${p.title} ภาพใหญ่` : p.title}
            >
              <div className="neon-img">
                <img src={p.image} alt={p.title} draggable={false} />
                <span className="neon-tag">AI POSTER</span>
                {off === 0 && <span className="neon-zoom">⤢ ดูภาพใหญ่</span>}
              </div>
              <h3 className="neon-title">{p.title}</h3>
            </button>
          )
        })}
      </div>

      {open >= 0 && (
        <div className="lightbox" onClick={() => setOpen(-1)} role="dialog" aria-label={posters[open].title}>
          <button className="lb-close" aria-label="ปิด">✕</button>
          <button className="lb-nav l" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + n) % n) }} aria-label="ก่อนหน้า">‹</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={posters[open].image} alt={posters[open].title} />
            <figcaption>{String(open + 1).padStart(2, '0')} / {String(n).padStart(2, '0')} — {posters[open].title}</figcaption>
          </figure>
          <button className="lb-nav r" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % n) }} aria-label="ถัดไป">›</button>
        </div>
      )}
    </section>
  )
}
