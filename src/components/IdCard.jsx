import { profile } from '../data/profile.js'

// บัตรนักศึกษาห้อยสายคล้อง แกว่งเบา ๆ
export default function IdCard() {
  const initials = profile.nameEn.split(' ').map((w) => w[0]).join('')
  return (
    <div className="lanyard" aria-label="บัตรประจำตัว">
      <div className="strap" />
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

      <article className="idcard">
        <div className="idcard-slot" />
        <div className="idcard-water" aria-hidden="true">{initials}</div>
        <header className="idcard-top">
          <span>EDIT DEPT.</span>
          <span>02</span>
        </header>
        <p className="idcard-sub">VIDEO EDITOR ID CARD</p>
        <div className="idcard-photo">
          {profile.photo ? <img src={profile.photo} alt={profile.name} /> : <span>{initials}</span>}
        </div>
        <p className="idcard-th">{profile.name}</p>
        <h3 className="idcard-name">{profile.nameEn}</h3>
        <div className="idcard-bar" />
        <div className="idcard-row">
          <span className="idcard-since">[ {profile.since} ]</span>
          <span className="idcard-uni">{profile.university}</span>
        </div>
        <p className="idcard-pos">{profile.position}</p>
      </article>
      <p className="lanyard-label">{profile.nickname} · VIDEO EDITOR</p>
    </div>
  )
}
