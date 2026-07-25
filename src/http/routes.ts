import type { FastifyInstance } from "fastify";
import { registerController } from "./controllers/register.js";
import { authenticateController } from "./controllers/authenticate.js";

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)
}