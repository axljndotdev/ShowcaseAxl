# Overview

This is a modern affiliate marketing e-commerce application built with React, Express, and TypeScript. The application features a product showcase interface where users can browse products by categories, search for specific items, and view detailed product information. All products link to external affiliate URLs for monetization. The app uses a clean, modern design with dark theme styling and mobile-responsive layouts.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management and caching
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite for fast development and optimized builds

## Backend Architecture
- **Runtime**: Node.js with Express.js web framework
- **API Design**: RESTful API with JSON responses
- **Data Storage**: In-memory storage implementation with interface for future database integration
- **Development**: Hot module replacement via Vite integration in development mode
- **Error Handling**: Centralized error middleware with structured JSON responses

## Database Schema Design
- **ORM**: Drizzle ORM with PostgreSQL dialect configuration
- **Schema Structure**:
  - Products table with pricing, ratings, categories, and affiliate links
  - Categories table for product organization
  - Users table for future authentication features
- **Validation**: Zod schemas for runtime type checking and API validation

## Key Features
- **Product Management**: Full CRUD operations for products and categories
- **Search Functionality**: Text-based product search across titles and descriptions
- **Category Filtering**: Dynamic category-based product filtering
- **Mobile-First Design**: Responsive layouts optimized for mobile devices
- **Performance Optimization**: Image lazy loading, query caching, and code splitting

## Design Patterns
- **Component Composition**: Reusable UI components with consistent prop interfaces
- **Custom Hooks**: Centralized logic for mobile detection and toast notifications
- **Repository Pattern**: Storage interface abstraction for easy database swapping
- **Error Boundaries**: Graceful error handling with user-friendly fallbacks

# External Dependencies

## Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight client-side routing
- **express**: Node.js web application framework
- **drizzle-orm**: Type-safe ORM for database operations

## UI and Styling
- **@radix-ui/***: Accessible UI primitive components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant styling
- **lucide-react**: Modern icon library

## Database and Validation
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation
- **zod**: Runtime type validation and schema definition

## Development Tools
- **vite**: Fast build tool and development server
- **typescript**: Static type checking
- **tsx**: TypeScript execution for Node.js
- **@replit/vite-plugin-***: Replit-specific development enhancements

## Utilities
- **date-fns**: Date manipulation and formatting
- **clsx**: Conditional className utility
- **nanoid**: Unique ID generation