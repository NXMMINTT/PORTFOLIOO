// โปสเตอร์ผลงาน: ใช้รูปถ้ามี ไม่งั้นใช้พื้นไล่สี (แสดงเป็นขาวดำด้วย CSS)
export default function Poster({ work, small = false }) {
  const [a, b] = work.colors
  const style = work.image
    ? { backgroundImage: `url(${work.image})` }
    : { backgroundImage: `radial-gradient(circle at 30% 25%, ${a}, transparent 60%), linear-gradient(160deg, ${a}55, ${b})` }
  return (
    <div className={`poster ${small ? 'poster-sm' : ''} ${work.image ? 'has-image' : ''}`} style={style}>
      {!work.image && <span className="poster-title">{small ? work.year : work.titleEn}</span>}
    </div>
  )
}
