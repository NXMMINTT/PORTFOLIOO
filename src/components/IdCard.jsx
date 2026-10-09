import { useEffect, useRef } from 'react'
import { profile } from '../data/profile.js'

const ROPE = 260 // ระยะจากจุดแขวนถึงตัวบัตร (px) ใช้คำนวณมุมแกว่ง
const MAX_PULL = 220

// บัตรนักศึกษาห้อยสายคล้อง แกว่งเบา ๆ — จับลากดึงได้ ปล่อยแล้วเด้งกลับแบบสปริง
export default function IdCard() {
  const initials = profile.nameEn.split(' ').map((w) => w[0]).join('')
  const rig = useRef(null)
  const strap = useRef(null)
  const state = useRef({ x: 0, y: 0, vx: 0, vy: 0, drag: null, raf: 0 })

  useEffect(() => {
    const s = state.current
    const baseH = strap.current.offsetHeight
    const render = () => {
      const angle = Math.atan2(s.x, ROPE + s.y)
      const stretch = Math.hypot(s.x, ROPE + s.y) - ROPE
      rig.current.style.transform = `rotate(${-angle}rad)`
      strap.current.style.height = `${Math.max(baseH * 0.6, baseH + stretch)}px`
    }
    // สปริงหน่วง: ดึงกลับสู่ตำแหน่งเดิม
    const step = () => {
      if (!s.drag) {
        s.vx += (-120 * s.x - 9 * s.vx) / 60
        s.vy += (-160 * s.y - 11 * s.vy) / 60
        s.x += s.vx / 60
        s.y += s.vy / 60
      }
      render()
      if (!s.drag && Math.abs(s.x) + Math.abs(s.y) + Math.abs(s.vx) + Math.abs(s.vy) < 0.3) {
        s.x = s.y = s.vx = s.vy = 0
        render()
        rig.current.style.transform = ''
        strap.current.style.height = ''
        s.raf = 0
        return
      }
      s.raf = requestAnimationFrame(step)
    }
    s.start = () => { if (!s.raf) s.raf = requestAnimationFrame(step) }
    return () => { cancelAnimationFrame(s.raf); s.raf = 0 }
  }, [])

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
  const onDown = (e) => {
    const s = state.current
    e.currentTarget.setPointerCapture?.(e.pointerId)
    s.drag = { px: e.clientX - s.x, py: e.clientY - s.y }
    rig.current.parentElement.classList.add('grabbing')
    s.start()
  }
  const onMove = (e) => {
    const s = state.current
    if (!s.drag) return
    s.x = clamp(e.clientX - s.drag.px, -MAX_PULL, MAX_PULL)
    s.y = clamp(e.clientY - s.drag.py, -80, MAX_PULL)
  }
  const onUp = () => {
    state.current.drag = null
    rig.current.parentElement.classList.remove('grabbing')
  }

  return (
    <div className="lanyard" aria-label="บัตรประจำตัว">
      <div className="lanyard-rig" ref={rig}>
        <div className="strap" ref={strap} />
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
