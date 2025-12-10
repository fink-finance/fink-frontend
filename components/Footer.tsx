import Image from 'next/image';
import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaGoogle,
  FaTwitter,
  FaLinkedinIn,
} from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#E7EBEE] border-t border-border">
      <div className="w-full max-w-[1440px] mx-auto px-6 py-10 flex flex-col justify-center items-start gap-10">
        {/* Grid principal - responsivo */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Coluna 1: Logo e Stores */}
          <div className="flex flex-col gap-4">
            <Image
              src="/images/footer/dinheiro-mais-simples.svg"
              width={160}
              height={64}
              alt="Dinheiro ficou simples"
            />
            <div className="flex flex-col gap-3">
              <Link
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-foreground rounded-md px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors w-fit"
              >
                <Image
                  src="/images/footer/apple-logo.svg"
                  alt="Apple"
                  width={22}
                  height={22}
                />
                <div className="text-left">
                  <div className="text-[10px] leading-tight">
                    Download on the
                  </div>
                  <div className="text-sm font-semibold leading-tight">
                    App Store
                  </div>
                </div>
              </Link>
              <Link
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-foreground rounded-md px-4 py-2.5 flex items-center gap-3 hover:bg-gray-50 transition-colors w-fit"
              >
                <Image
                  src="/images/footer/google-play-logo.svg"
                  alt="Google Play"
                  width={22}
                  height={22}
                />
                <div className="text-left">
                  <div className="text-[10px] leading-tight">GET IT ON</div>
                  <div className="text-sm font-semibold leading-tight">
                    Google Play
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Coluna 2: Endereço, Contato e Ajuda */}
          <div className="flex flex-col gap-3">
            <FooterSection title="Endereço">
              <address className="not-italic text-base text-foreground leading-relaxed">
                <p>Avenida Cais do Apolo, 463</p>
                <p>Bairro do Recife</p>
                <p>Recife, PE</p>
                <p>CEP: 50030-230</p>
              </address>
            </FooterSection>

            <FooterSection title="Contato">
              <div className="text-base space-y-1">
                <a
                  href="tel:+5581989595085"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <Image
                    src="/images/footer/telephone.svg"
                    alt="Telefone"
                    width={14}
                    height={14}
                  />
                  <span>+55 81 98959-5085</span>
                </a>
                <a
                  href="mailto:contato@finkfinanças.com.br"
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                >
                  <Image
                    src="/images/footer/envelope.svg"
                    alt="Email"
                    width={14}
                    height={14}
                  />
                  <span>contato@finkfinanças.com.br</span>
                </a>
              </div>
            </FooterSection>

            <FooterSection title="Ajuda">
              <ul className="text-base space-y-1">
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-primary transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/seguranca"
                    className="hover:text-primary transition-colors"
                  >
                    Segurança
                  </Link>
                </li>
              </ul>
            </FooterSection>
          </div>

          {/* Coluna 3: Explore */}
          <FooterSection title="Explore">
            <ul className="text-base space-y-1">
              {[
                { href: '/categorias', label: 'Categorias' },
                { href: '/movimentacoes', label: 'Movimentações' },
                { href: '/home', label: 'Espaço Finker' },
                { href: '/metas', label: 'Metas' },
                { href: '/academy', label: 'Academy' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Coluna 4: Valores */}
          <FooterSection title="Valores">
            <ul className="text-base space-y-1">
              {[
                'Facilidade',
                'Responsabilidade',
                'Flexibilidade',
                'Agilidade',
                'Transparência',
              ].map((valor) => (
                <li key={valor}>{valor}</li>
              ))}
            </ul>
          </FooterSection>

          {/* Coluna 5: Sobre nós + Newsletter */}
          <div className="flex flex-col gap-3">
            <FooterSection title="Sobre nós">
              <ul className="text-base space-y-1">
                {[
                  { href: '/sobre', label: 'O que somos' },
                  { href: '/processo', label: 'Processo' },
                  { href: '/pesquisas', label: 'Pesquisas' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterSection>

            <FooterSection title="Receba nossas novidades">
              <form className="flex gap-2">
                <div className="flex-1 relative">
                  <Image
                    src="/images/footer/envelope.svg"
                    alt="Email"
                    width={18}
                    height={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                  />
                  <input
                    type="email"
                    placeholder="E-mail"
                    className="w-full pl-10 pr-3 py-2.5 border border-border rounded-md text-base focus:outline-none focus:ring-1 focus:ring-ring bg-white"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-white border border-border rounded-md text-base font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
                >
                  Enviar
                </button>
              </form>
            </FooterSection>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="w-full flex justify-center items-center gap-3 pt-6 border-t border-border">
          {[
            { Icon: FaFacebookF, href: 'https://facebook.com/finkfinancas' },
            { Icon: FaInstagram, href: 'https://instagram.com/finkfinancas' },
            { Icon: FaGoogle, href: 'https://google.com' },
            { Icon: FaTwitter, href: 'https://twitter.com/finkfinancas' },
            {
              Icon: FaLinkedinIn,
              href: 'https://linkedin.com/company/finkfinancas',
            },
          ].map(({ Icon, href }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border-2 border-primary flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
            >
              <Icon size={16} />
            </Link>
          ))}
        </div>

        {/* Bottom Links */}
        <div className="w-full pt-5 text-center">
          <div className="flex flex-wrap justify-center items-center gap-2 text-sm text-muted mb-2">
            {[
              { href: '/termos', label: 'Termos do Website' },
              { href: '/privacidade', label: 'Política de Privacidade' },
              {
                href: '/acessibilidade',
                label: 'Declaração de Acessibilidade',
              },
              { href: '/conduta', label: 'Código de Conduta do Cliente' },
            ].map((item, index) => (
              <span key={item.href} className="flex items-center gap-2">
                <Link
                  href={item.href}
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
                {index < 3 && <span>|</span>}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted">
            © 2025 FINK – Instituição de Educação e Planejamento Financeiro
          </p>
        </div>
      </div>
    </footer>
  );
};

// Componente auxiliar para seções do footer
function FooterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-bold text-foreground text-lg mb-2">{title}</h3>
      {children}
    </div>
  );
}
