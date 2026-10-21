import { contact, packageNotes, packages, profile } from './data/profile.js'
import Contact from './components/Contact.jsx'
import StickyNav from './components/StickyNav.jsx'
import useReveal from './components/useReveal.js'

const pad = (n) => String(n).padStart(2, '0')
const mailto = (subject) => `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`

// ช่องทางติดต่อ — LINE เป็นการ์ดใหญ่พร้อม QR, ช่องอื่นเป็นแถวเล็กด้านข้าง
const line = { label: 'LINE', value: contact.line, url: `https://line.me/ti/p/~${contact.line}`, qr: contact.lineQr }
const channels = [
  { key: 'tel', icon: '☎', label: 'TEL.', value: contact.phone, url: `tel:${contact.phone.replace(/[\s-]/g, '')}` },
  { key: 'mail', icon: '✉', label: 'E-MAIL', value: contact.email, url: `mailto:${contact.email}` },
  ...contact.links
    .filter((l) => l.url.startsWith('http'))
    .map((l) => {
      const [label, value] = l.label.split(': ')
      return { key: l.url, icon: label[0], label: label.toUpperCase(), value: value || l.label, url: l.url }
    }),
]

// หน้าแยก /contact/ — แพ็คเกจตัดต่อ + ช่องทางติดต่อ + ตั๋ว LET'S TALK
export default function ContactPage() {
  const pkgRef = useReveal()
  const chRef = useReveal()

  return (
    <div className="page">
      <StickyNav home="/" />

      <div className="wrap">
        <section className="block pk reveal" id="packages" ref={pkgRef}>
          <header className="block-head">
            <span className="block-no">RATE —</span>
            <h2>PACK<br />AGES</h2>
            <p className="block-sub">แพ็คเกจตัดต่อ<br />pick your cut</p>
          </header>

          <div className="pk-grid">
            {packages.map((p, i) => (
              <article key={p.nameEn} className={`pk-card ${p.popular ? 'hot' : ''}`}>
                {p.popular && <span className="pk-badge">ยอดนิยม</span>}
                <p className="pk-no">N°{pad(i + 1)} · {p.nameEn}</p>
                <h3>{p.name}</h3>
                <p className="pk-desc">{p.desc}</p>
                <p className="pk-price"><small>฿</small>{p.price}<span>{p.unit}</span></p>
                <ul>
                  {p.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <p className="pk-time">ส่งงาน <b>{p.time}</b></p>
                <a className="pk-btn" href={mailto(`สนใจแพ็คเกจ ${p.name} (${p.nameEn})`)}>สนใจแพ็คเกจนี้</a>
              </article>
            ))}
          </div>

          <ul className="pk-notes">
            {packageNotes.map((n) => <li key={n}>{n}</li>)}
          </ul>
        </section>

        <section className="block ch reveal" id="channels" ref={chRef}>
          <header className="block-head">
            <span className="block-no">CALL —</span>
            <h2>CON<br />TACT</h2>
            <p className="block-sub">ช่องทางติดต่อ<br />ตอบกลับภายใน 24 ชม.</p>
          </header>

          <div className="ch-grid">
            <a className="ch-line" href={line.url} target="_blank" rel="noreferrer">
              <img src={line.qr} alt={`QR แอดไลน์ ${line.value}`} />
              <span className="ch-text">
                <span className="ch-label">{line.label}</span>
                <strong>{line.value}</strong>
                <small>สแกน QR หรือกดเพื่อแอดไลน์ — คุยงานได้เร็วที่สุด</small>
                <span className="ch-btn">แอดไลน์ ↗</span>
              </span>
            </a>

            <div className="ch-list">
              {channels.map((c) => (
                <a key={c.key} className="ch-row" href={c.url} target={c.url.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                  <span className="ch-ico" aria-hidden="true">{c.icon}</span>
                  <span className="ch-text">
                    <span className="ch-label">{c.label}</span>
                    <strong>{c.value}</strong>
                  </span>
                  <span className="ch-go" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <Contact />

        <footer className="footer">
          <div className="footer-word" aria-hidden="true">{profile.footerWord}</div>
          <small className="copy">© {new Date().getFullYear()} {profile.name} — Video Editor</small>
        </footer>
      </div>
    </div>
  )
}
