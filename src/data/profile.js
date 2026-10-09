// ข้อมูลจากเรซูเม่และโฟลเดอร์ผลงานใน Google Drive ของ สิริยา คงไทย
// แก้ไขไฟล์นี้ไฟล์เดียวเพื่อเปลี่ยนเนื้อหาทั้งเว็บ
// รูปภาพอยู่ใน public/images — ใส่ path เช่น "/images/works/elysium.jpg"

const DRIVE = (id) => `https://drive.google.com/file/d/${id}/view`

export const profile = {
  name: 'สิริยา คงไทย',
  nameEn: 'SIRIYA KONGTHAI',
  nickname: 'แก้ว',
  age: 24,
  role: 'Video Editor · ตัดต่อวิดีโอสั้น-ยาว และผลิตสื่อด้วย AI',
  tagline: 'เล่าเรื่องผ่านการตัดต่อ และใช้ AI สร้างภาพที่กล้องถ่ายไม่ได้',
  photo: '/images/siriya-square.jpg', // รูปเต็มอยู่ที่ /images/siriya.jpg
  heroPhoto: '/images/siriya-square.jpg', // โพลารอยด์ใหญ่หน้าแรก
  snapPhoto: '/images/siriya-flowers.jpg', // โพลารอยด์เล็กหน้าแรก (ว่างไว้จะใช้โปสเตอร์ผลงานแทน)
  handle: 'siriya.film',
  since: '2020',
  cardTag: 'COOKIE', // ข้อความในวงเล็บบนบัตร ID
  years: '2021–2026',
  university: 'มหาวิทยาลัยศรีปทุม\nภาพยนตร์และสื่อดิจิทัล',
  position: 'Video Editor · AI Creator',
  status: 'ฟรีแลนซ์',
  bigWord: ['CI', 'NÉ'],
  footerWord: 'CINEMA',
  about:
    'สวัสดีค่ะ ชื่อ นางสาวสิริยา คงไทย ดิฉันเป็นคนที่ชื่นชอบการเล่าเรื่อง ไม่ว่าจะเป็นทางตัวหนังสือ ภาพ หรือเสียง การเป็นผู้กำกับหรือการตัดต่อจึงเป็นความฝันของดิฉัน เพราะดิฉันเชื่อว่าการตัดต่อไม่ใช่การนำภาพมาเรียงต่อกัน แต่เป็นการสื่ออารมณ์,ความคิด,และคติของเราผ่านสื่อต่าง ๆ ให้ผู้ชมได้รับรู้และรู้สึกกับสิ่งนั้นจริงๆ',
  additional:
    'ปัจจุบันการสร้างสรรค์ผลงานด้วยAIทำให้เราได้สร้างผลงานที่มีข้อจำกัดน้อยลง ดิฉันจึงพร้อมเรียนรู้งานด้านนี้เพื่อต่อยอดความฝันตัวเองต่อไปค่ะ',
  portfolioUrl: 'https://drive.google.com/drive/folders/1vv3C46F5IZ1JO9HYFzZ8hSykumlGZuT-',
}

