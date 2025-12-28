# Fastify + Prisma + Redis Template

### Installation & Setup

### 1. Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) or Docker Engine

### 2. Clone and Install

```bash
git clone
npm install
```

## ENVs

Create a .env file in the root directory

```bash
SERVER_PORT=10000
DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
REDIS_HOST="127.0.0.1"
REDIS_PORT=6379
JWT_SECRET="supersecret"
COOKIE_SECRET="anothersecret"
```

Check `@/src/plugins/env.plugin.ts` first before adding env variables.

## Local Development (Without Docker)

1. Start Services Only: Start Postgres and Redis, but not the API container.

```bash
docker compose up -d main_db redis_main
```

2. Run in Dev Mode: Uses tsx for hot-reloading.

```bash
npm run server:ts
```

## Scripts

```bash
npm run server:ts - Runs the server in development mode using tsx (Hot reload).
npm run build - Compiles TypeScript to JavaScript in /dist.
npm run server - Runs the compiled JavaScript (Production mode).
npm run db:gen - Generates Prisma Client (Run after schema changes).
npm run db:push - Pushes schema changes to DB without creating migration history (Prototyping).
npm run db:migrate - Creates and runs a migration file (Production).
npm run db:studio - Opens Prisma Studio GUI to view data.
```

## API Documentation (Swagger)

### Accessing the Docs

Once the server is running, visit:
**[http://localhost:10000/docs](http://localhost:10000/docs)**

### How to Document a Route

To add a route to the Swagger UI, simply define a `schema` property in your route options. You do not need to write separate YAML files.

**Example `src/routes/user.ts`:**

```typescript
fastify.get(
  "/users",
  {
    schema: {
      description: "Get a list of all users",
      tags: ["Users"],
      summary: "Public user directory",
      // Define the response shape for 200 OK
      response: {
        200: {
          description: "Successful response",
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "integer" },
              email: { type: "string", format: "email" },
            },
          },
        },
      },
    },
  },
  async (request, reply) => {
    // ... handler code
  }
);
```
