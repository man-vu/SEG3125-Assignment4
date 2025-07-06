# WebDev Academy - E-commerce Learning Platform

A comprehensive React-based e-commerce platform for web development courses, featuring advanced faceted search, interactive buying flow, and user feedback systems.

## 🚀 Features

### Core E-commerce Functionality
- **Course Catalog**: 24 comprehensive web development courses
- **Advanced Faceted Search**: Filter by category, level, price, duration, and rating
- **Shopping Cart**: Add/remove courses with real-time updates
- **Checkout Process**: Multi-step checkout with progress indicators
- **Order Confirmation**: Complete purchase flow

### Interactive Processes
- **Buying Flow**: Seamless course selection to purchase completion
- **Faceted Search**: Advanced filtering and sorting capabilities
- **Survey System**: Multi-step feedback collection with engaging UI

### Communication Elements
- **Incite to Action**: Promotional content and call-to-action buttons
- **Inform**: Detailed course information and instructor profiles
- **Engage**: Interactive elements and community building

### Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: Toggle between themes
- **TypeScript**: Full type safety throughout the application
- **Modern React**: Hooks, Context API, and functional components
- **Accessibility**: WCAG compliant design patterns

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Radix UI components
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📁 Project Structure

```
├── src/
│   ├── App.tsx                    # Main application with routing
│   ├── components/
│   │   ├── CoursesPage.tsx        # Course catalog with faceted search
│   │   ├── CourseDetailsPage.tsx  # Individual course details
│   │   ├── CartPage.tsx           # Shopping cart management
│   │   ├── CheckoutPage.tsx       # Multi-step checkout process
│   │   ├── OrderConfirmationPage.tsx # Purchase confirmation
│   │   ├── SurveyPage.tsx         # User feedback collection
│   │   ├── StatusMessage.tsx      # Status notifications
│   │   └── ui/                    # Reusable UI components
│   ├── context/
│   │   ├── AuthContext.tsx        # Authentication state
│   │   ├── CartContext.tsx        # Shopping cart state
│   │   └── StatusContext.tsx      # Status message management
│   ├── data/
│   │   └── courses.ts             # Course data and types
│   ├── hooks/
│   │   ├── useAuth.ts             # Authentication hooks
│   │   ├── useStatus.ts           # Status management hooks
│   │   └── useTheme.ts            # Theme toggle functionality
│   ├── lib/
│   │   └── utils.ts               # Utility functions
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles
├── index.html                     # HTML template
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
└── eslint.config.js               # ESLint configuration
```

## 🎯 Course Categories

- **Full Stack Development**: Complete web development bootcamps
- **Frontend**: React, Vue.js, Angular, CSS, JavaScript
- **Backend**: Node.js, Python, APIs, Database design
- **JavaScript**: Fundamentals, TypeScript, Advanced patterns
- **Database**: SQL, MongoDB, Design principles
- **DevOps**: CI/CD, Docker, Cloud deployment
- **Security**: Web security, Authentication, OWASP
- **Mobile**: PWA, Mobile-first design
- **Testing**: Unit testing, E2E testing, Test-driven development
- **Performance**: Optimization, Monitoring, Caching
- **Tools**: Git, Webpack, Build tools
- **Accessibility**: WCAG guidelines, Inclusive design

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd webdev-academy

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build
- `npm run lint` — Lint source files

## 🎨 Design Principles

### Visual Design
- **Modern UI**: Clean, professional interface
- **Consistent Branding**: Purple/blue color scheme
- **Responsive Layout**: Mobile-first design approach
- **Accessibility**: High contrast, keyboard navigation

### User Experience
- **Intuitive Navigation**: Clear information architecture
- **Progressive Disclosure**: Information revealed as needed
- **Feedback Systems**: Status messages and loading states
- **Error Handling**: Graceful error states and recovery

## 📊 Course Data Structure

Each course includes:
- **Basic Info**: Title, description, instructor details
- **Pricing**: Current and original prices
- **Metadata**: Duration, difficulty level, category
- **Social Proof**: Student count, ratings, reviews
- **Features**: Course highlights and included materials
- **Skills**: Technologies and concepts covered

## 🔧 Customization

### Adding New Courses
Edit `src/data/courses.ts` to add new courses following the existing structure.

### Modifying Filters
Update the faceted search filters in `src/components/CoursesPage.tsx` to add new filter categories.

### Styling Changes
Modify `src/index.css` and Tailwind classes for styling updates.

## 🌐 Deployment

The application is ready for deployment on any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3

## 📝 License

This project is created for educational purposes as part of SEG3125 Assignment 4.

## 🤝 Contributing

This is an academic project, but suggestions and improvements are welcome through issues and pull requests.
