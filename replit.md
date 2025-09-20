# MedTest Pro - Pathological Test Booking Platform

## Overview

MedTest Pro is a modern React-based frontend application for pathological test booking and management. The platform provides a comprehensive interface for healthcare services including test booking, order tracking, report access, and administrative features. The application is designed as a frontend-only solution that connects to an external backend service for all data operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Pure Frontend Architecture
The application is now a pure React frontend application with complete MVC architecture using mock data services:

- **Framework**: React 18 with TypeScript and Vite for build tooling (pure frontend, no server)
- **Architecture**: Clean MVC pattern with Models, Services, Controllers, and Views layers
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system variables
- **State Management**: Local React state and custom hooks for state management
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth transitions and interactions
- **Data Layer**: Mock data services with realistic business logic simulation

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
The application follows a clean MVC architecture pattern:
- **Models**: Define data structures and types (`client/src/models/`)
- **Services**: Handle business logic and mock data operations (`client/src/services/`)
- **Controllers**: Custom hooks that connect services to UI components (`client/src/controllers/`)
- **Views**: Pure presentation layer components that consume controllers
- No external API dependencies - entirely self-contained with mock data
- Realistic data simulation including latency, filtering, search, and business logic

### File Structure Organization
- `/client/src/models`: Data structures and type definitions for the application domain
- `/client/src/services`: Business logic services with comprehensive mock data
- `/client/src/controllers`: Custom hooks that manage state and connect services to views
- `/client/src/components`: Pure presentation layer UI components
- `/client/src/pages`: Route-level page components with authentication guards
- `/client/src/lib`: Utility functions and configuration
- `/server`: Minimal Vite development server (no business logic)

## External Dependencies (None)

### Pure Frontend Application
- **No Backend Dependencies**: Application is completely self-contained
- **Mock Data Services**: All data operations handled by frontend mock services
- **Local Storage**: Authentication and user preferences stored locally
- **No Database Required**: All data simulated in memory with realistic behavior

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