export const BRAND = 'Rezende Precatórios e Investimentos'

/* ⚠️ Coloque aqui o WhatsApp comercial antes de publicar. */
export const PHONE_DISPLAY = '(11) 90000-0000'
export const PHONE_E164 = '5511900000000'
export const EMAIL = 'contato@rezendeprecatorios.com.br'
export const CNPJ = '13.794.443/0001-43'
export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? '').replace(/\/$/, '')

export const DEFAULT_MESSAGE =
  'Olá! Vim pelo site da Rezende e quero uma proposta de antecipação do meu precatório.'

export function waLink(message: string = DEFAULT_MESSAGE) {
  return `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(message)}`
}

export const NAV_ITEMS = [
  { id: 'espera', label: 'A fila' },
  { id: 'como-funciona', label: 'Como funciona' },
  { id: 'destrave', label: 'O que destrava' },
  { id: 'documentos', label: 'Documentos' },
  { id: 'duvidas', label: 'Dúvidas' },
] as const

export const EASE = [0.22, 1, 0.36, 1] as const
