import Fastify from "fastify";
import * as dotenv from "dotenv";
import fastifyJwt from "@fastify/jwt";
import { routes } from "./routes";
import { logRequest } from "./utils/logger";
import cors from "@fastify/cors";

declare module "fastify" {
  interface FastifyInstance {
    authenticate: (request: any, reply: any) => Promise<void>;
  }
}

dotenv.config();

const fastify = Fastify({ logger: false });

fastify.register(cors, {
  origin: (origin, cb) => {
    const allowedOrigins = [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"), false);
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

fastify.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || "supersecret",
});

fastify.decorate("authenticate", async function (req: any, res: any) {
  try {
    await req.jwtVerify();
  } catch (err) {
    res.send(err);
  }
});

fastify.addHook("preHandler", async (request) => {
  logRequest(request);
});

fastify.register(routes);

const start = async () => {
  if (!process.env.JWT_SECRET) {
    fastify.log.error("Missing JWT_SECRET environment variable!");
    process.exit(1);
  }
  try {
    await fastify.listen({
      port: Number(process.env.PORT) || 5120,
      host: "0.0.0.0",
    });
    console.log(
      `🚀 Server ready at http://localhost:${Number(process.env.PORT) || 5120}`
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
