# AI-Powered Agent Training Sandbox

## Overview

This is a web application designed to personalize call center agent training using AI, aiming to reduce onboarding time from 6 weeks to 3 weeks through adaptive learning and real-scenario simulations. The platform provides interactive training modules, live customer simulations, performance analytics, and a searchable knowledge base. It features gamification elements including XP points, achievements, skill trees, and leaderboards to engage trainees.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript
- **Routing**: Wouter for client-side navigation
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design system based on Linear, Material Design, and Duolingo aesthetics
- **Form Handling**: React Hook Form with Zod validation

**Design System**:
- Primary font: Inter (Google Fonts)
- Color scheme: Primary (#4A90E2), Secondary (#7B68EE), Success (#52C41A), Warning (#FAAD14)
- Component library follows "new-york" shadcn style with neutral base color
- Custom spacing scale and container system for consistent layouts

**Key Pages**:
- Dashboard: Progress tracking, recommended modules, performance trends
- Training Modules: Skill tree visualization, adaptive difficulty content
- Live Simulation: AI-powered customer interaction scenarios with real-time feedback
- Analytics: Performance metrics, peer comparison, readiness predictions
- Knowledge Base: AI-powered search, FAQ, decision trees
- Onboarding Wizard: Multi-step assessment to personalize training paths

### Backend Architecture

**Runtime**: Node.js with Express
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful endpoints under `/api` namespace
- **Request Handling**: JSON body parsing with raw body preservation for webhooks
- **Logging**: Custom middleware for request/response logging with timing

**Core Services**:
- **Storage Layer**: Abstracted database operations through `IStorage` interface
- **Simulation Engine**: In-memory AI simulation without external API calls
  - Sentiment analysis based on keyword matching
  - Contextual response generation
  - Dynamic feedback based on conversation history
- **Seeding**: Automated database seeding with training modules, simulations, and demo users

**Session Management**: Server-side sessions (infrastructure suggests connect-pg-simple for PostgreSQL session store)

### Data Storage

**Database**: PostgreSQL via Neon serverless
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Connection**: WebSocket-based connection pooling for serverless environments
- **Migration Strategy**: Drizzle Kit for schema migrations

**Schema Design**:
- `users`: Extended profile with experience level, learning style, role, XP, completion tracking
- `trainingModules`: Hierarchical modules with prerequisites, difficulty levels, JSONB content
- `userModuleProgress`: Granular tracking of completion, quiz scores, time spent
- `simulations`: AI customer scenarios with persona definitions and expected outcomes
- `simulationResults`: Historical performance data with conversation logs
- `achievements`: Gamification system for badges and milestones
- `performanceMetrics`: Time-series analytics for trend analysis
- `knowledgeArticles`: Searchable knowledge base with categorization

**Data Patterns**:
- JSONB fields for flexible content structures (module content, quiz questions, customer personas)
- Array fields for prerequisites and tags
- Timestamp tracking for created/updated/completed states
- UUID primary keys with auto-generation

### Authentication & Authorization

**Current Implementation**: Session-based authentication
- Login/registration endpoints with password handling
- User context stored in localStorage (client-side)
- Protected route logic with redirect to login
- Onboarding flow gating for new users

**Session Storage**: PostgreSQL-backed sessions via connect-pg-simple

### External Dependencies

**Database Service**: Neon PostgreSQL (serverless)
- Accessed via `@neondatabase/serverless` package
- WebSocket connections using `ws` library
- Connection string via `DATABASE_URL` environment variable

**UI Component Libraries**:
- Radix UI: Accessible primitive components (dialogs, dropdowns, tooltips, etc.)
- Recharts: Data visualization for performance charts
- cmdk: Command palette functionality
- Lucide React: Icon system

**Development Tools**:
- Vite: Build tool and dev server with HMR
- Replit plugins: Runtime error overlay, cartographer, dev banner
- TSX: TypeScript execution for development

**Planned AI Integration**: Claude/GPT API for enhanced simulation responses (infrastructure present but using in-memory engine currently)

**Font Service**: Google Fonts (Inter family)