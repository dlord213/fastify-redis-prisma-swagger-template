import fp from "fastify-plugin";
import fastifyMultipart from "@fastify/multipart";
import fastifyFormbody from "@fastify/formbody";
import type { FastifyInstance } from "fastify";

async function plugin(fastify: FastifyInstance, options: any) {
  await fastify.register(fastifyMultipart);
  await fastify.register(fastifyFormbody);
}

export const requestsPlugin = fp(plugin);
