import { contact, profile } from '../data/profile.js'
import useReveal from './useReveal.js'

// LET'S TALK — ตั๋วหนังพร้อมต้นขั้ว ADMIT ONE + ตั๋วจิ๋วลอยและม้วนฟิล์มประดับ
export default function Contact() {
  const ref = useReveal()
  const drive = contact.links.find((l) => l.url.startsWith('http'))

  return (
    <section className="contact reveal" id="contact" ref={ref}>
      <div className="ct-mini" aria-hidden="true">
        <small>ADMIT</small>
        <b>ONE</b>
      </div>

      <svg className="ct-reel" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="46" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle key={a} cx={50 + Math.cos((a * Math.PI) / 180) * 26} cy={50 + Math.sin((a * Math.PI) / 180) * 26} r="10" className="hole" />
        ))}
        <circle cx="50" cy="50" r="6" className="hole" />
      </svg>

      {/* เงาอยู่ที่ wrapper — mask รอยบากของตั๋วจะได้ไม่ตัดเงาทิ้ง */}
      <div className="ct-wrap">
        <div className="ticket">
          <div className="tk-main">
            <p className="tk-top">
              <span>{profile.handle.toUpperCase()} PRESENTS</span>
              <span className="tk-live">● NOW BOOKING</span>
            </p>

            <h2 className="ct-title">LET&apos;S TALK<span>!</span></h2>
            <p className="ct-lead">
              มีโปรเจกต์วิดีโอที่อยากให้ช่วยตัดต่อ หรืออยากชวนคุยเรื่องงาน<br />
              ส่งข้อความมาได้เลยค่ะ
            </p>

            <a className="ct-mail" href={`mailto:${contact.email}`}>
              <span aria-hidden="true">✉</span> {contact.email}
            </a>

            <div className="ct-links">
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`}>TEL. {contact.phone}</a>
              <span>LINE: {contact.line}</span>
              {drive && <a href={drive.url} target="_blank" rel="noreferrer">{drive.label} ↗</a>}
            </div>

            <dl className="tk-info">
              <div><dt>SCREEN</dt><dd>VIDEO EDIT</dd></div>
              <div><dt>SEAT</dt><dd>YOURS</dd></div>
              <div><dt>SHOWTIME</dt><dd>ANYTIME</dd></div>
            </dl>
          </div>

          <div className="tk-stub" aria-hidden="true">
            <small>ADMIT</small>
            <b>ONE</b>
            <span className="tk-no">NO. 0001</span>
            <span className="tk-barcode" />
          </div>
        </div>
      </div>
    </section>
  )
}
