import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  onViewAll?: () => void;
}

const ProductCarousel = ({ title, products, onViewAll }: ProductCarouselProps) => {
  if (products.length === 0) return null;

  return (
    <div className="mb-10 md:mb-14">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6 px-1">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 md:h-8 rounded-full bg-gradient-to-b from-primary to-primary/50" />
          <h3 className="text-lg md:text-2xl font-display text-foreground tracking-wide">
            {title}
          </h3>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="flex items-center gap-1 text-xs md:text-sm text-primary hover:text-primary/80 font-medium transition-colors group"
          >
            Ver todos
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        )}
      </div>

      {/* Divider line */}
      <div className="h-px bg-gradient-to-r from-border via-primary/20 to-border mb-4 md:mb-6 mx-1" />

      {/* Carousel */}
      <div className="relative px-1 md:px-12">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-3">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-2 md:pl-3 basis-[32%] sm:basis-[28%] md:basis-[22%] lg:basis-[18%] xl:basis-[15%]"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-2 md:-left-4 bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground" />
          <CarouselNext className="hidden md:flex -right-2 md:-right-4 bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-primary-foreground" />
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCarousel;
