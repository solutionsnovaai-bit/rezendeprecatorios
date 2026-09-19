import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import losango from '../assets/brand/lay-losango.webp'
import barras from '../assets/brand/lay-barras.webp'
import seta from '../assets/brand/lay-seta.webp'
import filete from '../assets/brand/lay-filete.webp'
import tagline from '../assets/brand/lay-tagline.webp'
import l1 from '../assets/brand/lay-letra1.webp'
import l2 from '../assets/brand/lay-letra2.webp'
import l3 from '../assets/brand/lay-letra3.webp'
import l4 from '../assets/brand/lay-letra4.webp'
import l5 from '../assets/brand/lay-letra5.webp'
import l6 from '../assets/brand/lay-letra6.webp'
import l7 from '../assets/brand/lay-letra7.webp'
import heroDesktop from '../assets/brand/hero-desktop.webp'
import heroMobile from '../assets/brand/hero-mobile.webp'

const LETRAS = [l1, l2, l3, l4, l5, l6, l7]
const SEQUENCE_MS = 3600
const E = [0.22, 1, 0.36, 1] as const

function preload(src: string) {
  const img = new Image()
  img.src = src
  return img.decode().catch(() => undefined)
}

export default function Loader({ onFinish }: { onFinish: () => void }) {
  const reduce = useReducedMotion()
  const [pct, setPct] = useState(0)

  useEffect(() => {
    let alive = true
    const minTime = reduce ? 600 : SEQUENCE_MS
    const start = performance.now()
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches
    const pageLoaded = new Promise<void>((r) => {
      if (document.readyState === 'complete') r()
      else window.addEventListener('load', () => r(), { once: true })
    })
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts?.ready ?? Promise.resolve()
    const assets = Promise.all([pageLoaded, fonts, preload(isDesktop ? heroDesktop : heroMobile)])
    const cap = new Promise((r) => setTimeout(r, 7500))
    let raf = 0
    const tick = () => {
      const t = Math.min(1, (performance.now() - start) / minTime)
      setPct((p) => Math.max(p, Math.round((1 - Math.pow(1 - t, 3)) * 93)))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    Promise.all([Promise.race([assets, cap]), new Promise((r) => setTimeout(r, minTime))]).then(() => {
      if (!alive) return
      setPct(100)
      setTimeout(() => alive && onFinish(), reduce ? 150 : 540)
    })
    return () => { alive = false; cancelAnimationFrame(raf) }
  }, [onFinish, reduce])

  const t = (delay: number, duration = 0.8) =>
    reduce ? { duration: 0.3 } : { delay, duration, ease: E }

  return (
    <motion.div
      role="status"
      aria-label="Carregando o site da Rezende Precatórios"
      className="grao fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-papel"
      exit={reduce ? { opacity: 0, transition: { duration: 0.3 } } : { y: '-100%', transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 } }}
    >
      {/* luz suave de papel */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[130vmin] w-[130vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,.9) 0%, rgba(245,241,232,0) 62%)' }}
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2, ease: 'easeOut' }}
      />

      <div className="relative w-[min(88vw,780px)]">
        {/* o logo é montado peça por peça, na proporção do arquivo original */}
        <div className="relative w-full" style={{ aspectRatio: '2098 / 750' }}>
          {/* losango: desenha girando */}
          <motion.img
            src={losango} alt="" className="absolute inset-0 h-full w-full object-contain"
            initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: -35, scale: 0.86 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            style={{ transformOrigin: '15% 32%' }}
            transition={t(0.15, 1)}
          />
          {/* as três barras sobem, uma depois da outra */}
          <motion.img
            src={barras} alt="" className="absolute inset-0 h-full w-full object-contain"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            transition={t(0.75, 0.95)}
          />
          {/* a seta dispara da base até a ponta */}
          <motion.img
            src={seta} alt="" className="absolute inset-0 h-full w-full object-contain"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            transition={t(1.35, 0.85)}
          />
          {/* REZENDE, letra por letra */}
          {LETRAS.map((src, i) => (
            <motion.img
              key={i} src={src} alt="" className="absolute inset-0 h-full w-full object-contain"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={t(1.85 + i * 0.075, 0.7)}
            />
          ))}
          {/* filete dourado cresce */}
          <motion.img
            src={filete} alt="" className="absolute inset-0 h-full w-full object-contain"
            initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0% 100% 0% 0%)', opacity: 0 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            transition={t(2.45, 0.8)}
          />
          <motion.img
            src={tagline} alt="Rezende Precatórios e Investimentos" className="absolute inset-0 h-full w-full object-contain"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={t(2.7, 0.75)}
          />
          {/* brilho varrendo tudo no final */}
          {!reduce && (
            <motion.div
              aria-hidden className="absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(105deg, transparent 42%, rgba(255,255,255,.85) 50%, transparent 58%)',
                backgroundSize: '260% 100%', mixBlendMode: 'overlay',
              }}
              initial={{ backgroundPosition: '130% 0', opacity: 0 }}
              animate={{ backgroundPosition: '-30% 0', opacity: [0, 1, 1, 0] }}
              transition={{ delay: 2.95, duration: 1.1, ease: 'easeInOut' }}
            />
          )}
        </div>
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-[max(6vh,26px)] mx-auto flex w-[min(80vw,320px)] flex-col items-center gap-3"
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }} transition={t(0.3, 0.6)}
      >
        <div className="flex w-full items-baseline justify-between text-[11.5px] font-semibold uppercase tracking-[0.26em] text-tinta/45">
          <span>Antecipando</span>
          <span className="tabular-nums text-azul">{pct}%</span>
        </div>
        <div className="h-[2px] w-full overflow-hidden rounded-full bg-tinta/10">
          <div className="h-full origin-left rounded-full bg-gradient-to-r from-marinho via-azul to-ceu transition-transform duration-200 ease-out" style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
      </motion.div>
    </motion.div>
  )
}
