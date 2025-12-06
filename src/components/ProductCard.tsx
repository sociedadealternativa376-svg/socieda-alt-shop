import { useNavigate } from 'react-router-dom';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleViewProduct = () => {
    navigate(`/produto/${product.id}`);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div 
      className="group relative bg-card rounded-lg overflow-hidden hover-glow gradient-border cursor-pointer"
      onClick={handleViewProduct}
    >
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/90 text-background font-medium text-sm transition-transform hover:scale-105"
            onClick={handleViewProduct}
          >
            <Eye className="h-4 w-4" />
            Ver Detalhes
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <span className="text-xs text-primary font-medium uppercase tracking-wider">
          {product.category} {product.subcategory && `• ${product.subcategory}`}
        </span>
        <h3 className="font-display text-lg text-foreground mt-1 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold gradient-text">
            R$ {product.price.toFixed(2)}
          </span>
          <button 
            onClick={handleAddToCart}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-warm-yellow via-warm-orange to-warm-red text-primary-foreground font-medium text-sm transition-all hover:opacity-90 hover:scale-105"
          >
            <ShoppingBag className="h-4 w-4" />
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
