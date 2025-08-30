import { type User, type InsertUser, type Product, type InsertProduct, type Category, type InsertCategory } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  getCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private categories: Map<string, Category>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.categories = new Map();
    this.initializeData();
  }

  private initializeData() {
    // Initialize categories
    const categories = [
      { id: "cat1", name: "All", slug: "all" },
      { id: "cat2", name: "Fashion", slug: "fashion" },
      { id: "cat3", name: "Beauty", slug: "beauty" },
      { id: "cat4", name: "Tech", slug: "tech" },
      { id: "cat5", name: "Home", slug: "home" },
      { id: "cat6", name: "Sports", slug: "sports" },
      { id: "cat7", name: "Books", slug: "books" },
    ];

    categories.forEach(cat => {
      this.categories.set(cat.id, cat as Category);
    });

    // Initialize products
    const products = [
      {
        id: "prod1",
        title: "Premium Wireless Headphones",
        brand: "Sony",
        description: "High-quality wireless headphones with noise cancellation",
        imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        originalPrice: "199.00",
        salePrice: "149.00",
        rating: "4.8",
        categoryId: "cat4",
        affiliateUrl: "https://example.com/headphones",
        badgeText: "25% OFF",
        badgeType: "discount",
        isActive: true,
      },
      {
        id: "prod2",
        title: "Vitamin C Serum Set",
        brand: "The Ordinary",
        description: "Professional skincare serum set for daily use",
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        originalPrice: null,
        salePrice: "39.00",
        rating: "4.9",
        categoryId: "cat3",
        affiliateUrl: "https://example.com/serum",
        badgeText: "NEW",
        badgeType: "new",
        isActive: true,
      },
      {
        id: "prod3",
        title: "Resistance Band Set",
        brand: "FitBeast",
        description: "Complete resistance band workout set",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        originalPrice: "49.00",
        salePrice: "29.00",
        rating: "4.7",
        categoryId: "cat6",
        affiliateUrl: "https://example.com/resistance-bands",
        badgeText: "BEST SELLER",
        badgeType: "bestseller",
        isActive: true,
      },
      {
        id: "prod4",
        title: "Designer Sunglasses",
        brand: "Ray-Ban",
        description: "Classic designer sunglasses with UV protection",
        imageUrl: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        originalPrice: "129.00",
        salePrice: "89.00",
        rating: "4.6",
        categoryId: "cat2",
        affiliateUrl: "https://example.com/sunglasses",
        badgeText: "LIMITED",
        badgeType: "limited",
        isActive: true,
      },
      {
        id: "prod5",
        title: "Desk Organizer Set",
        brand: "MUJI",
        description: "Minimalist desk organization solution",
        imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        originalPrice: null,
        salePrice: "24.00",
        rating: "4.5",
        categoryId: "cat5",
        affiliateUrl: "https://example.com/desk-organizer",
        badgeText: null,
        badgeType: null,
        isActive: true,
      },
      {
        id: "prod6",
        title: "Smart Fitness Watch",
        brand: "Apple",
        description: "Advanced fitness tracking smartwatch",
        imageUrl: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        originalPrice: "399.00",
        salePrice: "299.00",
        rating: "4.9",
        categoryId: "cat4",
        affiliateUrl: "https://example.com/smartwatch",
        badgeText: "TRENDING",
        badgeType: "trending",
        isActive: true,
      },
      {
        id: "prod7",
        title: "Premium Coffee Beans",
        brand: "Blue Bottle",
        description: "Single origin organic coffee beans",
        imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        originalPrice: null,
        salePrice: "18.00",
        rating: "4.8",
        categoryId: "cat5",
        affiliateUrl: "https://example.com/coffee",
        badgeText: "ORGANIC",
        badgeType: "organic",
        isActive: true,
      },
      {
        id: "prod8",
        title: "Self-Help Book Bundle",
        brand: "Penguin Books",
        description: "Collection of bestselling self-improvement books",
        imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        originalPrice: "59.00",
        salePrice: "34.00",
        rating: "4.7",
        categoryId: "cat7",
        affiliateUrl: "https://example.com/books",
        badgeText: "BESTSELLER",
        badgeType: "bestseller",
        isActive: true,
      },
    ];

    products.forEach(prod => {
      this.products.set(prod.id, prod as Product);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.isActive);
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    if (categoryId === "cat1") { // "All" category
      return this.getProducts();
    }
    return Array.from(this.products.values()).filter(
      p => p.categoryId === categoryId && p.isActive
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      p => p.isActive && (
        p.title.toLowerCase().includes(lowercaseQuery) ||
        p.brand.toLowerCase().includes(lowercaseQuery) ||
        (p.description && p.description.toLowerCase().includes(lowercaseQuery))
      )
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      cat => cat.slug === slug
    );
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
}

export const storage = new MemStorage();
