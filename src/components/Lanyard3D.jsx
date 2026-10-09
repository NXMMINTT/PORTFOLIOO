import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { Environment, Lightformer } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import { profile } from '../data/profile.js'

extend({ MeshLineGeometry, MeshLineMaterial })

// ป้ายห้อยสายคล้อง 3 มิติ ตามแบบ React Bits "Lanyard" (reactbits.dev/components/lanyard)
// หน้าบัตรวาดด้วย canvas จากข้อมูลใน profile.js (ดีไซน์บัตรแดงเดิม) — ไม่ต้องใช้ไฟล์ .glb
const CARD_W = 1.6
const CARD_H = 2.25
const TEX_W = 1024
const TEX_H = Math.round((TEX_W * CARD_H) / CARD_W)
const ROPE = 0.7 // ความยาวสายแต่ละช่วง (3 ช่วง)
const ANCHOR = CARD_H / 2 + 0.3 // จุดที่สายต่อกับบัตร = ขอบบนของตัวหนีบ

export default function Lanyard3D() {
  return (
    <div className="lanyard3d">
      {/* flat = ไม่ใช้ tone mapping สีแดงจะได้ตรงกับที่วาด ไม่ซีด */}
      <Canvas flat camera={{ position: [0, 0, 13], fov: 20 }} gl={{ alpha: true }} dpr={[1, 2]}>
        <ambientLight intensity={1.1} />
        <directionalLight position={[2, 4, 8]} intensity={0.5} />
        <Physics gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
        {/* แสงสะท้อนเบา ๆ ให้ผิวเคลือบกับห่วงโลหะมีมิติ — ไม่แรงจนบัตรดูเรืองแสง */}
        <Environment blur={0.75} environmentIntensity={0.35}>
          <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
          <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
        </Environment>
      </Canvas>
    </div>
  )
}

