import promoBanner from '@/assets/promo-banner.png';

const PromoBanner = () => {
  return (
    <section className="w-full py-4 md:py-10 bg-background relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[200%] bg-gradient-to-r from-warm-yellow/10 via-primary/10 to-warm-red/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-3 md:px-4 relative">
        <div className="group relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl transition-all duration-500 hover:shadow-[0_20px_60px_-15px_hsl(var(--primary)/0.3)]">
          {/* Shine effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out z-10" />
          
          {/* Glow border */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-warm-yellow via-primary to-warm-red rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-50 blur transition-opacity duration-500" />
          
          <div className="relative rounded-xl md:rounded-2xl overflow-hidden">
            <img 
              src={promoBanner} 
              alt="Promoção: Na compra de 3 piercings não paga a perfuração" 
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
