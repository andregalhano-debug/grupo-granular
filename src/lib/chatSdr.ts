import { formatWhatsApp } from '../utils/formatters'

export interface ChatLead {
  nome: string
  whatsapp: string
  empresa: string
  segmento: string
  dor: string
}

export interface ChatTurn {
  replies: string[]
  lead?: ChatLead
  ctaUrl?: string
  ctaLabel?: string
}

export interface ChatSdrState {
  turns: number
  askedContact: boolean
  closed: boolean
  nome: string
  whatsapp: string
  empresa: string
  segmento: string
  dor: string
}

export function emptyChatState(): ChatSdrState {
  return {
    turns: 0,
    askedContact: false,
    closed: false,
    nome: '',
    whatsapp: '',
    empresa: '',
    segmento: '',
    dor: '',
  }
}

function norm(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function has(text: string, ...keys: string[]) {
  const n = norm(text)
  return keys.some((k) => n.includes(norm(k)))
}

export function extractWhatsApp(text: string): string {
  const digits = text.replace(/\D/g, '')
  const local = digits.startsWith('55') && digits.length >= 12 ? digits.slice(2) : digits
  if (local.length < 10 || local.length > 11) return ''
  return formatWhatsApp(local)
}

function extractNome(text: string): string {
  const m =
    text.match(/(?:me chamo|meu nome (?:é|e)|sou a|sou o|eu sou)\s+([A-Za-zÀ-ÿ]{2,}(?:\s+[A-Za-zÀ-ÿ]{2,})?)/i)
  if (m?.[1]) return m[1].trim()
  const raw = text.replace(/\d/g, ' ').replace(/[^\p{L}\s]/gu, ' ').trim()
  const parts = raw.split(/\s+/).filter((w) => w.length >= 2)
  if (parts.length === 1 && /^[A-ZÀ-Ÿ][a-zà-ÿ]+$/.test(parts[0])) return parts[0]
  if (parts.length === 2 && parts.every((w) => /^[A-Za-zÀ-ÿ]{2,}$/.test(w))) return parts.join(' ')
  return ''
}

function firstName(nome: string) {
  return nome.split(/\s+/)[0] || ''
}

const LEAK =
  /sou o grok|eduardo ou andr[eé]|vm compartilhada|sess[aã]o [eé] nova|system prompt|como ia |sou uma ia|sou um (?:rob[oô]|bot)/i

export function isUsableLlmReply(text: string): boolean {
  const t = text.trim()
  if (t.length < 8 || t.length > 420) return false
  if (LEAK.test(t)) return false
  if ((t.match(/\*\*/g) || []).length >= 4) return false
  return true
}

export function splitBubbles(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 2)
}

function acknowledge(text: string): string {
  if (has(text, 'estoque', 'ruptura', 'desperdicio', 'insumo'))
    return 'Estoque é onde mais vaza dinheiro sem aparecer no caixa.'
  if (has(text, 'ifood', 'marketplace', '99food', 'rappi', 'cancelamento'))
    return 'No iFood o que mais dói costuma ser cancelamento e repasse, não a taxa em si.'
  if (has(text, 'cmv', 'custo', 'ficha', 'margem', 'preco', 'precific'))
    return 'CMV no olho é o caminho mais curto pra vender e ainda assim perder.'
  if (has(text, 'cozinha', 'kds', 'pedido atras', 'demora'))
    return 'Cozinha desorganizada queima avaliação e ticket no mesmo dia.'
  if (has(text, 'financeiro', 'dre', 'lucro', 'caixa'))
    return 'Quando o financeiro só fecha no fim do mês, a sangria já aconteceu.'
  if (has(text, 'equipe', 'rh', 'funcionario', 'turno'))
    return 'Equipe sem rotina clara pesa tanto quanto sistema ruim.'
  if (has(text, 'farmacia', 'farma')) return 'No farma a operação aperta em estoque e canal, não só no balcão.'
  if (has(text, 'mercado', 'atacado', 'atacarejo'))
    return 'No atacado o jogo é giro e ruptura — cada furo aparece no caixa.'
  if (has(text, 'caro', 'preco', 'valor', 'custa', 'investimento'))
    return 'O valor a gente fecha depois de ver o tamanho da operação.'
  if (has(text, 'oi', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'tudo bem'))
    return ''
  return 'Entendi.'
}

