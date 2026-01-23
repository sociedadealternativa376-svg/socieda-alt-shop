import { Shield, Award, Heart, Sparkles, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'SEGURANÇA',
    description: 'Materiais esterilizados e procedimentos seguros seguindo normas de biossegurança.',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Award,
    title: 'QUALIDADE',
    description: 'Joias em aço cirúrgico, titânio e prata 925. Artistas experientes e certificados.',
    gradient: 'from-warm-yellow to-primary',
  },
  {
    icon: Heart,
    title: 'CUIDADO',
    description: 'Acompanhamento pós-procedimento e orientações personalizadas para cicatrização.',
    gradient: 'from-pink-500 to-rose-400',
  },
  {
    icon: Sparkles,
    title: 'EXCLUSIVIDADE',
    description: 'Designs únicos e personalizados. Cada trabalho é uma obra de arte individual.',
    gradient: 'from-primary to-warm-red',
  },
];

const About = () => {
  return (
    <section id="sobre" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-warm-red/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wider mb-4">
            NOSSOS DIFERENCIAIS
          </span>
          <h2 className="text-4xl md:text-6xl font-display text-gradient-animate mb-4">
            POR QUE NOS ESCOLHER
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Na Sociedade Alternativa, cada cliente é único e cada trabalho é tratado com a máxima dedicação
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group premium-card p-6 md:p-8 text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Icon with gradient background */}
              <div className={`relative w-16 h-16 mx-auto mb-6`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl rotate-6 opacity-20 group-hover:rotate-12 transition-transform`} />
                <div className={`relative w-full h-full rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
              </div>
              
              <h3 className="font-display text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a 
            href="https://wa.me/5511952222008?text=Olá! Vim pelo site e gostaria de agendar!"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient btn-ripple inline-flex items-center gap-3 px-8 py-4 rounded-full text-primary-foreground font-display text-lg tracking-wider"
          >
            AGENDAR AGORA
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
