# Finance SaaS Application

A modern financial management application built with Next.js that helps users track transactions, manage accounts, and visualize spending patterns.

## Features

- 📊 Interactive dashboards with spending analytics
- 💰 Transaction management and tracking
- 🏦 Multiple account support
- 📁 Category-based expense organization
- 📈 Data visualization with various chart types
- 🌙 Dark/Light theme support
- 🔒 User authentication with Clerk
- 📱 Responsive design

## Tech Stack

- **Framework:** Next.js 14
- **Authentication:** Clerk
- **Database:** PostgreSQL with Drizzle ORM
- **API:** Hono
- **Styling:** Tailwind CSS
- **Components:** Radix UI
- **Charts:** Recharts
- **State Management:** Tanstack Query
- **Form Handling:** React Hook Form
- **Data Validation:** Zod
- **Package Manager:** pnpm

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd finance-sass-app
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_APP_URL=

DATABASE_URL=---YOUR_POSTGRESQL_DATABASE_URL---
```

4. Run database migrations:

```bash
pnpm db:push
```

5. Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## Project Structure

- `/app` - Next.js application routes and API endpoints
- `/components` - Reusable UI components
- `/db` - Database schema and configuration
- `/features` - Feature-specific components and logic
- `/lib` - Utility functions and shared code
- `/providers` - React context providers
- `/public` - Static assets
- `/scripts` - Database and development scripts

## Database Setup

The application uses PostgreSQL with Drizzle ORM for database management. Make sure to:

1. Have PostgreSQL installed and running
2. Set up your database URL in the environment variables
3. Run migrations before starting the application

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