function nextQuestion(state: ChatSdrState, text: string): string {
  if (!state.segmento && has(text, 'restaurante', 'lanchonete', 'hambur', 'pizz', 'farmac', 'mercado', 'atacad')) {
    return 'Você tem uma unidade ou já é rede?'
  }
  if (state.turns <= 1 && !state.dor) {
    return 'Isso aperta mais no caixa, na cozinha ou no iFood?'
  }
  if (!state.empresa && state.turns >= 1) {
    return 'Como chama o negócio?'
  }
  return 'Me passa seu WhatsApp com DDD que eu peço pro time te retornar.'
}

export function nextChatTurn(state: ChatSdrState, userText: string): { state: ChatSdrState; turn: ChatTurn } {
  const text = userText.trim()
  const next: ChatSdrState = {
    ...state,
    turns: state.turns + 1,
    whatsapp: state.whatsapp || extractWhatsApp(text),
    nome: state.nome || extractNome(text),
  }

  if (!next.dor && text.length > 8 && !extractWhatsApp(text)) {
    next.dor = text.slice(0, 180)
  }
  if (!next.empresa && has(text, 'chama', 'restaurante', 'loja', 'mercado', 'farmacia')) {
    const m = text.match(/(?:chama|nome é|nome e)\s+(.{2,40})$/i)
    if (m) next.empresa = m[1].replace(/[?.!]/g, '').trim()
  }
  if (has(text, 'farmac')) next.segmento = next.segmento || 'Farmácia'
  else if (has(text, 'mercado', 'atacad')) next.segmento = next.segmento || 'Mercado'
  else if (has(text, 'restaurante', 'lanchonete', 'hambur', 'pizz', 'comida'))
    next.segmento = next.segmento || 'Restaurante'

  if (has(text, 'voce e um', 'você é um', 'e um robo', 'é um robô', 'e uma ia', 'é uma ia', 'e um bot')) {
    return {
      state: next,
      turn: { replies: ['Estou aqui pra te ajudar com a operação 😊 o que está puxando mais energia aí?'] },
    }
  }

  if (next.whatsapp && !state.whatsapp) {
    next.closed = true
    next.askedContact = true
    const hi = firstName(next.nome)
    const lead: ChatLead = {
      nome: next.nome || 'Lead do chat',
      whatsapp: next.whatsapp,
      empresa: next.empresa || 'Lead do chat',
      segmento: next.segmento || '—',
      dor: next.dor || text,
    }
    return {
      state: next,
      turn: {
        replies: [
          hi
            ? `${hi}, anotei. Alguém do time te chama nesse número.`
            : 'Anotei. Alguém do time te chama nesse número.',
        ],
        lead,
        ctaUrl: '/agendar-demo?origem=chat',
        ctaLabel: 'Se quiser, já escolhe um horário',
      },
    }
  }

  if (next.closed) {
    return {
      state: next,
      turn: {
        replies: ['Pode deixar que o time te chama. Se preferir, já marca o horário aqui.'],
        ctaUrl: '/agendar-demo?origem=chat',
        ctaLabel: 'Escolher um horário',
      },
    }
  }

  if (has(text, 'agendar', 'horario', 'horário', 'demonstra', 'reuniao', 'reunião', 'call')) {
    next.askedContact = true
    return {
      state: next,
      turn: {
        replies: ['Perfeito. Me passa o WhatsApp com DDD — e se quiser já escolhe o horário.'],
        ctaUrl: '/agendar-demo?origem=chat',
        ctaLabel: 'Abrir agenda',
      },
    }
  }

  const ack = acknowledge(text)
  const shouldAskContact = next.turns >= 2 || next.askedContact
  if (shouldAskContact) {
    next.askedContact = true
    const q = 'Me passa seu WhatsApp com DDD que eu peço pro time te retornar?'
    return {
      state: next,
      turn: { replies: ack ? [ack, q] : [q] },
    }
  }

  const q = nextQuestion(next, text)
  if (q.startsWith('Me passa seu WhatsApp')) next.askedContact = true
  return {
    state: next,
    turn: { replies: ack ? [ack, q] : [q] },
  }
}

export function openingLine(name: string) {
  return `Oi, tudo bem? Aqui é a ${name}. O que está mais apertado na operação hoje?`
}
