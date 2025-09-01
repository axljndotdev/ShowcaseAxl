import { useState, useEffect } from "react";
import Header from "@/components/header";
import CategoryFilter from "@/components/category-filter";
import ProductGrid from "@/components/product-grid";
import FloatingActionButton from "@/components/floating-action-button";
import Footer from "@/components/footer";
import { getCategories, getProductsByCategory, searchProducts } from "@/lib/data";
import type { Product, Category } from "@shared/schema";

export default function Home() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("cat1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);

  // Load categories
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setCategoriesLoading(false));
  }, []);

  // Load products when category or search changes
  useEffect(() => {
    setProductsLoading(true);
    const loadProducts = async () => {
      try {
        if (searchQuery) {
          const results = await searchProducts(searchQuery);
          setProducts(results);
        } else {
          const results = await getProductsByCategory(selectedCategoryId);
          setProducts(results);
        }
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setProductsLoading(false);
      }
    };
    loadProducts();
  }, [selectedCategoryId, searchQuery]);

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
