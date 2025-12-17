import { useState } from 'react';
import { ChevronDown, Filter, X } from 'lucide-react';
import { categories, subcategoryLabels } from '@/data/products';

interface MobileCategoryFilterProps {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onSelectCategory: (category: string | null, subcategory: string | null) => void;
}

const MobileCategoryFilter = ({ selectedCategory, selectedSubcategory, onSelectCategory }: MobileCategoryFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const getSubcategoryLabel = (sub: string) => {
    return subcategoryLabels[sub] || sub.charAt(0).toUpperCase() + sub.slice(1);
  };

  const getCurrentLabel = () => {
    if (selectedSubcategory) return getSubcategoryLabel(selectedSubcategory);
    if (selectedCategory) {
      const cat = categories.find(c => c.id === selectedCategory);
      return cat?.name || 'Todos';
    }
    return 'Todos';
  };

  const handleSelect = (category: string | null, subcategory: string | null) => {
    onSelectCategory(category, subcategory);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-card rounded-lg border border-border"
      >
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary" />
          <span className="text-foreground font-medium">Filtrar: </span>
          <span className="text-primary">{getCurrentLabel()}</span>
        </div>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-display gradient-text">CATEGORIAS</h3>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full bg-secondary">
                <X className="h-5 w-5" />
              </button>
            </div>

            <button
              onClick={() => handleSelect(null, null)}
              className={`w-full text-left py-4 px-4 rounded-lg mb-2 text-lg transition-all ${
                selectedCategory === null && selectedSubcategory === null
                  ? 'bg-gradient-to-r from-warm-yellow/20 via-warm-orange/20 to-warm-red/20 text-primary font-medium' 
                  : 'text-foreground/70 hover:bg-secondary'
              }`}
            >
              Todos os Produtos
            </button>

            <div className="space-y-1">
              {categories.map((category) => (
                <div key={category.id} className="border-b border-border/50 last:border-0">
                  <button
                    onClick={() => handleSelect(category.id, null)}
                    className={`w-full text-left py-4 px-4 text-lg font-medium transition-all ${
                      selectedCategory === category.id && selectedSubcategory === null
                        ? 'text-primary' 
                        : 'text-foreground/80'
                    }`}
                  >
                    {category.name}
                  </button>
                  
                  <div className="pl-4 pb-2 space-y-1">
                    {category.subcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => handleSelect(category.id, sub)}
                        className={`w-full text-left py-3 px-4 text-base rounded-md transition-colors ${
                          selectedCategory === category.id && selectedSubcategory === sub
                            ? 'bg-primary/20 text-primary font-medium'
                            : 'text-muted-foreground hover:text-primary'
                        }`}
                      >
                        {getSubcategoryLabel(sub)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileCategoryFilter;