// ผลงานเด่น — ใช้ในสไลด์โพสต์ siriya.film, FILMOGRAPHY และช่องทีวีหน้าแรก
export const works = [
  {
    title: 'บาร์ลับทำนายรัก',
    titleEn: 'The Lovers',
    year: 2023,
    type: 'ภาพยนตร์สั้น · มหาวิทยาลัยศรีปทุม',
    role: 'ผู้ช่วยผู้กำกับ · เขียนบท · ตัดต่อ',
    duration: 'ฉายที่เซ็นทรัลเวิลด์',
    description: 'ให้ “เครื่องดื่มในบาร์ลับ” เปลี่ยน “ชีวิตคุณ” — ภาพยนตร์สั้นที่ได้ฉายในโรงภาพยนตร์ เซ็นทรัลเวิลด์',
    colors: ['#db2777', '#4a044e'],
    image: '/images/the-lovers.jpg',
    link: '',
  },
  {
    title: 'Elysium',
    titleEn: 'Elysium',
    year: 2025,
    type: 'วิดีโอโฆษณา',
    role: 'ตัดต่อ',
    duration: 'แนวตั้ง 9:16',
    description: 'วิดีโอโฆษณาแนวตั้ง โทนภาพแสงไฟยามค่ำคืน',
    colors: ['#3b82f6', '#0f172a'],
    image: '/images/works/elysium.jpg',
    link: DRIVE('1sWXUjDfGIydXeN0P9zu4Cm27y47ecNdW'),
  },
  {
    title: 'แมวดำอัพโชค',
    titleEn: 'Lucky Black Cat',
    year: 2026,
    type: 'AI Video',
    role: 'ผลิตด้วย AI · ตัดต่อ',
    duration: 'แนวตั้ง 9:16',
    description: 'วิดีโอเล่าเรื่องที่สร้างภาพทั้งหมดด้วย AI',
    colors: ['#525252', '#0a0a0a'],
    image: '/images/works/blackcat.jpg',
    link: DRIVE('1KB9KzC8EMNlIFP3IfviOkABvPjN6jI-g'),
  },
  {
    title: 'ปลั๊กไฟเรืองแสง',
    titleEn: 'Glow-in-the-dark Power Strip',
    year: 2026,
    type: 'AI Video · โฆษณาสินค้า',
    role: 'ผลิตด้วย AI · ตัดต่อ',
    duration: 'แนวตั้ง 9:16',
    description: 'โฆษณาปลั๊กไฟ Elephant ที่ใช้ AI ช่วยสร้างภาพ',
    colors: ['#f97316', '#1c1917'],
    image: '/images/works/plug.jpg',
    link: DRIVE('1LkhuqlAWazbmjI9xnQ2TcOm1KICfNRJv'),
  },
  {
    title: 'Microsystem',
    titleEn: 'Microsystem Series',
    year: 2026,
    type: 'TikTok',
    role: 'ตัดต่อ',
    duration: 'แนวตั้ง 9:16',
    description: 'คลิป TikTok เบื้องหลังบาร์และเครื่องดื่ม',
    colors: ['#a16207', '#1c1917'],
    image: '/images/works/micro2.jpg',
    link: DRIVE('1sqUEA3vKvQhnMIUiySd2QptPmIcWwoV0'),
  },
  {
    title: 'ทำไมวันจันทร์สีเหลือง',
    titleEn: 'Why Is Monday Yellow?',
    year: 2026,
    type: 'AI Video · Masterart',
    role: 'ผลิตด้วย AI · ตัดต่อ',
    duration: 'แนวตั้ง 9:16',
    description: 'วิดีโอความรู้สำหรับ Masterart ตัวละครสร้างด้วย AI',
    colors: ['#eab308', '#0c4a6e'],
    image: '/images/works/monday.jpg',
    link: DRIVE('1rO04ttf9dQ7u0GuQc3Ug0i0DgEDzaTTw'),
  },
]

