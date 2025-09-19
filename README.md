# MedTest Pro - Frontend Application

A modern React-based frontend application for pathological test booking and management.

## Overview

This is a frontend-only application that connects to an external backend service for all data operations. The application provides a comprehensive interface for:

- **Test Booking**: Browse and book pathological tests
- **Pincode Serviceability**: Check service availability in your area
- **Order Management**: Track orders and view history
- **Reports**: Access and download test reports
- **User Management**: Profile and address management
- **Admin Dashboard**: Administrative features for staff

## Architecture

```
Frontend (React/TypeScript)
    ↓ API Calls
External Backend Service
    ↓ Database
PostgreSQL Database
```

## Prerequisites

- Node.js 18+ 
- npm or yarn
- External backend service running (separate repository)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the environment template and configure your backend URL:

```bash
cp .env.example .env
```

Edit `.env` and set your backend service URL:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## Backend Service Configuration

This frontend application requires a separate backend service to be running. The backend should provide the following API endpoints:

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/user` - Get current user
- `POST /api/auth/logout` - User logout

### Tests & Categories
- `GET /api/tests` - Get all tests
- `GET /api/tests/:id` - Get specific test
- `GET /api/test-categories` - Get test categories
- `GET /api/tests/search?q=:query` - Search tests

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get specific order
- `PATCH /api/orders/:id/status` - Update order status
- `GET /api/orders/track/:trackingId` - Track order

### Pincodes
- `GET /api/pincodes/:pincode/serviceability` - Check serviceability
- `GET /api/pincodes` - Get all serviceable pincodes

### Addresses
- `GET /api/addresses` - Get user addresses
- `POST /api/addresses` - Create address
- `PUT /api/addresses/:id` - Update address
- `PATCH /api/addresses/:id/default` - Set default address

### Reports
- `GET /api/reports` - Get user reports
- `GET /api/reports/:id` - Get specific report
- `GET /api/reports/:id/download` - Download report PDF

### Notifications
- `GET /api/notifications` - Get user notifications
- `PATCH /api/notifications/:id/read` - Mark as read
- `PATCH /api/notifications/read-all` - Mark all as read

### Admin (Role-based)
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/technicians` - Manage technicians
- `PATCH /api/orders/:id/technician` - Assign technician

## Development Scripts

```bash
# Start development server (Express + Vite)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run check
```

**Note**: This application serves as a frontend-only app that connects to an external backend service. The `npm run dev` command starts a simple Express server that serves the React application and proxies API calls to your external backend.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000` |
| `VITE_APP_NAME` | Application name | `MedTest Pro` |
| `VITE_ENABLE_MOCK_DATA` | Enable mock data mode | `false` |
| `VITE_DEBUG_MODE` | Enable debug logging | `false` |

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Routing**: Wouter
- **State Management**: TanStack Query (React Query)
- **UI Components**: Radix UI primitives
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Build Tool**: Vite
- **Development**: TypeScript, ESLint

## Project Structure

```
client/src/
├── components/        # Reusable UI components
│   ├── ui/           # Base UI primitives
│   └── animations/   # Animation components
├── pages/            # Page components
├── hooks/            # Custom React hooks
├── lib/              # Utilities and configurations
│   ├── apiClient.ts  # External API client
│   └── queryClient.ts # React Query configuration
└── assets/           # Static assets

server/
├── index.ts          # Frontend server (static file serving)
└── vite.ts           # Vite development setup
```

## API Client Usage

The application includes a comprehensive API client for communicating with the external backend:

```typescript
import { apiClient } from '@/lib/apiClient';

// Get all tests
const tests = await apiClient.getAllTests();

// Create an order
const order = await apiClient.createOrder(orderData);

// Check pincode serviceability
const isServiceable = await apiClient.checkPincodeServiceability('400001');
```

## Features

### User Features
- **Test Catalog**: Browse available pathological tests
- **Smart Search**: Search tests by name or category
- **Pincode Check**: Verify service availability
- **Online Booking**: Schedule home sample collection
- **Multiple Addresses**: Manage delivery addresses
- **Order Tracking**: Real-time order status updates
- **Digital Reports**: View and download test reports
- **Payment Options**: Prepaid and postpaid payment methods
- **Notifications**: Order updates and reminders

### Admin Features
- **Order Management**: View and manage all orders
- **Technician Assignment**: Assign collection technicians
- **Report Management**: Upload and verify reports
- **Dashboard Analytics**: Order and revenue insights
- **User Management**: Customer support features

### Technical Features
- **Responsive Design**: Mobile-first approach
- **Dark/Light Theme**: User preference based theming
- **Offline Support**: Basic offline functionality
- **Performance**: Optimized loading and caching
- **Accessibility**: WCAG 2.1 compliant
- **SEO Optimized**: Meta tags and structured data

## Deployment

### Production Build

```bash
npm run build
```

### Environment Setup

Ensure your production environment has:
1. Correct `VITE_API_BASE_URL` pointing to production backend
2. All required environment variables set
3. Backend service running and accessible

### Deployment Options

#### Option 1: Static Hosting with External API
For static hosting, ensure your backend service supports CORS for your domain:

```javascript
// Backend CORS configuration example
app.use(cors({
  origin: ['https://your-frontend-domain.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

Deploy to:
- Vercel
- Netlify  
- AWS S3 + CloudFront
- GitHub Pages

#### Option 2: Express Server Hosting
Deploy the full Express application (which serves the frontend and handles API proxying):
- Railway
- Render
- Heroku
- AWS EC2/ECS
- DigitalOcean

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For technical support or questions:
- Check the API documentation for backend endpoints
- Ensure backend service is running and accessible
- Verify environment configuration
- Check browser console for error details