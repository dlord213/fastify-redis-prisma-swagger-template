import fastify from "fastify";
import { envPlugin } from "./plugins/env.plugin.js";
import { requestsPlugin } from "./plugins/requests.plugin.js";
import { securityPlugin } from "./plugins/security.plugin.js";
import { authPlugin } from "./plugins/auth.plugin.js";
import { redisPlugin } from "./plugins/redis.plugin.js";
import { swaggerPlugin } from "./plugins/swagger.plugin.js";

const server = fastify({
  logger: true,
});

const start = async () => {
  try {
    await server.register(envPlugin);
    await server.register(authPlugin);
    await server.register(redisPlugin);
    await server.register(requestsPlugin);
    await server.register(securityPlugin);
    await server.register(swaggerPlugin);

    server.get("/ping", async (request, reply) => {
      return "pong\n";
    });

    server.get(
      "/users",
      {
        schema: {
          description: "Get all users",
          tags: ["Users"],
          summary: "Fetch public user list",
          response: {
            200: {
              description: "Successful response",
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  email: { type: "string" },
                },
              },
            },
          },
        },
      },
      async (req, reply) => {
        // Logic here
        return [{ id: 1, email: "test@test.com" }];
      }
    );

    server.get("/redis-check", async (request, reply) => {
      const { redis } = server;

      try {
        await redis.set("framework", "Fastify");

        const value = await redis.get("framework");

        const ping = await redis.ping();

        return {
          status: "Connected",
          read_test: value,
          ping_response: ping,
        };
      } catch (err) {
        request.log.error(err);
        return reply.code(500).send({ status: "Redis Failed", error: err });
      }
    });
    const _PORT = Number(process.env.SERVER_PORT) || 10000;

    await server.listen({ port: _PORT, host: "0.0.0.0" }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      console.log(server.getEnvs());
      console.log(`Server listening at ${address}`);
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
