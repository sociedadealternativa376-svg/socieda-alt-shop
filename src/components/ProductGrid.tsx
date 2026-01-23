import { useState, useMemo, useEffect } from 'react';
import { products, categories, subcategoryLabels } from '@/data/products';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';
import ProductCarousel from './ProductCarousel';
import { Search } from 'lucide-react';

const ProductGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleSelectCategory = (category: string | null, subcategory: string | null) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
  };

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      const matchesSubcategory = selectedSubcategory ? product.subcategory === selectedSubcategory : true;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSubcategory && matchesSearch;
    });

    // When showing all products (no category/subcategory filter), interleave products from different subcategories
    if (!selectedCategory && !selectedSubcategory && !searchTerm) {
      const subcategoryGroups: { [key: string]: typeof products } = {};
      filtered.forEach(product => {
        const key = product.subcategory || 'other';
        if (!subcategoryGroups[key]) subcategoryGroups[key] = [];
        subcategoryGroups[key].push(product);
      });

      const subcategories = Object.keys(subcategoryGroups);
      const interleaved: typeof products = [];
      let maxLength = Math.max(...subcategories.map(s => subcategoryGroups[s].length));
      
      for (let i = 0; i < maxLength; i++) {
        for (const sub of subcategories) {
          if (subcategoryGroups[sub][i]) {
            interleaved.push(subcategoryGroups[sub][i]);
          }
        }
      }
      return interleaved;
    }

    return filtered;
  }, [selectedCategory, selectedSubcategory, searchTerm]);

  const getCategoryTitle = () => {
    if (!selectedCategory && !selectedSubcategory) return 'NOSSOS PRODUTOS';
    if (selectedSubcategory) return selectedSubcategory.toUpperCase();
    return selectedCategory?.toUpperCase() + 'S';
  };

  return (
    <section id="produtos" className="py-12 md:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-warm-red/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium tracking-wider mb-4 animate-fade-in">
            CATÁLOGO EXCLUSIVO
          </span>
          <h2 className="text-3xl md:text-6xl font-display text-gradient-animate mb-3 md:mb-4">
            {getCategoryTitle()}
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {selectedSubcategory 
              ? `Explore nossa coleção de ${selectedSubcategory}`
              : selectedCategory
                ? `Descubra nossa seleção de ${selectedCategory}s`
                : 'Peças únicas feitas com materiais premium para expressar sua personalidade'
            }
          </p>
        </div>

        {/* Search Bar - Premium style */}
        <div className="max-w-xl mx-auto mb-8 md:mb-10">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-warm-yellow via-primary to-warm-red rounded-full blur opacity-20 group-focus-within:opacity-40 transition-opacity" />
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="O que você procura?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-14 md:h-16 pl-14 pr-6 rounded-full bg-card border border-border/50 focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all text-foreground placeholder:text-muted-foreground shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Category Pills - Premium design */}
        <div className="mb-8 md:mb-12">
          <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-3 px-1">
            <button
              onClick={() => handleSelectCategory(null, null)}
              className={`btn-ripple flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === null && selectedSubcategory === null
                  ? 'bg-gradient-to-r from-warm-yellow via-primary to-warm-red text-primary-foreground shadow-lg animate-glow-pulse' 
                  : 'bg-card text-foreground border border-border/50 hover:border-primary/30 hover:bg-card/80 active:scale-95'
              }`}
            >
              ✨ Todos
            </button>
            {categories.map((category) => (
              <div key={category.id} className="flex gap-2">
                {category.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => handleSelectCategory(category.id, sub)}
                    className={`btn-ripple flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      selectedCategory === category.id && selectedSubcategory === sub
                        ? 'bg-gradient-to-r from-warm-yellow via-primary to-warm-red text-primary-foreground shadow-lg animate-scale-in'
                        : 'bg-card text-foreground border border-border/50 hover:border-primary/30 hover:bg-card/80 active:scale-95'
                    }`}
                  >
                    {subcategoryLabels[sub] || sub}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Products */}
        <div className="w-full">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : selectedCategory || selectedSubcategory || searchTerm ? (
            // Grid view when filtering
            filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product, index) => (
                  <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-lg">
                  Nenhum produto encontrado
                </p>
                <p className="text-muted-foreground/60 text-sm mt-1">
                  Tente buscar por outro termo
                </p>
              </div>
            )
          ) : (
            // Carousel view for all products grouped by subcategory
            <div className="space-y-6 md:space-y-10">
              {categories.map((category) =>
                category.subcategories.map((subcategory) => {
                  const subcategoryProducts = products.filter(
                    (p) => p.subcategory === subcategory
                  );
                  return (
                    <ProductCarousel
                      key={subcategory}
                      title={subcategoryLabels[subcategory] || subcategory}
                      products={subcategoryProducts}
                      onViewAll={() => handleSelectCategory(category.id, subcategory)}
                    />
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
