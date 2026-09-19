import emblema from '../assets/brand/emblema.webp'

type Tone = 'ouro' | 'dark' | 'light'
const TONES: Record<Tone, { wrap: string; text: string }> = {
  ouro: { wrap: 'bg-gradient-to-r from-ouro via-[#f4cd78] to-ouro', text: 'text-tinta' },
  dark: { wrap: 'bg-noite border-y border-ouro/20', text: 'text-papel/85' },
  light: { wrap: 'bg-creme border-y border-tinta/10', text: 'text-tinta' },
}

export function MarqueeBand({
  items, tone = 'ouro', duration = 50, reverse = false, className = '',
}: { items: string[]; tone?: Tone; duration?: number; reverse?: boolean; className?: string }) {
  const t = TONES[tone]
  const loop = [...items, ...items, ...items]
  const Row = ({ hidden }: { hidden?: boolean }) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {loop.map((w, i) => (
        <li key={i} className={`flex items-center whitespace-nowrap ${t.text}`}>
          <span className="px-5 text-[clamp(.9rem,1.5vw,1.05rem)] font-bold uppercase tracking-[0.18em]">{w}</span>
          <img src={emblema} alt="" className="h-4 w-auto opacity-60" />
        </li>
      ))}
    </ul>
  )
  return (
    <div className={`marquee-wrap relative overflow-hidden py-3.5 ${t.wrap} ${className}`}>
      <div className="marquee-track" data-reverse={reverse} style={{ ['--dur' as string]: `${duration}s` }}>
        <Row />
        <Row hidden />
      </div>
    </div>
  )
}
