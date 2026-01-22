import { useNavigate } from 'react-router-dom';
import { Product } from '@/types/product';
import { ShoppingBag, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleViewProduct = () => {
    navigate(`/produto/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div 
      className="group relative bg-card rounded-xl overflow-hidden gradient-border cursor-pointer transition-all duration-300 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.2)] hover:-translate-y-1 h-full flex flex-col"
      onClick={handleViewProduct}
    >
      <div className="aspect-square overflow-hidden relative flex-shrink-0">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        
        {/* Quick View Button - Hidden on mobile */}
        <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/90 text-background font-medium text-sm transition-transform hover:scale-105 shadow-lg"
            onClick={handleViewProduct}
          >
            <Eye className="h-4 w-4" />
            Ver Detalhes
          </button>
        </div>
      </div>
      
      <div className="p-2.5 md:p-4 flex flex-col flex-1">
        <span className="text-[9px] md:text-xs text-primary font-medium uppercase tracking-wider line-clamp-1 transition-colors group-hover:text-primary/80">
          {product.subcategory || product.category}
        </span>
        <h3 className="font-display text-xs md:text-base lg:text-lg text-foreground mt-0.5 md:mt-1 mb-1 line-clamp-2 transition-colors group-hover:gradient-text leading-tight">
          {product.name}
        </h3>
        <p className="hidden lg:block text-sm text-muted-foreground line-clamp-2 mb-2">
          {product.description}
        </p>
        
        <div className="flex flex-col gap-1.5 md:gap-2 mt-auto">
          <span className="text-sm md:text-lg lg:text-xl font-bold gradient-text">
            R$ {product.price.toFixed(2)}
          </span>
          <button 
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 rounded-full bg-gradient-to-r from-warm-yellow via-warm-orange to-warm-red hover:opacity-90 text-white font-medium text-[10px] md:text-xs transition-all hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            <ShoppingBag className="h-3 w-3 md:h-4 md:w-4" />
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
