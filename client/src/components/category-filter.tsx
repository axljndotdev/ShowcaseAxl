import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Category } from "@shared/schema";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId: string;
  onCategorySelect: (categoryId: string) => void;
  isLoading: boolean;
}

export default function CategoryFilter({ 
  categories, 
  selectedCategoryId, 
  onCategorySelect, 
  isLoading 
}: CategoryFilterProps) {
  if (isLoading) {
    return (
      <div className="bg-background border-b border-border py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
            {Array.from({ length: 7 }).map((_, i) => (
              <Skeleton key={i} className="flex-shrink-0 h-10 w-20 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background border-b border-border py-4">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="secondary"
              onClick={() => onCategorySelect(category.id)}
              className="flex-shrink-0 px-6 py-2 rounded-full font-medium transition-all duration-200 bg-card text-foreground hover:bg-muted"
              data-testid={`button-category-${category.slug}`}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
