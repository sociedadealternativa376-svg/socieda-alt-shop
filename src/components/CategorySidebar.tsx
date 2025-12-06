import { useState } from 'react';
import { ChevronDown, Sparkles, Zap, Gem } from 'lucide-react';
import { categories } from '@/data/products';

interface CategorySidebarProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  piercing: <Zap className="h-5 w-5" />,
  tattoo: <Sparkles className="h-5 w-5" />,
  joia: <Gem className="h-5 w-5" />,
};

const CategorySidebar = ({ selectedCategory, onSelectCategory }: CategorySidebarProps) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['piercing', 'tattoo', 'joia']);

  const toggleExpand = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="sticky top-24 bg-card rounded-lg p-6 gradient-border">
        <h3 className="text-xl font-display gradient-text mb-6">CATEGORIAS</h3>
        
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left py-3 px-4 rounded-lg mb-2 transition-all ${
            selectedCategory === null 
              ? 'bg-gradient-to-r from-warm-yellow/20 via-warm-orange/20 to-warm-red/20 text-primary' 
              : 'text-foreground/70 hover:bg-secondary'
          }`}
        >
          Todos os Produtos
        </button>

        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id}>
              <button
                onClick={() => {
                  onSelectCategory(category.id);
                  toggleExpand(category.id);
                }}
                className={`w-full flex items-center justify-between py-3 px-4 rounded-lg transition-all ${
                  selectedCategory === category.id 
                    ? 'bg-gradient-to-r from-warm-yellow/20 via-warm-orange/20 to-warm-red/20 text-primary' 
                    : 'text-foreground/70 hover:bg-secondary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={selectedCategory === category.id ? 'text-primary' : 'text-muted-foreground'}>
                    {categoryIcons[category.id]}
                  </span>
                  <span className="font-medium">{category.name}</span>
                </div>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform ${
                    expandedCategories.includes(category.id) ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {expandedCategories.includes(category.id) && (
                <div className="ml-8 mt-1 space-y-1">
                  {category.subcategories.map((sub) => (
                    <button
                      key={sub}
                      className="w-full text-left py-2 px-4 text-sm text-muted-foreground hover:text-primary transition-colors capitalize"
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
