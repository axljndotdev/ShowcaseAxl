import { Link } from "wouter";
import { Heart, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const getBadgeVariant = (badgeType: string | null) => {
    switch (badgeType) {
      case "discount":
        return "bg-primary text-primary-foreground";
      case "new":
        return "bg-secondary text-secondary-foreground";
      case "bestseller":
      case "trending":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Link href={`/product/${product.id}`}>
      <div className="product-card group cursor-pointer" data-testid={`card-product-${product.id}`}>
        <div className="bg-card rounded-xl overflow-hidden tiktok-shadow">
          <div className="relative aspect-square bg-gradient-to-br from-muted to-card">
            <img 
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              data-testid={`img-product-${product.id}`}
            />
            {product.badgeText && (
              <div className="absolute top-3 right-3">
                <Badge 
                  className={getBadgeVariant(product.badgeType)}
                  data-testid={`badge-product-${product.id}`}
                >
                  {product.badgeText}
                </Badge>
              </div>
            )}
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-3 left-3 p-2 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Add to favorites logic here
              }}
              data-testid={`button-favorite-${product.id}`}
            >
              <Heart className="w-4 h-4 text-white" />
            </Button>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-sm mb-1 line-clamp-2" data-testid={`text-title-${product.id}`}>
              {product.title}
            </h3>
            <p className="text-muted-foreground text-xs mb-2" data-testid={`text-brand-${product.id}`}>
              {product.brand}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-primary" data-testid={`text-price-${product.id}`}>
                  ${product.salePrice}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through" data-testid={`text-original-price-${product.id}`}>
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-accent fill-current" />
                <span className="text-xs text-muted-foreground" data-testid={`text-rating-${product.id}`}>
                  {product.rating}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
