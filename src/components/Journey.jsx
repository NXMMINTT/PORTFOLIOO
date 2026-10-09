import { education, experience } from '../data/profile.js'
import LogoMarquee from './LogoMarquee.jsx'
import useReveal from './useReveal.js'

const pad = (n) => String(n).padStart(2, '0')

// ประสบการณ์ทำงาน — ไทม์ไลน์ตั๋วหนังสลับซ้าย/ขวา (ต้นขั้วหันเข้าหาเส้นกลาง) + ตั๋วการศึกษาปลายเส้น
export default function Journey() {
  const ref = useReveal()

  return (
    <section className="block reveal" id="journey" ref={ref}>
      <header className="block-head">
        <span className="block-no">01 —</span>
        <h2>EXPE<br />RIENCE</h2>
        <p className="block-sub">เส้นทางการทำงาน<br />และการศึกษา</p>
      </header>

      <div className="tl-board">
        <ol className="tl">
          {experience.map((e, i) => (
            <li key={e.year + e.title} className={`tl-row ${i % 2 ? 'right' : 'left'}`}>
              <span className="tl-icon" aria-hidden="true">{e.icon}</span>
              <div className="xt-wrap">
                <article className="xt">
                  <div className="xt-body">
                    <p className="xt-top">
                      <span>{e.roles.join(' · ')}</span>
                      {e.now && <span className="xt-live">● NOW SHOWING</span>}
                    </p>
                    <h3>{e.title}</h3>
                    <p className="xt-desc">{e.detail}</p>
                    {e.clients.length > 0 && (
                      <div className="xt-tags">
                        {e.clients.map((c) => <span key={c}>{c}</span>)}
                      </div>
                    )}
                  </div>
                  <div className="xt-stub" aria-hidden="true">
                    <small>{e.now ? 'NOW' : 'YEAR'}</small>
                    <b>{e.year}</b>
                    <span className="xt-no">NO. {pad(experience.length - i)}</span>
                    <span className="xt-barcode" />
                  </div>
                </article>
              </div>
            </li>
          ))}
        </ol>

        <div className="tl-end">
          {/* แสดงเฉพาะระดับมหาวิทยาลัย — ตั๋วใบสุดท้ายปลายเส้น */}
          {education.slice(0, 1).map((e) => (
            <div key={e.title} className="xt-wrap edu">
              <article className="xt">
                <div className="xt-body">
                  <p className="xt-top"><span>🎓 การศึกษา</span></p>
                  <h3>{e.title}</h3>
                  {e.detail && <p className="xt-desc">{e.detail}</p>}
                </div>
                <div className="xt-stub" aria-hidden="true">
                  <small>CLASS OF</small>
                  <b>{e.year.split('–').pop().trim()}</b>
                  <span className="xt-no">GRADUATED</span>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {/* ปิดท้ายด้วยลูกค้าที่เคยร่วมงาน — หลังเห็นประสบการณ์ครบแล้ว */}
      <LogoMarquee />
    </section>
  )
}
