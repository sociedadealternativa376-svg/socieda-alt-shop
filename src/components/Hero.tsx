import logo from '@/assets/logo.png';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-warm-orange/10" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-warm-orange/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-warm-red/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-1.5s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-warm-yellow/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img 
            src={logo} 
            alt="Sociedade Alternativa" 
            className="w-40 h-40 md:w-56 md:h-56 object-contain animate-float glow-effect rounded-full"
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display tracking-wider mb-6">
          <span className="gradient-text">SOCIEDADE</span>
          <br />
          <span className="text-foreground">ALTERNATIVA</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 tracking-widest">
          PIERCINGS • TATTOOS • JOIAS
        </p>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-foreground/80 text-lg mb-12">
          Expressão através da arte corporal. Joias exclusivas, piercings profissionais 
          e tatuagens que contam sua história.
        </p>

        {/* CTA Button */}
        <a 
          href="#produtos"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-warm-yellow via-warm-orange to-warm-red text-primary-foreground font-display text-xl tracking-wider transition-all hover:opacity-90 hover:scale-105 glow-effect"
        >
          VER PRODUTOS
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-sm tracking-widest">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
