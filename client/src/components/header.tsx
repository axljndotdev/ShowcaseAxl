import { useState } from "react";
import { Search, Filter, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Showcase - Affiliate Store",
        text: "Discover amazing products from trusted affiliate partners",
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold" data-testid="text-logo">Showcase</h1>
              <p className="text-xs text-muted-foreground">Affiliate Store</p>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-4">
            <div className="relative">
              <Input 
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-card border border-border rounded-full py-3 px-4 pl-12 text-foreground placeholder:text-muted-foreground focus:outline-none search-focus transition-all duration-200"
                data-testid="input-search"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-filter"
            >
              <Filter className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              data-testid="button-share-header"
            >
              <Share2 className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
