import { Shield, Award, Heart, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'SEGURANÇA',
    description: 'Materiais esterilizados e procedimentos seguros seguindo normas de biossegurança.',
  },
  {
    icon: Award,
    title: 'QUALIDADE',
    description: 'Joias em aço cirúrgico, titânio e prata 925. Artistas experientes e certificados.',
  },
  {
    icon: Heart,
    title: 'CUIDADO',
    description: 'Acompanhamento pós-procedimento e orientações personalizadas para cicatrização.',
  },
  {
    icon: Sparkles,
    title: 'EXCLUSIVIDADE',
    description: 'Designs únicos e personalizados. Cada trabalho é uma obra de arte individual.',
  },
];

const About = () => {
  return (
    <section id="sobre" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display gradient-text mb-4">
            POR QUE NOS ESCOLHER
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Na Sociedade Alternativa, cada cliente é único e cada trabalho é tratado com a máxima dedicação
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="p-6 rounded-lg bg-card hover-glow gradient-border text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-warm-yellow via-warm-orange to-warm-red flex items-center justify-center">
                <feature.icon className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
