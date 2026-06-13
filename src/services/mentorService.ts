import type { MentorLead, MentorStatus, HistoricoProfissional } from '../types/mentor'
import { calcularScoreSenioridade, calcularCompletude, getRangeBySenioridade } from '../utils/seniorityScore'

const KEY = 'granular-mentor-leads'

export function getMentorLeads(): MentorLead[] {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]') }
  catch { return [] }
}

function save(leads: MentorLead[]) {
  localStorage.setItem(KEY, JSON.stringify(leads))
}

export interface MentorLeadInput {
  nome: string
  email: string
  whatsapp: string
  cidade: string
  estado: string
  linkedin: string
  cargoAtual: string
  empresaAtual: string
  segmentos: string[]
  segmentoOutro?: string
  especialidades: string[]
  especialidadeOutra?: string
  historicoProfissional: HistoricoProfissional[]
  bio?: string
}

export function createMentorLead(data: MentorLeadInput): MentorLead {
  const leads = getMentorLeads()
  const breakdown = calcularScoreSenioridade(data.historicoProfissional, data.linkedin, data.especialidades)
  const range = getRangeBySenioridade(breakdown.nivel)
  const now = new Date().toISOString()

  const lead: MentorLead = {
    id: crypto.randomUUID(),
    ...data,
    certificacoes: [],
    idiomas: [],
    disponibilidade: {},
    scoreSenioridade: breakdown.total,
    faixaSenioridade: breakdown.nivel,
    valorHoraSugeridoMin: range.valorMin,
    valorHoraSugeridoMax: range.valorMax,
    status: 'novo',
    adminNotes: '',
    perfilCompletude: calcularCompletude(data),
    historicoStatus: [{ data: now, acao: 'Cadastro recebido' }],
    criadoEm: now,
    atualizadoEm: now,
  }

  leads.push(lead)
  save(leads)
  return lead
}

export function updateMentorStatus(id: string, status: MentorStatus, nota?: string): void {
  const leads = getMentorLeads()
  const i = leads.findIndex((l) => l.id === id)
  if (i === -1) return
  const now = new Date().toISOString()

  const statusLabels: Record<MentorStatus, string> = {
    novo: 'Novo', em_analise: 'Em análise', aprovado: 'Aprovado',
    convidado: 'Convidado', ativo: 'Ativo', pausado: 'Pausado', rejeitado: 'Rejeitado',
  }

  leads[i].status = status
  leads[i].atualizadoEm = now
  if (status === 'aprovado') leads[i].aprovadoEm = now
  if (status === 'convidado') leads[i].convidadoEm = now
  if (status === 'ativo') leads[i].ativoEm = now
  leads[i].historicoStatus.push({ data: now, acao: `Status → ${statusLabels[status]}`, adminNota: nota })
  save(leads)
}

export function updateMentorNotes(id: string, notes: string): void {
  const leads = getMentorLeads()
  const i = leads.findIndex((l) => l.id === id)
  if (i === -1) return
  leads[i].adminNotes = notes
  leads[i].atualizadoEm = new Date().toISOString()
  save(leads)
}

export function updateMentorValorHora(id: string, valor: number): void {
  const leads = getMentorLeads()
  const i = leads.findIndex((l) => l.id === id)
  if (i === -1) return
  leads[i].valorHora = valor
  leads[i].atualizadoEm = new Date().toISOString()
  save(leads)
}

export function deleteMentorLead(id: string): void {
  save(getMentorLeads().filter((l) => l.id !== id))
}

export function getMentorLeadById(id: string): MentorLead | undefined {
  return getMentorLeads().find((l) => l.id === id)
}

