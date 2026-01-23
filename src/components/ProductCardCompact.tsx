import { useNavigate } from 'react-router-dom';
import { Product } from '@/types/product';
import { Plus } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface ProductCardCompactProps {
  product: Product;
}

const ProductCardCompact = ({ product }: ProductCardCompactProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleViewProduct = () => {
    navigate(`/produto/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 300);
  };

  return (
    <div 
      className="group premium-card cursor-pointer h-full flex flex-col"
      onClick={handleViewProduct}
    >
      {/* Image Container */}
      <div className="relative bg-gradient-to-b from-secondary/30 to-secondary/50 p-3 rounded-t-xl overflow-hidden">
        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
        
        <div className="aspect-square w-full flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name}
            className="max-w-full max-h-full object-contain transition-all duration-500 group-hover:scale-110"
          />
        </div>
        
        {/* Quick Add Button with ripple */}
        <button 
          onClick={handleAddToCart}
          className={`btn-ripple absolute bottom-3 right-3 w-9 h-9 rounded-full bg-gradient-to-r from-warm-yellow via-primary to-warm-red text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg ${isAdding ? 'scale-125' : ''}`}
        >
          <Plus className={`h-4 w-4 transition-transform ${isAdding ? 'rotate-90' : ''}`} />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-3 flex flex-col flex-1 bg-card rounded-b-xl">
        <span className="text-[10px] text-primary/80 uppercase tracking-wider font-medium">
          {product.subcategory || product.category}
        </span>
        
        <h3 className="text-xs font-medium text-foreground mt-1.5 line-clamp-2 leading-tight min-h-[2rem] group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-2 flex items-baseline gap-1">
          <span className="text-[10px] text-muted-foreground">R$</span>
          <span className="text-base font-bold gradient-text">
            {product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCardCompact;
