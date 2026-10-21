import { useEffect, useState } from 'react'
import { profile } from '../data/profile.js'
import { contactPage, navLinks } from './navLinks.js'

const pad = (n) => String(n).padStart(2, '0')

// แถบเมนูลอยตามตอนเลื่อนหน้า — โผล่หลังเลื่อนพ้นเมนูบนหน้าแรก, ไฮไลต์หัวข้อที่กำลังดูอยู่
// home = '/' เมื่ออยู่หน้าอื่น: เมนูพากลับไปหัวข้อบนหน้าแรก และแถบโชว์ตลอด
export default function StickyNav({ home = '' }) {
  const [show, setShow] = useState(!!home)
  const [active, setActive] = useState('')

  useEffect(() => {
    if (home) return
    const onScroll = () => setShow(window.scrollY > 140)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    // หัวข้อที่อยู่กลางจอ = หัวข้อที่กำลังดู
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ;['top', ...navLinks.map(([href]) => href.slice(1)), 'contact'].forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [home])

  return (
    <header className={`snav ${show ? 'show' : ''}`} aria-hidden={!show}>
      <a href={home || '#top'} className="snav-brand" tabIndex={show ? 0 : -1}>
        <span className="snav-stick" aria-hidden="true" />
        {profile.nameEn.split(' ')[0]}<b>.</b>
      </a>
      <nav className="snav-links">
        {navLinks.map(([href, label], i) => (
          <a key={href} href={home + href} className={active === href ? 'active' : ''} tabIndex={show ? 0 : -1}>
            <small>{pad(i + 1)}</small>{label}
          </a>
        ))}
      </nav>
      <a href={home ? '#packages' : contactPage} className={`snav-cta ${home ? 'active' : ''}`} tabIndex={show ? 0 : -1}>ติดต่องาน</a>
    </header>
  )
}