// Seed de dados de teste — usado no admin para popular o CRM
export function seedMentorLeads(): void {
  const seed: MentorLeadInput[] = [
    {
      nome: 'Rafael Mendes', email: 'rafael.mendes@gmail.com', whatsapp: '(11) 98888-1111',
      cidade: 'São Paulo', estado: 'SP', linkedin: 'https://linkedin.com/in/rafaelmendes',
      cargoAtual: 'Diretor de Operações', empresaAtual: 'Grupo Mesa Farta',
      segmentos: ['restaurantes', 'franquias'], especialidades: ['operacao', 'marketplaces', 'estoque'],
      historicoProfissional: [
        { id: '1', empresa: 'iFood', cargo: 'Head de Operações', inicio: '01/2018', fim: '06/2022' },
        { id: '2', empresa: 'Grupo Mesa Farta', cargo: 'Diretor de Operações', inicio: '07/2022', fim: 'atual' },
        { id: '3', empresa: 'Domino\'s Brasil', cargo: 'Gerente Regional', inicio: '03/2014', fim: '12/2017' },
      ],
      bio: 'Mais de 12 anos em operações de food service. Especialista em escalar redes e reduzir CMV.',
    },
    {
      nome: 'Camila Santos', email: 'camila.santos@yahoo.com.br', whatsapp: '(11) 97777-2222',
      cidade: 'Campinas', estado: 'SP', linkedin: 'https://linkedin.com/in/camilasantos',
      cargoAtual: 'CFO', empresaAtual: 'Rede Sabor Certo',
      segmentos: ['restaurantes', 'mercados'], especialidades: ['financeiro', 'precificacao'],
      historicoProfissional: [
        { id: '1', empresa: 'Grupo Habib\'s', cargo: 'Controller', inicio: '02/2012', fim: '08/2019' },
        { id: '2', empresa: 'Rede Sabor Certo', cargo: 'CFO', inicio: '09/2019', fim: 'atual' },
      ],
      bio: 'Especialista em DRE, CMV e gestão financeira para redes com +50 unidades.',
    },
    {
      nome: 'Lucas Oliveira', email: 'lucas.mkt@hotmail.com', whatsapp: '(21) 96666-3333',
      cidade: 'Rio de Janeiro', estado: 'RJ', linkedin: 'https://linkedin.com/in/lucasoliveiramkt',
      cargoAtual: 'Co-Fundador', empresaAtual: 'Agência FoodGrowth',
      segmentos: ['restaurantes', 'delivery'], especialidades: ['marketing', 'marketplaces', 'atendimento'],
      historicoProfissional: [
        { id: '1', empresa: 'Rappi', cargo: 'Head de Marketing', inicio: '06/2017', fim: '11/2020' },
        { id: '2', empresa: 'FoodGrowth', cargo: 'Co-Fundador', inicio: '12/2020', fim: 'atual' },
      ],
    },
    {
      nome: 'Fernanda Costa', email: 'fernanda.chef@gmail.com', whatsapp: '(11) 95555-4444',
      cidade: 'São Paulo', estado: 'SP', linkedin: 'https://linkedin.com/in/fernandacostachef',
      cargoAtual: 'Consultora Independente', empresaAtual: '',
      segmentos: ['restaurantes', 'franquias'], especialidades: ['cardapio', 'operacao', 'precificacao'],
      historicoProfissional: [
        { id: '1', empresa: 'Outback Brasil', cargo: 'Gerente de Cardápio', inicio: '01/2010', fim: '06/2016' },
        { id: '2', empresa: 'Consultoria Independente', cargo: 'Consultora', inicio: '07/2016', fim: 'atual' },
      ],
      bio: 'Chef com MBA. Especialista em engenharia de cardápio e fichas técnicas.',
    },
    {
      nome: 'Thiago Barbosa', email: 'thiago.barbosa@gmail.com', whatsapp: '(11) 94444-5555',
      cidade: 'São Paulo', estado: 'SP', linkedin: 'https://linkedin.com/in/thiagobarbosa',
      cargoAtual: 'Account Director', empresaAtual: 'iFood',
      segmentos: ['restaurantes', 'delivery'], especialidades: ['marketplaces', 'marketing'],
      historicoProfissional: [
        { id: '1', empresa: 'iFood', cargo: 'Account Manager', inicio: '04/2016', fim: '12/2019' },
        { id: '2', empresa: 'iFood', cargo: 'Account Director', inicio: '01/2020', fim: 'atual' },
      ],
    },
    {
      nome: 'Mariana Alves', email: 'mariana.rh@gmail.com', whatsapp: '(11) 93333-6666',
      cidade: 'Curitiba', estado: 'PR', linkedin: 'https://linkedin.com/in/marianaalves',
      cargoAtual: 'CHRO', empresaAtual: 'Grupo Madero',
      segmentos: ['restaurantes', 'franquias'], especialidades: ['rh', 'operacao'],
      historicoProfissional: [
        { id: '1', empresa: 'McDonald\'s Brasil', cargo: 'Analista de RH', inicio: '03/2009', fim: '07/2013' },
        { id: '2', empresa: 'Grupo Madero', cargo: 'Gerente de RH', inicio: '08/2013', fim: '05/2020' },
        { id: '3', empresa: 'Grupo Madero', cargo: 'CHRO', inicio: '06/2020', fim: 'atual' },
      ],
    },
    {
      nome: 'Pedro Lima', email: 'pedro.lima@gmail.com', whatsapp: '(11) 92222-7777',
      cidade: 'São Paulo', estado: 'SP', linkedin: 'https://linkedin.com/in/pedrolima',
      cargoAtual: 'CEO', empresaAtual: 'Lima Consultoria',
      segmentos: ['mercados', 'atacado'], especialidades: ['operacao', 'estoque', 'financeiro'],
      historicoProfissional: [
        { id: '1', empresa: 'Pão de Açúcar', cargo: 'Gerente Regional', inicio: '01/2005', fim: '12/2012' },
        { id: '2', empresa: 'Carrefour', cargo: 'Diretor de Operações', inicio: '01/2013', fim: '06/2020' },
        { id: '3', empresa: 'Lima Consultoria', cargo: 'CEO', inicio: '07/2020', fim: 'atual' },
      ],
    },
    {
      nome: 'Ana Paula Rocha', email: 'anapaula.rocha@gmail.com', whatsapp: '(85) 91111-8888',
      cidade: 'Fortaleza', estado: 'CE', linkedin: 'https://linkedin.com/in/anapauladiretora',
      cargoAtual: 'Diretora Comercial', empresaAtual: 'Distribuidora NordFood',
      segmentos: ['restaurantes', 'ecommerce'], especialidades: ['marketing', 'atendimento'],
      historicoProfissional: [
        { id: '1', empresa: 'Magazine Luiza', cargo: 'Gerente Comercial', inicio: '06/2014', fim: '11/2018' },
        { id: '2', empresa: 'NordFood', cargo: 'Diretora Comercial', inicio: '12/2018', fim: 'atual' },
      ],
    },
    {
      nome: 'Bruno Ferreira', email: 'bruno.tech@gmail.com', whatsapp: '(31) 90000-9999',
      cidade: 'Belo Horizonte', estado: 'MG', linkedin: 'https://linkedin.com/in/brunotech',
      cargoAtual: 'CTO', empresaAtual: 'FoodTech Solutions',
      segmentos: ['restaurantes', 'delivery'], especialidades: ['tecnologia', 'marketplaces'],
      historicoProfissional: [
        { id: '1', empresa: 'TOTVS', cargo: 'Analista de Sistemas Sênior', inicio: '01/2012', fim: '08/2016' },
        { id: '2', empresa: 'FoodTech Solutions', cargo: 'CTO', inicio: '09/2016', fim: 'atual' },
      ],
    },
    {
      nome: 'Juliana Freitas', email: 'juliana.farma@gmail.com', whatsapp: '(11) 98765-4321',
      cidade: 'São Paulo', estado: 'SP', linkedin: 'https://linkedin.com/in/julianafarma',
      cargoAtual: 'Gerente de Operações', empresaAtual: 'Raia Drogasil',
      segmentos: ['farmacias'], especialidades: ['operacao', 'estoque', 'atendimento'],
      historicoProfissional: [
        { id: '1', empresa: 'Ultrafarma', cargo: 'Supervisora', inicio: '03/2015', fim: '10/2018' },
        { id: '2', empresa: 'Raia Drogasil', cargo: 'Gerente de Operações', inicio: '11/2018', fim: 'atual' },
      ],
    },
    {
      nome: 'Carlos Eduardo Souza', email: 'carlos.franquias@gmail.com', whatsapp: '(11) 99999-0000',
      cidade: 'São Paulo', estado: 'SP', linkedin: 'https://linkedin.com/in/carloseduardo',
      cargoAtual: 'Consultor Sênior', empresaAtual: 'ABF Consultoria',
      segmentos: ['franquias', 'restaurantes'], especialidades: ['operacao', 'financeiro', 'rh'],
      historicoProfissional: [
        { id: '1', empresa: 'Subway Brasil', cargo: 'Gerente de Expansão', inicio: '01/2008', fim: '12/2015' },
        { id: '2', empresa: 'ABF Consultoria', cargo: 'Consultor Sênior', inicio: '01/2016', fim: 'atual' },
      ],
    },
    {
      nome: 'Priscila Nunes', email: 'pri.nunes@gmail.com', whatsapp: '(48) 98888-1234',
      cidade: 'Florianópolis', estado: 'SC', linkedin: '',
      cargoAtual: 'Proprietária', empresaAtual: 'Petit Gourmet',
      segmentos: ['restaurantes'], especialidades: ['cardapio', 'atendimento'],
      historicoProfissional: [
        { id: '1', empresa: 'Petit Gourmet', cargo: 'Proprietária', inicio: '05/2019', fim: 'atual' },
      ],
    },
  ]

  const existing = getMentorLeads()
  const existingEmails = new Set(existing.map((l) => l.email))
  const toAdd = seed.filter((s) => !existingEmails.has(s.email))

  for (const item of toAdd) {
    createMentorLead(item)
  }

  // Simula diferentes status para visualização no admin
  const leads = getMentorLeads()
  const statusMap: Record<string, MentorStatus> = {
    'rafael.mendes@gmail.com': 'ativo',
    'camila.santos@yahoo.com.br': 'ativo',
    'lucas.mkt@hotmail.com': 'convidado',
    'fernanda.chef@gmail.com': 'ativo',
    'thiago.barbosa@gmail.com': 'aprovado',
    'mariana.rh@gmail.com': 'ativo',
    'pedro.lima@gmail.com': 'em_analise',
    'ana.paula.rocha@gmail.com': 'em_analise',
    'bruno.tech@gmail.com': 'aprovado',
    'juliana.farma@gmail.com': 'novo',
    'carlos.franquias@gmail.com': 'convidado',
    'pri.nunes@gmail.com': 'rejeitado',
  }

  const valorMap: Record<string, number> = {
    'rafael.mendes@gmail.com': 480,
    'camila.santos@yahoo.com.br': 400,
    'lucas.mkt@hotmail.com': 350,
    'fernanda.chef@gmail.com': 300,
    'thiago.barbosa@gmail.com': 380,
    'mariana.rh@gmail.com': 270,
    'pedro.lima@gmail.com': 620,
    'bruno.tech@gmail.com': 290,
  }

  for (const lead of leads) {
    if (statusMap[lead.email] && lead.status === 'novo') {
      updateMentorStatus(lead.id, statusMap[lead.email])
    }
    if (valorMap[lead.email] && !lead.valorHora) {
      updateMentorValorHora(lead.id, valorMap[lead.email])
    }
  }
}
