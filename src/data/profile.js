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
    'สวัสดีค่ะ ชื่อ นางสาวสิริยา คงไทย ดิฉันเป็นคนที่ชื่นชอบการเล่าเรื่อง ไม่ว่าจะเป็นทางตัวหนังสือ ภาพ หรือเสียง การเป็นผู้กำกับหรือการตัดต่อจึงเป็นความฝันของดิฉัน\nเพราะดิฉันเชื่อว่าการตัดต่อไม่ใช่การนำภาพมาเรียงต่อกัน แต่เป็นการสื่ออารมณ์,ความคิด,และคติของเราผ่านสื่อต่าง ๆ ให้ผู้ชมได้รับรู้และรู้สึกกับสิ่งนั้นจริงๆ',
  additional:
    'ปัจจุบันการสร้างสรรค์ผลงานด้วยAIทำให้เราได้สร้างผลงานที่มีข้อจำกัดน้อยลง\nดิฉันจึงพร้อมเรียนรู้งานด้านนี้เพื่อต่อยอดความฝันตัวเองต่อไปค่ะ',
  portfolioUrl: 'https://drive.google.com/drive/folders/1vv3C46F5IZ1JO9HYFzZ8hSykumlGZuT-',
}

// ผลงานเด่น — ใช้ในสไลด์โพสต์ siriya.film, FILMOGRAPHY และช่องทีวีหน้าแรก
export const works = [
  {
    title: 'บาร์ลับทำนายรัก',
    titleEn: 'The Lovers',
    year: 2023,
    type: 'ภาพยนตร์สั้น · มหาวิทยาลัยศรีปทุม',
    role: 'ผู้กำกับ · เขียนบท · ตัดต่อ',
    duration: 'ฉายที่เซ็นทรัลเวิลด์',
    description: 'ให้ “เครื่องดื่มในบาร์ลับ” เปลี่ยน “ชีวิตคุณ” — ภาพยนตร์สั้นที่ได้ฉายในโรงภาพยนตร์ เซ็นทรัลเวิลด์',
    colors: ['#db2777', '#4a044e'],
    image: '/images/the-lovers.jpg',
    link: 'https://www.chainang.in.th/movie/thelovers',
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
  {
    title: 'สิงห์น่ะทำ EP.1',
    titleEn: 'Masterart School EP.1',
    year: 2026,
    type: 'AI Video · Masterart',
    role: 'ผลิตด้วย AI · ตัดต่อ',
    duration: 'แนวตั้ง 9:16',
    description: 'วิดีโอสำหรับ Masterart สร้างภาพด้วย AI',
    colors: ['#db2777', '#1e1b4b'],
    image: '/images/works/singha1.jpg',
    link: DRIVE('1_n_XVfUXreq-7gIyLnbi66meqhwEcGTf'),
  },
    {
    title: 'รักต้องห้าม คุณหนูปากร้ายกับเชฟมะนาว EP.1',
    titleEn: 'Forbidden Love: The Sharp-Tongued Heiress & Chef Lime',
    year: 2026,
    type: 'AI Video · ละครสั้น',
    role: 'ผลิตด้วย AI · ตัดต่อ',
    duration: 'แนวตั้ง 9:16',
    description: 'ละครสั้นตัวละครผลไม้ สร้างภาพทั้งหมดด้วย AI',
    colors: ['#be123c', '#1c1917'],
    image: '/images/works/lime1.jpg',
    link: 'https://www.tiktok.com/@crazyboneman0/video/7638246035487296775',
  },
    {
    title: 'Microsystem',
    titleEn: 'Microsystem Series',
    year: 2026,
    type: 'TikTok',
    role: 'กำกับ · ถ่ายทำ · ตัดต่อ',
    duration: 'แนวตั้ง 9:16',
    description: 'คลิป TikTok เบื้องหลังบาร์และเครื่องดื่ม',
    colors: ['#a16207', '#1c1917'],
    image: '/images/works/micro2.jpg',
    link: DRIVE('16ih-irhAcj3hJk8JH0t9zbhRSvk9kjCN'),
  },
  {
    title: 'คณะศึกษาศาสตร์ มศว',
    titleEn: 'Faculty of Education, SWU',
    year: 2026,
    type: 'วิดีโอองค์กร · 16:9 Production',
    role: 'ตัดต่อ',
    duration: 'แนวนอน 16:9',
    description: 'วิดีโอแนะนำคณะศึกษาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ',
    colors: ['#0e7490', '#0f172a'],
    image: '/images/works/swu.jpg',
    link: 'https://www.facebook.com/reel/1177899304479803',
  },

]

// วิดีโอทั้งหมดจาก Google Drive (cat: ai | ads | tiktok | youtube) — ใส่ tiktok: / ig: / fb: / yt: "ลิงก์คลิป" ได้ เว็บจะเล่นจาก TikTok / Instagram / Facebook / YouTube แทน Drive
export const videos = [
  { cat: 'ai', client: 'Masterart', title: 'ทำไมวันจันทร์สีเหลือง', img: 'monday', id: '1rO04ttf9dQ7u0GuQc3Ug0i0DgEDzaTTw', tiktok: 'https://www.tiktok.com/@masterart_th/video/7679829354637004052' },
  { cat: 'ai', client: 'Masterart', title: 'สิงห์น่ะทำ EP.1', img: 'singha1', id: '1_n_XVfUXreq-7gIyLnbi66meqhwEcGTf' },
  { cat: 'ai', client: 'Elephant', title: 'ปลั๊กไฟเรืองแสง', img: 'plug', id: '1LkhuqlAWazbmjI9xnQ2TcOm1KICfNRJv', tiktok: 'https://www.tiktok.com/@elephantbrand_th/video/7668546075560578324' },
  { cat: 'ai', client: '', title: 'ถ้ากระเพาะไม่โดนน้ำเลย 7 วัน', img: 'stomach7', tiktok: 'https://www.tiktok.com/@crazyboneman0/video/7632675612754218261' },
  { cat: 'ai', client: '', title: 'รักต้องห้าม คุณหนูปากร้ายกับเชฟมะนาว EP.1', img: 'lime1', tiktok: 'https://www.tiktok.com/@crazyboneman0/video/7638246035487296775' },
  { cat: 'ai', client: '', title: 'โฆษณาทิชชู่', img: 'tissue', id: '1JnObNFEvPr8AhCiQB_4sqKFgJ5Zn0wID' },
  { cat: 'ai', client: '', title: 'เครื่องจักร', img: 'machine', id: '1KsCX-1uEZo7ZK1r1TjvigW3T0zDe8Zei', wide: true },
  { cat: 'ai', client: 'ศึกษาศาสตร์', title: 'เฉลิมพระเกียรติ', img: 'edu3', id: '1cH32av90kjTK6T3JCHZlrGDXqJopXebH' },
  { cat: 'ads', client: 'ศึกษาศาสตร์ มศว', title: 'คณะศึกษาศาสตร์ มศว', img: 'swu', wide: true, fb: 'https://www.facebook.com/reel/1177899304479803' },
  { cat: 'ads', client: 'Elysium', title: 'Elysium', img: 'elysium', id: '1sWXUjDfGIydXeN0P9zu4Cm27y47ecNdW' },
  { cat: 'ads', client: 'Dr.Tattoo', title: 'Dr.Tattoo (4K)', img: 'drtattoo', id: '1YVv8AbD97t6_0KUsWsSvmGkk0E6urW6T', wide: true },
  { cat: 'ads', client: 'สิริ เพลส', title: 'สิริ เพลส', img: 'siriplace', id: '1C28hZwb025bnrHtm0DGiE_f8jzkarS-t', tiktok: 'https://www.tiktok.com/@sansiriplc/video/7579502815232511249' },
  { cat: 'ads', client: 'Roys', title: 'Roys', img: 'roys', id: '12asoJSjCQrq0oeMBkbYm1aWpbu9EEjY8', wide: true, fb: 'https://www.facebook.com/reel/1842083450071667' },
  { cat: 'ads', client: 'JL Republic', title: 'BFDL04 ลูกบิดประตูแบบก้าน Bluetooth', img: 'jlbfdl04', wide: true, yt: 'https://www.youtube.com/watch?v=57JAsMyUW04' },
  { cat: 'tiktok', client: 'หมอนัดมาเล่า', title: 'เบื้องหลังโศกนาฏกรรมของทัชมาฮาล', img: 'tajmahal', id: '1J-Yzfff3qa5d8Ary0xCsIJvWT7vc4LLm', ig: 'https://www.instagram.com/reels/DNiTPO9Th25/' },
  { cat: 'tiktok', client: 'Microsystem', title: 'Microsystem EP.1', img: 'micro1', id: '1l8pEM2hB4OKY7iuHfeMvwGeMKUPHfjjE' },
  { cat: 'tiktok', client: 'Microsystem', title: 'Microsystem EP.2', img: 'micro2', id: '16ih-irhAcj3hJk8JH0t9zbhRSvk9kjCN' },
  { cat: 'tiktok', client: 'Microsystem', title: 'Microsystem EP.3', img: 'micro3', id: '1qeRZJSJ9MOSyR8TQYWE1YCGGpvqBk_l2' },
  { cat: 'tiktok', client: 'เด็กฝึกงาน', title: 'นัท สะบัดแปรง', img: 'intern', id: '1lU2AGbd-HlZlcdiFTe3IKGImbAHYFyjb' },
  { cat: 'tiktok', client: 'ปังว้าวว้าว', title: 'ทำไมคุณเนยถึงมาขายปังว้าวว้าว', img: 'pangwow', id: '1ew2znKWbsDYO0sU_2jTnCKW5TyvV0uQj', tiktok: 'https://www.tiktok.com/@pang_wowwowtt/video/7486125165743541512?_r=1&_t=ZS-9APpIB8Ze1W' },
  { cat: 'tiktok', client: 'โชคดีทะเบียน', title: 'ทายราคาทะเบียน 8กม.8888', img: 'plate', id: '1kxavtqX7QqbSYP3_by35aVzKhRSwy5xQ', tiktok: 'https://www.tiktok.com/@chokdeetabientiktok/video/7494997251727658241?is_from_webapp=1&sender_device=pc' },
  { cat: 'tiktok', client: 'BNI', title: 'แอบชอบเพื่อนจะบอกไหม', img: 'bni', id: '1fUFQWqGodpG1QNndmXIbPsTwJzYtrWJ5', fb: 'https://www.facebook.com/reel/1173745774675835' },
  { cat: 'tiktok', client: 'RAMA Channel', title: 'Master Vertical EP.03', img: 'vertical', id: '1Z62PYhrXkIk1UYc3NuVg8WXP1DiHm7fp', tiktok: 'https://www.tiktok.com/@ramachanneltv/video/7578730176700288264' },
  { cat: 'tiktok', client: 'NIDA', title: 'ศาลทั่วไปกับศาลทหารต่างกันอย่างไร', img: 'nida', id: '1nKrPLaHZ8NcrtcF_cZDGDm845b-enUwH' },
  { cat: 'tiktok', client: 'Wrapcar', title: 'Porsche Taycan', img: 'wrapcar', id: '1XA2kOpemSoGCrnRwxiSYA8sC-OEaZycl', tiktok: 'https://www.tiktok.com/@wrap.gtsport/video/7496761024813550866' },
  { cat: 'tiktok', client: 'วินนี่เดอะคาร์', title: 'ทำยังไงให้พนักงานเคารพ', img: 'winnie', id: '1xwa7dV4N1f9eTx4p2dAlQF2RDalimqN9', tiktok: 'https://www.tiktok.com/@winniethecar/video/7488189630420880648' },
  { cat: 'youtube', client: 'น้องดาว เลิฟลี่แฟมิลี่', title: 'บุกบ้านเด็กจิ๋ว', img: 'dekjew', wide: true, yt: 'https://www.youtube.com/watch?v=IL1xRSJ3A_o' },
  { cat: 'youtube', client: 'We Kids Smile', title: 'มีสามีแก่ ถ้าจะรักอย่าไปแคร์คำคน!', img: 'wekids', wide: true, yt: 'https://www.youtube.com/watch?v=OqMno-4a02A' },
].map((v) => ({ ...v, image: `/images/works/${v.img}.jpg`, link: v.tiktok || v.ig || v.fb || v.yt || DRIVE(v.id) }))

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
  { year: '2023', icon: '🍸', title: 'The Lovers บาร์ลับทำนายรัก', roles: ['ผู้ช่วยผู้กำกับ', 'เขียนบท', 'ตัดต่อ'], clients: [], detail: 'ภาพยนตร์สั้น — ฉายในโรงภาพยนตร์ SF World Cinema CentralWorld\nเมื่อวันที่ 19 ธันวาคม พ.ศ. 2566' },
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
  lineQr: '/images/line-qr.png', // QR แอดไลน์ — โชว์หลังบัตรห้อยคอ (คลิกบัตรเพื่อพลิก)
  links: [
    { label: 'Facebook: Cookies Smile', url: 'https://www.facebook.com/siriya.kongthai.5/' },
    { label: 'Email', url: 'mailto:Siriya.kforwork@gmail.com' },
  ],
}

