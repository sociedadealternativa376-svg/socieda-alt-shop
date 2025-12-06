import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import logo from '@/assets/logo.png';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Cart from './Cart';

const Header = () => {
  const { itemCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <img 
              src={logo} 
              alt="Sociedade Alternativa" 
              className="h-14 w-14 object-contain transition-transform group-hover:scale-110"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-display tracking-wider gradient-text">
                SOCIEDADE ALTERNATIVA
              </h1>
              <p className="text-xs text-muted-foreground tracking-widest">
                PIERCINGS • TATTOOS • JOIAS
              </p>
            </div>
          </a>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="/" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Início
            </a>
            <a href="/#produtos" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Produtos
            </a>
            <a href="/agendamento" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Agendar
            </a>
            <a href="/#sobre" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Sobre
            </a>
            <a href="/#contato" className="text-foreground/80 hover:text-primary transition-colors font-medium">
              Contato
            </a>
          </nav>

          {/* Cart & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <button className="relative p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors hover-glow">
                  <ShoppingCart className="h-6 w-6 text-foreground" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center animate-pulse-glow">
                      {itemCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg bg-card border-border">
                <Cart />
              </SheetContent>
            </Sheet>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 rounded-full bg-secondary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <a href="/" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Início
              </a>
              <a href="/#produtos" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Produtos
              </a>
              <a href="/agendamento" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Agendar
              </a>
              <a href="/#sobre" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Sobre
              </a>
              <a href="/#contato" className="text-foreground/80 hover:text-primary transition-colors font-medium py-2">
                Contato
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
