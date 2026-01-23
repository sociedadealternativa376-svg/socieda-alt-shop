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
    <div className="mb-8 md:mb-10">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-5 md:h-6 rounded-full bg-primary" />
          <h3 className="text-base md:text-xl font-semibold text-foreground">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs md:text-sm text-primary hover:underline font-medium mr-2"
            >
              Ver todos
            </button>
          )}
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex w-8 h-8 rounded-full border border-border bg-background hover:bg-secondary items-center justify-center transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex w-8 h-8 rounded-full border border-border bg-background hover:bg-secondary items-center justify-center transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Scrollable Product Row - Draggable */}
      <div 
        ref={scrollRef}
        className={`flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {products.map((product) => (
          <div 
            key={product.id} 
            className="flex-shrink-0 w-[120px] md:w-[160px] lg:w-[180px]"
          >
            <ProductCardCompact product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
