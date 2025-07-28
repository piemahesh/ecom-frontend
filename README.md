# E-commerce App

A modern, full-featured e-commerce application built with React, TypeScript, Redux Toolkit, and Tailwind CSS.

## Features

- 🛍️ Product catalog with search and filtering
- 🛒 Shopping cart with persistent state
- 👤 User authentication (login/signup)
- 💳 Checkout flow with mock payment
- 📱 Responsive design with dark/light theme
- 🔐 Admin dashboard for order/product management
- ✅ Order confirmation and tracking
- 🧪 Unit tests with Vitest
- 🐳 Docker containerization

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **State Management**: Redux Toolkit
- **Routing**: React Router v6
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion
- **Testing**: Vitest, React Testing Library
- **Build Tool**: Vite
- **Containerization**: Docker

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Docker (optional)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ecommerce-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Demo Accounts

- **User Account**: user@demo.com / password: demo123
- **Admin Account**: admin@demo.com / password: admin123

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run unit tests
- `npm run test:ui` - Run tests with UI
- `npm run lint` - Run ESLint

## Docker

### Build and run with Docker:

```bash
# Build the image
docker build -t ecommerce-app .

# Run the container
docker run -p 3000:80 ecommerce-app
```

### Or use Docker Compose:

```bash
docker-compose up -d
```

## Architecture

The application follows a feature-based architecture:

```
src/
├── app/                 # Redux store configuration
├── components/          # Reusable UI components
├── contexts/           # React contexts (theme)
├── features/           # Feature-based modules
│   ├── auth/          # Authentication
│   ├── products/      # Product management
│   ├── cart/          # Shopping cart
│   ├── orders/        # Order management
│   └── admin/         # Admin dashboard
├── hooks/             # Custom hooks
├── types/             # TypeScript type definitions
└── test/              # Test utilities

```

## Features Overview

### Product Management
- Product listing with search and category filters
- Detailed product pages with images and descriptions
- Inventory tracking

### Shopping Cart
- Persistent cart state (localStorage)
- Add/remove items with quantity control
- Real-time total calculation
- Sliding cart sidebar

### User Authentication
- Login/signup forms with validation
- Protected routes for authenticated users
- Role-based access control (admin/user)

### Checkout Process
- Shipping address form
- Mock payment processing
- Order confirmation with tracking

### Admin Dashboard
- Order management with status updates
- Product inventory overview
- Sales analytics and metrics

### Theme Support
- Light/dark mode toggle
- Persistent theme preference
- Smooth transitions

## Testing

The app includes comprehensive unit tests for:
- Redux slices and actions
- React components
- Utility functions

Run tests with:
```bash
npm run test
```

## Mock Data

The application uses mock data for demonstration purposes:
- Products are loaded from a predefined array
- Orders are stored in localStorage
- Payment processing is simulated

## Production Considerations

For production deployment, consider:
- Real backend API integration
- Database setup (PostgreSQL/MongoDB)
- Payment gateway integration (Stripe/PayPal)
- Image optimization and CDN
- Error monitoring (Sentry)
- Analytics (Google Analytics)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## License

MIT License - see LICENSE file for details.