// วิดีโอทั้งหมดจาก Google Drive (cat: ai | ads | tiktok) — ใส่ tiktok: "ลิงก์คลิป" ได้ เว็บจะเล่นจาก TikTok แทน Drive
export const videos = [
  { cat: 'ai', client: 'Masterart', title: 'สีเขียวหรือสีฟ้า', img: 'green', id: '13JxjEYGQKAf1AYpBWzABMmu3RBgaIxD9' },
  { cat: 'ai', client: 'Masterart', title: 'ทำไมวันจันทร์สีเหลือง', img: 'monday', id: '1rO04ttf9dQ7u0GuQc3Ug0i0DgEDzaTTw', tiktok: 'https://www.tiktok.com/@masterart_th/video/7679829354637004052' },
  { cat: 'ai', client: 'แถวนี้ผีดุ', title: 'รถไฟผีดุ', img: 'ghosttrain', id: '1yGbQLHtImQMloKol0v_dQqBS4M4OuhLb', wide: true },
  { cat: 'ai', client: 'Elephant', title: 'ปลั๊กไฟเรืองแสง', img: 'plug', id: '1LkhuqlAWazbmjI9xnQ2TcOm1KICfNRJv' },
  { cat: 'ai', client: '', title: 'ถ้าคุณไม่ได้ดื่มน้ำ 7 วัน', img: 'water7', id: '11feXgYXOQ3shPqLFThGCNDfU5Dq9-YxX' },
  { cat: 'ai', client: '', title: 'แมวดำอัพโชค', img: 'blackcat', id: '1KB9KzC8EMNlIFP3IfviOkABvPjN6jI-g' },
  { cat: 'ai', client: '', title: 'โฆษณาทิชชู่', img: 'tissue', id: '1JnObNFEvPr8AhCiQB_4sqKFgJ5Zn0wID' },
  { cat: 'ai', client: '', title: 'เครื่องจักร', img: 'machine', id: '1KsCX-1uEZo7ZK1r1TjvigW3T0zDe8Zei', wide: true },
  { cat: 'ai', client: 'ศึกษาศาสตร์', title: 'เฉลิมพระเกียรติ', img: 'edu2', id: '1I7GImdyAHA7U5fkYc40284EP-ixI4stD' },
  { cat: 'ai', client: '', title: 'ตัวอย่างงานโฆษณา 1', img: 'adsample', id: '1Mp_nrX0ITmUQijmb2-ZkAebXgiTJFPLq', wide: true },
  { cat: 'ai', client: '', title: 'ตัวอย่างงานโฆษณา 2', img: 'adsample2', id: '1IbXmSvHo1wEI8G4bteYT1UTjUP9TvD3W', wide: true },
  { cat: 'ads', client: 'Elysium', title: 'Elysium', img: 'elysium', id: '1sWXUjDfGIydXeN0P9zu4Cm27y47ecNdW' },
  { cat: 'ads', client: 'Dr.Tattoo', title: 'Dr.Tattoo (4K)', img: 'drtattoo', id: '1YVv8AbD97t6_0KUsWsSvmGkk0E6urW6T', wide: true },
  { cat: 'ads', client: 'สิริ เพลส', title: 'สิริ เพลส', img: 'siriplace', id: '1C28hZwb025bnrHtm0DGiE_f8jzkarS-t' },
  { cat: 'ads', client: '', title: 'คุณแคน', img: 'khunkan', id: '1sD7QF7y19fMcujz7jaEmty9QMqB03vdN' },
  { cat: 'ads', client: 'Roys', title: 'Roys', img: 'roys', id: '12asoJSjCQrq0oeMBkbYm1aWpbu9EEjY8', wide: true },
  { cat: 'tiktok', client: 'หมอนัดมาเล่า', title: 'เบื้องหลังโศกนาฏกรรมของทัชมาฮาล', img: 'tajmahal', id: '1J-Yzfff3qa5d8Ary0xCsIJvWT7vc4LLm' },
  { cat: 'tiktok', client: 'Microsystem', title: 'Microsystem EP.1', img: 'micro1', id: '1n-7xmVMx8rSgvebcB5Mfo1H3eI3vhVPX' },
  { cat: 'tiktok', client: 'Microsystem', title: 'Microsystem EP.2', img: 'micro2', id: '1sqUEA3vKvQhnMIUiySd2QptPmIcWwoV0' },
  { cat: 'tiktok', client: 'Microsystem', title: 'Microsystem EP.3', img: 'micro3', id: '1sYQYLFDKvvEbozUFb4yDU7tpCGk8wf-Z' },
  { cat: 'tiktok', client: 'เด็กฝึกงาน', title: 'นัท สะบัดแปรง', img: 'intern', id: '1-dTXkqWa1G1uKc_uSi6zLWBAahEBgbq0' },
  { cat: 'tiktok', client: 'ปังว้าวว้าว', title: 'ทำไมคุณเนยถึงมาขายปังว้าวว้าว', img: 'pangwow', id: '1ew2znKWbsDYO0sU_2jTnCKW5TyvV0uQj' },
  { cat: 'tiktok', client: 'โชคดีทะเบียน', title: 'ทายราคาทะเบียน 8กม.8888', img: 'plate', id: '1kxavtqX7QqbSYP3_by35aVzKhRSwy5xQ' },
  { cat: 'tiktok', client: 'BNI', title: 'แอบชอบเพื่อนจะบอกไหม', img: 'bni', id: '1fUFQWqGodpG1QNndmXIbPsTwJzYtrWJ5' },
  { cat: 'tiktok', client: 'RAMA Channel', title: 'Master Vertical EP.03', img: 'vertical', id: '1Z62PYhrXkIk1UYc3NuVg8WXP1DiHm7fp' },
  { cat: 'tiktok', client: 'NIDA', title: 'ศาลทั่วไปกับศาลทหารต่างกันอย่างไร', img: 'nida', id: '1H_bpif1VWF10XKszCyqGOz982Xvvf2mL' },
  { cat: 'tiktok', client: 'Wrapcar', title: 'Porsche Taycan', img: 'wrapcar', id: '1XA2kOpemSoGCrnRwxiSYA8sC-OEaZycl' },
  { cat: 'tiktok', client: 'วินนี่เดอะคาร์', title: 'ทำยังไงให้พนักงานเคารพ', img: 'winnie', id: '1xwa7dV4N1f9eTx4p2dAlQF2RDalimqN9' },
].map((v) => ({ ...v, image: `/images/works/${v.img}.jpg`, link: v.tiktok || DRIVE(v.id) }))

