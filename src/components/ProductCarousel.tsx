import { Product } from '@/types/product';
import ProductCard from './ProductCard';
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
}

const ProductCarousel = ({ title, products }: ProductCarouselProps) => {
  if (products.length === 0) return null;

  return (
    <div className="mb-8 md:mb-12">
      <h3 className="text-xl md:text-2xl font-display text-foreground mb-4 md:mb-6 px-2">
        {title}
      </h3>
      <div className="relative px-2 md:px-12">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-3 md:-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="pl-3 md:pl-4 basis-[45%] sm:basis-[40%] md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-2 md:-left-4" />
          <CarouselNext className="hidden md:flex -right-2 md:-right-4" />
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCarousel;
