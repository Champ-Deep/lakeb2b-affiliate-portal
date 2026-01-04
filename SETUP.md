# Setup Guide - Lake B2B Affiliate Portal

This guide will help you set up the development environment and run the application locally.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20 or higher ([Download](https://nodejs.org/))
- **npm** 10 or higher (comes with Node.js)
- **PostgreSQL** 15 or higher (for production) OR use Prisma's local development database

## Quick Start

### 1. Clone and Install

```bash
# Navigate to project directory
cd lakeb2b-affiliate-portal

# Install dependencies (already done if you see node_modules folder)
npm install
```

### 2. Database Setup

You have two options:

#### Option A: Use Prisma Local Database (Easiest for Development)

The project is already configured to use Prisma's local PostgreSQL instance. Just run:

```bash
# Start Prisma local database and run migrations
npx prisma dev
```

This will:
- Start a local PostgreSQL database
- Run migrations to create all tables
- Keep running in the background

#### Option B: Use Your Own PostgreSQL Database

1. Install PostgreSQL locally:
   - **macOS**: `brew install postgresql && brew services start postgresql`
   - **Ubuntu**: `sudo apt-get install postgresql && sudo service postgresql start`
   - **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)

2. Create a database:
```bash
createdb lakeb2b_affiliate
```

3. Update `.env` file with your connection string:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/lakeb2b_affiliate"
```

4. Run migrations:
```bash
npx prisma migrate dev --name init
```

### 3. Configure Environment Variables

The `.env` file has been created with default development values. Review and update if needed:

```env
# Database - already configured
DATABASE_URL="prisma+postgres://localhost:..."

# NextAuth.js - already configured
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="development-secret-key-change-in-production-to-secure-random-string"

# Application Settings
NODE_ENV="development"
APP_URL="http://localhost:3000"
```

For production, you'll need to:
1. Generate a secure `NEXTAUTH_SECRET`: `openssl rand -base64 32`
2. Set up email service (SendGrid, etc.)
3. Configure payment providers (Stripe, PayPal)

### 4. Generate Prisma Client

```bash
npx prisma generate
```

This generates the TypeScript types for your database models.

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

## What's Been Set Up

### ✅ Complete Database Schema
- User authentication (with NextAuth.js)
- Affiliate profiles
- Click tracking
- Conversion tracking
- Campaign management
- Payout system
- Commission rules
- Audit logging

### ✅ Authentication System
- Email/password login
- User registration with automatic affiliate creation
- Session management
- Route protection middleware
- Role-based access control (ADMIN, MANAGER, AFFILIATE)

### ✅ Pages Created
- **Home page** (`/`) - Landing page with CTA
- **Login** (`/login`) - User authentication
- **Registration** (`/register`) - New user sign-up
- **Dashboard** (`/dashboard`) - Affiliate dashboard with stats

### ✅ Project Structure
```
src/
├── app/
│   ├── (auth)/          # Auth pages (login, register)
│   ├── (dashboard)/     # Protected dashboard pages
│   ├── api/             # API routes
│   └── layout.tsx       # Root layout
├── components/          # React components
├── lib/
│   ├── auth.ts         # NextAuth configuration
│   ├── prisma.ts       # Database client
│   └── utils.ts        # Utility functions
├── types/              # TypeScript types
└── middleware.ts       # Route protection
```

## Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:generate     # Generate Prisma Client
npm run db:push         # Push schema without migrations
npm run db:migrate      # Create and run migrations
npm run db:studio       # Open Prisma Studio (database GUI)

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # Check TypeScript types
```

## Testing the Application

### 1. Create Your First User

1. Navigate to http://localhost:3000
2. Click "Get Started" or go to `/register`
3. Fill in the registration form:
   - Name: Your Name
   - Email: your@email.com
   - Password: (min 8 characters)
4. Submit the form

### 2. Login

1. You'll be redirected to `/login?registered=true`
2. Enter your credentials
3. You'll be redirected to the dashboard

### 3. Explore the Dashboard

Your dashboard will show:
- Your unique affiliate code
- Earnings statistics (currently $0)
- Click and conversion counts
- Quick action links

## Database Management

### View Your Database

Open Prisma Studio to browse and edit data:

```bash
npm run db:studio
```

This opens a GUI at http://localhost:5555 where you can:
- View all tables
- Edit records
- Add test data
- Run queries

### Reset Database (Development Only)

If you need to start fresh:

```bash
npx prisma migrate reset
```

⚠️ This will delete all data!

## Troubleshooting

### Port 3000 is Already in Use

```bash
# Run on a different port
npm run dev -- -p 3001
```

### Database Connection Error

If using local PostgreSQL:
```bash
# Check if PostgreSQL is running
# macOS:
brew services list | grep postgresql

# Linux:
sudo service postgresql status

# Start it if needed
brew services start postgresql  # macOS
sudo service postgresql start   # Linux
```

If using Prisma Dev:
```bash
# Restart Prisma local database
npx prisma dev
```

### Prisma Client Not Generated

```bash
npx prisma generate
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Regenerate Prisma Client
npx prisma generate
```

### TypeScript Errors

```bash
# Check for errors
npm run type-check

# Most common fix: regenerate Prisma Client
npx prisma generate
```

## Next Steps

Now that your development environment is set up, you can:

1. **Customize the UI**: Edit components in `src/components/`
2. **Add Features**: Create new pages and API routes
3. **Integrate Services**: Add email, payment, and analytics services
4. **Deploy**: Follow the deployment guide in DEPLOYMENT_PLAN.md

## Getting Help

- **Documentation**: Check DEPLOYMENT_PLAN.md and QUICK_START_GUIDE.md
- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **NextAuth.js**: https://next-auth.js.org

## Production Deployment

When you're ready to deploy:

1. Review DEPLOYMENT_PLAN.md
2. Set up a production database (Supabase, Neon, or similar)
3. Configure all environment variables
4. Deploy to Vercel, AWS, or your preferred platform

---

**Happy coding!** If you encounter any issues, check the troubleshooting section above or refer to the official documentation.
