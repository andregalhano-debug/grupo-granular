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

const p = "text-sm text-[#4B4B4B] leading-relaxed mb-3"
const li = "text-sm text-[#4B4B4B] leading-relaxed"

export function TermosPage() {
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
            <Link to="/privacidade" className="hover:text-[#0E0E0F] transition-colors">Privacidade</Link>
            <Link to="/cookies" className="hover:text-[#0E0E0F] transition-colors">Cookies</Link>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="mb-10">
          <p className="text-xs font-semibold text-[#A31631] uppercase tracking-widest mb-2" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Termos de Uso
          </p>
          <h1 className="text-3xl font-bold text-[#0E0E0F] mb-3">Termos e Condições de Uso</h1>
          <p className={p}>Última atualização: 13 de junho de 2026. Vigência imediata.</p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 leading-relaxed">
            Ao utilizar qualquer serviço do Grupo Granular — sistema, mentoria ou rede de consultores — você declara ter lido, compreendido e concordado com estes Termos. Caso não concorde, interrompa imediatamente o uso da plataforma.
          </div>
        </div>

        {/* Definições */}
        <Section title="1. Definições">
          <p className={p}>Para fins destes Termos, os termos a seguir terão os significados indicados:</p>
          <ul className="space-y-2 list-none pl-0">
            {[
              ['Granular / Plataforma', 'Grupo Granular Tecnologia Ltda., responsável pelo sistema SaaS de gestão operacional e pela rede de mentores e consultores.'],
              ['Usuário do Sistema', 'Pessoa jurídica ou física que contrata os Módulos 1, 2 e/ou 3 do sistema Granular para gestão operacional de seu estabelecimento.'],
              ['Mentorado', 'Pessoa jurídica ou física que contrata pacotes de mentoria ou especialista sob demanda para acompanhamento estratégico de sua operação.'],
              ['Mentor / Consultor', 'Profissional aceito na rede Granular para prestar sessões de orientação especializada a Mentorados.'],
              ['Parceiro', 'Empresa ou pessoa física que integra o ecossistema Granular por meio de acordo comercial específico, incluindo integrações tecnológicas.'],
              ['Conta', 'Credencial de acesso individual criada para cada perfil de usuário na plataforma.'],
            ].map(([term, def]) => (
              <li key={term as string} className="flex gap-3 text-sm text-[#4B4B4B] leading-relaxed">
                <span className="font-semibold text-[#0E0E0F] min-w-[180px] flex-shrink-0">{term}</span>
                <span>{def}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Usuários do Sistema */}
        <Section title="2. Usuários do Sistema">
          <div className="mb-4">
            <Audience label="Usuários do Sistema" color="text-blue-700 bg-blue-50 border-blue-200" />
          </div>

          <SubSection title="2.1 Acesso e Contratação">
            <p className={p}>O acesso ao sistema Granular é condicionado à assinatura de um dos planos disponíveis (Módulo 1, Módulo 2 ou Módulo 3), conforme tabela de preços vigente no site. A contratação é realizada exclusivamente por pessoas com capacidade legal e, quando pessoa jurídica, pelo representante legalmente habilitado.</p>
          </SubSection>

          <SubSection title="2.2 Obrigações do Usuário">
            <ul className="space-y-1.5 list-disc pl-5">
              {[
                'Fornecer dados cadastrais verdadeiros, atualizados e completos.',
                'Manter sigilo sobre suas credenciais de acesso, sendo integralmente responsável por acessos realizados com sua conta.',
                'Utilizar a plataforma exclusivamente para fins lícitos e legítimos.',
                'Não realizar engenharia reversa, cópia, reprodução ou redistribuição do software.',
                'Manter suas obrigações fiscais em dia para emissão de notas fiscais relativas à prestação de serviços.',
                'Notificar imediatamente a Granular em caso de uso não autorizado de sua conta.',
              ].map((item) => <li key={item} className={li}>{item}</li>)}
            </ul>
          </SubSection>

          <SubSection title="2.3 Pagamento e Cobrança">
            <p className={p}>A cobrança é realizada mensalmente via cartão de crédito ou Pix. O não pagamento por mais de 7 (sete) dias corridos implica suspensão automática do acesso. Após 30 (trinta) dias em inadimplência, a conta poderá ser encerrada e os dados excluídos conforme política de retenção.</p>
            <p className={p}>Os preços podem ser reajustados com aviso prévio de 30 (trinta) dias. O usuário que não concordar com o reajuste poderá cancelar o plano sem multa durante o período de aviso.</p>
          </SubSection>

          <SubSection title="2.4 Cancelamento">
            <p className={p}>O cancelamento pode ser solicitado a qualquer momento via e-mail para <strong>contato@grupogranular.com.br</strong>. O acesso permanece ativo até o fim do ciclo de cobrança já pago. Não há reembolso proporcional de valores pagos, exceto em casos de falha técnica grave comprovada imputável à Granular.</p>
          </SubSection>

          <SubSection title="2.5 Disponibilidade do Sistema">
            <p className={p}>A Granular se compromete a manter o sistema disponível 99% do tempo mensal, excluídas janelas de manutenção programada comunicadas com antecedência mínima de 24 horas. Eventuais interrupções não programadas não configuram direito a reembolso, mas serão comunicadas e registradas.</p>
          </SubSection>
        </Section>

        {/* Mentorados */}
        <Section title="3. Mentorados">
          <div className="mb-4">
            <Audience label="Mentorados" color="text-purple-700 bg-purple-50 border-purple-200" />
          </div>

          <SubSection title="3.1 Contratação de Mentoria">
            <p className={p}>Os pacotes de mentoria (1, 3 ou 6 meses) e o serviço de Especialista sob demanda são contratados individualmente e compreendem um número fixo de horas mensais com profissional designado pela Granular, além de diagnóstico inicial, plano de ação e relatórios periódicos.</p>
          </SubSection>

          <SubSection title="3.2 Agendamento e Sessões">
            <ul className="space-y-1.5 list-disc pl-5">
              {[
                'As sessões devem ser agendadas com antecedência mínima de 48 horas pela plataforma.',
                'Cancelamentos ou reagendamentos devem ser feitos com pelo menos 24 horas de antecedência para não configurar sessão consumida.',
                'Cancelamentos com menos de 24 horas implicam desconto da sessão da cota mensal, salvo caso fortuito ou força maior devidamente comprovado.',
                'As horas mensais não utilizadas não são acumuladas para o mês seguinte, exceto mediante autorização expressa do mentor responsável.',
              ].map((item) => <li key={item} className={li}>{item}</li>)}
            </ul>
          </SubSection>

          <SubSection title="3.3 Confidencialidade">
            <p className={p}>Toda informação compartilhada pelo Mentorado durante as sessões é tratada como confidencial pela Granular e pelo Mentor. A Granular não compartilha dados operacionais, financeiros ou estratégicos do Mentorado com terceiros, exceto quando exigido por lei ou ordem judicial.</p>
            <p className={p}>O Mentorado, por sua vez, compromete-se a não reproduzir ou distribuir metodologias, frameworks e materiais produzidos durante a mentoria sem autorização expressa da Granular.</p>
          </SubSection>

          <SubSection title="3.4 Resultados">
            <p className={p}>A Granular e seus Mentores não garantem resultados financeiros específicos. O impacto da mentoria depende da implementação das orientações pelo Mentorado, das condições de mercado e de fatores externos não controláveis. Os casos de referência divulgados representam experiências reais, mas não devem ser interpretados como promessa de desempenho futuro.</p>
          </SubSection>

          <SubSection title="3.5 Cancelamento de Mentoria">
            <p className={p}>Pacotes de mentoria têm compromisso durante a vigência contratada. O cancelamento antecipado está sujeito à cobrança proporcional das horas e serviços já prestados. Após o encerramento, o sistema incluso no pacote pode ser mantido mediante assinatura individual.</p>
          </SubSection>
        </Section>

        {/* Mentores e Parceiros */}
        <Section title="4. Mentores e Parceiros">
          <div className="mb-4">
            <Audience label="Mentores" color="text-emerald-700 bg-emerald-50 border-emerald-200" />
            <Audience label="Parceiros" color="text-orange-700 bg-orange-50 border-orange-200" />
          </div>

          <SubSection title="4.1 Ingresso na Rede">
            <p className={p}>A participação como Mentor Granular está sujeita a processo seletivo que inclui análise de currículo, histórico profissional, entrevista e avaliação de senioridade. A Granular reserva-se o direito de aceitar ou recusar candidaturas sem obrigação de justificativa.</p>
            <p className={p}>A aceitação não configura vínculo empregatício. O Mentor atua como prestador de serviços autônomo ou por meio de pessoa jurídica própria, sendo integralmente responsável por suas obrigações fiscais, previdenciárias e trabalhistas.</p>
          </SubSection>

          <SubSection title="4.2 Conduta e Qualidade">
            <ul className="space-y-1.5 list-disc pl-5">
              {[
                'Comparecer às sessões agendadas com pontualidade e preparo adequado.',
                'Manter confidencialidade sobre os dados e estratégias dos Mentorados.',
                'Não captar diretamente clientes da Granular para prestação de serviços fora da plataforma durante a vigência e por 12 meses após o desligamento.',
                'Comunicar qualquer conflito de interesses antes de assumir um Mentorado.',
                'Manter conduta ética, respeitosa e profissional em todas as interações.',
                'Cumprir as avaliações mínimas de qualidade exigidas pela Granular.',
              ].map((item) => <li key={item} className={li}>{item}</li>)}
            </ul>
          </SubSection>

          <SubSection title="4.3 Remuneração">
            <p className={p}>As condições de remuneração são definidas individualmente no contrato firmado com cada Mentor, observando a tabela de faixas por senioridade vigente. Pagamentos são realizados mensalmente, condicionados à confirmação das sessões pelo Mentorado e emissão de nota fiscal pelo Mentor.</p>
          </SubSection>

          <SubSection title="4.4 Propriedade Intelectual">
            <p className={p}>Metodologias, templates, frameworks e materiais produzidos em colaboração com a Granular durante a vigência do contrato são de propriedade conjunta. O Mentor mantém propriedade sobre seu conhecimento e experiência prévia, não passível de restrição por estes Termos.</p>
          </SubSection>

          <SubSection title="4.5 Parceiros Tecnológicos">
            <p className={p}>Empresas parceiras que integram seu sistema ao ecossistema Granular (ex.: Saipos, Omie, Foozi, Open Delivery) devem celebrar acordo de parceria específico. A integração não confere direito de uso da marca Granular sem autorização formal, nem cria solidariedade em obrigações perante usuários finais.</p>
          </SubSection>
        </Section>

        {/* Propriedade Intelectual */}
        <Section title="5. Propriedade Intelectual">
          <p className={p}>Todo o conteúdo da plataforma Granular — incluindo software, código-fonte, interfaces, textos, logotipos, metodologias, relatórios gerados pela IA e demais elementos — é protegido por direitos autorais e demais direitos de propriedade intelectual titularizados pela Granular ou por terceiros licenciantes.</p>
          <p className={p}>É vedado ao usuário, mentorado, mentor ou parceiro reproduzir, adaptar, distribuir, sublicenciar ou criar obras derivadas sem autorização prévia e escrita da Granular.</p>
        </Section>

        {/* Limitação de Responsabilidade */}
        <Section title="6. Limitação de Responsabilidade">
          <p className={p}>A Granular não será responsável por:</p>
          <ul className="space-y-1.5 list-disc pl-5 mb-3">
            {[
              'Decisões de negócio tomadas com base em informações geradas pelo sistema ou por mentores.',
              'Danos indiretos, lucros cessantes ou perda de oportunidade resultantes do uso ou impossibilidade de uso da plataforma.',
              'Falhas em sistemas de terceiros integrados à plataforma (iFood, operadoras de pagamento, etc.).',
              'Interrupções decorrentes de força maior, ataques cibernéticos ou falhas de infraestrutura de terceiros.',
              'Dados incorretos inseridos pelo próprio usuário ou por integrações de terceiros.',
            ].map((item) => <li key={item} className={li}>{item}</li>)}
          </ul>
          <p className={p}>Em qualquer hipótese, a responsabilidade total da Granular perante um usuário estará limitada ao valor pago nos últimos 3 (três) meses de contratação.</p>
        </Section>

        {/* Privacidade */}
        <Section title="7. Privacidade e Dados Pessoais">
          <p className={p}>O tratamento de dados pessoais realizado pela Granular obedece à Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018) e está detalhado na nossa <Link to="/privacidade" className="text-[#A31631] hover:underline font-medium">Política de Privacidade</Link>.</p>
        </Section>

        {/* Modificações */}
        <Section title="8. Modificações dos Termos">
          <p className={p}>A Granular pode atualizar estes Termos a qualquer momento, comunicando as alterações por e-mail cadastrado e/ou aviso na plataforma com antecedência mínima de 15 (quinze) dias. O uso continuado após o prazo de aviso implica aceitação das novas condições. Caso não concorde, você poderá encerrar sua conta sem ônus adicionais durante o período de aviso.</p>
        </Section>

        {/* Legislação */}
        <Section title="9. Legislação e Foro">
          <p className={p}>Estes Termos são regidos pelas leis da República Federativa do Brasil. As partes elegem o Foro da Comarca de São Paulo/SP como competente para dirimir quaisquer controvérsias, com renúncia expressa a qualquer outro, por mais privilegiado que seja.</p>
        </Section>

        {/* Contato */}
        <Section title="10. Contato">
          <p className={p}>Dúvidas sobre estes Termos devem ser encaminhadas para:</p>
          <div className="bg-white rounded-xl border border-[#0E0E0F]/10 p-4 text-sm text-[#0E0E0F] space-y-1">
            <p><strong>Grupo Granular Tecnologia</strong></p>
            <p>E-mail: <a href="mailto:contato@grupogranular.com.br" className="text-[#A31631] hover:underline">contato@grupogranular.com.br</a></p>
            <p>Cidade: São Paulo, SP — Brasil</p>
            <p>Site: <a href="https://www.grupogranular.com.br" className="text-[#A31631] hover:underline">www.grupogranular.com.br</a></p>
          </div>
        </Section>

        <div className="border-t border-[#0E0E0F]/8 pt-8 flex flex-wrap gap-4 text-xs text-[#9C958A]">
          <Link to="/" className="hover:text-[#0E0E0F] transition-colors">← Voltar ao site</Link>
          <Link to="/privacidade" className="hover:text-[#0E0E0F] transition-colors">Política de Privacidade</Link>
          <Link to="/cookies" className="hover:text-[#0E0E0F] transition-colors">Política de Cookies</Link>
        </div>
      </div>
    </div>
  )
}
