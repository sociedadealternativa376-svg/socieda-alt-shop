import { MapPin, Phone, Mail, Instagram, Clock } from 'lucide-react';
import logo from '@/assets/logo.png';

const Footer = () => {
  return (
    <footer id="contato" className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Sociedade Alternativa" className="h-12 w-12" />
              <span className="text-xl font-display gradient-text">
                SOCIEDADE ALTERNATIVA
              </span>
            </div>
            <p className="text-muted-foreground">
              Expressão através da arte corporal desde 2015. Qualidade e segurança em cada trabalho.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-6">CONTATO</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Rua das Artes, 123 - Centro</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-5 w-5 text-primary" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-5 w-5 text-primary" />
                <span>contato@sociedadealternativa.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-6">HORÁRIO</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p>Segunda a Sexta</p>
                  <p className="text-foreground">10h - 20h</p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p>Sábado</p>
                  <p className="text-foreground">10h - 18h</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-xl text-foreground mb-6">REDES SOCIAIS</h4>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-6 text-muted-foreground text-sm">
              Siga-nos para novidades, promoções e inspirações
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Sociedade Alternativa. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
