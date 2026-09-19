import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import logo from '../assets/brand/logo-full.webp'
import logoClaro from '../assets/brand/logo-claro.webp'
import { NAV_ITEMS, EMAIL, waLink, EASE } from '../lib/site'
import { WhatsAppIcon } from './icons'

export default function Navbar({ show }: { show: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver((e) => e.forEach((x) => x.isIntersecting && setActive(x.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    els.forEach((el) => io.observe(el))
    const onTop = () => window.scrollY < 220 && setActive('')
    window.addEventListener('scroll', onTop, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', onTop) }
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 px-2.5 pt-[max(10px,env(safe-area-inset-top))] sm:px-5 sm:pt-4"
        initial={{ y: -90, opacity: 0 }}
        animate={show ? { y: 0, opacity: 1 } : { y: -90, opacity: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: show ? 0.45 : 0 }}
      >
        <nav
          aria-label="Principal"
          className={`mx-auto flex h-[60px] max-w-[1280px] items-center justify-between gap-2 overflow-hidden rounded-full pl-4 pr-1.5 transition-all duration-500 sm:h-[66px] sm:gap-3 sm:pl-7 sm:pr-2 ${
            scrolled
              ? 'border border-tinta/[.07] bg-[rgba(250,247,241,.82)] shadow-[0_20px_60px_-28px_rgba(12,33,73,.55)] backdrop-blur-xl backdrop-saturate-150'
              : 'border border-transparent bg-transparent'
          }`}
        >
          <a href="#inicio" className="shrink-0" aria-label="Rezende, início">
            <img src={logo} alt="Rezende Precatórios e Investimentos" className="h-[22px] w-auto sm:h-[26px]" />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} className="relative">
                <a href={`#${item.id}`}
                  className={`relative z-10 block rounded-full px-4 py-2 text-[14px] font-semibold transition-colors duration-300 ${active === item.id ? 'text-marinho' : 'text-tinta/55 hover:text-tinta'}`}>
                  {item.label}
                </a>
                {active === item.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full border border-azul/25 bg-azul/[.08]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
              </li>
            ))}
          </ul>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            <a href={waLink()} target="_blank" rel="noopener noreferrer"
              className="btn-azul inline-flex h-11 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[14.5px] font-semibold sm:h-12 sm:px-6">
              <WhatsAppIcon className="h-[17px] w-[17px]" />
              <span className="hidden min-[440px]:inline">Solicitar proposta</span>
            </a>
            <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-tinta/10 bg-white/60 lg:hidden">
              <span className={`absolute h-[1.6px] w-[18px] rounded bg-tinta transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[4px]'}`} />
              <span className={`absolute h-[1.6px] w-[18px] rounded bg-tinta transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-[4px]'}`} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div id="menu-mobile" className="fixed inset-0 z-[45] bg-noite lg:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <div aria-hidden className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(26,138,216,.35), transparent 65%)' }} />
            <div className="flex h-full flex-col px-7 pb-[max(28px,env(safe-area-inset-bottom))] pt-28">
              <img src={logoClaro} alt="" className="h-[26px] w-auto self-start opacity-90" />
              <ul className="mt-10 flex flex-col gap-1">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li key={item.id} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 * i + 0.1, duration: 0.5, ease: EASE }}>
                    <a href={`#${item.id}`} onClick={() => setOpen(false)} className="block py-2.5 font-display text-[2.1rem] leading-tight text-papel/90 active:text-ouro">
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex flex-col gap-3">
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-ouro flex h-14 items-center justify-center gap-2.5 rounded-full text-[16px] font-bold">
                  <WhatsAppIcon className="h-5 w-5" />
                  Solicitar proposta
                </a>
                <a href={`mailto:${EMAIL}`} className="text-center text-[14px] text-papel/50">{EMAIL}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
