export function Footer() {
  return (
    <footer className="bg-white border-t border-[#e5e5e3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo */}
          <div>
            <a href="#" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#4D1520] flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <span className="text-lg font-semibold tracking-tight">
                Maestro<span className="text-[#4D1520]">Food</span>
              </span>
            </a>
            <p className="text-sm text-[#666] leading-relaxed">
              Gestão inteligente para dark kitchens e redes de alimentação.
            </p>
          </div>

          {/* Produto */}
          <div>
            <h4 className="font-semibold text-sm text-[#212121] mb-4">Produto</h4>
            <ul className="space-y-2.5">
              {['Estoque', 'Produção', 'Financeiro', 'iFood', 'KDS', 'Checklists', 'IA'].map((item) => (
                <li key={item}>
                  <a href="#modulos" className="text-sm text-[#666] hover:text-[#212121] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-semibold text-sm text-[#212121] mb-4">Empresa</h4>
            <ul className="space-y-2.5">
              {['Sobre', 'Blog', 'Carreiras', 'Contato'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#666] hover:text-[#212121] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-sm text-[#212121] mb-4">Contato</h4>
            <ul className="space-y-2.5 text-sm text-[#666]">
              <li>contato@maestrofood.com.br</li>
              <li>(31) 99999-0000</li>
              <li>Belo Horizonte, MG</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#e5e5e3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#999]">
            © 2024 MaestroFood. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[#999] hover:text-[#666] transition-colors">Termos de Uso</a>
            <a href="#" className="text-xs text-[#999] hover:text-[#666] transition-colors">Privacidade</a>
            <a href="#" className="text-xs text-[#999] hover:text-[#666] transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
