import { useParams, useNavigate } from 'react-router-dom';
import { MessageCircle, Calendar, Shield, Truck, RotateCcw } from 'lucide-react';
import { products } from '@/data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { useState, useEffect } from 'react';

const getProductGalleryImages = (product: (typeof products)[number]) => {
  const gallery = (product as any).gallery as string[] | undefined;
  return gallery && gallery.length > 0 ? gallery : [product.image];
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(0);
  }, [id]);

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

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse no produto:\n\n*${product.name}*\nPreço: R$ ${product.price.toFixed(2)}\nCódigo: ${product.id.toUpperCase()}\n\nGostaria de mais informações!`
    );
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  const handleSchedule = () => {
    navigate('/agendamento');
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const breadcrumbItems = [
    { label: 'Produtos', href: '/#produtos' },
    { label: product.category.charAt(0).toUpperCase() + product.category.slice(1) },
    { label: product.name }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 md:pt-24 pb-16 animate-fade-in">
        <div className="container mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} />

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

              <p className="text-3xl font-bold gradient-text">
                R$ {product.price.toFixed(2)}
              </p>

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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleWhatsAppOrder}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-display text-lg tracking-wider transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="h-6 w-6" />
                  PEDIR VIA WHATSAPP
                </button>
                <button 
                  onClick={handleSchedule}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-gradient-to-r from-warm-yellow via-warm-orange to-warm-red text-primary-foreground font-display text-lg tracking-wider transition-all hover:opacity-90 hover:scale-[1.02]"
                >
                  <Calendar className="h-6 w-6" />
                  AGENDAR
                </button>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm text-muted-foreground">
                  {product.inStock ? 'Disponível' : 'Indisponível'}
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
                    <span className="text-foreground">{product.id.toUpperCase()}</span>
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

export default ProductDetail;
