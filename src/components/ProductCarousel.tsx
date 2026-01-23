import { useRef, useState, useEffect } from 'react';
import { Product } from '@/types/product';
import ProductCardCompact from './ProductCardCompact';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  onViewAll?: () => void;
}

const ProductCarousel = ({ title, products, onViewAll }: ProductCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  if (products.length === 0) return null;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="mb-10 md:mb-14">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 md:h-8 rounded-full bg-gradient-to-b from-warm-yellow via-primary to-warm-red" />
          <h3 className="text-lg md:text-2xl font-display tracking-wide text-foreground">
            {title.toUpperCase()}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="btn-ripple text-xs md:text-sm text-primary font-medium px-4 py-2 rounded-full border border-primary/30 hover:bg-primary/10 transition-all"
            >
              Ver todos →
            </button>
          )}
          {/* Navigation Arrows - Premium style */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex w-10 h-10 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex w-10 h-10 rounded-full border border-border bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Scrollable Product Row - Draggable */}
      <div 
        ref={scrollRef}
        className={`flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 select-none -mx-2 px-2 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {products.map((product, index) => (
          <div 
            key={product.id} 
            className="flex-shrink-0 w-[140px] md:w-[180px] lg:w-[200px] animate-fade-in"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <ProductCardCompact product={product} />
          </div>
        ))}
      </div>

      {/* Scroll indicator line */}
      <div className="mt-2 h-0.5 w-full bg-border/30 rounded-full overflow-hidden">
        <div className="h-full w-1/4 bg-gradient-to-r from-warm-yellow via-primary to-warm-red rounded-full" />
      </div>
    </div>
  );
};

export default ProductCarousel;
