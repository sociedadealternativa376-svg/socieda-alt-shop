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
    <section id="produtos" className="py-8 md:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-display gradient-text mb-2 md:mb-4">
            {getCategoryTitle()}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            {selectedSubcategory 
              ? `Explore nossa coleção de ${selectedSubcategory}`
              : selectedCategory
                ? `Descubra nossa seleção de ${selectedCategory}s`
                : 'Descubra nossa seleção exclusiva de joias para piercing, serviços de tatuagem e muito mais'
            }
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-6 md:mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-12 md:h-14 pl-12 pr-4 rounded-full bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>

        {/* Category Pills - Horizontal Scroll */}
        <div className="mb-6 md:mb-10">
          <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-2">
            <button
              onClick={() => handleSelectCategory(null, null)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform ${
                selectedCategory === null && selectedSubcategory === null
                  ? 'bg-primary text-primary-foreground shadow-lg scale-105 ring-2 ring-primary/30' 
                  : 'bg-secondary text-foreground hover:bg-secondary/80 hover:scale-102 active:scale-95'
              }`}
            >
              Todos
            </button>
            {categories.map((category) => (
              <div key={category.id} className="flex gap-2">
                {category.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => handleSelectCategory(category.id, sub)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform whitespace-nowrap ${
                      selectedCategory === category.id && selectedSubcategory === sub
                        ? 'bg-primary text-primary-foreground shadow-lg scale-105 ring-2 ring-primary/30 animate-scale-in'
                        : 'bg-secondary text-foreground hover:bg-secondary/80 hover:scale-102 active:scale-95'
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
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : selectedCategory || selectedSubcategory || searchTerm ? (
            // Grid view when filtering
            filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Nenhum produto encontrado nesta categoria.
                </p>
              </div>
            )
          ) : (
            // Carousel view for all products grouped by subcategory
            <div className="space-y-2 md:space-y-4">
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