// โปสเตอร์ที่ทำด้วย AI
export const posters = [
  { title: 'เพชรในตม', img: 'diamond' },
  { title: 'เพชรในตม (2)', img: 'diamond2' },
  { title: 'นวัตกรรมการศึกษา', img: 'edu' },
  { title: 'ทุนเอราวัณ', img: 'eravan' },
  { title: 'ทุนเอราวัณ (2)', img: 'eravan2' },
  { title: 'สวัสดีปีใหม่ 2026', img: 'newyear1' },
  { title: 'สวัสดีปีใหม่ 2026 (2)', img: 'newyear2' },
  { title: 'อาท นักล่าปลวก', img: 'termite1' },
  { title: 'อาท นักล่าปลวก (2)', img: 'termite2' },
].map((p) => ({ ...p, image: `/images/posters/${p.img}.jpg` }))

export const skills = [
  'การตัดต่อ',
  'การใช้งาน AI ในการผลิตสื่อวิดีโอ',
  'บริหารจัดการเวลา',
  'เรียนรู้เร็ว',
  'มีโฟกัสในการทำงาน',
  'ปรับตัวเข้ากับสิ่งแวดล้อมใหม่ ๆ ได้ดี',
]

// ทักษะแบ่งหมวด — ใช้ในหน้า ABOUT ME (การ์ดชิป) · ชิปเป็นข้อความ หรือ { name, tools: [...] } เพื่อแยกเป็นหัวข้อย่อยพร้อมชิปเครื่องมือ
export const skillGroups = [
  { title: 'Editing', sub: 'โปรแกรมตัดต่อและออกแบบ', items: ['DaVinci Resolve', 'Premiere Pro', 'Adobe After Effects', 'Adobe Illustrator', 'CapCut', 'Canva'] },
  {
    title: 'AI Creative Skills',
    sub: 'สร้างภาพ วิดีโอ เรื่อง และเสียงด้วย AI',
    items: [
      { name: 'AI Image & Video Generation', tools: ['ChatGPT', 'Grok', 'Flow', 'Gemini', 'Kling'] },
      { name: 'AI Storytelling & Storyboarding', tools: ['ChatGPT', 'Claude'] },
      { name: 'AI Voiceover Generation', tools: ['Google AI'] },
    ],
  },
  { title: 'Production', sub: 'ตำแหน่งที่เคยออกกอง', items: ['ผู้กำกับ', 'ผู้ช่วยผู้กำกับ', 'ตัดต่อ', 'เขียนบท', 'กำกับการแสดง'] },
  { title: 'Soft Skills', sub: 'สไตล์การทำงาน', items: ['พร้อมเรียนรู้เทคโนโลยีและทักษะใหม่ ๆ', 'สื่อสารและถ่ายทอดไอเดียได้ชัดเจน', 'มีความคิดสร้างสรรค์ คิดไอเดียใหม่ ๆ'] },
]

