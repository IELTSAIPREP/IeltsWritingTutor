# IELTS Writing Practice Application

## Overview

This is a full-stack web application designed to help users practice IELTS writing skills. The application provides a comprehensive writing environment with real-time word counting, timer functionality, writing prompts, and feedback mechanisms to improve essay writing performance.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for development and building
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming support (light/dark modes)
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod schema validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with structured route handlers
- **Middleware**: Custom logging, JSON parsing, and error handling

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Local Storage**: Browser localStorage for auto-saving essay content and user preferences

## Key Components

### Core Features
1. **Writing Interface**: Rich textarea with real-time word/character counting
2. **Timer System**: Configurable countdown timer for timed practice sessions
3. **Prompt Library**: Categorized writing prompts with difficulty levels
4. **Auto-save Functionality**: Automatic saving of essay content to localStorage
5. **Export Capabilities**: Text file export functionality for completed essays
6. **Responsive Design**: Mobile-first approach with collapsible sidebar

### Database Schema
- **Essays Table**: Stores user essays with metadata (title, content, word count, time spent)
- **Prompts Table**: Contains writing prompts organized by category and difficulty
- **Shared Types**: TypeScript types generated from Drizzle schema with Zod validation

### UI Components
- **Responsive Layout**: Header, sidebar, and main writing area
- **Statistics Panel**: Real-time writing statistics and progress tracking
- **Mobile Support**: Collapsible sidebar with floating action button
- **Toast Notifications**: User feedback for actions like save, export, clear

## Data Flow

1. **Prompt Selection**: User selects from pre-loaded writing prompts via API
2. **Writing Session**: Content is auto-saved to localStorage every 2 seconds
3. **Real-time Updates**: Word count, character count, and progress are calculated live
4. **Timer Management**: Independent timer system with start/pause/reset functionality
5. **Data Persistence**: Essays can be saved to database via API endpoints
6. **Export Flow**: Local content can be exported as text files

## External Dependencies

### Production Dependencies
- **UI Framework**: React ecosystem with modern hooks and context
- **Database**: Neon PostgreSQL with connection pooling
- **Validation**: Zod for runtime type checking and form validation
- **Styling**: Tailwind CSS with PostCSS processing
- **Date Handling**: date-fns for date manipulation
- **Icons**: Lucide React for consistent iconography

### Development Tools
- **Build System**: Vite with React plugin and TypeScript support
- **Database Migrations**: Drizzle Kit for schema management
- **Development Server**: Express with Vite middleware integration
- **TypeScript**: Strict type checking with path mapping
- **Replit Integration**: Development banner and cartographer for debugging

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database Setup**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Development Mode**: Vite dev server with HMR and error overlay
- **Production Mode**: Compiled Express server serving static assets

### Deployment Targets
- **Replit**: Native support with development banners and debugging tools
- **Traditional Hosting**: Standard Node.js deployment with environment variables
- **Database**: Neon Database with connection string configuration

## Technical Decisions

### Architecture Choices
- **Monorepo Structure**: Client, server, and shared code in single repository
- **Type Safety**: End-to-end TypeScript with shared schema definitions
- **Real-time Features**: Client-side state management for responsive user experience
- **Offline Capability**: localStorage ensures work is preserved during network issues

### Performance Optimizations
- **Code Splitting**: Vite handles automatic code splitting and lazy loading
- **Caching Strategy**: TanStack Query provides intelligent server state caching
- **Bundle Size**: Selective imports and tree shaking minimize bundle size
- **Development Experience**: Fast refresh and error overlay for rapid iteration