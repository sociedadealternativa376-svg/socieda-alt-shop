import { MapPin, Phone, Instagram, Clock, ArrowUpRight, Heart } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer id="contato" className="relative bg-card border-t border-border overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-warm-red/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <img src={logo} alt="Sociedade Alternativa" className="relative h-14 w-14 transition-transform group-hover:rotate-6" />
              </div>
              <span className="text-xl font-display gradient-text">
                SOCIEDADE ALTERNATIVA
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Expressão através da arte corporal desde 2015. Qualidade e segurança em cada trabalho.
            </p>
            
            {/* Social */}
            <div className="mt-6">
              <a 
                href="https://instagram.com/lojasociedadealternativa" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ripple inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-medium text-sm hover:scale-105 transition-transform"
              >
                <Instagram className="h-4 w-4" />
                @lojasociedadealternativa
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-primary to-warm-red rounded-full" />
              CONTATO
            </h4>
            <ul className="space-y-4">
              <li>
                <div className="flex items-start gap-3 text-muted-foreground group">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">Mauá Plaza Shopping</p>
                    <p className="text-sm">Mauá, São Paulo</p>
                  </div>
                </div>
              </li>
              <li>
                <a 
                  href="https://wa.me/5511952222008?text=Olá! Vim pelo site e gostaria de mais informações."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">(11) 95222-2008</p>
                    <p className="text-sm">WhatsApp disponível</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-primary to-warm-red rounded-full" />
              HORÁRIO
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground">Segunda a Sexta</p>
                  <p className="text-foreground font-medium">10h - 20h</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground">Sábado</p>
                  <p className="text-foreground font-medium">10h - 18h</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-gradient-to-r from-primary to-warm-red rounded-full" />
              NOVIDADES
            </h4>
            <p className="text-muted-foreground mb-4">
              Siga-nos para novidades, promoções exclusivas e inspirações
            </p>
            <a 
              href="https://wa.me/5511952222008?text=Olá! Quero receber novidades da loja!"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient btn-ripple inline-flex items-center gap-2 px-6 py-3 rounded-full text-primary-foreground font-medium text-sm"
            >
              Receber Novidades
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              © 2024 Sociedade Alternativa. Feito com <Heart className="h-3 w-3 text-warm-red fill-warm-red" /> no Brasil
            </p>
            <p className="text-muted-foreground/60 text-xs">
              Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
