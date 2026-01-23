import { Menu, X, User, LogOut, Loader2, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import logo from '@/assets/logo.png';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemeToggle from './ThemeToggle';
import { toast } from 'sonner';

const Header = () => {
  const { user, loading, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Você saiu da sua conta');
    navigate('/');
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="container mx-auto px-3 md:px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group" onClick={handleNavClick}>
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              <img 
                src={logo} 
                alt="Sociedade Alternativa" 
                className="relative h-10 w-10 md:h-14 md:w-14 object-contain transition-transform group-hover:scale-110 group-hover:rotate-3"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-display tracking-wider gradient-text">
                SOCIEDADE ALTERNATIVA
              </h1>
              <p className="text-[10px] md:text-xs text-muted-foreground tracking-widest">
                PIERCINGS • TATTOOS • JOIAS
              </p>
            </div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              to="/" 
              className={`link-underline px-4 py-2 rounded-lg transition-all font-medium ${isActive('/') && location.pathname === '/' ? 'text-primary bg-primary/5' : 'text-foreground/70 hover:text-primary hover:bg-primary/5'}`}
            >
              Início
            </Link>
            <a href="/#produtos" className="link-underline px-4 py-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all font-medium">
              Produtos
            </a>
            <Link 
              to="/portfolio" 
              className={`link-underline px-4 py-2 rounded-lg transition-all font-medium ${isActive('/portfolio') ? 'text-primary bg-primary/5' : 'text-foreground/70 hover:text-primary hover:bg-primary/5'}`}
            >
              Portfólio
            </Link>
            <a href="/#sobre" className="link-underline px-4 py-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all font-medium">
              Sobre
            </a>
            <a href="/#contato" className="link-underline px-4 py-2 rounded-lg text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all font-medium">
              Contato
            </a>
          </nav>

          {/* Theme Toggle, User Menu, Cart & Mobile Menu */}
          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />

            {/* User Menu */}
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded-full bg-primary/20 hover:bg-primary/30 transition-colors">
                    <User className="h-5 w-5 text-primary" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium truncate">{user.email}</p>
                    <p className="text-xs text-muted-foreground">Conectado</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <User className="h-4 w-4 mr-2" />
                  Entrar
                </Button>
                <button className="sm:hidden p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors">
                  <User className="h-5 w-5" />
                </button>
              </Link>
            )}
            
            <a 
              href="https://wa.me/5511952222008?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default" size="sm" className="hidden sm:flex">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              <button className="sm:hidden p-2 rounded-full bg-primary hover:bg-primary/90 transition-colors">
                <MessageCircle className="h-5 w-5 text-primary-foreground" />
              </button>
            </a>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 rounded-full bg-secondary active:scale-95 transition-transform"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-1">
              <Link 
                to="/" 
                onClick={handleNavClick}
                className={`py-3 px-4 rounded-lg transition-colors font-medium ${isActive('/') && location.pathname === '/' ? 'bg-primary/10 text-primary' : 'text-foreground/80 hover:bg-secondary'}`}
              >
                Início
              </Link>
              <a 
                href="/#produtos" 
                onClick={handleNavClick}
                className="py-3 px-4 rounded-lg text-foreground/80 hover:bg-secondary transition-colors font-medium"
              >
                Produtos
              </a>
              <Link 
                to="/portfolio" 
                onClick={handleNavClick}
                className={`py-3 px-4 rounded-lg transition-colors font-medium ${isActive('/portfolio') ? 'bg-primary/10 text-primary' : 'text-foreground/80 hover:bg-secondary'}`}
              >
                Portfólio
              </Link>
              <a 
                href="/#sobre" 
                onClick={handleNavClick}
                className="py-3 px-4 rounded-lg text-foreground/80 hover:bg-secondary transition-colors font-medium"
              >
                Sobre
              </a>
              <a 
                href="/#contato" 
                onClick={handleNavClick}
                className="py-3 px-4 rounded-lg text-foreground/80 hover:bg-secondary transition-colors font-medium"
              >
                Contato
              </a>
              
              {/* Mobile auth link */}
              {!user && (
                <Link 
                  to="/auth" 
                  onClick={handleNavClick}
                  className="py-3 px-4 rounded-lg text-primary hover:bg-primary/10 transition-colors font-medium flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Entrar / Criar conta
                </Link>
              )}
              
              {user && (
                <button 
                  onClick={() => { handleSignOut(); handleNavClick(); }}
                  className="py-3 px-4 rounded-lg text-destructive hover:bg-destructive/10 transition-colors font-medium flex items-center gap-2 text-left"
                >
                  <LogOut className="h-4 w-4" />
                  Sair da conta
                </button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