function Band({ maxSpeed = 50, minSpeed = 0 }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef()
  const vec = useMemo(() => new THREE.Vector3(), [])
  const ang = useMemo(() => new THREE.Vector3(), [])
  const rot = useMemo(() => new THREE.Vector3(), [])
  const dir = useMemo(() => new THREE.Vector3(), [])
  const tip = useMemo(() => new THREE.Vector3(), [])
  const up = useMemo(() => new THREE.Vector3(), [])
  const quat = useMemo(() => new THREE.Quaternion(), [])
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 }

  const front = useCardTexture(drawFront)
  const back = useCardTexture(drawBack)
  const strap = useStrapTexture()
  const [curve] = useState(() => new THREE.CatmullRomCurve3(Array.from({ length: 5 }, () => new THREE.Vector3())))
  const [dragged, drag] = useState(false)
  const [hovered, hover] = useState(false)

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], ROPE])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], ROPE])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], ROPE])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, ANCHOR, 0]])

  useEffect(() => {
    if (!hovered) return
    document.body.style.cursor = dragged ? 'grabbing' : 'grab'
    return () => { document.body.style.cursor = 'auto' }
  }, [hovered, dragged])

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
    }
    if (fixed.current) {
      // ทำให้สายโค้งนุ่ม ไม่สั่น
      ;[j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const d = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + d * (maxSpeed - minSpeed)))
      })
      // ปลายสายยึดกับตัวหนีบบนบัตรพอดี (คำนวณจากตำแหน่ง+การหมุนของบัตร) และออกจากตัวหนีบตรงตามแนวบัตร
      // — ไม่ใช้ตำแหน่งข้อต่อ j3 ตรง ๆ เพราะตอนเหวี่ยงแรงข้อต่อยืด ทำให้สายหลุดจากตัวหนีบ
      const q = card.current.rotation()
      quat.set(q.x, q.y, q.z, q.w)
      const t = card.current.translation()
      const anchor = tip.set(0, ANCHOR, 0).applyQuaternion(quat).add(t)
      const lead = up.set(0, ANCHOR + 0.25, 0).applyQuaternion(quat).add(t)
      curve.points[0].copy(anchor)
      curve.points[1].copy(lead)
      curve.points[2].copy(j2.current.lerped)
      curve.points[3].copy(j1.current.lerped)
      curve.points[4].copy(fixed.current.translation())
      // ระยะห่างจุดเท่ากันตามความยาวสาย ตัวหนังสือบนสายจะได้ไม่ยืด/บีบ
      band.current.geometry.setPoints(curve.getSpacedPoints(48))
      // ค่อย ๆ หมุนบัตรกลับมาหันหน้าเข้าหากล้อง
      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z })
    }
  })

  curve.curveType = 'chordal'

  return (
    <>
      <group position={[0, 2.9, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[ROPE * 0.8, 0, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[ROPE * 1.6, 0, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[ROPE * 2.4, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[ROPE * 3.2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[CARD_W / 2, CARD_H / 2, 0.01]} />
          <group
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => { e.target.releasePointerCapture(e.pointerId); drag(false) }}
            onPointerDown={(e) => {
              e.target.setPointerCapture(e.pointerId)
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            }}
          >
            <mesh position={[0, 0, 0.006]}>
              <planeGeometry args={[CARD_W, CARD_H]} />
              {/* ไม่รับแสง = สีตรงกับที่วาดเป๊ะ แดงสดเหมือนบัตรเดิม */}
              <meshBasicMaterial map={front} map-anisotropy={16} alphaTest={0.5} side={THREE.FrontSide} />
            </mesh>
            <mesh position={[0, 0, -0.006]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[CARD_W, CARD_H]} />
              <meshBasicMaterial map={back} alphaTest={0.5} side={THREE.FrontSide} />
            </mesh>
            {/* ตัวหนีบแบบ React Bits: ปลายสายเข้าตัวหนีบเหลี่ยม → ก้าน → ห่วงคล้องรูบนบัตร */}
            <mesh position={[0, ANCHOR - 0.1, 0]}>
              <boxGeometry args={[0.42, 0.2, 0.08]} />
              <meshStandardMaterial color="#9a9a9a" metalness={0.9} roughness={0.28} />
            </mesh>
            <mesh position={[0, ANCHOR - 0.1, 0.041]}>
              <boxGeometry args={[0.3, 0.09, 0.005]} />
              <meshStandardMaterial color="#5c5c5c" metalness={0.9} roughness={0.35} />
            </mesh>
            <mesh position={[0, CARD_H / 2 + 0.1, 0]}>
              <cylinderGeometry args={[0.018, 0.018, 0.08, 12]} />
              <meshStandardMaterial color="#b5b5b5" metalness={1} roughness={0.25} />
            </mesh>
            <mesh position={[0, CARD_H / 2 + 0.0, 0]}>
              <torusGeometry args={[0.07, 0.018, 12, 32]} />
              <meshStandardMaterial color="#b5b5b5" metalness={1} roughness={0.25} />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="white" depthTest={false} resolution={[1000, 1000]} useMap map={strap} repeat={[-2, 1]} lineWidth={3.3} />
      </mesh>
    </>
  )
}

/* ---------- textures ---------- */

function useCardTexture(draw) {
  const [tex] = useState(() => {
    const c = document.createElement('canvas')
    c.width = TEX_W
    c.height = TEX_H
    const t = new THREE.CanvasTexture(c)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  })
  useEffect(() => {
    let alive = true
    const img = new Image()
    img.src = profile.photo
    const paint = () => {
      if (!alive) return
      draw(tex.image.getContext('2d'), img.complete && img.naturalWidth ? img : null)
      tex.needsUpdate = true
    }
    paint()
    document.fonts.ready.then(paint)
    img.onload = paint
    return () => { alive = false }
  }, [tex, draw])
  return tex
}

// วาดสายใหม่อีกรอบเมื่อฟอนต์โหลดเสร็จ (ตัวหนังสือจะได้ใช้ฟอนต์ของเว็บ)
function useStrapTexture() {
  const [tex] = useState(makeStrapTexture)
  useEffect(() => {
    document.fonts.ready.then(() => {
      tex.image = makeStrapTexture().image
      tex.needsUpdate = true
    })
  }, [tex])
  return tex
}

// สายคล้องสีแดง ขอบเข้ม + ชื่อช่อง
function makeStrapTexture() {
  // สัดส่วนแผ่น 4:1 ใกล้กับสัดส่วนสายจริงต่อ 1 รอบลาย (ความยาว ÷ ความกว้าง) ตัวหนังสือจะไม่ถูกบีบ
  const c = document.createElement('canvas')
  c.width = 1024
  c.height = 256
  const g = c.getContext('2d')
  const grad = g.createLinearGradient(0, 0, 0, 256)
  grad.addColorStop(0, '#9c050e')
  grad.addColorStop(0.5, '#e50914')
  grad.addColorStop(1, '#9c050e')
  g.fillStyle = grad
  g.fillRect(0, 0, 1024, 256)
  // ตัวหนังสือบนสาย
  g.fillStyle = '#fff'
  g.font = '800 84px "Inter Tight", sans-serif'
  g.letterSpacing = '10px'
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.fillText(`✦ ${profile.handle.toUpperCase()}`, 512, 134)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.wrapS = t.wrapT = THREE.RepeatWrapping
  t.anisotropy = 16
  return t
}

const SANS = '"Inter Tight", "IBM Plex Sans Thai", sans-serif'
const THAI = '"IBM Plex Sans Thai", sans-serif'

function cardShape(g) {
  g.clearRect(0, 0, TEX_W, TEX_H)
  g.save()
  g.beginPath()
  g.roundRect(0, 0, TEX_W, TEX_H, 56)
  g.clip()
  const grad = g.createLinearGradient(0, 0, TEX_W * 0.6, TEX_H)
  grad.addColorStop(0, '#ef1a24')
  grad.addColorStop(0.7, '#a3060f')
  grad.addColorStop(1, '#6d040a')
  g.fillStyle = grad
  g.fillRect(0, 0, TEX_W, TEX_H)
  // ช่องเจาะคล้องสาย
  g.fillStyle = 'rgba(0, 0, 0, .45)'
  g.beginPath()
  g.roundRect(TEX_W / 2 - 90, 34, 180, 30, 15)
  g.fill()
}

function watermark(g, text) {
  g.save()
  g.translate(TEX_W / 2, TEX_H / 2)
  g.rotate((-12 * Math.PI) / 180)
  g.font = `800 760px ${SANS}`
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  g.letterSpacing = '-60px'
  g.strokeStyle = 'rgba(255, 255, 255, .12)'
  g.lineWidth = 4
  g.strokeText(text, 0, 0)
  g.restore()
}

// หน้าบัตร: EDIT DEPT. / 02 / รูปวงกลม / ชื่อ / [ COOKIE ] / มหาวิทยาลัย / ตำแหน่ง
function drawFront(g, img) {
  const initials = profile.nameEn.split(' ').map((w) => w[0]).join('')
  cardShape(g)
  watermark(g, initials)
  g.fillStyle = '#fff'
  g.textBaseline = 'alphabetic'

  g.font = `600 50px ${SANS}`
  g.letterSpacing = '4px'
  g.textAlign = 'left'
  g.fillText('EDIT DEPT.', 80, 150)
  g.textAlign = 'right'
  g.fillText('02', TEX_W - 80, 150)

  g.font = `600 28px ${SANS}`
  g.letterSpacing = '5px'
  g.textAlign = 'center'
  g.globalAlpha = 0.85
  g.fillText('VIDEO EDITOR ID CARD', TEX_W / 2, 205)
  g.globalAlpha = 1

  // รูปวงกลมขอบขาว
  const cx = TEX_W / 2, cy = 470, r = 215
  g.beginPath()
  g.arc(cx, cy, r + 14, 0, Math.PI * 2)
  g.fillStyle = '#fff'
  g.fill()
  g.save()
  g.beginPath()
  g.arc(cx, cy, r, 0, Math.PI * 2)
  g.clip()
  if (img) {
    const s = Math.min(img.naturalWidth, img.naturalHeight)
    g.drawImage(img, (img.naturalWidth - s) / 2, (img.naturalHeight - s) / 2, s, s, cx - r, cy - r, r * 2, r * 2)
  } else {
    g.fillStyle = '#2c2c2c'
    g.fillRect(cx - r, cy - r, r * 2, r * 2)
  }
  g.restore()

  g.fillStyle = '#fff'
  g.letterSpacing = '1px'
  g.font = `500 40px ${THAI}`
  g.globalAlpha = 0.9
  g.fillText(profile.name, TEX_W / 2, 785)
  g.globalAlpha = 1
  g.font = `700 64px ${SANS}`
  g.fillText(profile.nameEn, TEX_W / 2, 860)

  g.beginPath()
  g.roundRect(TEX_W / 2 - 230, 915, 460, 32, 16)
  g.fill()

  g.textAlign = 'left'
  g.font = `500 72px ${SANS}`
  g.letterSpacing = '6px'
  g.fillText(`[ ${profile.cardTag} ]`, 80, 1090)
  g.textAlign = 'right'
  g.font = `500 30px ${THAI}`
  g.letterSpacing = '0px'
  g.globalAlpha = 0.9
  profile.university.split('\n').forEach((line, i) => g.fillText(line, TEX_W - 80, 1055 + i * 42))
  g.globalAlpha = 1

  g.textAlign = 'center'
  g.font = `600 34px ${SANS}`
  g.letterSpacing = '4px'
  g.fillText(profile.position, TEX_W / 2, 1335)
  g.restore()
}

// หลังบัตร
function drawBack(g) {
  cardShape(g)
  watermark(g, profile.since.slice(-2))
  g.fillStyle = '#fff'
  g.textAlign = 'center'
  g.font = `800 92px ${SANS}`
  g.letterSpacing = '6px'
  g.fillText(profile.handle.toUpperCase(), TEX_W / 2, TEX_H / 2)
  g.font = `600 32px ${SANS}`
  g.letterSpacing = '10px'
  g.globalAlpha = 0.85
  g.fillText('VIDEO EDITOR PORTFOLIO', TEX_W / 2, TEX_H / 2 + 70)
  g.globalAlpha = 1
  g.restore()
}
