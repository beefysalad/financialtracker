# Next.js Basecode with Prisma and shadcn/ui

This repository serves as a basecode for a Next.js project, leveraging **Prisma** for backend operations and **shadcn/ui** for building modern, accessible, and customizable user interfaces. Use this as a starting point for your Next.js applications.

---

## Features

- **Next.js 15**: Built with the latest version of Next.js, supporting the App Router and React Server Components.
- **Prisma**: A modern ORM for Node.js and TypeScript, providing a type-safe database client.
- **shadcn/ui**: A collection of beautifully designed, customizable, and accessible UI components.
- **TypeScript**: Fully typed for better developer experience and fewer runtime errors.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/beefysalad/NextJS.UI.Basecode.git
cd your-repo-name
```

### 2. Install dependencies

```base
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Setup Environmental Variables

Create a `.env` file in the root directory and add your environmental variables:

```base
# Created by Vercel CLI
AUTH_SECRET="your_auth_secret" # Added by `npx auth`. Read more: https://cli.authjs.dev
DATABASE_URL="postgres://user:password@your-db-host.com/dbname?sslmode=require"
DATABASE_URL_UNPOOLED="postgresql://user:password@your-db-host.com/dbname?sslmode=require"
PGDATABASE="your_db_name"
PGHOST="your-db-host.com"
PGHOST_UNPOOLED="your-db-host.com"
PGPASSWORD="your_db_password"
PGUSER="your_db_user"
POSTGRES_DATABASE="your_db_name"
POSTGRES_HOST="your-db-host.com"
POSTGRES_PASSWORD="your_db_password"
POSTGRES_PRISMA_URL="postgres://user:password@your-db-host.com/dbname?pgbouncer=true&connect_timeout=15&sslmode=require"
POSTGRES_URL="postgres://user:password@your-db-host.com/dbname?sslmode=require"
POSTGRES_URL_NON_POOLING="postgres://user:password@your-db-host.com/dbname?sslmode=require"
POSTGRES_URL_NO_SSL="postgres://user:password@your-db-host.com/dbname"
POSTGRES_USER="your_db_user"
AUTH_GOOGLE_ID="your_google_client_id"
AUTH_GOOGLE_SECRET="your_google_client_secret"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"
EMAIL_PASS="your_email_pass" # FOR EMAIL SENDING NOTIFICATION
EMAIL_USER="your_email_user" # FOR EMAIL SENDING NOTIFICATION
```

### 4. Run the development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

You can also run prisma studio by:

```bash
npm run db:studio
```

Open http://localhost:3000 in your browser to see the application running.

### Project Structure

```bash
.
├── app/                     # App Router directory
│   ├── api/                 # API routes
│   ├── components/          # Reusable components
│   ├── lib/                 # Utility functions and libraries
│   ├── page.tsx             # Home page
│   └── ...                  # Other pages and layouts
├── prisma/                  # Prisma schema and migrations
│   └── schema.prisma
├── public/                  # Static assets
├── styles/                  # Global styles
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── next.config.js           # Next.js configuration
├── package.json             # Project dependencies
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

### Prisma Setup

1. Initialize Prisma: If you haven't already, initialize Prisma in your project:

```bash
npx prisma init
```

2. Define Your Schema: Edit the prisma/schema.prisma file to define your database schema.
3. Migrate Database: Run the following command to apply your schema to the database:

```bash
npx prisma migrate dev --name init
```

4. Generate Prisma Client: Generate the Prisma Client to interact with your database:

```bash
npx prisma generate
```

### Using shadcn/ui

This project includes shadcn/ui for building UI components. You can customize and use these components directly in your project. Check out the [shadcn/ui documentation](https://ui.shadcn.com/docs) for more details.

## Adding a ShadCN Component

To add a ShadCN component, run:

```bash
npx shadcn@latest add button
```

Example Usage

```javascript
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <h1>Welcome to Next.js!</h1>
      <Button>Click Me</Button>
    </div>
  );
}
```

### Deployment

Deploy on vercel

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

1. Push your code to a GitHub repository.

2. Import the repository into Vercel.

3. Vercel will automatically detect the Next.js project and deploy it.

### Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## Owner

This repository is maintained by **John Patrick Ryan Mandal**.

### Contact

- 📧 Email: [mandal.johnpatrickryan@gmail.com](mailto:mandal.johnpatrickryan@gmail.com)
- 🔗 LinkedIn: [John Patrick Ryan Mandal](https://www.linkedin.com/in/john-patrick-ryan-mandal-407bb8270/)
- 🌐 Website: [ptrckk.dev](https://www.ptrckk.dev/)
