import fp from "fastify-plugin";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import type { FastifyInstance } from "fastify";

const plugin = async (fastify: FastifyInstance, options: any) => {
  await fastify.register(fastifySwagger, {
    openapi: {
      info: {
        title: "Fastify Template API",
        description:
          "API Documentation for the Fastify + Prisma + Redis template",
        version: "1.0.0",
      },
      servers: [
        {
          url: "http://localhost:10000",
          description: "Development Server",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },
  });

  await fastify.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
    staticCSP: true,
  });
};

export const swaggerPlugin = fp(plugin);
