# SDS COEP - Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Features](#features)
4. [Project Structure](#project-structure)
5. [Setup Instructions](#setup-instructions)
6. [Pages & Routes](#pages--routes)
7. [Components](#components)
8. [Authentication](#authentication)
9. [Backend (Lovable Cloud)](#backend-lovable-cloud)
10. [Deployment](#deployment)

---

## Project Overview

**SDS COEP** is a web application for the Software Development Society at COEP (College of Engineering, Pune). The platform serves as a central hub for:
- Showcasing club information and activities
- Managing projects and sessions
- Facilitating project requests
- User authentication (Students, Faculty, Event Organisers)
- Team member profiles

**Project URL**: https://lovable.dev/projects/7ef49d69-df0c-4b2b-8d38-41522b67ad93

---

## Technology Stack

### Frontend
- **React** 18.3.1 - UI library
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **React Router DOM** 6.30.1 - Client-side routing

### UI Libraries
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **class-variance-authority** - Variant styling
- **tailwind-merge** - Tailwind class merging
- **tailwindcss-animate** - Animation utilities

### Backend
- **Lovable Cloud** (powered by Supabase)
  - PostgreSQL database
  - Authentication
  - Storage
  - Edge Functions

### State Management & Data Fetching
- **@tanstack/react-query** 5.83.0 - Server state management
- **React Hook Form** 7.61.1 - Form handling
- **Zod** 3.25.76 - Schema validation

---

## Features

### Public Features
1. **Home Page** - Hero section with CTAs, features grid, and about section
2. **About Page** - Mission, vision, values, and statistics
3. **Team Page** - Team member profiles with images and roles
4. **Projects Page** - Showcase of completed and ongoing projects
5. **Sessions Page** - Past events, workshops, and hackathons
6. **Contact Page** - Contact form and information
7. **Request Project Page** - Form for project submissions

### Authentication Features
- **Login System** with role selection:
  - Student
  - Faculty
  - Event Organiser
- Email and password authentication
- Protected routes (ready for implementation)

### Responsive Design
- Mobile-friendly navigation
- Adaptive layouts for all screen sizes
- Touch-optimized interactions

---

## Project Structure

```
sds-coep/
├── public/
│   ├── robots.txt
│   ├── favicon.ico
│   └── placeholder.svg
├── src/
│   ├── assets/
│   │   ├── hero-bg.jpg
│   │   └── about-team.jpg
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Navigation.tsx   # Header navigation
│   │   └── Footer.tsx       # Footer component
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts    # Supabase client (auto-generated)
│   │       └── types.ts     # Database types (auto-generated)
│   ├── lib/
│   │   └── utils.ts         # Utility functions
│   ├── pages/
│   │   ├── Index.tsx        # Home page
│   │   ├── About.tsx        # About page
│   │   ├── Team.tsx         # Team page
│   │   ├── Projects.tsx     # Projects page
│   │   ├── Sessions.tsx     # Sessions page
│   │   ├── Contact.tsx      # Contact page
│   │   ├── RequestProject.tsx
│   │   ├── Login.tsx        # Login page
│   │   └── NotFound.tsx     # 404 page
│   ├── App.tsx              # Main app component with routing
│   ├── App.css
│   ├── index.css            # Global styles & design tokens
│   ├── main.tsx             # App entry point
│   └── vite-env.d.ts
├── supabase/
│   └── config.toml          # Supabase configuration
├── .env                     # Environment variables
├── tailwind.config.ts       # Tailwind configuration
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

---

## Setup Instructions

### Prerequisites
- Node.js (LTS version recommended)
- npm or bun package manager

### Installation

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd sds-coep
```

2. **Install dependencies**
```bash
npm install
# or
bun install
```

3. **Start development server**
```bash
npm run dev
# or
bun dev
```

4. **Access the application**
- Open browser to `http://localhost:5173`

### Environment Variables

The `.env` file is auto-generated with Lovable Cloud and contains:
```
VITE_SUPABASE_URL=<your-supabase-url>
VITE_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
VITE_SUPABASE_PROJECT_ID=jcwietlcfbpxffobacmp
```

**Note**: Never commit `.env` to version control.

---

## Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Index.tsx | Home page with hero and features |
| `/about` | About.tsx | Organization information |
| `/team` | Team.tsx | Team member profiles |
| `/projects` | Projects.tsx | Project showcase |
| `/sessions` | Sessions.tsx | Past events and workshops |
| `/contact` | Contact.tsx | Contact form and info |
| `/request-project` | RequestProject.tsx | Project request form |
| `/login` | Login.tsx | Authentication page |
| `*` | NotFound.tsx | 404 error page |

---

## Components

### Navigation Components
- **Navigation.tsx** - Responsive header with desktop and mobile navigation
- **Footer.tsx** - Site footer with links and info

### UI Components (shadcn/ui)
Located in `src/components/ui/`:
- `button.tsx` - Button component with variants
- `card.tsx` - Card container component
- `input.tsx` - Form input component
- `textarea.tsx` - Textarea component
- `select.tsx` - Dropdown select
- `badge.tsx` - Badge/tag component
- `toast.tsx` & `toaster.tsx` - Toast notifications
- `dialog.tsx` - Modal dialogs
- `sheet.tsx` - Slide-out panels
- And many more...

### Design System

All components use semantic tokens defined in `src/index.css`:
```css
:root {
  --background
  --foreground
  --primary
  --secondary
  --accent
  --muted
  --destructive
  /* ... and more */
}
```

**Important**: Always use semantic tokens, never hardcoded colors.

---

## Authentication

### Current Implementation

**Login Page** (`/login`):
- Email and password fields
- Role selection dropdown:
  - Student
  - Faculty  
  - Event Organiser
- Form validation
- Toast notifications

### Backend Setup (Ready for Integration)

Lovable Cloud provides:
- Supabase Auth integration
- Email/password authentication
- Protected routes capability
- User session management

### Next Steps for Full Auth Implementation

1. **Database Schema**: Create user profiles table
2. **Sign Up Flow**: Add registration page
3. **Protected Routes**: Implement route guards
4. **Role-Based Access**: Set up RLS policies
5. **User Dashboard**: Create role-specific dashboards

---

## Backend (Lovable Cloud)

### Project Information
- **Supabase Project ID**: jcwietlcfbpxffobacmp
- **Platform**: Lovable Cloud (Supabase-powered)

### Available Services

1. **Database** (PostgreSQL)
   - CRUD operations
   - Real-time subscriptions
   - Row Level Security (RLS)

2. **Authentication**
   - Email/password
   - OAuth providers
   - Session management

3. **Storage**
   - File uploads
   - Secure buckets
   - Public/private assets

4. **Edge Functions**
   - Serverless functions
   - API endpoints
   - Background jobs

### Using Supabase Client

```typescript
import { supabase } from "@/integrations/supabase/client";

// Example: Query data
const { data, error } = await supabase
  .from('table_name')
  .select('*');

// Example: Insert data
const { data, error } = await supabase
  .from('table_name')
  .insert({ column: 'value' });
```

**Important**: Never edit these auto-generated files:
- `src/integrations/supabase/client.ts`
- `src/integrations/supabase/types.ts`
- `.env`

---

## Deployment

### Via Lovable Platform

1. Click **Publish** button in Lovable editor
2. Your app is deployed to: `<your-site>.lovable.app`

### Custom Domain

1. Navigate to **Project > Settings > Domains**
2. Click **Connect Domain**
3. Follow DNS configuration steps
4. Requires paid Lovable plan

### Manual Deployment

Build the project:
```bash
npm run build
```

Deploy the `dist` folder to any static hosting:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

---

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use semantic HTML
- Implement responsive design
- Use semantic tokens for styling

### Component Creation
- Keep components focused and small
- Use composition over inheritance
- Implement proper prop typing
- Add JSDoc comments for complex logic

### State Management
- Use React Query for server state
- Use React Hook Form for forms
- Keep local state minimal
- Lift state only when necessary

### Performance
- Lazy load routes and heavy components
- Optimize images (use appropriate formats)
- Minimize bundle size
- Use React.memo() for expensive renders

---

## Team Members

1. **Sanika Jadhav** - President (Development & Operations)
2. **Atharva Nikam** - Vice President (Strategy & Planning)
3. **Priya Sharma** - Technical Lead (Architecture & Code Review)
4. **Rahul Deshmukh** - UI/UX Designer (Design & User Experience)
5. **Sneha Kulkarni** - Marketing Head (Outreach & Branding)
6. **Arjun Patil** - Event Coordinator (Workshops & Sessions)
7. **Neha Joshi** - Content Writer (Documentation & Social Media)
8. **Rohan Mehta** - Community Manager (Member Engagement)

---

## Support & Resources

### Lovable Documentation
- [Quickstart Guide](https://docs.lovable.dev/user-guides/quickstart)
- [Lovable Cloud Features](https://docs.lovable.dev/features/cloud)
- [Custom Domain Setup](https://docs.lovable.dev/features/custom-domain)

### Technology Docs
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [React Router](https://reactrouter.com)

### Community
- [Lovable Discord](https://discord.com/channels/1119885301872070706/1280461670979993613)
- [Lovable YouTube](https://www.youtube.com/watch?v=9KHLTZaJcR8&list=PLbVHz4urQBZkJiAWdG8HWoJTdgEysigIO)

---

## License

This project is created with Lovable and follows their terms of service.

---

## Version History

- **v1.0.0** - Initial release
  - Core pages implemented
  - Authentication system setup
  - Team profiles added
  - Lovable Cloud enabled

---

**Last Updated**: 2025-10-18  
**Maintained By**: SDS COEP Team
