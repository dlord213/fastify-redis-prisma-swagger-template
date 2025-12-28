import fp from "fastify-plugin";
import fastifyRedis from "@fastify/redis";
import { Redis } from "ioredis";
import type { FastifyInstance } from "fastify";

async function plugin(fastify: FastifyInstance, options: any) {
  const _INSTANCE = new Redis({
    host: process.env.REDIS_HOST ?? "",
    port: Number(process.env.REDIS_PORT) || 6379,
    family: 4,
  });

  await fastify.register(fastifyRedis, { client: _INSTANCE });
}

export const redisPlugin = fp(plugin);
