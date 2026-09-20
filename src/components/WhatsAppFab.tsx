import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { WhatsAppIcon } from './icons'
import { waLink, EASE } from '../lib/site'

export default function WhatsAppFab({ show }: { show: boolean }) {
  const [dica, setDica] = useState(false)
  useEffect(() => {
    if (!show) return
    const a = setTimeout(() => setDica(true), 5200)
    const b = setTimeout(() => setDica(false), 11000)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [show])
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed bottom-[max(18px,env(safe-area-inset-bottom))] right-4 z-40 flex items-center gap-3 sm:bottom-7 sm:right-7"
          initial={{ opacity: 0, scale: 0.6, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 1.2 }}>
          <AnimatePresence>
            {dica && (
              <motion.span initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                className="hidden rounded-full border border-tinta/10 bg-white/90 px-4 py-2 text-[13.5px] font-medium text-tinta shadow-lg backdrop-blur-xl sm:block">
                Solicitar proposta
              </motion.span>
            )}
          </AnimatePresence>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="Falar com a Rezende no WhatsApp"
            onMouseEnter={() => setDica(true)} onMouseLeave={() => setDica(false)}
            className="group relative grid h-[58px] w-[58px] place-items-center rounded-full">
            <span aria-hidden className="ring-pulse absolute inset-0 rounded-full border border-azul/70" />
            <span aria-hidden className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,#4fb0ec,#0c60a8_55%,#0c2149)] shadow-[0_14px_34px_-10px_rgba(12,96,168,.9),inset_0_1px_0_rgba(255,255,255,.35)] transition-transform duration-300 group-hover:scale-105" />
            <WhatsAppIcon className="relative h-[27px] w-[27px] text-white" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
