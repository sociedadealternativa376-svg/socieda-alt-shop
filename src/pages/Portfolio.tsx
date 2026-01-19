import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Instagram, Mail } from 'lucide-react';

interface TattooArtist {
  id: string;
  name: string;
  specialty: string;
  bio: string;
  image: string;
  instagram?: string;
  email?: string;
}

const artists: TattooArtist[] = [
  {
    id: '1',
    name: 'Lucas Mendes',
    specialty: 'Realismo & Blackwork',
    bio: 'Especializado em tatuagens realistas e blackwork há mais de 8 anos. Transforma fotografias e ideias em arte permanente com detalhes impressionantes.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    instagram: 'lucasmendes.tattoo',
    email: 'lucas@sociedadealternativa.com',
  },
  {
    id: '2',
    name: 'Marina Costa',
    specialty: 'Fine Line & Minimalista',
    bio: 'Artista focada em traços finos e delicados. Cria designs únicos com linhas precisas e composições elegantes.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face',
    instagram: 'marina.fineline',
    email: 'marina@sociedadealternativa.com',
  },
  {
    id: '3',
    name: 'Rafael Santos',
    specialty: 'Old School & Neo Traditional',
    bio: 'Apaixonado pela estética clássica das tatuagens tradicionais americanas. Cores vibrantes e designs atemporais.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    instagram: 'rafa.oldschool',
    email: 'rafael@sociedadealternativa.com',
  },
  {
    id: '4',
    name: 'Juliana Ferreira',
    specialty: 'Aquarela & Colorido',
    bio: 'Especialista em técnicas de aquarela e cores vibrantes. Transforma a pele em verdadeiras obras de arte.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    instagram: 'ju.watercolor',
    email: 'juliana@sociedadealternativa.com',
  },
  {
    id: '5',
    name: 'Diego Oliveira',
    specialty: 'Geométrico & Dotwork',
    bio: 'Mestre em padrões geométricos e pontilhismo. Cria mandalas e designs simétricos com precisão matemática.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    instagram: 'diego.dotwork',
    email: 'diego@sociedadealternativa.com',
  },
  {
    id: '6',
    name: 'Camila Rocha',
    specialty: 'Lettering & Script',
    bio: 'Especializada em tipografia e lettering customizado. Cada palavra se torna uma expressão artística única.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
    instagram: 'camila.lettering',
    email: 'camila@sociedadealternativa.com',
  },
];

const Portfolio = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Nossos Artistas
            </h1>
            <p className="text-lg text-muted-foreground">
              Conheça os talentos por trás da Sociedade Alternativa. Cada artista traz sua visão única e especialidade para criar obras de arte inesquecíveis.
            </p>
          </div>
        </section>

        {/* Artists Grid */}
        <section className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist) => (
              <article 
                key={artist.id}
                className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Artist Image */}
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={artist.image}
                    alt={`Foto de ${artist.name}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Artist Info */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    {artist.name}
                  </h2>
                  <p className="text-sm text-primary font-medium mb-3">
                    {artist.specialty}
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {artist.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                    {artist.instagram && (
                      <a
                        href={`https://instagram.com/${artist.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Instagram className="h-4 w-4" />
                        <span>@{artist.instagram}</span>
                      </a>
                    )}
                    {artist.email && (
                      <a
                        href={`mailto:${artist.email}`}
                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors ml-auto"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 md:p-12 text-center border border-primary/20">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
              Pronto para sua próxima tattoo?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Entre em contato com um de nossos artistas e transforme sua ideia em realidade.
            </p>
            <a
              href="https://wa.me/5511952222008?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20gostaria%20de%20fazer%20uma%20tatuagem."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 px-8 font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
            >
              Falar no WhatsApp
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Portfolio;
