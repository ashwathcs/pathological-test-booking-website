# MedTest Pro - Pathological Test Booking Platform

## Overview

MedTest Pro is a modern React-based frontend application for pathological test booking and management. The platform provides a comprehensive interface for healthcare services including test booking, order tracking, report access, and administrative features. The application is designed as a frontend-only solution that connects to an external backend service for all data operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The application follows a component-based React architecture with TypeScript for type safety:

- **Framework**: React 18 with TypeScript and Vite for build tooling
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system variables
- **State Management**: TanStack Query for server state and local React state for UI state
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth transitions and interactions

### Design System
The application implements a healthcare-focused design system:

- **Color Palette**: Medical blue primary colors with semantic variants for success, warning, and error states
- **Typography**: Inter font family with consistent weight hierarchy
- **Theme Support**: Light/dark mode toggle with system preference detection
- **Component Library**: Comprehensive set of reusable UI components following Material Design principles

### Authentication & Authorization
Role-based access control with three user types:
- **Customer**: Standard users who can book tests and view reports
- **Staff**: Can access staff dashboard for order management
- **Admin**: Full access to admin dashboard with comprehensive system controls

Authentication is handled via external backend with session-based authentication using cookies.

### Data Flow Pattern
The application follows a strict separation between frontend and backend:
- All API calls route through a centralized `apiClient` utility
- TanStack Query manages caching, synchronization, and error handling
- Frontend-only application with no direct database access
- Real-time updates handled through periodic query refetching

### File Structure Organization
- `/client/src/components`: Reusable UI components and business logic components
- `/client/src/pages`: Route-level page components with authentication guards
- `/client/src/hooks`: Custom React hooks for shared logic
- `/client/src/lib`: Utility functions and configuration
- `/shared`: Shared types and schemas (prepared for backend integration)

## External Dependencies

### Backend Services
- **External REST API**: All data operations handled by separate backend service
- **Environment Configuration**: `VITE_API_BASE_URL` for backend endpoint configuration
- **Authentication Service**: Session-based auth with cookie management

### Database Schema (Backend)
While the frontend doesn't directly access the database, it's designed to work with:
- **PostgreSQL**: Primary database for production data
- **Drizzle ORM**: Schema definitions for type safety and migrations
- **Session Management**: Redis or database-backed session storage

### Third-Party Integrations
- **Payment Processing**: Stripe integration for online payments
- **Email Services**: SendGrid for transactional emails
- **Google Fonts**: Inter font family via CDN
- **Image Assets**: Static medical imagery for UI enhancement

### Development & Deployment
- **Replit Platform**: Optimized for Replit development environment
- **Node.js**: Runtime environment for development server
- **Vite**: Fast development server and production builds
- **ESLint/TypeScript**: Code quality and type checking

### UI Component Libraries
- **Radix UI**: Accessible component primitives
- **Lucide Icons**: Comprehensive icon library
- **Tailwind CSS**: Utility-first styling framework
- **Framer Motion**: Animation and gesture library
- **React Hook Form**: Form validation and state management