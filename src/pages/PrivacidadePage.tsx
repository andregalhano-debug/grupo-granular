import { Link } from 'react-router-dom'
import { GranularLogo } from '../components/GranularLogo'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-bold text-[#0E0E0F] mb-4 pb-2 border-b border-[#0E0E0F]/8">{title}</h2>
      {children}
    </section>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h3 className="text-sm font-semibold text-[#0E0E0F] mb-2">{title}</h3>
      {children}
    </div>
  )
}

function Audience({ label, color }: { label: string; color: string }) {
  return (
    <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border mr-2 mb-2 ${color}`}>
      {label}
    </span>
  )
}

function DataTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[#F7F7F7]">
            <th className="text-left text-xs font-semibold text-[#9C958A] uppercase tracking-wider px-3 py-2 border border-[#0E0E0F]/10">Dado</th>
            <th className="text-left text-xs font-semibold text-[#9C958A] uppercase tracking-wider px-3 py-2 border border-[#0E0E0F]/10">Finalidade</th>
            <th className="text-left text-xs font-semibold text-[#9C958A] uppercase tracking-wider px-3 py-2 border border-[#0E0E0F]/10">Base Legal (LGPD)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([dado, finalidade, base], i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F7F7F7]/50'}>
              <td className="px-3 py-2 border border-[#0E0E0F]/10 text-[#0E0E0F] font-medium align-top">{dado}</td>
              <td className="px-3 py-2 border border-[#0E0E0F]/10 text-[#4B4B4B] align-top">{finalidade}</td>
              <td className="px-3 py-2 border border-[#0E0E0F]/10 text-[#4B4B4B] align-top">{base}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const p = "text-sm text-[#4B4B4B] leading-relaxed mb-3"
const li = "text-sm text-[#4B4B4B] leading-relaxed"

export function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      {/* Header */}
      <header className="bg-white border-b border-[#0E0E0F]/8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <GranularLogo size={28} color="#0E0E0F" />
            <span className="text-sm font-semibold text-[#0E0E0F]">Granular</span>
          </Link>
          <div className="flex items-center gap-4 text-xs text-[#9C958A]">
            <Link to="/termos" className="hover:text-[#0E0E0F] transition-colors">Termos de Uso</Link>
            <Link to="/cookies" className="hover:text-[#0E0E0F] transition-colors">Cookies</Link>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="mb-10">
          <p className="text-xs font-semibold text-[#A31631] uppercase tracking-widest mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Privacidade
          </p>
          <h1 className="text-3xl font-bold text-[#0E0E0F] mb-3">Política de Privacidade</h1>
          <p className={p}>Última atualização: 13 de junho de 2026. Em conformidade com a LGPD (Lei nº 13.709/2018).</p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 leading-relaxed">
            O Grupo Granular está comprometido com a proteção de seus dados pessoais. Esta Política descreve como coletamos, usamos, armazenamos e compartilhamos informações de todos os perfis que interagem com nossa plataforma.
          </div>
        </div>

        {/* Controlador */}
        <Section title="1. Quem é o Controlador dos Dados">
          <div className="bg-white rounded-xl border border-[#0E0E0F]/10 p-4 text-sm text-[#0E0E0F] space-y-1 mb-4">
            <p><strong>Controlador:</strong> Grupo Granular Tecnologia Ltda.</p>
            <p><strong>E-mail do Encarregado (DPO):</strong> <a href="mailto:privacidade@grupogranular.com.br" className="text-[#A31631] hover:underline">privacidade@grupogranular.com.br</a></p>
            <p><strong>Endereço:</strong> São Paulo, SP — Brasil</p>
          </div>
          <p className={p}>O Encarregado de Proteção de Dados (DPO) é o canal oficial para exercício dos direitos dos titulares e esclarecimentos sobre o tratamento de dados.</p>
        </Section>

        {/* Dados por público */}
        <Section title="2. Dados Coletados por Perfil de Usuário">

          {/* Usuários do Sistema */}
          <SubSection title="2.1 Usuários do Sistema">
            <div className="mb-3">
              <Audience label="Usuários do Sistema" color="text-blue-700 bg-blue-50 border-blue-200" />
            </div>
            <p className={p}>Empresas e profissionais que utilizam os Módulos 1, 2 e/ou 3 do sistema Granular para gestão operacional.</p>
            <DataTable rows={[
              ['Nome, e-mail e telefone do responsável', 'Criação e gestão da conta, suporte e comunicações contratuais', 'Execução de contrato (art. 7º, V)'],
              ['CNPJ, razão social e endereço', 'Emissão de notas fiscais e cumprimento de obrigações legais', 'Obrigação legal (art. 7º, II)'],
              ['Dados de faturamento e pagamento', 'Processamento de cobranças e conciliação financeira', 'Execução de contrato (art. 7º, V)'],
              ['Dados operacionais inseridos (estoque, pedidos, vendas, CMV, RH)', 'Prestação do serviço de gestão e geração de relatórios analíticos', 'Execução de contrato (art. 7º, V)'],
              ['Dados de acesso e logs de uso', 'Segurança, auditoria, prevenção a fraudes e melhoria do produto', 'Legítimo interesse (art. 7º, IX)'],
              ['Preferências de uso e configurações', 'Personalização da experiência na plataforma', 'Consentimento (art. 7º, I)'],
            ]} />
          </SubSection>

          {/* Mentorados */}
          <SubSection title="2.2 Mentorados">
            <div className="mb-3">
              <Audience label="Mentorados" color="text-purple-700 bg-purple-50 border-purple-200" />
            </div>
            <p className={p}>Clientes que contratam pacotes de mentoria ou especialista sob demanda.</p>
            <DataTable rows={[
              ['Nome, e-mail e WhatsApp', 'Agendamento de sessões, comunicação e suporte', 'Execução de contrato (art. 7º, V)'],
              ['Dados da operação compartilhados nas sessões (DRE, estoque, cardápio, equipe)', 'Diagnóstico, plano de ação e acompanhamento pelo mentor', 'Execução de contrato (art. 7º, V)'],
              ['Gravações de sessões (quando consentidas)', 'Registro para uso exclusivo do Mentorado e do Mentor', 'Consentimento (art. 7º, I)'],
              ['Avaliações e feedbacks sobre o mentor', 'Melhoria da qualidade da rede e seleção de mentores', 'Legítimo interesse (art. 7º, IX)'],
              ['Histórico de sessões e planos de ação', 'Continuidade do acompanhamento e evolução das metas', 'Execução de contrato (art. 7º, V)'],
            ]} />
            <p className="text-xs text-[#9C958A] mt-2">Os dados compartilhados nas sessões de mentoria são tratados com sigilo absoluto e não são utilizados para fins de marketing, análise de mercado ou compartilhados com terceiros sem consentimento.</p>
          </SubSection>

          {/* Mentores */}
          <SubSection title="2.3 Mentores e Consultores">
            <div className="mb-3">
              <Audience label="Mentores" color="text-emerald-700 bg-emerald-50 border-emerald-200" />
            </div>
            <p className={p}>Profissionais que integram a rede Granular para prestar sessões de mentoria.</p>
            <DataTable rows={[
              ['Nome completo, e-mail e telefone', 'Cadastro, comunicação e gestão do perfil na plataforma', 'Execução de contrato (art. 7º, V)'],
              ['CPF/CNPJ e dados bancários', 'Processamento de pagamentos e obrigações fiscais', 'Execução de contrato + obrigação legal'],
              ['LinkedIn e histórico profissional', 'Avaliação de senioridade e criação do perfil público', 'Execução de contrato (art. 7º, V)'],
              ['Especialidades, segmentos e valor/hora', 'Matching com Mentorados e exibição no catálogo', 'Execução de contrato (art. 7º, V)'],
              ['Avaliações recebidas por Mentorados', 'Qualidade, ranking e continuidade na rede', 'Legítimo interesse (art. 7º, IX)'],
              ['Registros de sessões realizadas', 'Gestão financeira, relatórios de performance e conformidade', 'Execução de contrato (art. 7º, V)'],
            ]} />
          </SubSection>

          {/* Parceiros */}
          <SubSection title="2.4 Parceiros Tecnológicos">
            <div className="mb-3">
              <Audience label="Parceiros" color="text-orange-700 bg-orange-50 border-orange-200" />
            </div>
            <p className={p}>Empresas integradas ao ecossistema Granular (ex: Saipos, Omie, Foozi, Open Delivery, iFood).</p>
            <DataTable rows={[
              ['Dados da empresa e representante legal', 'Formalização do acordo de parceria e comunicações contratuais', 'Execução de contrato (art. 7º, V)'],
              ['Dados técnicos da integração (tokens, webhooks, logs)', 'Funcionamento, monitoramento e depuração da integração', 'Execução de contrato (art. 7º, V)'],
              ['Volume de transações e métricas de uso', 'Relatórios de desempenho da parceria e faturamento', 'Execução de contrato (art. 7º, V)'],
            ]} />
          </SubSection>
        </Section>

        {/* Compartilhamento */}
        <Section title="3. Compartilhamento de Dados">
          <p className={p}>A Granular não vende dados pessoais. O compartilhamento ocorre apenas nos seguintes casos:</p>
          <ul className="space-y-2 list-disc pl-5 mb-3">
            {[
              'Parceiros de infraestrutura e processamento (AWS, servidores de e-mail, gateways de pagamento) — sob contratos de confidencialidade e adequação à LGPD.',
              'Integrações tecnológicas ativadas pelo próprio usuário (iFood, Saipos, Omie, Foozi) — apenas os dados necessários para o funcionamento da integração.',
              'Autoridades governamentais e judiciais — quando exigido por lei, decisão judicial ou regulamentação aplicável.',
              'Mentores da rede — apenas dados do Mentorado que contratou o serviço, estritamente necessários para a prestação da mentoria.',
              'Empresas de auditoria ou assessoria jurídica — quando necessário para proteção dos direitos da Granular.',
            ].map((item) => <li key={item} className="text-sm text-[#4B4B4B] leading-relaxed">{item}</li>)}
          </ul>
          <p className={p}>Em todos os casos de compartilhamento com terceiros, exigimos contratualmente o mesmo nível de proteção de dados que aplicamos internamente.</p>
        </Section>

        {/* Retenção */}
        <Section title="4. Retenção e Exclusão de Dados">
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse mb-4">
              <thead>
                <tr className="bg-[#F7F7F7]">
                  <th className="text-left text-xs font-semibold text-[#9C958A] uppercase tracking-wider px-3 py-2 border border-[#0E0E0F]/10">Tipo de Dado</th>
                  <th className="text-left text-xs font-semibold text-[#9C958A] uppercase tracking-wider px-3 py-2 border border-[#0E0E0F]/10">Prazo de Retenção</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Dados cadastrais de conta ativa', 'Enquanto a conta estiver ativa'],
                  ['Dados cadastrais após encerramento', '5 anos (prazo prescricional e fiscal)'],
                  ['Dados operacionais do sistema', '2 anos após cancelamento'],
                  ['Registros de sessões de mentoria', '2 anos após encerramento do contrato'],
                  ['Dados financeiros e notas fiscais', '10 anos (obrigação legal — Código Civil e legislação fiscal)'],
                  ['Logs de acesso e segurança', '6 meses'],
                  ['Dados de candidatura a Mentor (não aprovados)', '1 ano'],
                ].map(([tipo, prazo], i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F7F7F7]/50'}>
                    <td className="px-3 py-2 border border-[#0E0E0F]/10 text-[#0E0E0F]">{tipo}</td>
                    <td className="px-3 py-2 border border-[#0E0E0F]/10 text-[#4B4B4B]">{prazo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={p}>Após os prazos de retenção, os dados são excluídos ou anonimizados de forma irreversível, sem possibilidade de recuperação.</p>
        </Section>

        {/* Direitos */}
        <Section title="5. Seus Direitos como Titular (LGPD)">
          <p className={p}>Nos termos da LGPD (art. 18), você tem os seguintes direitos em relação aos seus dados pessoais:</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              ['Confirmação e Acesso', 'Confirmar se tratamos seus dados e obter cópia deles.'],
              ['Correção', 'Solicitar a correção de dados incompletos, inexatos ou desatualizados.'],
              ['Anonimização ou Exclusão', 'Solicitar a anonimização ou exclusão de dados desnecessários ou excessivos.'],
              ['Portabilidade', 'Receber seus dados em formato estruturado para transferência a outro fornecedor.'],
              ['Revogação do Consentimento', 'Retirar consentimento a qualquer momento, sem prejuízo dos tratamentos anteriores.'],
              ['Oposição', 'Opor-se a tratamentos realizados com base em legítimo interesse.'],
              ['Informação sobre Compartilhamento', 'Saber com quais entidades compartilhamos seus dados.'],
              ['Revisão de Decisões Automatizadas', 'Solicitar revisão de decisões tomadas exclusivamente por meios automatizados.'],
            ].map(([right, desc]) => (
              <div key={right as string} className="bg-white rounded-xl border border-[#0E0E0F]/10 p-3">
                <p className="text-xs font-bold text-[#0E0E0F] mb-1">{right}</p>
                <p className="text-xs text-[#9C958A] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="bg-[#A31631]/5 border border-[#A31631]/20 rounded-xl p-4 text-sm text-[#0E0E0F]">
            Para exercer qualquer um desses direitos, envie sua solicitação para <a href="mailto:privacidade@grupogranular.com.br" className="text-[#A31631] hover:underline font-medium">privacidade@grupogranular.com.br</a>. Responderemos em até 15 dias úteis.
          </div>
        </Section>

        {/* Segurança */}
        <Section title="6. Segurança dos Dados">
          <p className={p}>Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, perda, alteração ou divulgação indevida, incluindo:</p>
          <ul className="space-y-1.5 list-disc pl-5 mb-3">
            {[
              'Criptografia em trânsito (TLS/HTTPS) e em repouso para dados sensíveis.',
              'Controle de acesso baseado em funções (RBAC) — apenas colaboradores autorizados têm acesso aos dados.',
              'Monitoramento contínuo de segurança e detecção de anomalias.',
              'Backups regulares com redundância geográfica.',
              'Processo formal de resposta a incidentes de segurança.',
              'Treinamentos periódicos da equipe sobre proteção de dados.',
            ].map((item) => <li key={item} className={li}>{item}</li>)}
          </ul>
          <p className={p}>Em caso de incidente de segurança que possa causar risco ou dano relevante aos titulares, a Granular notificará a Autoridade Nacional de Proteção de Dados (ANPD) e os titulares afetados conforme exigências da LGPD.</p>
        </Section>

        {/* Transferência internacional */}
        <Section title="7. Transferência Internacional de Dados">
          <p className={p}>Os dados podem ser processados por servidores localizados fora do Brasil (ex: AWS em regiões internacionais). Nesses casos, adotamos mecanismos de transferência adequados, incluindo cláusulas contratuais padrão e avaliação de adequação do país receptor, conforme exigências da LGPD e orientações da ANPD.</p>
        </Section>

        {/* Menores */}
        <Section title="8. Crianças e Adolescentes">
          <p className={p}>A plataforma Granular é destinada exclusivamente a pessoas jurídicas e pessoas físicas maiores de 18 anos. Não coletamos intencionalmente dados de menores de idade. Caso identifiquemos tal coleta inadvertida, os dados serão imediatamente excluídos.</p>
        </Section>

        {/* Cookies */}
        <Section title="9. Cookies">
          <p className={p}>Utilizamos cookies e tecnologias similares para funcionamento da plataforma e melhoria da experiência. Consulte nossa <Link to="/cookies" className="text-[#A31631] hover:underline font-medium">Política de Cookies</Link> para informações detalhadas e opções de gerenciamento.</p>
        </Section>

        {/* Atualizações */}
        <Section title="10. Atualizações desta Política">
          <p className={p}>Esta Política pode ser atualizada periodicamente para refletir mudanças legais, tecnológicas ou em nossos serviços. Notificaremos os titulares sobre alterações relevantes por e-mail ou aviso na plataforma. Recomendamos revisão periódica desta página.</p>
        </Section>

        <div className="border-t border-[#0E0E0F]/8 pt-8 flex flex-wrap gap-4 text-xs text-[#9C958A]">
          <Link to="/" className="hover:text-[#0E0E0F] transition-colors">← Voltar ao site</Link>
          <Link to="/termos" className="hover:text-[#0E0E0F] transition-colors">Termos de Uso</Link>
          <Link to="/cookies" className="hover:text-[#0E0E0F] transition-colors">Política de Cookies</Link>
        </div>
      </div>
    </div>
  )
}
