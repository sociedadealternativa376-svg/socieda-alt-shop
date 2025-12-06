import { useState } from 'react';
import { ChevronDown, Sparkles, Zap, Gem } from 'lucide-react';
import { categories } from '@/data/products';

interface CategorySidebarProps {
  selectedCategory: string | null;
  selectedSubcategory: string | null;
  onSelectCategory: (category: string | null, subcategory: string | null) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  piercing: <Zap className="h-5 w-5" />,
  tattoo: <Sparkles className="h-5 w-5" />,
  joia: <Gem className="h-5 w-5" />,
};

const CategorySidebar = ({ selectedCategory, selectedSubcategory, onSelectCategory }: CategorySidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['piercing', 'tattoo', 'joia']);

  const toggleExpand = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <aside className="w-40 sm:w-48 md:w-56 lg:w-64 shrink-0">
      <div className="sticky top-24 bg-card rounded-lg p-3 sm:p-4 md:p-6 gradient-border">
        <h3 className="text-sm sm:text-base md:text-xl font-display gradient-text mb-3 md:mb-6">CATEGORIAS</h3>
        
        <button
          onClick={() => onSelectCategory(null, null)}
          className={`w-full text-left py-2 sm:py-3 px-2 sm:px-4 rounded-lg mb-2 transition-all text-xs sm:text-sm md:text-base ${
            selectedCategory === null && selectedSubcategory === null
              ? 'bg-gradient-to-r from-warm-yellow/20 via-warm-orange/20 to-warm-red/20 text-primary' 
              : 'text-foreground/70 hover:bg-secondary'
          }`}
        >
          Todos
        </button>

        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id}>
              <button
                onClick={() => {
                  onSelectCategory(category.id, null);
                  if (!expandedCategories.includes(category.id)) {
                    toggleExpand(category.id);
                  }
                }}
                className={`w-full flex items-center justify-between py-2 sm:py-3 px-2 sm:px-4 rounded-lg transition-all text-xs sm:text-sm md:text-base ${
                  selectedCategory === category.id && selectedSubcategory === null
                    ? 'bg-gradient-to-r from-warm-yellow/20 via-warm-orange/20 to-warm-red/20 text-primary' 
                    : 'text-foreground/70 hover:bg-secondary'
                }`}
              >
                <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
                  <span className={`hidden sm:block ${selectedCategory === category.id ? 'text-primary' : 'text-muted-foreground'}`}>
                    {categoryIcons[category.id]}
                  </span>
                  <span className="font-medium truncate">{category.name}</span>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform ${
                    expandedCategories.includes(category.id) ? 'rotate-180' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(category.id);
                  }}
                />
              </button>
              
              {expandedCategories.includes(category.id) && (
                <div className="ml-2 sm:ml-4 md:ml-8 mt-1 space-y-1">
                  {category.subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => onSelectCategory(category.id, sub)}
                      className={`w-full text-left py-1 sm:py-2 px-2 sm:px-4 text-xs sm:text-sm rounded-md transition-colors capitalize ${
                        selectedCategory === category.id && selectedSubcategory === sub
                          ? 'bg-primary/20 text-primary font-medium'
                          : 'text-muted-foreground hover:text-primary hover:bg-secondary/50'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default CategorySidebar;
