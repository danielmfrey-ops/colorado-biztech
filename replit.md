# Colorado BizTech

## Overview

Colorado BizTech is a data-driven intelligence platform for Colorado's high-growth technology ecosystem. We provide comprehensive directories, objective analyses, and benchmarks across 13 technology sectors. The platform follows a "Report-First" strategy with the BizTech 100 Colorado Rankings as the flagship product, launched January 2026.

## Business Strategy

**Mission**: To serve as the definitive, objective reporting platform for Colorado's high-growth technology ecosystem by delivering data-driven insights, peer-state benchmarks, and best practices.

**Core Value Proposition**: Neutral reporter and facilitator providing:
- Comprehensive directories (Colorado Tech Directory, Deal Flow Database)
- Objective analyses with state comparisons (Scoreboard benchmarks)
- Feedback-driven content prioritization (Community Survey)
- AI-powered features (Coming Soon)

**Target Audience**:
- Founders/Startups (60%)
- Investors/VCs (20%)
- Supporting orgs/Universities (20%)

**Deep Tech Focus Areas**:
- AI (Artificial Intelligence)
- Energy (Clean Tech, Grid Modernization)
- Space & Aerospace (Sierra Space, BAE Space & Mission Systems)
- Biotech & Life Sciences (Fitzsimons, CSU research)
- Quantum Computing (NIST, JILA, CU Boulder)

**Custom Domain Status**:
- `coloradobiztech.com` is verified and live.
- `www.coloradobiztech.com` DNS A record added. Waiting for verification/propagation.
- All registrations and survey notifications verified working.
- **DNS Provider**: Replit manages DNS for coloradobiztech.com (domain purchased through Replit).

**Product Tiers**:
- Free: Basic directory, Scoreboard access, weekly newsletter, annual report
- BizTech Pro ($15/mo or $120/year, free 30-day trial): Full AI queries, deep reports, 1 free job post/month
- Team Tier ($999/year): Multi-user, custom benchmarks

**Launch Timeline**: January 2026 beta with BizTech 100 Colorado Rankings report

**Founder**: Daniel Frey, Boulder CO, St. Elmo LLC

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Tooling**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and API data fetching

**UI Component System**
- Shadcn/ui component library based on Radix UI primitives
- Tailwind CSS v4 for utility-first styling with CSS variables for theming
- Custom design system using "Space Grotesk" display font and "Inter" for body text
- Dark theme (bg-slate-950) with slate color palette and blue accent colors
- Comprehensive component set including forms, dialogs, sheets, and data visualization

**Pages**
- Home: Hero section with BizTech 100 launch, Top 10 preview, executive summary, sector cards, research hubs
- News & Analysis: Featured articles and news coverage
- Resources: Searchable Colorado Tech company database (18+ companies)
- Survey: Community feedback form to drive content priorities
- Subscribe: Free/Pro tier signup with partnership inquiries
- About: Mission, approach, founder bio

**State Management**
- React Query handles all server state with infinite stale time and disabled refetching
- Local component state using React hooks
- Toast notifications via custom hook system

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server framework
- Node.js runtime with ES modules (type: "module")
- Custom logging middleware tracking request duration and response details
- HTTP server wrapped for potential WebSocket support

**API Design**
- RESTful API endpoints under `/api` prefix
- Endpoints:
  - `POST /api/subscribe` - Newsletter subscription with duplicate detection
  - `POST /api/contact` - Contact inquiry and survey submission
  - `GET /api/companies` - Directory search with sector/city filters
  - `GET /api/deals` - Deal Flow search with round/sector filters
- JSON request/response format with Zod schema validation
- Consistent error handling with appropriate HTTP status codes

**Development vs Production**
- Development: Vite middleware integration with HMR over custom `/vite-hmr` path
- Production: Static file serving from `dist/public` with SPA fallback
- Build process uses esbuild for server bundling with selective dependency bundling

### Data Storage

**Database**
- PostgreSQL via Neon serverless driver for connection pooling
- Drizzle ORM for type-safe database queries and schema management
- Schema-first approach with TypeScript types inferred from database schema

**Data Models**
- `subscribers` table: email, id, subscribedAt timestamp
- `contactInquiries` table: name, email, company (optional), interest, createdAt timestamp
- `companies` table: name, description, sector, city, website, fundingStage, fundingAmount, employeeCount, founded
- `deals` table: company, round, amount, leadInvestor, articleLink, dealDate, sector

**Schema Management**
- Drizzle Kit for migrations in `./migrations` directory
- `db:push` script for schema synchronization
- Zod schemas generated from Drizzle tables for runtime validation

### External Dependencies

**Database & Hosting**
- Neon Serverless PostgreSQL (requires `DATABASE_URL` environment variable)
- Replit deployment platform with custom Vite plugins

**Third-Party Services**
- Google Fonts (Space Grotesk, Inter)
- Lucide React for iconography
- No authentication system currently implemented
- No email service integration (inquiries stored in database only)
- AI features marked as "Coming Soon" (OpenAI integration planned)

**Build & Development Tools**
- TypeScript with strict mode and incremental compilation
- PostCSS with Tailwind CSS and Autoprefixer
- Path aliases: `@/` for client source, `@shared/` for shared code, `@assets/` for attached assets
- Custom build script bundles server and client separately

## Recent Changes (January 2026)

- Streamlined registration to single-screen form (name, email, company only)
- Instant PDF downloads (executive summary + full report) after registration
- Dashboard created to view and analyze survey responses
- Gmail integration for admin notifications when surveys are submitted to Dan@ColoradoBizTech.com
- Survey data exportable to CSV from dashboard
- Session-based authentication fully implemented
- Custom domain (coloradobiztech.com) configured and live
- Launched BizTech 100 Colorado Rankings as flagship product
- New homepage hero with Top 10 companies preview and executive summary
- Colorado Tech Directory with 18+ companies, searchable by name/sector/city
