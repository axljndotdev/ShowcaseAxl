import { useParams, Link } from "wouter";
import { ArrowLeft, ExternalLink, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getProductById } from "@/lib/data";
import type { Product } from "@shared/schema";
import { useState, useEffect } from "react";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getProductById(id)
        .then(result => {
          if (result) {
            setProduct(result);
          } else {
            setError('Product not found');
          }
        })
        .catch(err => {
          console.error('Failed to load product:', err);
          setError('Failed to load product');
        })
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-card rounded mb-6"></div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-square bg-card rounded-xl"></div>
              <div className="space-y-4">
                <div className="h-8 bg-card rounded"></div>
                <div className="h-6 bg-card rounded w-1/2"></div>
                <div className="h-20 bg-card rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-destructive mb-4">Product Not Found</h1>
                <p className="text-muted-foreground mb-6">
                  The product you're looking for doesn't exist or has been removed.
                </p>
                <Link href="/">
                  <Button data-testid="button-back-home">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Showcase
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

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
    <div className="min-h-screen bg-background text-foreground">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Showcase
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-muted to-card">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
                data-testid="img-product"
              />
              {product.badgeText && (
                <div className="absolute top-4 right-4">
                  <Badge className={getBadgeVariant(product.badgeType)} data-testid="badge-product">
                    {product.badgeText}
                  </Badge>
                </div>
              )}
              <button 
                className="absolute top-4 left-4 p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
                data-testid="button-favorite"
              >
                <Heart className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2" data-testid="text-product-title">
                {product.title}
              </h1>
              <p className="text-lg text-muted-foreground" data-testid="text-product-brand">
                {product.brand}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2" data-testid="rating-product">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-accent fill-current" />
                <span className="ml-1 font-medium">{product.rating}</span>
              </div>
              <span className="text-muted-foreground">(Based on customer reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-primary" data-testid="text-sale-price">
                ${product.salePrice}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through" data-testid="text-original-price">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-product-description">
                  {product.description}
                </p>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button 
                asChild
                size="lg" 
                className="w-full gradient-primary text-white hover:opacity-90"
                data-testid="button-visit-store"
              >
                <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                  Visit Store
                  <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: product.title,
                      text: `Check out this ${product.title} from ${product.brand}`,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    // You could add a toast notification here
                  }
                }}
                data-testid="button-share"
              >
                Share Product
              </Button>
            </div>

            {/* Affiliate Disclosure */}
            <div className="bg-card p-4 rounded-lg border">
              <p className="text-sm text-muted-foreground">
                <strong>Affiliate Disclosure:</strong> We may earn a commission if you purchase this product through our affiliate link. This helps support our platform at no extra cost to you.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
