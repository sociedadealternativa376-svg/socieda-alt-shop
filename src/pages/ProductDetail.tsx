import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Shield, Truck, RotateCcw } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

// Different angle/detail images for products
const getProductGalleryImages = (product: typeof products[0]) => {
  const baseImages: Record<string, string[]> = {
    'joia': [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400',
      'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=400',
      'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400',
    ],
    'piercing': [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400',
      'https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400',
      'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400',
      'https://images.unsplash.com/photo-1588592806941-d4cbf4f1b9c3?w=400',
    ],
    'tattoo': [
      'https://images.unsplash.com/photo-1590246814883-57c511e76a52?w=400',
      'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=400',
      'https://images.unsplash.com/photo-1560707854-fb9a10eeaace?w=400',
      'https://images.unsplash.com/photo-1542727313-4f3e99aa2568?w=400',
    ],
  };
  
  const categoryImages = baseImages[product.category] || baseImages['joia'];
  return [product.image, ...categoryImages.filter(img => img !== product.image).slice(0, 3)];
};

const ProductDetailContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display text-foreground mb-4">Produto não encontrado</h1>
          <button 
            onClick={() => navigate('/')}
            className="text-primary hover:underline"
          >
            Voltar para a loja
          </button>
        </div>
      </div>
    );
  }

  const productImages = getProductGalleryImages(product);
  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-card gradient-border">
                <img 
                  src={productImages[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-primary' 
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="text-primary font-medium uppercase tracking-wider text-sm">
                  {product.category} {product.subcategory && `• ${product.subcategory}`}
                </span>
                <h1 className="text-4xl md:text-5xl font-display text-foreground mt-2">
                  {product.name}
                </h1>
              </div>

              <div className="space-y-1">
                <p className="text-3xl font-bold gradient-text">
                  R$ {product.price.toFixed(2)}
                </p>
                {quantity > 1 && (
                  <p className="text-lg text-muted-foreground">
                    {quantity}x = <span className="text-primary font-semibold">R$ {totalPrice.toFixed(2)}</span>
                  </p>
                )}
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-border">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Garantia de qualidade</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Envio para todo Brasil</span>
                </div>
                <div className="flex items-center gap-3">
                  <RotateCcw className="h-5 w-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Troca em 7 dias</span>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-border rounded-lg">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 font-medium text-foreground min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-4 py-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    +
                  </button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-warm-yellow via-warm-orange to-warm-red text-primary-foreground font-display text-xl tracking-wider transition-all hover:opacity-90 hover:scale-[1.02]"
                >
                  <ShoppingBag className="h-6 w-6" />
                  ADICIONAR AO CARRINHO
                </button>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-muted-foreground">
                  {product.inStock ? 'Em estoque' : 'Fora de estoque'}
                </span>
              </div>

              {/* Product Details */}
              <div className="bg-card rounded-lg p-6 gradient-border">
                <h3 className="font-display text-xl text-foreground mb-4">DETALHES DO PRODUTO</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex justify-between">
                    <span>Categoria:</span>
                    <span className="text-foreground capitalize">{product.category}</span>
                  </li>
                  {product.subcategory && (
                    <li className="flex justify-between">
                      <span>Tipo:</span>
                      <span className="text-foreground capitalize">{product.subcategory}</span>
                    </li>
                  )}
                  <li className="flex justify-between">
                    <span>Código:</span>
                    <span className="text-foreground">SA-{product.id.padStart(4, '0')}</span>
                  </li>
                  {product.category === 'joia' && (
                    <>
                      <li className="flex justify-between">
                        <span>Material:</span>
                        <span className="text-foreground">Aço Cirúrgico 316L</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Hipoalergênico:</span>
                        <span className="text-foreground">Sim</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <h2 className="text-3xl font-display gradient-text mb-8">PRODUTOS RELACIONADOS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <button
                    key={relatedProduct.id}
                    onClick={() => navigate(`/produto/${relatedProduct.id}`)}
                    className="group bg-card rounded-lg overflow-hidden hover-glow gradient-border text-left"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-display text-lg text-foreground line-clamp-1">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-primary font-bold mt-1">
                        R$ {relatedProduct.price.toFixed(2)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const ProductDetail = () => {
  return (
    <CartProvider>
      <ProductDetailContent />
    </CartProvider>
  );
};

export default ProductDetail;
