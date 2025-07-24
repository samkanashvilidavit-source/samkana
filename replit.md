# Chococu - Chocolate Cafe Website

## Overview

This is a full-stack web application for Chococu, a Georgian chocolate cafe. The application features a modern single-page website with product showcases, cafe information, contact forms, and a bilingual interface (English/Georgian). Built with React, Express, and PostgreSQL, it provides a complete digital presence for the chocolate cafe business.

## User Preferences

Preferred communication style: Simple, everyday language.
Typography: DM Serif Display font family used throughout the entire project for elegant, serif typography.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom color scheme for warm, chocolate-themed design
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for products, contact inquiries, and cafe information
- **Middleware**: Custom logging, JSON parsing, error handling
- **Development**: Hot reload with Vite integration in development mode

### Database & ORM
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM with TypeScript schema definitions
- **Migrations**: Drizzle Kit for schema management
- **Connection**: Neon serverless adapter for serverless environments

## Key Components

### Frontend Components
1. **Layout Components**
   - Header with navigation and mobile menu
   - Footer with contact information and links
   - Hero section with call-to-action

2. **Feature Components**
   - Products showcase with category filtering
   - About section with cafe story
   - Gallery with image lightbox functionality
   - Contact form with validation
   - Loading skeletons and error states

3. **UI Components**
   - Complete Shadcn/ui component library
   - Custom toast notifications
   - Modal dialogs and sheets
   - Form controls with validation

### Backend Components
1. **API Routes**
   - `/api/products` - Product management endpoints
   - `/api/products/category/:category` - Category-based filtering
   - `/api/products/:id` - Individual product details
   - `/api/contact` - Contact form submission

2. **Storage Layer**
   - Abstract storage interface for data operations
   - In-memory storage implementation with sample data
   - Database-ready structure for production deployment

3. **Data Models**
   - Products (with Georgian/English names and descriptions)
   - Contact inquiries with type categorization
   - Cafe information (hours, location, contact details)

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data from API endpoints
2. **API Processing**: Express routes handle requests, validate input, and interact with storage layer
3. **Data Storage**: Drizzle ORM manages database operations with type-safe queries
4. **Response Handling**: JSON responses with consistent error handling and logging
5. **State Management**: React Query caches responses and manages loading/error states
6. **UI Updates**: Components automatically re-render based on query state changes

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **drizzle-orm**: Type-safe database ORM
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives
- **react-hook-form**: Form state management
- **zod**: Runtime type validation

### Development Tools
- **vite**: Build tool and development server
- **typescript**: Type safety and development experience
- **tailwindcss**: Utility-first CSS framework
- **@replit/vite-plugin-***: Replit-specific development enhancements

### Styling & UI
- **tailwindcss**: Utility-first CSS with custom color palette
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library
- **embla-carousel-react**: Image carousel functionality

## Deployment Strategy

### Development
- Vite dev server with hot module replacement
- Express server with middleware integration
- In-memory data storage for rapid prototyping
- Replit-specific development tools and error overlay

### Production Build
- Vite builds optimized React bundle to `dist/public`
- ESBuild compiles Express server to `dist/index.js`
- Static file serving from Express for SPA routing
- Environment-based configuration for database connections

### Database Setup
- Drizzle migrations in `./migrations` directory
- PostgreSQL schema with proper indexes and constraints
- Environment variable configuration for database URL
- Production-ready with Neon serverless PostgreSQL

The application is designed to be easily deployable to various platforms with minimal configuration changes, supporting both development and production environments seamlessly.