// โปรแกรม (คะแนนเต็ม 5 ตามเรซูเม่)
export const programs = [
  { name: 'DaVinci Resolve', short: 'Dv', level: 4 },
  { name: 'Premiere Pro', short: 'Pr', level: 3 },
  { name: 'CapCut', short: 'Cc', level: 4 },
  { name: 'Canva', short: 'Ca', level: 4 },
  { name: 'Adobe After Effects', short: 'Ae' },
  { name: 'Adobe Illustrator', short: 'Ai' },
]

export const education = [
  { year: '2020 – 2024', title: 'มหาวิทยาลัยศรีปทุม', detail: 'คณะนิเทศศาสตร์ สาขาภาพยนตร์และสื่อดิจิทัล', honors: 'เกียรตินิยมอันดับ 2' },
  { year: '2017 – 2019', title: 'โรงเรียนเกษมพิทยา', detail: '' },
  { year: '2007 – 2016', title: 'โรงเรียนอนุบาลพุทธชาติ', detail: '' },
]

export const experience = [
  { year: '2026', now: true, icon: '🎬', title: 'ฟรีแลนซ์ & ครีเอเตอร์', roles: ['ตัดต่อ', 'ฟรีแลนซ์'], clients: ['อินฟลูเอนเซอร์', 'Toyota', 'Ririko', 'Master Art', 'Elephant', 'มหาวิทยาลัยศรีนครินทรวิโรฒ'], detail: 'รับงานตัดต่ออิสระร่วมกับอินฟลูเอนเซอร์และแบรนด์ และเปิดช่อง TikTok ของตัวเอง' },
  { year: '2025', icon: '✂️', title: 'Video Editor', roles: ['ตัดต่อ'], clients: ['ธรรมดี โปรดักชั่น'], detail: 'บริษัทผลิตสื่อวิดีโอ' },
  { year: '2024', icon: '🎞️', title: 'Video Editor', roles: ['ตัดต่อ'], clients: ['We Kids Smile', 'JL Home'], detail: 'บริษัทละครสั้น · บริษัทขายอุปกรณ์สมาร์ทโฮม' },
  { year: '2023', icon: '🍸', title: 'The Lovers บาร์ลับทำนายรัก', roles: ['ผู้ช่วยผู้กำกับ', 'เขียนบท', 'ตัดต่อ'], clients: [], detail: 'ภาพยนตร์สั้น — ฉายในโรงภาพยนตร์ SF World Cinema CentralWorld เมื่อวันที่ 19 ธันวาคม พ.ศ. 2566' },
  { year: '2022', icon: '🌙', title: 'LATE NIGHT', roles: ['ผู้ช่วยผู้กำกับ', 'เขียนบท', 'ตัดต่อ'], clients: [], detail: 'ภาพยนตร์สั้นในมหาวิทยาลัย' },
  { year: '2021', icon: '🎥', title: 'Alive or Dead', roles: ['ผู้กำกับ', 'ตัดต่อ'], clients: [], detail: 'ภาพยนตร์สั้นในมหาวิทยาลัย' },
]

// ช่องโซเชียล (หน้า ABOUT ME) — ใส่ลิงก์ ชื่อช่อง และยอดผู้ติดตามเอง เช่น followers: '12.5K' (platform: youtube | tiktok)
// ยังไม่มีลิงก์ให้เว้น url: '' ไว้ การ์ดจะแสดงแต่กดไม่ได้
export const socials = [
  { platform: 'tiktok', label: 'TikTok', handle: '@iftheycanspeak', url: 'https://www.tiktok.com/@iftheycanspeak', followers: '21.1K' },
  { platform: 'tiktok', label: 'TikTok', handle: '@crazyboneman0', url: 'https://www.tiktok.com/@crazyboneman0', followers: '9.2K' },
  { platform: 'tiktok', label: 'TikTok', handle: '@cookieriety', url: 'https://www.tiktok.com/@cookieriety', followers: '1.3K' },
]

