# Rezende Precatórios e Investimentos

Landing page de antecipação de precatórios, feita por NOVA AI SOLUTIONS.

## Stack

Vite + React 18 + TypeScript + Tailwind CSS v4 + Framer Motion + React Helmet Async.

```bash
npm install
npm run dev
npm run build     # gera dist/
```

## Deploy

Na Vercel, importe o repositório e crie `VITE_SITE_URL` em Settings → Environment Variables,
com o domínio final e sem barra no fim (ex.: `https://rezendeprecatorios.com.br`). É o que monta
as URLs do card de compartilhamento.

## ⚠️ Antes de publicar

- **WhatsApp:** está como placeholder em `src/lib/site.ts` (`PHONE_DISPLAY` e `PHONE_E164`).
  Esse é o único lugar a trocar: navbar, botões, balão flutuante e o formulário saem dele.
- **Confirmar com o cliente:** se compram RPV, se aceitam ceder parte do crédito, o prazo médio
  entre contato e pagamento, e se querem manter o canal para advogados (está nas dúvidas).
- O site **não cita percentual, deságio ou "melhor valor do mercado"** em lugar nenhum, de
  propósito. Promessa de valor em antecipação de crédito é risco jurídico e derruba confiança.

## Onde mexer

| O quê | Arquivo |
| --- | --- |
| WhatsApp, e-mail, CNPJ, menu | `src/lib/site.ts` |
| Fotos do carrossel e legendas | `src/lib/fotos.ts` |
| Etapas da fila do precatório | `src/components/Espera.tsx` |
| As 4 etapas do processo | `src/components/Processo.tsx` |
| Documentos necessários | `src/components/Documentos.tsx` |
| Dúvidas | `src/components/FAQ.tsx` |
| Formulário de proposta | `src/components/Proposta.tsx` |
| Cores e fontes | `src/index.css` (bloco `@theme`) |
| SEO e dados estruturados | `src/components/Seo.tsx` e `index.html` |

## Assets

`src/assets/brand/` — o logo foi separado em camadas (losango, barras, seta, cada letra de
REZENDE, filete e assinatura). É o que a tela de abertura monta peça por peça. Também estão ali
a versão clara para fundo escuro, o emblema, o pin e os heros desktop e mobile, já com respiro
no topo para a navbar não cobrir o logo.

`src/assets/fotos/` — 10 stills, cada um em 1400px e `@760` para celular, entregues por `srcset`.

`public/og-rezende.jpg` — card de compartilhamento (1200x630).
