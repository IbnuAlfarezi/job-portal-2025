# JobPortal 2025 - Frontend

A modern, responsive job portal built with Next.js 14, TypeScript, and TailwindCSS. This application provides a comprehensive platform for job seekers and employers to connect and find opportunities.

## 🚀 Features

### Core Functionality

- **Job Search & Filtering**: Advanced search with filters for location, job type, salary, and skills
- **Company Discovery**: Browse and explore companies with detailed information
- **User Authentication**: Secure login/register system with role-based access
- **Job Applications**: Apply to jobs and track application status
- **Bookmarking**: Save favorite jobs for later review
- **Responsive Design**: Mobile-first approach with modern UI/UX

### Technical Features

- **Next.js 14**: App Router with server-side rendering
- **TypeScript**: Full type safety throughout the application
- **TailwindCSS**: Utility-first CSS framework with custom design system
- **shadcn/ui**: High-quality, accessible UI components
- **Framer Motion**: Smooth animations and transitions
- **React Query**: Efficient data fetching and caching
- **Zustand**: Lightweight state management
- **Dark Mode**: System-aware theme switching
- **PWA Ready**: Progressive Web App capabilities
- **Testing**: Jest, React Testing Library, and Playwright

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui + Radix UI
- **Animations**: Framer Motion
- **Icons**: Lucide React

### State Management

- **Client State**: Zustand
- **Server State**: React Query (TanStack Query)
- **Form Handling**: React Hook Form (ready for integration)

### Testing

- **Unit Testing**: Jest + React Testing Library
- **E2E Testing**: Playwright
- **Type Checking**: TypeScript

### Development Tools

- **Linting**: ESLint
- **Formatting**: Prettier
- **Package Manager**: npm
- **Build Tool**: Turbopack (Next.js)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── companies/         # Company-related pages
│   ├── jobs/              # Job-related pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components (header, footer)
│   └── shared/           # Shared components (job cards, etc.)
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and configurations
├── store/                # Zustand stores
├── styles/               # Additional styles
└── tests/                # Test files
    ├── components/       # Component tests
    └── e2e/             # End-to-end tests
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd job-portal-2025
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration.

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
# Development
npm run dev              # Start development server with Turbopack
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run type-check       # Run TypeScript type checking
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting

# Testing
npm run test             # Run unit tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage
npm run test:e2e         # Run end-to-end tests
npm run test:e2e:ui      # Run E2E tests with UI
npm run test:e2e:headed  # Run E2E tests in headed mode

# Analysis
npm run analyze          # Analyze bundle size
```

## 🎨 Design System

### Colors

- **Primary**: Blue (#3b82f6)
- **Secondary**: Gray (#64748b)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)

### Typography

- **Font**: Inter (Google Fonts)
- **Headings**: Font weights 600-700
- **Body**: Font weight 400
- **Small text**: Font weight 500

### Breakpoints

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run test:e2e
```

### Test Coverage

```bash
npm run test:coverage
```

## 📱 PWA Features

The application is PWA-ready with:

- **Manifest**: App metadata and icons
- **Service Worker**: Caching and offline support (ready for implementation)
- **Responsive Design**: Works on all device sizes
- **Install Prompt**: Can be installed on mobile devices

## 🌙 Dark Mode

The application supports system-aware dark mode:

- **Automatic**: Follows system preference
- **Manual**: User can override system setting
- **Persistent**: Remembers user preference

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Radix UI](https://www.radix-ui.com/) - Headless UI primitives
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## 📞 Support

For support, email support@jobportal.com or join our Slack channel.

---

Built with ❤️ by ITDEV TEAM