export const contact = {
  email: 'Siriya.kforwork@gmail.com',
  phone: '095-874-0805',
  line: '0997281137kk',
  links: [
    { label: 'Portfolio Drive', url: 'https://drive.google.com/drive/folders/1vv3C46F5IZ1JO9HYFzZ8hSykumlGZuT-' },
    { label: 'Email', url: 'mailto:Siriya.kforwork@gmail.com' },
  ],
}

// SHOW REEL — การ์ดเลื่อนได้: The Lovers + วิดีโอทั้งหมด (งานเด่นขึ้นก่อน)
const descs = {
  elysium: 'วิดีโอโฆษณาแนวตั้ง โทนแสงไฟยามค่ำคืน',
  monday: 'วิดีโอความรู้สำหรับ Masterart ตัวละครสร้างด้วย AI',
  green: 'วิดีโอความรู้สำหรับ Masterart ตัวละครสร้างด้วย AI',
  blackcat: 'วิดีโอเล่าเรื่องที่สร้างภาพทั้งหมดด้วย AI',
  plug: 'โฆษณาปลั๊กไฟ Elephant ที่ใช้ AI ช่วยสร้างภาพ',
  water7: 'วิดีโอความรู้ที่สร้างภาพด้วย AI',
  plate: 'คลิป TikTok สำหรับเพจโชคดีทะเบียน',
  pangwow: 'คลิป TikTok เล่าเรื่องร้านปังว้าวว้าว',
  tajmahal: 'คลิป TikTok สำหรับเพจหมอนัดมาเล่า',
}
const featured = ['elysium', 'monday', 'blackcat', 'plug', 'green', 'plate', 'pangwow', 'water7', 'tajmahal']
const catName = { ai: 'AI Video', ads: 'วิดีโอโฆษณา', tiktok: 'คลิป TikTok' }

export const reel = [
  { cat: 'film', client: 'Short Film', title: 'The Lovers', desc: 'บาร์ลับทำนายรัก — ภาพยนตร์สั้นที่ได้ฉายในโรงภาพยนตร์ เซ็นทรัลเวิลด์', image: '/images/the-lovers.jpg', link: '' },
  ...[...videos]
    .sort((a, b) => (featured.indexOf(a.img) + 1 || 99) - (featured.indexOf(b.img) + 1 || 99))
    .map((v) => ({ ...v, desc: descs[v.img] || `${catName[v.cat]}${v.client ? ` สำหรับ ${v.client}` : ''}` })),
]

export const reelCats = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'film', label: 'Short Film' },
  { key: 'ai', label: 'AI Video' },
  { key: 'ads', label: 'โฆษณา' },
  { key: 'tiktok', label: 'TikTok' },
]

// โลโก้ลูกค้า/แบรนด์ที่เคยร่วมงาน (แถบเลื่อนในส่วน EXPERIENCE)
export const clientLogos = [
  { name: 'Masterart', img: 'masterart' },
  { name: 'Elephant', img: 'elephant' },
  { name: 'Toyota', img: 'toyota' },
  { name: 'Ririko', img: 'ririko' },
  { name: 'หมอนัดมาเล่า', img: 'mornut' },
  { name: 'โชคดีทะเบียน', img: 'chokdee' },
  { name: 'ปังว้าวว้าว', img: 'pangwow' },
  { name: 'Dr.Tattof', img: 'drtattof' },
  { name: 'BNI', img: 'bni' },
  { name: 'RAMA Channel', img: 'rama' },
].map((c) => ({ ...c, image: `/images/clients/${c.img}.jpg` }))
