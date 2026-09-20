import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Sheet, Container, Heading } from './Section'
import { WhatsAppIcon, MailIcon } from './icons'
import { waLink, EMAIL, EASE } from '../lib/site'

const ENTES = ['Federal', 'Estadual', 'Municipal', 'Não sei']
const SITUACOES = ['Precatório já expedido', 'Ainda em andamento', 'Não sei informar']

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-tinta/45">{label}</p>
      {children}
    </div>
  )
}

function Chips({ options, value, onChange, label }: { options: string[]; value: string; onChange: (v: string) => void; label: string }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = o === value
        return (
          <button key={o} role="radio" aria-checked={on} onClick={() => onChange(o)}
            className={`rounded-full border px-4 py-2.5 text-[15px] font-medium transition-all duration-200 ${on ? 'border-marinho bg-marinho text-papel shadow-[0_10px_26px_-14px_rgba(12,33,73,.9)]' : 'border-tinta/12 bg-white text-tinta/70 hover:border-marinho/40 hover:text-tinta'}`}>
            {o}
          </button>
        )
      })}
    </div>
  )
}

export default function Proposta() {
  const [nome, setNome] = useState('')
  const [ente, setEnte] = useState('Não sei')
  const [situacao, setSituacao] = useState('Não sei informar')
  const [processo, setProcesso] = useState('')

  const mensagem = useMemo(() => {
    const ola = nome.trim() ? `Olá! Meu nome é ${nome.trim()}.` : 'Olá!'
    return [
      ola,
      'Quero uma proposta de antecipação do meu precatório.',
      '',
      `• Ente devedor: ${ente.toLowerCase()}`,
      `• Situação: ${situacao.toLowerCase()}`,
      processo.trim() ? `• Processo: ${processo.trim()}` : '• Processo: vou enviar em seguida',
      '',
      'Vim pelo site.',
    ].join('\n')
  }, [nome, ente, situacao, processo])

  return (
    <Sheet id="proposta" tone="light" glow>
      <Container>
        <Heading
          align="center" tone="light" kicker="Solicitar proposta"
          title={<>Descubra quanto dá para <span className="italic text-azul">antecipar hoje</span>.</>}
          lead="Preencha as informações que você tem em mãos. A mensagem já sai pronta no WhatsApp e a análise é sem custo."
          className="mx-auto text-center"
        />

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex flex-col gap-8 rounded-[32px] border border-tinta/[.08] bg-white p-7 sm:p-10"
          >
            <Campo label="Seu nome">
              <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Como podemos te chamar?" aria-label="Seu nome" autoComplete="name"
                className="h-13 w-full rounded-2xl border border-tinta/12 bg-creme px-4 py-3.5 text-[16px] text-tinta placeholder:text-tinta/35 focus:border-azul/60 focus:outline-none" />
            </Campo>
            <Campo label="Quem é o devedor">
              <Chips label="Ente devedor" options={ENTES} value={ente} onChange={setEnte} />
            </Campo>
            <Campo label="Situação do crédito">
              <Chips label="Situação" options={SITUACOES} value={situacao} onChange={setSituacao} />
            </Campo>
            <Campo label="Número do processo (se tiver)">
              <input value={processo} onChange={(e) => setProcesso(e.target.value)} placeholder="0000000-00.0000.0.00.0000" aria-label="Número do processo" inputMode="numeric"
                className="h-13 w-full rounded-2xl border border-tinta/12 bg-creme px-4 py-3.5 text-[16px] text-tinta placeholder:text-tinta/35 focus:border-azul/60 focus:outline-none" />
            </Campo>
          </motion.div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[32px] border border-tinta/10 bg-[#0b141a] shadow-[0_40px_100px_-40px_rgba(0,0,0,.9)]">
              <div className="flex items-center gap-3 border-b border-white/[.06] bg-[#1f2c34] px-5 py-3.5">
                <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-noite ring-1 ring-ouro/40">
                  <img src="/apple-touch-icon.png" alt="" className="h-full w-full object-cover" />
                </span>
                <div className="leading-tight">
                  <p className="text-[15.5px] font-semibold text-white">Rezende Precatórios</p>
                  <p className="text-[12.5px] text-white/50">Prévia da sua mensagem</p>
                </div>
              </div>
              <div className="min-h-[260px] px-4 py-6 sm:px-6" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,.035) 1px, transparent 1px)', backgroundSize: '18px 18px' }}>
                <motion.div layout transition={{ duration: 0.35, ease: EASE }}
                  className="relative ml-auto max-w-[94%] rounded-2xl rounded-tr-md bg-[#005c4b] px-4 pb-6 pt-3 text-[15px] leading-[1.5] text-white">
                  <p className="whitespace-pre-line">{mensagem}</p>
                  <span className="absolute bottom-1.5 right-3 text-[11px] text-white/55">agora ✓✓</span>
                </motion.div>
              </div>
              <div className="border-t border-white/[.06] bg-[#111b21] p-4">
                <a href={waLink(mensagem)} target="_blank" rel="noopener noreferrer"
                  className="btn-ouro flex h-14 items-center justify-center gap-2.5 rounded-full text-[16px] font-bold">
                  <WhatsAppIcon className="h-5 w-5" />
                  Enviar pelo WhatsApp
                </a>
              </div>
            </div>
            <a href={`mailto:${EMAIL}`} className="mt-5 flex items-center justify-center gap-2.5 break-all text-[14.5px] text-tinta/50 hover:text-azul">
              <MailIcon className="h-[17px] w-[17px] shrink-0 text-azul" />
              {EMAIL}
            </a>
          </div>
        </div>
      </Container>
    </Sheet>
  )
}
