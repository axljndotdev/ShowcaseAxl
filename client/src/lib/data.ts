import type { Product, Category } from "@shared/schema";

let dataCache: { categories: Category[]; products: Product[] } | null = null;

export async function loadData() {
  if (dataCache) {
    return dataCache;
  }

  try {
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error('Failed to load data');
    }
    dataCache = await response.json();
    return dataCache;
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
}

export async function getCategories(): Promise<Category[]> {
  const data = await loadData();
  return data?.categories || [];
}

export async function getProducts(): Promise<Product[]> {
  const data = await loadData();
  return data?.products?.filter(p => p.isActive) || [];
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const data = await loadData();
  return data?.products?.find(p => p.id === id);
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const data = await loadData();
  if (!data?.products) return [];
  
  if (categoryId === "cat1") { // "All" category
    return data.products.filter(p => p.isActive);
  }
  return data.products.filter(p => p.categoryId === categoryId && p.isActive);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const data = await loadData();
  if (!data?.products) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return data.products.filter(
    p => p.isActive && (
      p.title.toLowerCase().includes(lowercaseQuery) ||
      p.brand.toLowerCase().includes(lowercaseQuery) ||
      (p.description && p.description.toLowerCase().includes(lowercaseQuery))
    )
  );
}