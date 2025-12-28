import fastifyEnv, { type FastifyEnvOptions } from "@fastify/env";
import { type FastifyInstance } from "fastify";
import fp from "fastify-plugin";

async function plugin(fastify: FastifyInstance, options: any) {
  const _ENV_SCHEMA = {
    type: "object",
    required: [
      "REDIS_HOST",
      "SERVER_PORT",
      "JWT_SECRET",
      "COOKIE_SECRET",
      "DATABASE_URL",
    ],
    properties: {
      REDIS_HOST: { type: "string" },
      SERVER_PORT: { type: "number" },
      JWT_SECRET: { type: "string" },
      COOKIE_SECRET: { type: "string" },
      DATABASE_URL: { type: "string" },
    },
  };

  const _OPTIONS: FastifyEnvOptions = {
    confKey: "config",
    dotenv: true,
    data: process.env,
    schema: _ENV_SCHEMA,
  };

  await fastify.register(fastifyEnv, _OPTIONS);
}

export const envPlugin = fp(plugin);
