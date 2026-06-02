import { GranularLogo } from './GranularLogo'

export function Footer() {
  return (
    <footer className="bg-[#FAF7F0] border-t border-[#EAE5D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo */}
          <div>
            <a href="#" className="flex items-center gap-3 mb-4">
              <GranularLogo size={36} color="#0E0E0F" />
              <span className="text-lg font-semibold tracking-tight text-[#0E0E0F]">
                Granular
              </span>
            </a>
            <p className="text-sm text-[#9C958A] leading-relaxed">
              Consultoria e gestão em delivery, potencializadas por IA.
            </p>
          </div>

          {/* Produto */}
          <div>
            <h4 className="font-semibold text-sm text-[#0E0E0F] mb-4 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>Produto</h4>
            <ul className="space-y-2.5">
              {['Estoque', 'Produção', 'Financeiro', 'iFood', 'KDS', 'Checklists', 'IA'].map((item) => (
                <li key={item}>
                  <a href="#modulos" className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-semibold text-sm text-[#0E0E0F] mb-4 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>Empresa</h4>
            <ul className="space-y-2.5">
              {['Sobre', 'Blog', 'Carreiras', 'Contato'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#9C958A] hover:text-[#0E0E0F] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-sm text-[#0E0E0F] mb-4 tracking-widest uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px' }}>Contato</h4>
            <ul className="space-y-2.5 text-sm text-[#9C958A]">
              <li>contato@grupogranular.com.br</li>
              <li>São Paulo, SP</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#EAE5D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#9C958A]">
            © 2026 Granular. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[#9C958A] hover:text-[#0E0E0F] transition-colors">Termos de Uso</a>
            <a href="#" className="text-xs text-[#9C958A] hover:text-[#0E0E0F] transition-colors">Privacidade</a>
            <a href="#" className="text-xs text-[#9C958A] hover:text-[#0E0E0F] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
