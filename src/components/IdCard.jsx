import { useEffect, useRef } from 'react'
import { profile } from '../data/profile.js'

// ฟิสิกส์สายคล้องแบบ React Bits "Lanyard" แต่ทำใน 2D + CSS 3D (หน้าตาบัตรเดิม ไม่ต้องใช้ three.js)
// สายเป็นเชือกหลายข้อ (verlet) — บัตรหล่นลงมาตอนโหลด, ลากเหวี่ยงได้, บัตรพลิก 3 มิติตามความเร็ว
const W = 300 // ความกว้างกล่อง = ความกว้างบัตร
const SEGMENTS = 10
const GRAVITY = 2200 // px/s²
const STEP = 1 / 60
const MAX_V = 22 // px ต่อเฟรม

export default function IdCard() {
  const initials = profile.nameEn.split(' ').map((w) => w[0]).join('')
  const box = useRef(null)
  const rope = useRef(null)
  const hang = useRef(null)
  const sim = useRef(null)

  useEffect(() => {
    const ropeLen = parseFloat(getComputedStyle(box.current).getPropertyValue('--rope')) || 190
    const seg = ropeLen / SEGMENTS
    const ax = W / 2
    const ay = 0
    // เริ่มจากสายเหยียดไปทางขวา แล้วปล่อยให้ตกลงมาแกว่ง
    const pts = Array.from({ length: SEGMENTS + 1 }, (_, i) => ({
      x: ax + i * seg * 0.9, y: ay + i * seg * 0.15, px: ax + i * seg * 0.9, py: ay + i * seg * 0.15,
    }))
    const s = { pts, drag: null, angle: 0, tilt: 0, raf: 0, last: 0, acc: 0, visible: true }
    sim.current = s

    const physics = () => {
      const end = pts[SEGMENTS]
      pts.forEach((p, i) => {
        if (i === 0 || (i === SEGMENTS && s.drag)) return
        // จำกัดความเร็ว — สะบัดแรงแค่ไหนบัตรก็ไม่หลุดออกนอกจอ
        const vx = Math.max(-MAX_V, Math.min(MAX_V, (p.x - p.px) * 0.985))
        const vy = Math.max(-MAX_V, Math.min(MAX_V, (p.y - p.py) * 0.985))
        p.px = p.x
        p.py = p.y
        // ปลายสายถ่วงด้วยน้ำหนักบัตร
        p.x += vx
        p.y += vy + GRAVITY * (i === SEGMENTS ? 1.6 : 1) * STEP * STEP
      })
      if (s.drag) {
        // ลากได้ไกลสุด ~1.6 เท่าของความยาวสาย
        const dx = s.drag.tx - ax
        const dy = s.drag.ty - ay
        const d = Math.hypot(dx, dy)
        const k = d > ropeLen * 1.6 ? (ropeLen * 1.6) / d : 1
        end.px = end.x
        end.py = end.y
        end.x += (ax + dx * k - end.x) * 0.6
        end.y += (ay + dy * k - end.y) * 0.6
      }
      for (let k = 0; k < 14; k++) {
        pts[0].x = ax
        pts[0].y = ay
        for (let i = 0; i < SEGMENTS; i++) {
          const a = pts[i]
          const b = pts[i + 1]
          const dx = b.x - a.x
          const dy = b.y - a.y
          const d = Math.hypot(dx, dy) || 0.001
          // ตอนลาก ยอมให้สายยืดได้นิดหน่อย
          if (s.drag && d < seg) continue
          const diff = (d - seg) / d
          const aFixed = i === 0
          const bFixed = i + 1 === SEGMENTS && s.drag
          const wa = aFixed ? 0 : bFixed ? 1 : 0.5
          const wb = bFixed ? 0 : aFixed ? 1 : 0.5
          a.x += dx * diff * wa
          a.y += dy * diff * wa
          b.x -= dx * diff * wb
          b.y -= dy * diff * wb
        }
      }
    }

    const render = () => {
      const end = pts[SEGMENTS]
      const prev = pts[SEGMENTS - 2]
      // มุมบัตรตามทิศของปลายสาย + พลิกแกน Y ตามความเร็วแนวนอน
      const target = Math.atan2(end.x - prev.x, end.y - prev.y)
      s.angle += (target - s.angle) * 0.3
      const vx = (end.x - end.px) / STEP
      s.tilt += (Math.max(-50, Math.min(50, -vx * 0.035)) - s.tilt) * 0.12
      hang.current.style.transform =
        `translate(${end.x - W / 2}px, ${end.y}px) rotate(${-s.angle}rad) rotateY(${s.tilt}deg)`
      rope.current.setAttribute('d', pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' '))
    }

    const loop = (t) => {
      if (!s.last) s.last = t
      s.acc = Math.min(s.acc + (t - s.last) / 1000, 0.1)
      s.last = t
      while (s.acc >= STEP) {
        physics()
        s.acc -= STEP
      }
      render()
      s.raf = s.visible ? requestAnimationFrame(loop) : 0
    }
    s.start = () => {
      if (!s.raf) {
        s.last = 0
        s.raf = requestAnimationFrame(loop)
      }
    }
    // หยุดคำนวณตอนบัตรไม่อยู่ในจอ
    const io = new IntersectionObserver(([e]) => {
      s.visible = e.isIntersecting
      if (s.visible) s.start()
    })
    io.observe(box.current)
    s.start()

    return () => {
      io.disconnect()
      cancelAnimationFrame(s.raf)
      s.raf = 0
    }
  }, [])

  const toLocal = (e) => {
    const r = box.current.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
  }
  const onDown = (e) => {
    const s = sim.current
    const p = toLocal(e)
    const end = s.pts[SEGMENTS]
    e.currentTarget.setPointerCapture?.(e.pointerId)
    s.drag = { ox: p.x - end.x, oy: p.y - end.y, tx: end.x, ty: end.y }
    box.current.classList.add('grabbing')
    s.start()
  }
  const onMove = (e) => {
    const s = sim.current
    if (!s.drag) return
    const p = toLocal(e)
    s.drag.tx = p.x - s.drag.ox
    s.drag.ty = p.y - s.drag.oy
  }
  const onUp = () => {
    sim.current.drag = null
    box.current.classList.remove('grabbing')
  }

  return (
    <div className="lanyard" ref={box} aria-label="บัตรประจำตัว">
      <svg className="lanyard-rope" aria-hidden="true">
        <path ref={rope} />
      </svg>

      <div className="lanyard-hang" ref={hang}>
        <svg className="clip" viewBox="0 0 60 90" aria-hidden="true">
          <defs>
            <linearGradient id="metal" x1="0" x2="1">
              <stop offset="0" stopColor="#111" />
              <stop offset=".45" stopColor="#555" />
              <stop offset=".6" stopColor="#222" />
              <stop offset="1" stopColor="#000" />
            </linearGradient>
          </defs>
          <rect x="14" y="0" width="32" height="18" rx="3" fill="url(#metal)" />
          <rect x="24" y="16" width="12" height="12" rx="2" fill="#222" />
          <path d="M30 26c-11 0-17 10-17 22 0 14 8 26 17 26s17-12 17-26c0-12-6-22-17-22z" fill="none" stroke="url(#metal)" strokeWidth="7" />
          <rect x="27" y="68" width="6" height="22" rx="2" fill="#111" />
        </svg>

        <article
          className="idcard"
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <div className="idcard-slot" />
          <div className="idcard-water" aria-hidden="true">{initials}</div>
          <header className="idcard-top">
            <span>EDIT DEPT.</span>
            <span>02</span>
          </header>
          <p className="idcard-sub">VIDEO EDITOR ID CARD</p>
          <div className="idcard-photo">
            {profile.photo ? <img src={profile.photo} alt={profile.name} draggable="false" /> : <span>{initials}</span>}
          </div>
          <p className="idcard-th">{profile.name}</p>
          <h3 className="idcard-name">{profile.nameEn}</h3>
          <div className="idcard-bar" />
          <div className="idcard-row">
            <span className="idcard-since">[ {profile.cardTag} ]</span>
            <span className="idcard-uni">{profile.university}</span>
          </div>
          <p className="idcard-pos">{profile.position}</p>
        </article>
      </div>

      <p className="lanyard-label">✦ ลองลากป้ายเล่นดูสิ ✦</p>
    </div>
  )
}