// SHOW REEL — การ์ดเลื่อนได้: The Lovers + วิดีโอทั้งหมด (งานเด่นขึ้นก่อน)
const descs = {
  elysium: 'วิดีโอโฆษณาแนวตั้ง โทนแสงไฟยามค่ำคืน',
  monday: 'วิดีโอความรู้สำหรับ Masterart ตัวละครสร้างด้วย AI',
  singha1: 'วิดีโอสำหรับ Masterart สร้างภาพด้วย AI',
  lime1: 'ละครสั้นตัวละครผลไม้ สร้างภาพทั้งหมดด้วย AI',
  swu: 'วิดีโอแนะนำคณะศึกษาศาสตร์ มหาวิทยาลัยศรีนครินทรวิโรฒ',
  green: 'วิดีโอความรู้สำหรับ Masterart ตัวละครสร้างด้วย AI',
  plug: 'โฆษณาปลั๊กไฟ Elephant ที่ใช้ AI ช่วยสร้างภาพ',
  plate: 'คลิป TikTok สำหรับเพจโชคดีทะเบียน',
  pangwow: 'คลิป TikTok เล่าเรื่องร้านปังว้าวว้าว',
  tajmahal: 'คลิป TikTok สำหรับเพจหมอนัดมาเล่า',
  micro1: 'คลิป TikTok สำหรับ Microsystem — กำกับ ถ่ายทำ และตัดต่อ',
  micro2: 'คลิป TikTok สำหรับ Microsystem — กำกับ ถ่ายทำ และตัดต่อ',
  micro3: 'คลิป TikTok สำหรับ Microsystem — กำกับ ถ่ายทำ และตัดต่อ',
}
const featured = ['elysium', 'monday', 'singha1', 'swu', 'lime1', 'plug', 'green', 'plate', 'pangwow', 'tajmahal']
const catName = { ai: 'AI Video', ads: 'วิดีโอโฆษณา', tiktok: 'คลิป TikTok', youtube: 'คลิป YouTube' }

export const reel = [
  { cat: 'film', client: 'Short Film', title: 'The Lovers', desc: 'บาร์ลับทำนายรัก — ภาพยนตร์สั้นที่ได้ฉายในโรงภาพยนตร์ เซ็นทรัลเวิลด์', image: '/images/the-lovers.jpg', link: 'https://www.chainang.in.th/movie/thelovers' },
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
  { key: 'youtube', label: 'YouTube' },
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
