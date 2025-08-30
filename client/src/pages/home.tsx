import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import CategoryFilter from "@/components/category-filter";
import ProductGrid from "@/components/product-grid";
import FloatingActionButton from "@/components/floating-action-button";
import Footer from "@/components/footer";
import type { Product, Category } from "@shared/schema";

export default function Home() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("cat1");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: searchQuery 
      ? ["/api/products/search", { q: searchQuery }]
      : ["/api/products/category", selectedCategoryId],
    queryFn: async ({ queryKey }) => {
      if (searchQuery) {
        const response = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`);
        if (!response.ok) throw new Error('Failed to search products');
        return response.json();
      } else {
        const response = await fetch(`/api/products/category/${selectedCategoryId}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        return response.json();
      }
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <CategoryFilter
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        onCategorySelect={setSelectedCategoryId}
        isLoading={categoriesLoading}
      />
      <ProductGrid 
        products={products}
        isLoading={productsLoading}
      />
      <FloatingActionButton />
      <Footer />
    </div>
  );
}
