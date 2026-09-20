import { motion } from 'framer-motion'
import { Sheet, Container, Heading } from './Section'
import { EASE, waLink } from '../lib/site'
import { WhatsAppIcon } from './icons'

const DOCS = [
  { titulo: 'Número do processo', texto: 'O número do processo em que o precatório foi expedido. Está em qualquer documento do seu advogado.' },
  { titulo: 'Tribunal e ente devedor', texto: 'Se o devedor é a União, o estado, o município ou uma autarquia. Isso define o caminho da operação.' },
  { titulo: 'Documento com foto e CPF', texto: 'Do titular do crédito. Se houver mais de um herdeiro ou beneficiário, de todos eles.' },
  { titulo: 'Comprovante de endereço', texto: 'Atualizado, em nome do titular, para a escritura no cartório.' },
  { titulo: 'Certidão de objeto e pé', texto: 'Quando disponível. Mostra a situação atual do processo. Se não tiver, a gente orienta como conseguir.' },
  { titulo: 'Dados do advogado', texto: 'Para alinhar honorários e manter quem cuidou do seu caso dentro da conversa.' },
]

export default function Documentos() {
  return (
    <Sheet id="documentos" tone="paper">
      <Container>
        <Heading
          tone="light"
          kicker="Prepare-se"
          title={<>O que ter <span className="italic text-azul">em mãos</span>.</>}
          lead="Não precisa de tudo para começar a conversa. Mas quanto mais completo, mais rápido sai a proposta."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {DOCS.map((d, i) => (
            <motion.article
              key={d.titulo}
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-70px' }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.07 }}
              className="rounded-[26px] border border-tinta/[.08] bg-white p-7"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-marinho/[.07] font-display text-[18px] text-marinho">{i + 1}</span>
              <h3 className="mt-6 font-display text-[21px] leading-tight text-tinta">{d.titulo}</h3>
              <p className="mt-2 text-[15.5px] leading-relaxed text-tinta/60">{d.texto}</p>
            </motion.article>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start gap-4 rounded-[26px] border border-azul/20 bg-azul/[.05] p-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[52ch] text-[16px] leading-relaxed text-tinta/70">
            Não tem nada disso em mãos agora? Sem problema. Mande o que tiver e a gente localiza o resto com você.
          </p>
          <a href={waLink('Olá! Não tenho todos os documentos em mãos, podem me ajudar a localizar?')} target="_blank" rel="noopener noreferrer"
            className="btn-azul inline-flex h-13 shrink-0 items-center gap-2.5 rounded-full px-6 py-3.5 text-[15.5px] font-bold">
            <WhatsAppIcon className="h-[17px] w-[17px]" />
            Pedir ajuda
          </a>
        </div>
      </Container>
    </Sheet>
  )
}
