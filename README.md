# Vimo - Travel Package Management System

## Overview
Vimo is a modern web application built with Next.js 15.0.2 that helps manage and display travel packages. It features an admin dashboard for managing travel packages and a scraping system to collect travel data.

## Tech Stack
- **Frontend**: Next.js 15.0.2, React 18.3.1
- **Styling**: Tailwind CSS, Radix UI components
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Job Queue**: BullMQ with Redis
- **Scraping**: Puppeteer
- **State Management**: Zustand
- **Authentication**: JWT (jose)

## Features
- Admin dashboard for package management
- Automated travel package scraping
- Detailed trip itinerary management
- Image handling and storage
- Job queue system for background tasks
- Secure admin authentication

## Prerequisites
- Node.js (Latest LTS version)
- PostgreSQL database
- Redis server
- pnpm/npm/yarn

## Environment Variables (.env.local)
Create a `.env.local` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/vimo"

# Redis Configuration
REDIS_URL="redis://localhost:6379"

# Admin Authentication
JWT_SECRET="your-secure-jwt-secret"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="secure-admin-password"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3000"
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vimo
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up the database:
```bash
pnpm prisma generate
pnpm prisma db push
```

4. Run the development server:
```bash
pnpm dev
```

## Project Structure
- `/app` - Next.js application routes and pages
- `/components` - Reusable React components
- `/prisma` - Database schema and migrations
- `/lib` - Utility functions and configurations
- `/store` - Zustand state management
- `/scraping` - Web scraping logic
- `/public` - Static assets
- `/types` - TypeScript type definitions

## Database Schema
The application uses three main models:
- `Admin`: For authentication and admin user management
- `Jobs`: Tracks scraping and background tasks
- `Trips`: Stores travel package information

## API Routes
- `/api/admin/*` - Admin authentication and management
- `/api/trips/*` - Travel package CRUD operations
- `/api/jobs/*` - Job queue management

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
[License Type] - See LICENSE file for details
