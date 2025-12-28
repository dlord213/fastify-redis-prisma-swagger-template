import fp from "fastify-plugin";
import fastifyCors from "@fastify/cors";
import fastifyCompress from "@fastify/compress";
("@fastify/compress");
import fastifyCookie from "@fastify/cookie";
import fastifyCsrfProtection from "@fastify/csrf-protection";
import type { FastifyInstance } from "fastify";
("@fastify/csrf-protection");

async function plugin(fastify: FastifyInstance, options: any) {
  await fastify.register(fastifyCors);
  await fastify.register(fastifyCompress);
  await fastify.register(fastifyCookie);
  await fastify.register(fastifyCsrfProtection);
}

export const securityPlugin = fp(plugin);
