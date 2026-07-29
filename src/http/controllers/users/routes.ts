import type { FastifyInstance } from "fastify";
import { registerController } from "./register.js";
import { authenticateController } from "./authenticate.js";
import { profileController } from "./profile.js";
import { verifyJWT } from "../../middlewares/verify-jwt.js";

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerController)
  app.post('/sessions', authenticateController)
  app.get('/me', { onRequest: [verifyJWT] }, profileController)
}