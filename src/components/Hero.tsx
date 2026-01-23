import logo from '@/assets/logo.png';
import { ArrowDown, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-16 md:pt-0">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,hsl(var(--warm-yellow)/0.15)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,hsl(var(--warm-red)/0.15)_0%,transparent_50%)]" />
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 md:w-[500px] h-48 md:h-[500px] bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-40 md:w-[400px] h-40 md:h-[400px] bg-warm-red/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1.5s' }} />
        <div className="absolute top-1/2 right-1/3 w-32 md:w-[300px] h-32 md:h-[300px] bg-warm-yellow/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        
        {/* Decorative circles */}
        <div className="hidden md:block absolute top-20 right-20 w-2 h-2 rounded-full bg-primary/40 animate-pulse" />
        <div className="hidden md:block absolute top-40 right-40 w-1 h-1 rounded-full bg-warm-yellow/60 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="hidden md:block absolute bottom-40 left-20 w-1.5 h-1.5 rounded-full bg-warm-red/50 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Logo with glow ring */}
        <div className="mb-6 md:mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-warm-yellow via-primary to-warm-red rounded-full blur-2xl opacity-40 animate-pulse-glow scale-110" />
            <img 
              src={logo} 
              alt="Sociedade Alternativa" 
              className="relative w-28 h-28 md:w-56 md:h-56 object-contain animate-float rounded-full ring-2 ring-primary/20"
            />
          </div>
        </div>

        {/* Title with animated gradient */}
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-display tracking-wider mb-4 md:mb-6 animate-slide-up">
          <span className="text-gradient-animate">SOCIEDADE</span>
          <br />
          <span className="text-foreground">ALTERNATIVA</span>
        </h1>

        {/* Subtitle with sparkle */}
        <div className="flex items-center justify-center gap-2 mb-6 md:mb-8 animate-slide-up stagger-1">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <p className="text-base md:text-2xl text-muted-foreground tracking-widest">
            PIERCINGS • TATTOOS • JOIAS
          </p>
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
        </div>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-foreground/80 text-sm md:text-lg mb-8 md:mb-12 px-4 animate-slide-up stagger-2">
          Expressão através da arte corporal. Joias exclusivas, piercings profissionais 
          e tatuagens que contam sua história.
        </p>

        {/* CTA Button with premium effect */}
        <a 
          href="#produtos"
          className="btn-gradient btn-ripple inline-flex items-center gap-2 px-8 md:px-10 py-4 md:py-5 rounded-full text-primary-foreground font-display text-lg md:text-xl tracking-wider animate-slide-up stagger-3"
        >
          VER PRODUTOS
          <ArrowDown className="h-5 w-5 animate-bounce-subtle" />
        </a>
      </div>

      {/* Scroll Indicator - Premium style */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground animate-fade-in">
        <span className="text-xs tracking-[0.3em] uppercase">Role para explorar</span>
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
