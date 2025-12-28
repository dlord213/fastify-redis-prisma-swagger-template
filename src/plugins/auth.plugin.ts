import fp from "fastify-plugin";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

import { type FastifyInstance } from "fastify";

async function plugin(fastify: FastifyInstance, options: any) {
  await fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET ?? "",
    cookie: {
      cookieName: process.env.COOKIE_SECRET ?? "",
      signed: true,
    },
  });
}

export const authPlugin = fp(plugin);
